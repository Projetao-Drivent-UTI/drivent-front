import TicketWithoutHotel from '../../../components/TicketWithoutHotel';
import useTickets from '../../../hooks/api/useTickets';
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '../../../components/Form/Button';
import Hotels, { PageTitle, PageSubTitle } from '../../../components/Hotels';
import useGetBooking from '../../../hooks/api/useGetBooking';
import BookedRoom from '../../../components/Hotels/BookedRoom';
import { SubmitContainer } from '../../../components/PersonalInformationForm';

export default function Hotel() {
  const [userTicket, setUserTicket] = useState(null);
  const { getTicket, ticketsLoading } = useTickets();

  const { booking, getBooking } = useGetBooking();
  const [userBooking, setUserBooking] = useState(false);
  const [ updateABook, setUpdateABook]=useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
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
    if(booking && !isUpdating) {
      setUserBooking(booking);
      setBookingId(booking.id);
    }else{
      await getBooking();
      setIsUpdating(false);
    }
  }, [booking, updateABook]);
  
  async function reRender() {
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
      <Wrapper>
        <PageTitle>Escolha de hotel e quarto</PageTitle>
        {userBooking?(
          <>
            <PageSubTitle>Você já escolheu o seu quarto:</PageSubTitle>
            <BookedRoom 
              image={userBooking.Room.Hotel.image} 
              name={userBooking.Room.Hotel.name} 
              roomId={userBooking.Room.id} 
              capacity={userBooking.Room.capacity} 
              booking={userBooking.Room.Booking.length} 
            ></BookedRoom>
            <SubmitContainer>
              <Button onClick = {reRender}>Trocar de Quarto</Button> 
            </SubmitContainer>
          </>):
          (
            <>
              <Hotels setUpdateABook={setUpdateABook} updateABook={updateABook} bookingId={bookingId} setIsUpdating={setIsUpdating} />
            </>
            
          )}
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
