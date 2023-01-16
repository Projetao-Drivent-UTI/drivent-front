import useAsync from '../useAsync';
import useToken from '../useToken';

import * as activiesApi from '../../services/activiesApi';

export default function useActiviesDates() {
  const token = useToken();
  
  const {
    data: activiesDates,
    loading: activiesDatesLoading,
    error: activiesDatesError,
    act: getActiviesDates
  } = useAsync(() => activiesApi.getActiviesDates(token));

  return {
    activiesDates,
    activiesDatesLoading,
    activiesDatesError,
    getActiviesDates
  };
}
