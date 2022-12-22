import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useTicketTypes from '../../hooks/api/useTicketTypes';
import useSaveTicket from '../../hooks/api/useSaveTicket';

export default function tickets() {
  const [online, setOnline] = useState('#fff');
  const [presential, setPresential] = useState('#fff');
  const [withHotel, setWithHotel] = useState('#fff');
  const [withoutHotel, setWithoutHotel] = useState('#fff');
  const [ticketTypeId, setTicketTypeId] = useState(0);
  const [total, setTotal] = useState(0);
  const { ticketTypes } = useTicketTypes();
  const { saveTicketLoading, saveTicket } = useSaveTicket();
  const navigate = useNavigate();

  function selectedOnline(price, id) {
    if (online === '#fff') {
      setOnline('#FFEED2');
      setPresential('#fff');
    } else {
      setOnline('#fff');
    }
    setTotal(price);
    setTicketTypeId(id);
  }

  function selectedPresential(price, id) {
    if (presential === '#fff') {
      setPresential('#FFEED2');
      setOnline('#fff');
    } else {
      setPresential('#fff');
    }
    setTotal(price);
    setTicketTypeId(id);
  }

  function selectedWithHotel(price, id) {
    if (withoutHotel === '#fff') {
      setWithHotel('#FFEED2');
      setWithoutHotel('#fff');
      setPresential('#fff');
    } else {
      setWithoutHotel('#fff');
    }
    setTotal(price);
    setTicketTypeId(id);
  }

  function selectedWithoutHotel(price, id) {
    if (withHotel === '#fff') {
      setWithoutHotel('#FFEED2');
      setWithHotel('#fff');
      setPresential('#fff');
    } else {
      setWithHotel('#fff');
    }
    setTotal(price);
    setTicketTypeId(id);
  }

  async function sendMessage() {
    const body = { ticketId: ticketTypeId };

    try {
      await saveTicket(body);
      toast('Informações salvas com sucesso!');
      navigate('/');
    } catch (error) {
      toast('Não foi possível salvar suas informações!');
    }
  }

  return (
    <Container>
      <h1>Ingreso e Pagamento</h1>
      <h3>Primeiro, escolha sua modalidade de ingresso</h3>
      <TypesTicket>
        {ticketTypes?.map((type) => {
          if (type.isRemote) {
            return (
              <button onClick={() => selectedOnline(type.price, type.id)} selected={online} key={type.id}>
                <h5>{type.name}</h5>
                <h6>R$ {type.price}</h6>
              </button>
            );
          }
          if (!type.isRemote && type.name === 'Presencial') {
            return (
              <button onClick={() => selectedPresential(type.price, type.id)} selected={presential} key={type.id}>
                <h5>{type.name}</h5>
                <h6>R$ {type.price}</h6>
              </button>
            );
          }
        })}
      </TypesTicket>
      {online === '#FFEED2' ? (
        <>
          <TotalTicket>
            Fechado! O total ficou em <strong>R$ {total}</strong>. Agora é só confirmar:
          </TotalTicket>
          <ReservedButton onClick={() => sendMessage()} disabled={saveTicketLoading}>
            RESERVAR INGRESSO
          </ReservedButton>
        </>
      ) : (
        ''
      )}
      {presential === '#FFEED2' ? (
        <>
          <PresentialText>Ótimo! Agora escolha sua modalidade de hospedagem</PresentialText>
          <TypesTicket>
            {ticketTypes?.map((type) => {
              if (type.name === 'Com Hotel') {
                return (
                  <button
                    onClick={() => selectedWithHotel(type.price, type.id)}
                    selected={selectedWithHotel}
                    key={type.id}
                  >
                    <h5>{type.name}</h5>
                    <h6>R$ {type.price}</h6>
                  </button>
                );
              }
              if (type.name === 'Sem Hotel') {
                return (
                  <button
                    onClick={() => selectedWithoutHotel(type.price, type.id)}
                    selected={selectedWithoutHotel}
                    key={type.id}
                  >
                    <h5>{type.name}</h5>
                    <h6>R$ {type.price}</h6>
                  </button>
                );
              }
            })}
          </TypesTicket>
          <>
            <TotalTicket>
              Fechado! O total ficou em <strong>R$ {total}</strong>. Agora é só confirmar:
            </TotalTicket>
            <ReservedButton onClick={() => sendMessage()} disabled={saveTicketLoading}>
              RESERVAR INGRESSO
            </ReservedButton>
          </>
        </>
      ) : (
        ''
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  h1 {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    margin-bottom: 25px;
  }
  h3 {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-bottom: 15px;
  }
`;

const TypesTicket = styled.div`
  width: 100%;
  height: 24%;
  margin-bottom: 15px;
  display: flex;
  button {
    width: 145px;
    height: 145px;
    border: 1px solid #cecece;
    border-radius: 20px;
    background-color: ${(props) => props.selected};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 25px;
    h5 {
      width: 80px;
      font-family: 'Roboto';
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      color: #454545;
    }
    h6 {
      font-family: 'Roboto';
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #898989;
    }
    &:hover {
      cursor: pointer;
      filter: brightness(0.96);
    }
  }
`;

const TotalTicket = styled.div`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 20px;
  color: #8e8e8e;
  margin-bottom: 15px;
`;

const ReservedButton = styled.button`
  font-family: 'Roboto';
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  color: #000000;
  width: 162px;
  height: 37px;
  background: #e0e0e0;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  border: none;
  margin-bottom: 15px;
  &:hover {
    cursor: pointer;
    filter: brightness(0.96);
  }
`;

const PresentialText = styled.div`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 23px;
  color: #8e8e8e;
  margin-bottom: 15px;
`;
