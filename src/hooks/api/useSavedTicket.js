import * as ticketApi from '../../services/ticketApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useTicket() {
  const token = useToken();

  const {
    loading: savedTicketLoading,
    error: savedTicketError,
    act: savedTicket,
  } = useAsync((data) => ticketApi.savedTicketType(data, token), false);

  return {
    savedTicketLoading,
    savedTicketError,
    savedTicket,
  };
}
