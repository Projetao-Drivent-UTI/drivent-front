import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useActivies from '../../hooks/api/useActivies';
import Activity from './Activity';

export default function ActiviesList({ date }) {
  const { activies } = useActivies(date);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    if (activies) {
      setActivities(activies);
    }
  }, [activies]);

  return (
    <Container>
      <ActivityContainer>
        <ActivityBox>
          <h4>Auditório Principal</h4>
          <Activies>
            {activies?.map((a) => {
              if (a.location === 'Auditório Principal') {
                return <Activity activity={a}></Activity>;
              }
            })}
          </Activies>
        </ActivityBox>
        <ActivityBox>
          <h4>Auditório Lateral</h4>
          <Activies>
            {activies?.map((a) => {
              if (a.location === 'Auditório Lateral') {
                return <Activity activity={a}></Activity>;
              }
            })}
          </Activies>
        </ActivityBox>
        <ActivityBox>
          <h4>Sala de Workshop</h4>
          <Activies>
            {activies?.map((a) => {
              if (a.location === 'Sala de Workshop') {
                return <Activity activity={a}></Activity>;
              }
            })}
          </Activies>
        </ActivityBox>
      </ActivityContainer>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
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
  h4 {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 17px;
    line-height: 23px;
    color: #7b7b7b;
    margin-bottom: 15px;
  }
`;
const ActivityContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
`;
const ActivityBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Activies = styled.div`
  width: 100%;
  height: 100%;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: #d7d7d7 solid 1px;
`;
