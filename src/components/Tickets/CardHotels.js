import styled from 'styled-components';
import { useState } from 'react';

export default function CardHotels({ type, hotelName, setHotelName, total, setTotal, setTicketTypeId }) {
  const [isClicked, setIsClicked] = useState(false);

  function selectedOption(price, id) {
    const totalPrice = total;
    if (type.name === 'Com Hotel') {
      if (totalPrice === 600) {
        setIsClicked(true);
        setHotelName(type.name);

        return;
      }
      console.log(totalPrice);
    }
    if (totalPrice === 600) {
      setTotal(250);
      setIsClicked(true);
      setHotelName(type.name);

      return;
    }
    setIsClicked(true);
    setHotelName(type.name);
    setTotal(totalPrice + price);
    setTicketTypeId(id);
  }

  return (
    <CardButton
      onClick={() => selectedOption(type.price, type.id)}
      hotelName={hotelName ? hotelName : ''}
      isClicked={isClicked}
      name={type.name}
      key={type.id}
    >
      <h5>{type.name}</h5>
      <h6>+ R$ {type.price}</h6>
    </CardButton>
  );
}

const CardButton = styled.div`
  width: 145px;
  height: 145px;
  border: ${(props) => (props.isClicked && props.name === props.hotelName ? 'none' : '1px solid #cecece')};
  background-color: ${(props) => (props.isClicked && props.name === props.hotelName ? '#FFEED2' : '#ffffff')};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 25px;
`;
