import React, { useEffect, useState } from 'react';
import Payment from 'payment';
import Card from 'react-credit-cards';
import styled from 'styled-components';
import 'react-credit-cards/es/styles-compiled.css';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

import useSavePaymentProcess from '../../hooks/api/useSavePaymentProcess';

export default function CardBox({ ticket, setBody }) {  
  const [cardData, setCardData]= useState({
    cvc: '',
    expiry: '',
    focus: '',
    issuer: '',
    name: '',
    number: '',
  });

  function handleInputChange(e) {
    let { name, value } = e.target;
    if (name === 'number') {
      value = formatCreditCardNumber(value);
    } else if (name === 'expiry') {
      value = formatExpirationDate(value);
    } else if (name === 'cvc') {
      value = formatCVC(value);
    }
    setCardData({ ...cardData, [name]: value });
  };
  
  function handleInputFocus(e) {
    setCardData({ ...cardData, focus: e.target.name });
  };

  function handleSubmit(e) {
    e.preventDefault();
    const body = {
      ticketId: ticket.id,
      cardData: cardData
    };
    setBody(body);
    //e.target.reset();
  };
  
  return (
    <Box>
      <AppPayment>
        <Card
          cvc={cardData.cvc}
          expiry={cardData.expiry}
          focused={cardData.focus}
          name={cardData.name}
          number={cardData.number}
        />
        <form onSubmit={handleSubmit}>
          <CardForm>
            <FormGroup>
              <input
                type='tel'
                name='number'
                className='form-control'
                placeholder='Card Number'
                pattern='[\d| ]{16,22}'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              <StyledTypography variant='body2' color='textSecondary'>E.g.: 49..., 51..., 36..., 37...</StyledTypography>
            </FormGroup>
            <FormGroup>
              <input
                type='text'
                name='name'
                className='form-control'
                placeholder='Name'
                required
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
            </FormGroup>
            <Row>
              <div className='col-6'>
                <input
                  type='tel'
                  name='expiry'
                  className='form-control'
                  placeholder='Valid Thru'
                  pattern='\d\d\d\d'
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className='col-6'>
                <input
                  type='tel'
                  name='cvc'
                  className='form-control'
                  placeholder='CVC'
                  pattern='\d{3,4}'
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
            </Row>
          </CardForm>
          <input type='hidden' name='issuer' value={cardData.issuer} />
          <FormActions>
            <button>FINALIZAR PAGAMENTO</button>
          </FormActions>
        </form>
      </AppPayment>
    </Box>
  );
};

function clearNumber(value = '') {
  return value.replace(/\D+/g, '');
}

function formatCreditCardNumber(value) {
  if (!value) {
    return value;
  }
  const issuer = Payment.fns.cardType(value);
  const clearValue = clearNumber(value);
  let nextValue;

  switch (issuer) {
  case 'amex':
    nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
      4,
      10
    )} ${clearValue.slice(10, 15)}`;
    break;
  case 'dinersclub':
    nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
      4,
      10
    )} ${clearValue.slice(10, 14)}`;
    break;
  default:
    nextValue = `${clearValue.slice(0, 4)} ${clearValue.slice(
      4,
      8
    )} ${clearValue.slice(8, 12)} ${clearValue.slice(12, 19)}`;
    break;
  }

  return nextValue.trim();
}
function formatCVC(value, prevValue, allValues = {}) {
  const clearValue = clearNumber(value);
  let maxLength = 4;

  if (allValues.number) {
    const issuer = Payment.fns.cardType(allValues.number);
    maxLength = issuer === 'amex' ? 4 : 3;
  }

  return clearValue.slice(0, maxLength);
}

function formatExpirationDate(value) {
  const clearValue = clearNumber(value);

  if (clearValue.length >= 3) {
    return `${clearValue.slice(0, 2)}/${clearValue.slice(2, 4)}`;
  }

  return clearValue;
}

const AppPayment = styled.div`
    display: flex;
    position: relative;
    height: 200px;
    align-items: center;
    justify-content: center;
`;

const FormActions = styled.div`
    position: absolute;
    top:220px;
    left: 0;

    button{
        background-color: #E0E0E0;
        width: 182px;
        height: 40px;
        border:none;
        border-radius: 10px;
        box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.25);
    }
    button:hover{
          cursor: pointer;
        }
`;
const Row = styled.div`
  display:flex;
  width: 300px;
  margin: auto;
  justify-content: space-between;
  input {
    border: 1px solid #8E8E8E;
    height: 40px;
    width: 140px;
    border-radius: 5px;
  }
`;

const CardForm = styled.div`
  margin: auto auto auto 20px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;

  > input {
    max-width: 300px;
  }
`;

const FormGroup = styled.div`
display:inline;
max-width: 400px;
margin: auto;
input {
    border: 1px solid #8E8E8E;
    border-radius: 5px;
    height: 40px;
    width: 300px;
    margin-bottom: 1px;
  }
`;

const StyledTypography = styled(Typography)`
  margin-top: 3px!important;
`;

const Box = styled.div`
  display:flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;
