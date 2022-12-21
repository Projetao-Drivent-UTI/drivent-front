import useAsync from '../useAsync';
import useToken from '../useToken';

import * as ticketsApi from '../../services/ticketsApi';

export default function useTickets() {
  const token = useToken();

  const {
    data: ticket,
    loading: ticketsLoading,
    error: ticketsError,
    act: getTicket,
  } = useAsync(() => ticketsApi.getUserTicket(token));

  return {
    ticket,
    ticketsLoading,
    ticketsError,
    getTicket,
  };
}
