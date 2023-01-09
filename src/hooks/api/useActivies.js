import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activiesApi from '../../services/activiesApi';

export default function useActivies() {
  const token = useToken();
  
  const {
    data: activies,
    loading: activiesLoading,
    error: activiesError,
    act: getActivies
  } = useAsync(() => activiesApi.getActivies(token));

  return {
    activies,
    activiesLoading,
    activiesError,
    getActivies
  };
}
