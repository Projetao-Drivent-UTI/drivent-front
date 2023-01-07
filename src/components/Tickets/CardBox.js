import styled from 'styled-components';
import { useState } from 'react';

export default function CardBox({ type, typeName, setTypeName, setTotal, setTicketTypeId }) {
  const [isClicked, setIsClicked] = useState(false);
  let ticketName = '';

  if (type.isRemote) {
    ticketName='Online';
  } else{
    ticketName='Presencial';
  };

  function selectedOption(price, id) {
    setIsClicked(true);
    setTypeName(ticketName);
    setTotal(price);
    setTicketTypeId(id);
  }

  return (
    <CardButton
      onClick={() => selectedOption(type.price, type.id)}
      typeName={typeName ? typeName : ''}
      isClicked={isClicked}
      name={ticketName}
      key={type.id}
    >
      <h5>{ticketName}</h5>
      <h6>R$ {type.price}</h6>
    </CardButton>
  );
}

const CardButton = styled.div`
  width: 145px;
  height: 145px;
  border: ${(props) => (props.isClicked && props.name === props.typeName ? 'none' : '1px solid #cecece')};
  background-color: ${(props) => (props.isClicked && props.name === props.typeName ? '#FFEED2' : '#ffffff')};
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-right: 25px;
`;
