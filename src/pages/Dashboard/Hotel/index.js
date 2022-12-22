import TicketWithoutHotel from '../../../components/TicketWithoutHotel';
import useTickets from '../../../hooks/api/useTickets';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import RoomDisplay from '../../../components/RoomDisplay';
import useNewBooking from '../../../hooks/api/useNewBooking';
import { toast } from 'react-toastify';
import useGetRooms from '../../../hooks/api/useGetRooms';
import Hotels, { PageSubTitle } from '../../../components/Hotels';
import useGetBooking from '../../../hooks/api/useGetBooking';
import BookedRoom from '../../../components/Hotels/BookedRoom';
import usePutBooking from '../../../hooks/api/usePutBooking';

export default function Hotel() {
  const { newBooking } = useNewBooking();
  
  const { rooms, getRooms } = useGetRooms();
  const [room, setRoom] = useState();
  const [renderedRooms, setRenderedRooms] = useState();
  const [activeIndex, setActiveIndex] = useState();

  const [userTicket, setUserTicket] = useState(null);
  const { getTicket, ticketsLoading } = useTickets();

  const { booking, getBooking } = useGetBooking();
  const [userBooking, setUserBooking] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const { updateBooking } = usePutBooking();
  const [bookingId, setBookingId]= useState();
  
  useEffect(() => {
    if (ticketsLoading) {
      const ticket = getTicket();

      ticket.then((response) => {
        setUserTicket(response);
      });
    }
  }, []);

  useEffect(async() => {
    if(rooms) {
      setRoom(rooms.Rooms);
    }else {
      await getRooms(1);
    }
  }, [rooms]); 

  useEffect(async() => {
    if(booking) {
      setUserBooking(booking);
      setIsUpdating(true);
      setBookingId(booking.id);
    }else{
      await getBooking();
    }
  }, [booking]);
  
  async function postBooking() {
    const body = { roomId: activeIndex };
    if(isUpdating) {
      updateBook();
    }else{
      try {
        await newBooking(body);
        toast('Reserva feita com sucesso!');
        setRenderedRooms(false);
        setActiveIndex(undefined);
        setRoom('');
        setUserBooking('');
        getBooking();
      } catch (error) {
        toast('Não foi possível fazer sua reserva');
      }}
  }
  async function updateBook() {
    const body = { roomId: activeIndex };
    try {
      await updateBooking(body, bookingId);
      toast('Reserva feita com sucesso!');
      setRenderedRooms(false);
      setActiveIndex(undefined);
      setRoom('');
      setUserBooking('');
      getBooking();
    } catch (error) {
      toast('Não foi possível fazer sua reserva');
    }
  }

  async function renderRooms() {
    await getRooms(1); // mudar o id 
    setRenderedRooms(true);
    setUserBooking(false);
  }  

  if (userTicket === null) {
    return <TicketWithoutHotel />;
  }

  if (!userTicket.TicketType.includesHotel) {
    return <TicketWithoutHotel />;
  }
  
  if (userTicket.status === 'PAID') {
    return (
      userBooking?(
        <>
          <BookedRoom 
            image={userBooking.Room.Hotel.image} 
            name={userBooking.Room.Hotel.name} 
            roomId={userBooking.Room.id} 
            capacity={userBooking.Room.capacity} 
            booking={userBooking.Room.Booking.length} 
          ></BookedRoom>
          <Button onClick = {renderRooms}>Trocar de Quarto</Button> {/* mudar aqui para a funcao que carrega os hoteis */}
        </>):
        ((
          <>
            <Hotels />
            <HotelWrapper> {/* remover  */}
              <Button onClick ={renderRooms}>click fake no hotel</Button> {/* substituir pelo click real e passar pro render rooms o id do hotel */}
            </HotelWrapper> {/* remover  */}
            {renderedRooms?( <PageSubTitle>Ótima pedida! Agora escolha seu quarto</PageSubTitle>):(<></>)}
            <RoomList>
              {renderedRooms?(
                room.map((room, key) =>
                  <RoomDisplay key={key} id={room.id} capacity={room.capacity} booking={room.Booking} onClick={() => setActiveIndex(room.id)}
                    isActive={activeIndex === room.id} ></RoomDisplay>
                )):(<></>)
              }
            </RoomList>
            {activeIndex===undefined?(<></>):(<Button onClick ={postBooking}>RESERVAR QUARTO</Button>)}
          </>
        ))
    );
  }
}
const RoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top:33px;
  margin-bottom:49px;
`;
const HotelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top:50px;
`;
