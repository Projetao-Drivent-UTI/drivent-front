import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function useTicketType() {
  const token = useToken();
  const {
    data: paymentTicket,
    loading: paymentTicketLoading,
    error: paymentTicketError,
    act: getPaymentTicket
  } = useAsync(() => paymentApi.getTicketPayment(token));

  return {
    paymentTicket,
    paymentTicketLoading,
    paymentTicketError,
    getPaymentTicket
  };
};
