import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useActiviesDates from '../../hooks/api/useActiviesDates';
import dayjs from 'dayjs';

import advancedFormat from 'dayjs/plugin/advancedFormat';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/pt';

import ActiviesList from './activitiesList';

export default function Activies() {
  dayjs.extend(advancedFormat);
  dayjs.extend(localizedFormat);
  dayjs.extend(relativeTime);
  dayjs.locale('pt-br');
  const { activiesDates } = useActiviesDates();

  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    if (activiesDates) {
      setDates(activiesDates);
    }
  }, [activiesDates]);
  return (
    <Container>
      <h1>Escolha de atividades</h1>
      <h3>Primeiro, filtre pelo dia do evento: </h3>
      <DayBox>
        {dates?.map((item) => (
          <DateButton onClick={() => setSelectedDate(item)} isSelected={selectedDate === item ? true : false}>
            {dayjs(item, 'YYYY-MM-DD HH:mm:ss.SSS').format('dddd, DD-MM', 'pt-br', { locale: 'pt-br' })}
          </DateButton>
        ))}
      </DayBox>
      {dates.length !== 0 ? selectedDate !== '' ? <ActiviesList date={selectedDate}></ActiviesList> : <></> : <></>}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  h1 {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 34px;
    line-height: 40px;
    margin-bottom: 25px;
  }
  h3 {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #8e8e8e;
    margin-bottom: 15px;
  }
`;
const DayBox = styled.div`
  display: flex;
  width: 100%;
`;

const DateButton = styled.div`
  background-color: ${(props) => (props.isSelected ? '#FFD37D' : '#E0E0E0')};
  width: 182px;
  height: 40px;
  border: none;
  margin-right: 10px;
  border-radius: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
  justify-content: center;
  align-items: center;
  text-align: center;
  display: flex;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
    'Helvetica Neue', sans-serif;

  &:hover {
    cursor: pointer;
  }
`;
