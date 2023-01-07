import React, { useEffect, useState } from 'react';
import Payment from 'payment';
import Card from 'react-credit-cards';
import styled from 'styled-components';
import 'react-credit-cards/es/styles-compiled.css';

import usePaymentProcess  from '../../hooks/api/usePayment';

import Typography from '@material-ui/core/Typography';

export default function CardBox({ formData, setFormData, ticket }) {  
  const sendPaymentInfo = async values => {
    console.log(values);
    const res = usePaymentProcess({
      ticketId: ticket.id,
      cardData: values
    });
    const data = await res.json();
    return data;
  };
  class PaymentForm extends React.Component {
    state = {
      cvc: '',
      expiry: '',
      focus: '',
      issuer: '',
      name: '',
      number: ''
    };
  
    handleInputFocus = (e) => {
      this.setState({ focus: e.target.name });
    };
    
    handleInputChange = (e) => {
      const { name, value } = e.target;
      if (e.target.name === 'number') {
        e.target.value = formatCreditCardNumber(e.target.value);
      } else if (e.target.name === 'expiry') {
        e.target.value = formatExpirationDate(e.target.value);
      } else if (e.target.name === 'cvc') {
        e.target.value = formatCVC(e.target.value);
      }
      this.setState({ [name]: value });
    };

    handleCallback = ({ issuer }, isValid) => {
      if (isValid) {
        this.setState({ issuer });
      }
    };
  
    render() {
      const { name, number, expiry, cvc, issuer, formData, setForm } = this.state;
      return (
        <AppPayment>
          <Card
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
            callback={this.handleCallback}
          />
          <form>
            <CardForm>
              <FormGroup>
                <input
                  type='tel'
                  name='number'
                  className='form-control'
                  placeholder='Card Number'
                  pattern='[\d| ]{16,22}'
                  required
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
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
                  onChange={this.handleInputChange}
                  onFocus={this.handleInputFocus}
                />
              </FormGroup>
              <Row>
                <div className='col-6'>
                  <input
                    type='tel'
                    name='expiry'
                    className='form-control'
                    placeholder='Valid Thru'
                    pattern='\d\d/\d\d'
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
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
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
              </Row>
            </CardForm>
            <input type='hidden' name='issuer' value={issuer} />
            <FormActions>
              <button onClick={() => {
                const { name, number, expiry, cvc, issuer, formData, setForm } = this.state;
                sendPaymentInfo({ cvc, expiry, issuer, name, number });
              }}>FINALIZAR PAGAMENTO</button>
            </FormActions>
          </form>
        </AppPayment>
      );
    }
  }
  return (
    <Box>
      <PaymentForm  formData={formData} />
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

function formatFormData(data) {
  return Object.keys(data).map(d => `${d}: ${data[d]}`);
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
