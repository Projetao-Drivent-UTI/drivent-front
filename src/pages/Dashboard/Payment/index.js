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


  useEffect(() => {
    if ( enrollment ) {
      setUserEnrollment(enrollment);
    }
    if (ticket) {
      setUserTicket(ticket);
    } 
    console.log(userEnrollment, userTicket);
  }, [render, ticket, enrollment]);

  return (
    <>
      { (Object.keys(userEnrollment).length !== 0)?
        <> { (Object.keys(userTicket).length !== 0)?
          <PaymentInfo userTicket={userTicket} setRender={setRender} render={render}/>:
          <Tickets setRender={setRender} render={render}/> 
        } </>: 
        <NoEnrollment />
      }
    </>
  );
}
