import useAsync from '../useAsync';
import useToken from '../useToken';

import * as bookingApi from '../../services/bookingApi';

export default function useUpdateBooking() {
  const token = useToken();
  
  const {
    data: updatedBooking,
    loading: updatedBookingLoading,
    error: updatedBookingError,
    act: updateBooking
  } = useAsync((body, bookingId) => bookingApi.putBooking({ body, bookingId, token }), false);

  return {
    updatedBooking,
    updatedBookingLoading,
    updatedBookingError,
    updateBooking
  };
}
