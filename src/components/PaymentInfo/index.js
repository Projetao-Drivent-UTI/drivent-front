import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

import useUserTicket from '../../hooks/api/useTicket';

import TicketBox from './TicketBox';
import CardBox from './CardInformation';

export default function PaymentInfo() {
  const { ticket } = useUserTicket();
  const [userTicket, setUserTicket] = useState({});
  const testTicket ={
    id: 1,
    status: 'RESERVED',
    ticketTypeId: 1,
    enrollmentId: 1,
    TicketType: {
      id: 1,
      name: 'hotel',
      price: 300,
      isRemote: false,
      includesHotel: true,
    }
  };
  console.log(ticket);

  useEffect(() => {
    setUserTicket(testTicket);
    // if (ticket) {
    // setUserTicket(ticket);
    //} 
  }, [ticket]);

  return (
    <>
      <StyledTypography variant="h6">Ingresso e pagamento</StyledTypography>
      <StyledTypography variant='subtitle1' color='textSecondary'>Ingresso escolhido</StyledTypography>
      {(Object.keys(userTicket).length !== 0)?<TicketBox userTicket={userTicket}/>:<></>}
      <StyledTypography variant='subtitle1' color='textSecondary'>Pagamento</StyledTypography>
      <CardBox />
    </>
  );
};

const StyledTypography = styled(Typography)`
  margin-bottom: 10px!important;
  margin-top: 10px;
`;
