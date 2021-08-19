import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";

import Page from "../../components/Page";
import Input from "../../components/Form/Input";
import Button from "../../components/Form/Button";
import { StyledContainer, Column, Title, Label } from "../../components/Auth";

import EventInfoContext from "../../contexts/EventInfoContext";

import useApi from "../../hooks/useApi";

export default function Enroll() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loadingEnroll, setLoadingEnroll] = useState(false);

  const history = useHistory();

  const api = useApi();
  
  const { eventInfo } = useContext(EventInfoContext);

  function submit(event) {
    event.preventDefault();
    setLoadingEnroll(true);

    if (password !== confirmPassword) {
      toast("As senhas devem ser iguais!");
    } else {
      api.enrollment.enroll(email, password).then(response => {
        toast("Inscrito com sucesso! Por favor, faça login.");
        history.push("/sign-in");
      }).catch(error => {
        if (error.response) {
          for (const detail of error.response.data.details) {
            toast(detail);
          }
        } else {
          toast("Não foi possível conectar ao servidor!");
        }
      }).then(() => {
        setLoadingEnroll(false);
      });
    }
  }

  return (
    <Page background={eventInfo.backgroundImage}>
      <StyledContainer width="400px" height="520px">
        <Column>
          <img src={eventInfo.logoImage} alt="Event Logo" />
          <Title>{eventInfo.eventTitle}</Title>
        </Column>
        <Column>
          <Label>Inscrição</Label>
          <form onSubmit={submit}>
            <Input label="E-mail" type="text" fullWidth value={email} onChange={e => setEmail(e.target.value)} />
            <Input label="Senha" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} />
            <Input label="Repita sua senha" type="password" fullWidth value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <Button type="submit" color="primary" fullWidth disabled={loadingEnroll}>Inscrever</Button>
          </form>
        </Column>
        <Column>
          &copy; Driven.t
        </Column>
      </StyledContainer>
    </Page>
  );
}