import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export function useTicketType() {
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

export function usePaymentProcess(body) {
  const token = useToken();
  const {
    data: paymentProcess,
    loading: paymentProcessLoading,
    error: paymentProcessError,
    act: getPaymentProcess
  } = useAsync(() => paymentApi.paymentProcess(body, token));

  return {
    paymentProcess,
    paymentProcessLoading,
    paymentProcessError,
    getPaymentProcess
  };
};
