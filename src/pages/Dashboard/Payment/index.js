import { useEffect, useState } from 'react';

import PaymentInfo from '../../../components/PaymentInfo';
import NoEnrollment from '../../../components/PaymentInfo/NoEnrollment';

import useEnrollment from '../../../hooks/api/useEnrollment';
import useUserTicket from '../../../hooks/api/useTicket';
import Tickets from '../../../components/Tickets/Tickets';

export default function Payment() {
  const { userTicket } =  useUserTicket();
  const { enrollment } = useEnrollment();

  const [userTicketSet, setUserTicket] = useState({});
  const [userEnrollment, setUserEnrollment] = useState({});

  const [render, setRender] = useState(false);

  useEffect(() => {
    if ( enrollment ) {
      setUserEnrollment(enrollment);
    }
    if (userTicket) {
      setUserTicket(userTicket);
    } 
  }, [render, userTicket, enrollment]);
  console.log(userTicket, 'ticket');

  return (
    <>
      { (Object.keys(userEnrollment).length !== 0)?
        <> { (Object.keys(userTicketSet).length !== 0)?
          <PaymentInfo userTicket={userTicketSet} setRender={setRender} render={render}/>:
          <Tickets setRender={setRender} render={render} setUserTicket={setUserTicket}/> 
        } </>: 
        <NoEnrollment />
      }
    </>
  );
}
