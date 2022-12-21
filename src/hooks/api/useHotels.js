import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelsApi from '../../services/hotelsApi';

export default function useHotels() {
  const token = useToken();

  const {
    data: hotels,
    loading: hotelsLoading,
    error: hotelsError,
    act: getHotels,
  } = useAsync(() => hotelsApi.getHotels(token), false);

  return {
    hotels,
    hotelsLoading,
    hotelsError,
    getHotels,
  };
}
