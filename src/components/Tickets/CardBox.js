import styled from 'styled-components';
import { useState } from 'react';

export default function CardBox({ type, typeName, setTypeName, setTotal, setTicketTypeId }) {
  const [isClicked, setIsClicked] = useState(false);

  function selectedOption(price, id) {
    console.log(id);
    setIsClicked(true);
    setTypeName(type.name);
    setTotal(price);
    setTicketTypeId(id);
  }

  return (
    <CardButton
      onClick={() => selectedOption(type.price, type.id)}
      typeName={typeName ? typeName : ''}
      isClicked={isClicked}
      name={type.name}
      key={type.id}
    >
      <h5>{type.name}</h5>
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
