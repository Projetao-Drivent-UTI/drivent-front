import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import TicketBox from './TicketBox';
import CardBox from './CardInformation';
import PaymentConfirmed from './PaymentConfirmed';

import  usePaymentProcess  from '../../hooks/api/usePaymentProcess';

export default function PaymentInfo( { userTicket, render, setRender } ) {
  const [formData, setFormData] = useState({});
  useEffect(async() => {
    try {
      if (Object.keys(formData).length !== 0) {
        console.log(formData, 'form');
        usePaymentProcess({
          ticketId: userTicket.id,
          cardData: formData
        });
      };
    } catch (error) {
      console.log(error);
    }
  }, [formData]);
  return (
    <>
      <StyledTypography variant="h6">Ingresso e pagamento</StyledTypography>
      {(Object.keys(userTicket).length !== 0)?
        <>
          <StyledTypography variant='subtitle1' color='textSecondary'>Ingresso escolhido</StyledTypography>
          <TicketBox userTicket={userTicket}/>
          <StyledTypography variant='subtitle1' color='textSecondary'>Pagamento</StyledTypography>
          {
            userTicket.status === 'RESERVED'?
              <CardBox ticketId = {userTicket.id} formData={formData} setFormData={setFormData} setRender={setRender} render={render}/>:
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
