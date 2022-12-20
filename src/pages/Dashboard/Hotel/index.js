import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import RoomDisplay from '../../../components/RoomDisplay';
import useNewBooking from '../../../hooks/api/useNewBooking';
import { toast } from 'react-toastify';
import useGetHotelById from '../../../hooks/api/useHotelById';
export default function Hotel() {
  const [activeIndex, setActiveIndex] = useState();
  const { newBookingLoading, newBooking } = useNewBooking();
  const { hotel, getAHotelById } = useGetHotelById();
  const [hotels, setHotels] = useState();
  
  useEffect(async() => {
    if(hotel) {
      setHotels(hotel.Rooms);
    }else {
      await getAHotelById(1);
    }
  }, [hotel]); 
    
  async function postBooking() {
    const body = { roomId: activeIndex };
    try {
      console.log(body);
      await newBooking(body);
      toast('Reserva feita com sucesso!');
    } catch (error) {
      console.log(error);
      toast('Não foi possível fazer sua reserva');
    }
  }
  return (
    <>
      <RoomList>
        {hotels?(hotels.map((room, key) =>
          <RoomDisplay key={key} id={room.id} capacity={room.capacity} booking={room.Booking} onClick={() => setActiveIndex(room.id)}
            isActive={activeIndex === room.id} ></RoomDisplay>
        )):(<>aaaaaa</>)}
      </RoomList>
      {activeIndex===undefined?(<></>):(<Button onClick ={postBooking}>RESERVAR QUARTO</Button>)}
      
    </>
  );
}
const RoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
