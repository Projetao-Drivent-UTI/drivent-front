import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import useUserTicket from '../../hooks/api/useTicket';

import TicketBox from './TicketBox';
import CardBox from './CardInformation';
import PaymentConfirmed from './PaymentConfirmed';
import NoEnrollment from './NoEnrollment';

export default function PaymentInfo() {
  const { ticket } = useUserTicket();
  const [userTicket, setUserTicket] = useState({});

  useEffect(() => {
    if (ticket) {
      setUserTicket(ticket);
    } 
  }, [ticket]);

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
              <CardBox ticketId = {userTicket.id}/>:
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
