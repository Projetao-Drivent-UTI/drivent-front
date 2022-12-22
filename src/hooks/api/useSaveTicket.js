import * as ticketApi from '../../services/ticketApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useSaveTicket() {
  const token = useToken();

  const {
    loading: saveTicketLoading,
    error: saveTicketError,
    act: saveTicket,
  } = useAsync((data) => ticketApi.saveTicketType(data, token));

  return {
    saveTicketLoading,
    saveTicketError,
    saveTicket,
  };
}
