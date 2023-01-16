import { IoEnterOutline } from 'react-icons/io5';
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from 'react-icons/ai';
import styled from 'styled-components';

export default function Activity({ activity }) {
  const isSubscribed = activity.ActivitySubscription.some(
    (activitySubscription) => activitySubscription.userId !== undefined
  );
  const availableVacancies = activity.capacity - activity.ActivitySubscription.length;
  const SOLD_OUT = 0;

  if (isSubscribed) {
    return (
      <ActivityItem size={BoxSize(activity.start, activity.end)} isSubscribed={isSubscribed}>
        <ActivityInfo isSubscribed={isSubscribed}>
          <h5>{activity.name}</h5>
          <h6>
            {activity.start} - {activity.end}
          </h6>
        </ActivityInfo>
        <ActivityStatus status="available" isSubscribed={isSubscribed}>
          <AiOutlineCheckCircle color="#078632" size="1.5em" />
          <br />
          <h2>{'Inscrito'}</h2>
        </ActivityStatus>
      </ActivityItem>
    );
  }

  if (availableVacancies === SOLD_OUT) {
    return (
      <ActivityItem size={BoxSize(activity.start, activity.end)} isSubscribed={isSubscribed}>
        <ActivityInfo isSubscribed={isSubscribed}>
          <h5>{activity.name}</h5>
          <h6>
            {activity.start} - {activity.end}
          </h6>
        </ActivityInfo>
        <ActivityStatus status="unavailable" isSubscribed={isSubscribed}>
          <AiOutlineCloseCircle color="#078632" size="1.5em" />
          <br />
          <h2>{'Esgotado'}</h2>
        </ActivityStatus>
      </ActivityItem>
    );
  }

  if (availableVacancies !== SOLD_OUT) {
    return (
      <ActivityItem size={BoxSize(activity.start, activity.end)} isSubscribed={isSubscribed}>
        <ActivityInfo isSubscribed={isSubscribed}>
          <h5>{activity.name}</h5>
          <h6>
            {activity.start} - {activity.end}
          </h6>
        </ActivityInfo>
        <ActivityStatus status="available" isSubscribed={isSubscribed}>
          <IoEnterOutline color="#078632" size="1.5em" />
          <br />
          <h2>{`${availableVacancies} vagas`}</h2>
        </ActivityStatus>
      </ActivityItem>
    );
  }
}

function BoxSize(startItem, endItem) {
  const start = startItem.split(':');
  const end = endItem.split(':');
  start[1] = (Number(start[1]) * 10) / 6;
  end[1] = (Number(end[1]) * 10) / 6;
  const hourDiff = Number(end[0]) + end[1] - Number(start[0]) - start[1];
  return `${hourDiff * 80}px`;
}

const ActivityStatus = styled.div`
  margin: 5px;
  border-left: 1px solid #cfcfcf;
  background: ${(props) => (props.isSubscribed ? '#D0FFDB' : '#f1f1f1')};
  width: 45px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.status === 'available' ? 'pointer' : 'not-allowed')};
  color: ${(props) => (props.status === 'available' ? '#078632' : '#CC6666')};
  h2 {
    font-size: 9px;
  }
`;

const ActivityItem = styled.div`
  margin: 10px 10px 0 10px;
  width: 90%;
  border-radius: 5px;
  justify-content: space-between;
  background: ${(props) => (props.isSubscribed ? '#D0FFDB' : '#f1f1f1')};
  display: flex;
  height: ${(props) => props.size};
`;
const ActivityInfo = styled.div`
  margin: 10px 5px;
  background: ${(props) => (props.isSubscribed ? '#D0FFDB' : '#f1f1f1')};
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
