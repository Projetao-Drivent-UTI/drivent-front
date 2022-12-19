import { useEffect, useState } from 'react';
import TicketWithoutHotel from '../../../components/TicketWithoutHotel';
import useTickets from '../../../hooks/api/useTickets';

export default function Hotel() {
  const [userTicket, setUserTicket] = useState(null);
  const { getTicket } = useTickets();

  useEffect(() => {
    const ticket = getTicket();

    ticket.then((response) => {
      setUserTicket(response.data);
    });
  }, []);

  return !userTicket || userTicket.includesHotel === false ? <TicketWithoutHotel /> : '';
}
