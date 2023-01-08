import { useEffect, useState } from 'react';

import useUserTicket from '../../../hooks/api/useTicket';
import useActivies from '../../../hooks/api/useActivies';

import NotAvailable from '../../../components/Activies/notAvailable';
import Activies from '../../../components/Activies';

export default function Activities() {
  const { userTicket } =  useUserTicket();
  const { activies } = useActivies();
  
  const [userTicketSet, setUserTicket] = useState({});
  const [activiesSet, setActivies] = useState({});

  console.log(userTicket);

  useEffect(() => {
    if ( activies) {
      setActivies(activies);
    }
    if (userTicket) {
      setUserTicket(userTicket);
    } 
  }, [userTicket, activies]);

  return (
    <>
      { Object.keys(userTicketSet).length !== 0 ?(
        (userTicketSet.status ==='RESERVED' || userTicketSet.TicketType.isRemote) ?
          <NotAvailable userTicket = { userTicketSet }/> :
          <Activies />
      ):('')
      }
    </>
  );
}
