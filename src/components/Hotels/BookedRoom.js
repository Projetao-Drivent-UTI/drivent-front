import styled from 'styled-components';

export default function BookedRoom({ image, name, roomId, capacity, booking, bookingId }) {
  function defineRoomType(capacity) {
    if(capacity === 3) {
      return 'Triple';
    }else if (capacity === 2) {
      return 'Double';
    }else {
      return 'Single';
    }
  };
  function defineVacancy(booking) {
    if(booking === 3) {
      return 'Você e mais duas pessoas';
    }else if (booking === 2) {
      return 'Você e mais uma pessoa';
    }else {
      return 'Somente você';
    }
  };

  const roomType = defineRoomType(capacity);
  const vacancy = defineVacancy(booking);

  return (
    <Container>
      <Image image={image} />
      <Name>{name}</Name>
      <H1>Quarto Reservado</H1>
      <H2>{roomId} ({roomType})</H2>
      <H1>Pessoas no seu quarto</H1>
      <H2>{vacancy}</H2>
    </Container>
  );
}

const Container = styled.div`
  width: 196px;
  height: 264px;
  border-radius: 10px;
  background-color: #FFEED2;
  margin-right: 20px;
  display: flex;
  flex-direction: column;
  padding: 14px;
  cursor: pointer;
  margin-top: 20px;
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
export const H1 = styled.h1`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 12px;
  line-height: 14px;
  color: #3C3C3C;
  margin-top:12px;
`;
export const H2= styled.h2`
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 14px;
  color: #3C3C3C;  
  margin-top:2px;
`;
