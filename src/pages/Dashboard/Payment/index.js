import styled from 'styled-components';
import { useState } from 'react';

import useEnrollment from '../../../hooks/api/useEnrollment';
import useTicket from '../../../hooks/api/useTicket';
import useTicketTypes from '../../../hooks/api/useTicketTypes';

export default function SelectTicket() {
  const [selectType, setSelectType] = useState({});
  const [ticketTypeId, setTicketTypeId] = useState(0);
  const { enrollment } = useEnrollment();
  const { ticketTypes } = useTicketTypes();
  const { ticket } = useTicket();

  return (
    <Container>
      <h1>Ingreso e Pagamento</h1>
      <h3>Primeiro, escolha sua modalidade de ingresso</h3>
      <TypesTicket>
        {ticketTypes ? (
          ticketTypes
            .filter((type) => !type.includesHotel)
            .map((type) => (
              <TicketOptions
                type={type}
                key={type.id}
                setSelectType={setSelectType}
                selectType={selectType}
                setTicketTypeId={setTicketTypeId}
              />
            ))
        ) : (
          <MessageForbidden>
            <p>Você precisa completar sua inscrição antes de prosseguir pra escolha de ingresso</p>
          </MessageForbidden>
        )}
      </TypesTicket>
    </Container>
  );
}

function TicketOptions({ type, selectType, setSelectType, setTicketTypeId }) {
  function option() {
    setSelectType({ name: type.name, price: type.price });
    setTicketTypeId(type.id);
  }

  return (
    <TicketBox selectType={selectType.name ? selectType.name : ''} name={type.name} onClick={option}>
      <h5>{type.name}</h5>
      <h6>R$ {type.price / 100}</h6>
    </TicketBox>
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
  height: 100%;
  display: flex;
`;

const TicketBox = styled.button`
  width: 145px;
  height: 145px;
  border: 1px solid #cecece;
  border-radius: 20px;
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
`;

const MessageForbidden = styled.div`
  width: 100%;
  text-align: center;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: red;

  p {
    width: 388px;
    font-size: 20px;
    color: #8e8e8e;
  }
`;
