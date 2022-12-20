import { useEffect, useState } from 'react';
import Hotel from './Hotel';
import styled from 'styled-components';
import useHotels from '../../hooks/api/useHotels';

export default function Hotels() {
  const [hotelsList, setHotels] = useState([]);
  const { getHotels } = useHotels();

  useEffect(() => {
    const promise = getHotels();
    promise.then((response) => {
      setHotels(response);
    });
  }, []);

  const toBeRendered = hotelsList.map((hotel, index) => {
    return <Hotel image={hotel.image} name={hotel.name} id={hotel.id} rooms={hotel.rooms} key={index} />;
  });

  return (
    <>
      <Wrapper>
        <PageTitle>Escolha de hotel e quarto</PageTitle>
        <PageSubTitle>Primeiro, escolha seu hotel</PageSubTitle>
      </Wrapper>
      <HotelsContainer>{toBeRendered}</HotelsContainer>
    </>
  );
}

const PageTitle = styled.span`
  font-size: 34px;
`;

const PageSubTitle = styled.span`
  font-size: 20px;
  color: #8e8e8e;
  margin-top: 36px;
`;

const HotelsContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  height: 264px;
  display: flex;
  align-items: center;
  overflow-x: scroll;
`;

const Wrapper = styled.span`
  display: flex;
  flex-direction: column;
`;
