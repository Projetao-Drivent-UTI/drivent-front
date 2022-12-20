import { useEffect, useState } from 'react';
import TicketWithoutHotel from '../../../components/TicketWithoutHotel';
import useTickets from '../../../hooks/api/useTickets';
import PendingPayment from '../../../components/PendingPayment/index';
import Hotels from '../../../components/Hotels';

export default function Hotel() {
  const [userTicket, setUserTicket] = useState(null);
  const { getTicket, ticketsLoading } = useTickets();

  useEffect(() => {
    if (ticketsLoading) {
      const ticket = getTicket();

      ticket.then((response) => {
        setUserTicket(response);
      });
    }
  }, []);

  if (userTicket === null) {
    console.log('null');
    return <TicketWithoutHotel />;
  }

  if (!userTicket.TicketType.includesHotel) {
    console.log('includes');
    return <TicketWithoutHotel />;
  }

  if (userTicket.status === 'PAID') {
    console.log('paid');
    return <Hotels />;
  }

  return <PendingPayment />;
}
