import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import useTicketTypes from '../../hooks/api/useTicketTypes';
import useSaveTicket from '../../hooks/api/useSaveTicket';
import CardBox from './CardBox';
import CardHotels from './CardHotels';

export default function tickets( { render, setRender } ) {
  const [ticketTypeId, setTicketTypeId] = useState(0);
  const [total, setTotal] = useState(0);
  const [typeName, setTypeName] = useState('');
  const [hotelName, setHotelName] = useState('');
  const { ticketTypes } = useTicketTypes();
  const { saveTicketLoading, saveTicket } = useSaveTicket();
  console.log(ticketTypes);
  async function sendMessage() {
    const body = { ticketTypeId };

    try {
      await saveTicket(body);
      toast('Informações salvas com sucesso!');
      setRender(!render);
    } catch (error) {
      toast('Não foi possível salvar suas informações!');
    }
  }

  return (
    <Container>
      <h1>Ingreso e Pagamento</h1>
      <h3>Primeiro, escolha sua modalidade de ingresso</h3>
      <TypesTicket>
        {ticketTypes?.map((type) =>
          type.name === 'Online' || type.name === 'Presencial' ? (
            <CardBox
              type={type}
              typeName={typeName}
              setTypeName={setTypeName}
              setTotal={setTotal}
              setTicketTypeId={setTicketTypeId}
            />
          ) : (
            ''
          )
        )}
      </TypesTicket>
      {typeName === 'Online' ? (
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
      {typeName === 'Presencial' ? (
        <>
          <PresentialText>Ótimo! Agora escolha sua modalidade de hospedagem</PresentialText>
          <TypesTicket>
            {ticketTypes?.map((type) =>
              type.name === 'Sem Hotel' || type.name === 'Com Hotel' ? (
                <CardHotels
                  type={type}
                  hotelName={hotelName}
                  setHotelName={setHotelName}
                  total={total}
                  setTotal={setTotal}
                  setTicketTypeId={setTicketTypeId}
                />
              ) : (
                ''
              )
            )}
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
