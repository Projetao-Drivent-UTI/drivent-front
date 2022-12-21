import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useNewBooking() {
  const token = useToken();
  
  const {
    loading: newBookingLoading,
    error: newBookingError,
    act: newBooking
  } = useAsync((data) => bookingApi.newBooking(data, token), false);

  return {
    newBookingLoading,
    newBookingError,
    newBooking
  };
}
