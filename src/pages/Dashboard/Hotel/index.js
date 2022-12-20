import TicketWithoutHotel from '../../../components/TicketWithoutHotel';
import useTickets from '../../../hooks/api/useTickets';
import PendingPayment from '../../../components/Pending Payment/PendingPayment';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import RoomDisplay from '../../../components/RoomDisplay';
import useNewBooking from '../../../hooks/api/useNewBooking';
import { toast } from 'react-toastify';
import useGetHotelById from '../../../hooks/api/useHotelById';
export default function Hotel() {
  const [activeIndex, setActiveIndex] = useState();
  const { newBooking } = useNewBooking();
  const { hotel, getAHotelById } = useGetHotelById();
  const [hotels, setHotels] = useState();
  const [rooms, setRooms] = useState();
  const [userTicket, setUserTicket] = useState(null);
  const { getTicket, ticket } = useTickets();
  
  useEffect(() => {
    const ticket = getTicket();

    ticket.then((response) => {
      setUserTicket(response);
    });
  }, []);
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
      await newBooking(body);
      toast('Reserva feita com sucesso!');
      setRooms(false);
      setActiveIndex(undefined);
    } catch (error) {
      toast('Não foi possível fazer sua reserva');
    }
  }
  async function getBooking() {
    await getAHotelById(1);
    setRooms(true);
  }  

  if (userTicket === null) return <TicketWithoutHotel />;
  if (userTicket.TicketType.includesHotel === false) return <TicketWithoutHotel />;
  //if (userTicket.status === 'PAID') return '';

  //return <PendingPayment />;
  return (
    <>
      <Button onClick ={getBooking}>click fake no hotel</Button> {/* substitui pelo click real */}
      <RoomList>
        {rooms?(hotels.map((room, key) =>
          <RoomDisplay key={key} id={room.id} capacity={room.capacity} booking={room.Booking} onClick={() => setActiveIndex(room.id)}
            isActive={activeIndex === room.id} ></RoomDisplay>
        )):(<></>)}
      </RoomList>
      {activeIndex===undefined?(<></>):(<Button onClick ={postBooking}>RESERVAR QUARTO</Button>)}
      
    </>
  );
}
const RoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
