import { useEffect, useState } from 'react';

import PaymentInfo from '../../../components/PaymentInfo';
import NoEnrollment from '../../../components/PaymentInfo/NoEnrollment';

import useEnrollment from '../../../hooks/api/useEnrollment';
import useUserTicket from '../../../hooks/api/useTicket';
import Tickets from '../../../components/Tickets/Tickets';

export default function Payment() {
  const { ticket } =  useUserTicket();
  const { enrollment } = useEnrollment();

  const [userTicket, setUserTicket] = useState({});
  const [userEnrollment, setUserEnrollment] = useState({});

  const [render, setRender] = useState(false);
  const ticketTest ={
    id: 1,
    status: 'RESERVED',
    ticketTypeId: 1,
    enrollmentId: 1,
    TicketType: {
      id: 1,
      name: 'Online',
      price: 200,
      isRemote: true,
      includesHotel: false,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    },
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };

  useEffect(() => {
    if ( enrollment ) {
      setUserEnrollment(enrollment);
    }
    if (ticket) {
      setUserTicket(ticket);
    } 
  }, [render, ticket, enrollment]);
  console.log(userEnrollment, 'enrollment');
  console.log(userTicket, 'ticket');

  return (
    <>
      { (Object.keys(userEnrollment).length !== 0)?
        <> { (Object.keys(userTicket).length !== 0)?
          <PaymentInfo userTicket={userTicket} setRender={setRender} render={render}/>:
          <Tickets setRender={setRender} render={render} setUserTicket={setUserTicket}/> 
        } </>: 
        <NoEnrollment />
      }
    </>
  );
}
