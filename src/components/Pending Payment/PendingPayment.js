import styled from 'styled-components';

export default function PendingPayment() {
  return (
    <CenteredMessage>
      Você precisa ter o pagamento confirmado antes <br /> de fazer a escolha da hospedagem
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
