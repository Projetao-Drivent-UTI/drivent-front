import { useEffect, useState } from 'react';
import TicketWithoutHotel from '../../../components/TicketWithoutHotel';
import useTickets from '../../../hooks/api/useTickets';
import PendingPayment from '../../../components/Pending Payment/PendingPayment';

export default function Hotel() {
  const [userTicket, setUserTicket] = useState(null);
  const { getTicket } = useTickets();

  useEffect(() => {
    const ticket = getTicket();

    ticket.then((response) => {
      setUserTicket(response.data);
    });
  }, []);

  if (userTicket === null) return <TicketWithoutHotel />;
  if (userTicket.ticketType.includesHotel === false) return <TicketWithoutHotel />;
  if (userTicket.status === 'PAID') return '';

  return <PendingPayment />;
}
