import styled from 'styled-components';

export default function TicketBox( { userTicket } ) {
  if (Object.keys(userTicket).length === 0) {
    return (<></>);
  };
  return (
    <Box>
      <>
        <h1>{userTicket.TicketType.isRemote?'Online':userTicket.TicketType.includesHotel?'Presencial + Com Hotel':'Presencial + Sem Hotel'}</h1>
        <h2>R${userTicket.TicketType.price}</h2>
      </>
    </Box>
  );
}

const Box = styled.div`
margin-bottom: 20px;
width: 290px!important;
height: 108px!important;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background-color: #FFEED2;
border-radius: 20px;

  h1 {
    font-size: 16px;
    text-align: center;
    color: #454545;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
  h2 {
    margin-top: 8px;
    font-size: 14px;
    text-align: center;
    color:#898989;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  } 
`;
