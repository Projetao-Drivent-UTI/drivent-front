import { AiFillCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';

import Typography from '@material-ui/core/Typography';

export default function PaymentConfirmed() {
  return (
    <>
      <PaymentInfoBox>
        <Icone />
        <PaymentInfoText>
          <Text1>Pagamento confirmado!</Text1>
          <Text2>Prossiga para escolha de hospedagem e atividades</Text2>
        </PaymentInfoText>
      </PaymentInfoBox>
    </>
  );
};

const PaymentInfoBox = styled.div`
    display: flex;
    align-items: center;
`;

const Icone  = styled(AiFillCheckCircle)`
  color:#36B853;
  width: 40px;
  font-size: 40px;
`;

const PaymentInfoText = styled.div`
    display: flex;
    flex-direction: column;
`;

const Text1 = styled.p`
  color: #454545;
  font-weight:bold;
  margin-bottom: 5px;
  margin-left: 10px;
  font-size: 14px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;

const Text2 = styled.p`
  color: #454545;
  margin-left: 10px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 14px;
`;

