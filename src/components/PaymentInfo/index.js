import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import TicketBox from './TicketBox';
import CardBox from './CardInformation';
import PaymentConfirmed from './PaymentConfirmed';
import { toast } from 'react-toastify';

import useSavePaymentProcess from '../../hooks/api/useSavePaymentProcess';

export default function PaymentInfo( { userTicket, render, setRender } ) {
  const [body, setBody]= useState({});
  const [paymentStatus, setPaymentStatus] = useState(userTicket.status);

  const { savePaymentProcess, savePaymentProcessLoading } = useSavePaymentProcess();
  
  useEffect(() => {
    console.log(body);
    if (Object.keys(body).length !== 0 && userTicket.status === 'RESERVED') {
      const payment = async() => {
        await savePaymentProcess(body);
      };
      payment()
        .then((response) => {
          setRender(!render);
          toast('Pagamento realizado com sucesso!');
          setPaymentStatus('PAID');
        })
        .catch((error) => {
          console.log(error);
          toast('Não foi possível completar seu pagamento!');
        });
    }
  }, [body]);
  return (
    <>
      <StyledTypography variant="h6">Ingresso e pagamento</StyledTypography>
      {(Object.keys(userTicket).length !== 0)?
        <>
          <StyledTypography variant='subtitle1' color='textSecondary'>Ingresso escolhido</StyledTypography>
          <TicketBox userTicket={userTicket}/>
          <StyledTypography variant='subtitle1' color='textSecondary'>Pagamento</StyledTypography>
          {
            paymentStatus === 'RESERVED'?
              <CardBox ticket = {userTicket} body={body} setBody={setBody} />:
              <PaymentConfirmed />
          }
        </>
        :<></>}
    </>
  );
};

const StyledTypography = styled(Typography)`
  margin-bottom: 10px!important;
  margin-top: 10px;
`;
