import * as paymentApi from '../../services/paymentApi';
import useAsync from '../useAsync';
import useToken from '../useToken';

export default function useSavePaymentProcess() {
  const token = useToken();

  const {
    loading: savePaymentProcessLoading,
    error: savePaymentProcessError,
    act: savePaymentProcess
  } = useAsync((data) => paymentApi.save(data, token), false);

  return {
    savePaymentProcessLoading,
    savePaymentProcessError,
    savePaymentProcess
  };
}
