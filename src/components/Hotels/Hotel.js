import styled from 'styled-components'; 
import { H1, H2 } from './BookedRoom';

export default function Hotel({ image, name, id, roomList, onClick, isActive }) {
  function getVacancy(roomList) {
    let capacity=0;
    let booking=0;
    let answer=[];
    let roomTypes;
    
    roomList.map((room) => {
      capacity+=room.capacity;
      booking+=room.Booking.length;
      if (room.capacity===1 && !answer.includes('Single')) {
        answer.push('Single');
      }else if (room.capacity===2&& !answer.includes('Double')) {
        answer.push('Double');
      }else if (room.capacity===3&& !answer.includes('Triple')) {
        answer.push('Triple');
      }
    });
    if (answer.length===1) {
      roomTypes=answer;
    }else if (answer.length===2 && answer.includes('Single')&&answer.includes('Double')) {
      roomTypes = 'Single e Double';
    }else if (answer.length===2 && answer.includes('Single')&&answer.includes('Triple')) {
      roomTypes = 'Single e Triple';
    }else if (answer.length===2 && answer.includes('Double')&&answer.includes('Triple')) {
      roomTypes = 'Double e Triple';
    }else{
      roomTypes = 'Single, Double e Triple';
    }
    const final = {
      vacancy: capacity-booking,
      roomTypes
    };
    return final;
  }

  const hotelInfo = getVacancy(roomList);
   
  return (
    <Container onClick={onClick} isActive={isActive}>
      <Image image={image} />
      <Name>{name}</Name>
      <H1>Tipos de acomodação:</H1>
      <H2>{hotelInfo.roomTypes}</H2>
      <H1>Vagas disponíveis:</H1>
      <H2>{hotelInfo.vacancy}</H2>
    </Container>
  );
}
const Container = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  margin-right: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  padding: 14px;
  cursor: pointer;
  ${props => {
    if(props.isActive===true) {
      return 'background-color: #FFEED2;';
    }else{
      return 'background-color: #ebebeb;';
    }
  }}
`;

const Image = styled.div`
  background: url(${(props) => props.image}) center center no-repeat;
  background-size: cover;
  border-radius: 5px;
  width: 168px;
  height: 109px;
`;

const Name = styled.div`
  width: 100%;
  height: 24px;
  font-size: 20px;
  display: flex;
  margin-top: 10px;
  color: #343434;
  align-items: center;
`;
