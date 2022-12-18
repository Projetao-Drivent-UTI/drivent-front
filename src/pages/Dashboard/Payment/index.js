import styled from 'styled-components';

export default function Payment() {
  return (
    <Container>
      <h1>Ingreso e Pagamento</h1>
      <h3>Primeiro, escolha sua modalidade de ingresso</h3>
      <TypesTicket>
        <button>
          <h5>Presencial</h5>
          <h6>R$ 250</h6>
        </button>
        <button>
          <h5>Online</h5>
          <h6>R$ 100</h6>
        </button>
      </TypesTicket>
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

const TypesTicket = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  button{
    width: 145px;
    height: 145px;
    border: 1px solid #CECECE;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-right: 25px;
    h5{
      width: 80px;
      font-family: 'Roboto';
      font-weight: 400;
      font-size: 16px;
      text-align: center;
      color: #454545;
    }
    h6{
      font-family: 'Roboto';
      font-weight: 400;
      font-size: 14px;
      line-height: 16px;
      color: #898989;
    }
  }
`;
