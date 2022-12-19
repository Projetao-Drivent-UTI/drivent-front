import styled from 'styled-components';

export default function TicketWithoutHotel() {
  return (
    <CenteredMessage>
      Sua modalidade de ingresso não inclui hospedagem
      <br /> Prossiga para a escolha de atividades
    </CenteredMessage>
  );
}

const CenteredMessage = styled.span`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #8e8e8e;
  font-size: 20px;
  text-align: center;
`;
