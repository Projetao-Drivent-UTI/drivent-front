import { useEffect, useState } from 'react';
import Hotel from './Hotel';
import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotels';
import useGetRooms from '../../hooks/api/useGetRooms';
import RoomDisplay from '../RoomDisplay';
import Button from '../Form/Button';
import useNewBooking from '../../hooks/api/useNewBooking';
import usePutBooking from '../../hooks/api/usePutBooking';
import { toast } from 'react-toastify';
import { SubmitContainer } from '../PersonalInformationForm';

export default function Hotels({ setUpdateABook, updateABook, bookingId, setIsUpdating }) {
  const [hotelsList, setHotels] = useState([]);
  const { getHotels, hotels } = useHotels();
  const [activeHotel, setActiveHotel] = useState();

  const { newBooking } = useNewBooking();
  const { updateBooking } = usePutBooking(); 

  const { rooms, getRooms } = useGetRooms(); 
  const [room, setRoom] = useState();
  const [renderedRooms, setRenderedRooms] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  
  const [roomId, setRoomId] = useState();
  
  useEffect(async() => {
    if(hotels) {
      setHotels(hotels);
    }else {
      await getHotels();
    }
  }, [hotels]); 
  
  useEffect(async() => {
    if(roomId) {
      if(rooms) {
        setRoom(rooms.Rooms);
        setRenderedRooms(true);
      }else {
        getRooms(roomId);
      }
    }
  }, [rooms]);

  async function renderRooms(id) {
    setRoomId(id);
    setActiveIndex('');
    setActiveHotel(id);
    await getRooms(id);
  } 

  async function postBooking() {
    const body = { roomId: activeIndex };
    if(bookingId) {
      updateBook();
    }else{
      try {
        await newBooking(body);
        toast('Reserva feita com sucesso!');
        setRenderedRooms(false);
        setActiveIndex(undefined);
        setActiveHotel(undefined);
        setRoom('');
        setUpdateABook(!updateABook);
      } catch (error) {
        toast('Não foi possível fazer sua reserva');
      }} 
  }
  async function updateBook() {
    const body = { roomId: activeIndex };
    try {
      await updateBooking(body, bookingId);
      toast('Reserva alterada com sucesso!');
      setRenderedRooms(false);
      setActiveIndex(undefined);
      setActiveHotel(undefined);
      setRoom('');
      setIsUpdating(true);
      setUpdateABook(!updateABook);
    } catch (error) {
      toast('Não foi possível alterar sua reserva');
    } 
  }
  const toBeRendered = hotelsList.map((hotel, index) => {
    return (
      <Hotel image={hotel.image} name={hotel.name} id={hotel.id} roomList={hotel.Rooms} isActive={activeHotel === hotel.id} key={index} onClick={() => renderRooms(hotel.id)}/>
    );
  });

  return (
    <>
      <Wrapper>
        <PageSubTitle>Primeiro, escolha seu hotel</PageSubTitle>
      </Wrapper>
      <HotelsContainer>{toBeRendered}</HotelsContainer>
      {renderedRooms?( 
        <PageSubTitle>Ótima pedida! Agora escolha seu quarto</PageSubTitle>):(<></>)}
      <RoomList>
        {renderedRooms?(
          room.map((room, key) =>
            <RoomDisplay key={key} id={room.id} capacity={room.capacity} booking={room.Booking} onClick={() => setActiveIndex(room.id)}
              isActive={activeIndex === room.id} ></RoomDisplay>
          )):(<></>)
        }
      </RoomList>
      <SubmitContainer>
        {activeIndex?(<Button onClick ={postBooking}>RESERVAR QUARTO</Button>):(<></>)}
      </SubmitContainer>
      
    </>
  );
}

export const PageTitle = styled.span`
  font-size: 34px;
`;

export const PageSubTitle = styled.span`
  font-size: 20px;
  color: #8e8e8e;
  margin-top: 36px;
`;

const HotelsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 264px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom:30px;
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: column;
`;
const RoomList = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top:30px;
`;

