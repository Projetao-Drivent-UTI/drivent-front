import useAsync from '../useAsync';
import useToken from '../useToken';

import * as hotelsApi from '../../services/hotelsApi';

export default function useGetRooms() {
  const token = useToken();
  
  const {
    data: rooms,
    loading: roomsLoading,
    error: roomsError,
    act: getRooms
  } = useAsync((hotelId) => hotelsApi.getHotelById(hotelId, token), false);

  return {
    rooms,
    roomsLoading,
    roomsError,
    getRooms
  };
}
