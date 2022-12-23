import styled from 'styled-components';
import { 
  BsPerson,
  BsPersonFill
} from 'react-icons/bs';

export default function RoomDisplay({ id, capacity, booking, onClick, isActive }) {
  let disabledRoom = false;
  if(booking.length >= capacity) {
    disabledRoom = true;
  }
  function displayVacancy(capacity, booking, isActive) {
    let group = [];
    let cont = 0;
    for (let i = 0; i < capacity; i++) {
      if (cont < booking) {
        group.push('black');
        cont++;
      } else if (i === capacity - 1 && isActive) {
        group.push('pink');
      } else {
        group.push('outline');
      }
    }
    return group;
  }
  const group = displayVacancy(capacity, booking.length, isActive);
  return (
    <Room disabledRoom={disabledRoom} isActive={isActive} onClick= {disabledRoom?(() => {return false;}):( onClick )}>
      <RoomNumber>{id}</RoomNumber>
      <RoomGuests>
        {group.map((person, key) => {
          if(person==='black') {
            return <BsPersonFill key={key} size='25px'/>;
          }else if(person==='pink') {
            return <BsPersonFill key={key} size='25px'color='#FF4791'/>;
          }else {
            return <BsPerson key={key} size='25px'/>;
          }
        })}
      </RoomGuests>
    </Room>
  );
}

const Room = styled.div `
  width: 190px;
  height: 45px;
  border: 1px solid #CECECE;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content:space-between;
  padding: 5px 10px 5px 10px;
  background-color: white;
  margin-right: 17px;
  margin-bottom: 7px;
  cursor: pointer;
  ${props => { 
    if(props.disabledRoom === true) {
      return 'color:#9D9D9D; background-color: #CECECE;';
    }else if (props.isActive === true) {
      return 'background-color: #FFEED2;';
    }else {
      return 'color:#454545';
    }
  }}
`;

const RoomNumber = styled.p `
  font-family: 'Roboto';
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
`;

const RoomGuests = styled.div`

`;
