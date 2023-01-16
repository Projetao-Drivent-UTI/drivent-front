import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import useActivies from '../../hooks/api/useActivies';
import dayjs from 'dayjs';

export default function ActiviesList( { date }) {
  const { activies } = useActivies(date);  
  const [activities, setActivities] = useState([]);
  function BoxSize(startItem, endItem) {
    const start = startItem.split(':');
    const end = endItem.split(':');
    start[1]= Number(start[1])*10/6;
    end[1]= Number(end[1])*10/6;
    const hourDiff =  Number(end[0])+end[1] - Number(start[0]) - start[1];
    return `${hourDiff*80}px`;
  }
  useEffect(() => {
    if(activies) {
      setActivities(activies);
    }
  }, [activies]);
  console.log(activies, 'atividades');
  return (
    <Container>
      <ActivityContainer>
        <ActivityBox>
          <h4>Auditório Principal</h4>
          <Activies>
            {activies?.map((a) => {
              if (a.location === 'Auditório Principal') {
                return(
                  <ActivityItem size={BoxSize(a.start, a.end)}>
                    <ActivityInfo>
                      <h5>{a.name}</h5>
                      <h6>{a.start} - {a.end}</h6>
                    </ActivityInfo>
                    <ActivityStatus>

                    </ActivityStatus>
                  </ActivityItem>
                );  
              }
            })}
          </Activies>
        </ActivityBox>
        <ActivityBox>
          <h4>Auditório Lateral</h4>
          <Activies>
            {activies?.map((a) => {
              if (a.location === 'Auditório Lateral') {
                return(
                  <ActivityItem size={BoxSize(a.start, a.end)}>
                    <ActivityInfo>
                      <h5>{a.name}</h5>
                      <h6>{a.start} - {a.end}</h6>
                    </ActivityInfo>
                    <ActivityStatus>
                        
                    </ActivityStatus>
                  </ActivityItem>
                );  
              }
            })}
          </Activies>
        </ActivityBox>
        <ActivityBox>
          <h4>Sala de Workshop</h4>
          <Activies>
            {activies?.map((a) => {
              if (a.location === 'Sala de Workshop') {
                return(
                  <ActivityItem size={BoxSize(a.start, a.end)}>
                    <ActivityInfo>
                      <h5>{a.name}</h5>
                      <h6>{a.start} - {a.end}</h6>
                    </ActivityInfo>
                    <ActivityStatus>
                        
                    </ActivityStatus>
                  </ActivityItem>
                );  
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
    h4{
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 17px;
    line-height: 23px;
    color: #7B7B7B;
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
    border: #D7D7D7 solid 1px;
`;
const ActivityItem = styled.div`
    margin: 10px 10px 0 10px;
    width: 90%;
    border-radius: 5px;
    justify-content: space-between;
    background: #F1F1F1;
    display: flex;
    height: ${(props) => props.size};

`;
const ActivityInfo = styled.div`
    margin: 10px 5px;
    background: #F1F1F1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    h5 {
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 12px;
    line-height: 23px;
    color: #343434;
    margin-bottom: 5px;
    }
    h6 {
    font-family: 'Roboto';
    font-weight: 400;
    font-size: 12px;
    line-height: 23px;
    color: #343434;
    }
`;

const ActivityStatus = styled.div`
    margin: 5px;
    border-left: 1px solid #CFCFCF;
    background: #F1F1F1;
    width: 45px;
`;
