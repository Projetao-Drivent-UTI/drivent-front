import TicketWithoutHotel from '../../../components/TicketWithoutHotel';
import useTickets from '../../../hooks/api/useTickets';
import PendingPayment from '../../../components/PendingPayment/index';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import RoomDisplay from '../../../components/RoomDisplay';
import useNewBooking from '../../../hooks/api/useNewBooking';
import { toast } from 'react-toastify';
import useGetHotelById from '../../../hooks/api/useHotelById';
import Hotels, { PageSubTitle } from '../../../components/Hotels';

export default function Hotel() {
  const [activeIndex, setActiveIndex] = useState();
  const { newBooking } = useNewBooking();
  const { hotel, getAHotelById } = useGetHotelById();
  const [hotels, setHotels] = useState();
  const [rooms, setRooms] = useState();
  const [userTicket, setUserTicket] = useState(null);
  const { getTicket, ticketsLoading } = useTickets();

  useEffect(() => {
    if (ticketsLoading) {
      const ticket = getTicket();

      ticket.then((response) => {
        setUserTicket(response);
      });
    }
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

  if (userTicket === null) {
    return <TicketWithoutHotel />;
  }

  if (!userTicket.TicketType.includesHotel) {
    return <TicketWithoutHotel />;
  }

  if (userTicket.status === 'PAID') {
    return (
      <>
        <Hotels />
        <HotelWrapper> {/* remover tambem */}
          <Button onClick ={getBooking}>click fake no hotel</Button> {/* substituir pelo click real */}
        </HotelWrapper>
        {rooms?( <PageSubTitle>Ótima pedida! Agora escolha seu quarto</PageSubTitle>):(<></>)}
        <RoomList>
          {rooms?(
            hotels.map((room, key) =>
              <RoomDisplay key={key} id={room.id} capacity={room.capacity} booking={room.Booking} onClick={() => setActiveIndex(room.id)}
                isActive={activeIndex === room.id} ></RoomDisplay>
            )):(<></>)
          }
        </RoomList>
        {activeIndex===undefined?(<></>):(<Button onClick ={postBooking}>RESERVAR QUARTO</Button>)}
      </>
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
