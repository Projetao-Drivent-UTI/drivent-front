import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useGetHotelById() {
  const token = useToken();
  
  const {
    data: hotel,
    loading: hotelLoading,
    error: hotelError,
    act: getAHotelById
  } = useAsync((hotelId) => bookingApi.getHotelById(hotelId, token), false);

  return {
    hotel,
    hotelLoading,
    hotelError,
    getAHotelById
  };
}
