import * as ticketApi from '../../services/ticketApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useTicket() {
  const token = useToken();

  const {
    loading: saveTicketLoading,
    error: saveTicketError,
    act: saveTicket,
  } = useAsync((data) => ticketApi.saveTicketType(data, token), false);

  return {
    saveTicketLoading,
    saveTicketError,
    saveTicket,
  };
}
