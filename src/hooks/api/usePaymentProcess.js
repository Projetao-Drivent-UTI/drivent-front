import useAsync from '../useAsync';
import useToken from '../useToken';

import * as paymentApi from '../../services/paymentApi';

export default function usePaymentProcess(body) {
  const token = useToken();
  const {
    data: paymentProcess,
    loading: paymentProcessLoading,
    error: paymentProcessError,
    act: postPaymentProcess
  } = useAsync(() => paymentApi.paymentProcess(body, token));

  return {
    paymentProcess,
    paymentProcessLoading,
    paymentProcessError,
    postPaymentProcess
  };
};
