import React from 'react';
import Card from 'react-credit-cards';
import Payment from 'payment';
import styled from 'styled-components';
import 'react-credit-cards/es/styles-compiled.css';

import Typography from '@material-ui/core/Typography';

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

export default class PaymentForm extends React.Component {
    state = {
      number: '',
      name: '',
      expiry: '',
      cvc: '',
      issuer: '',
      focused: '',
      formData: null
    };
  
    handleCallback = ({ issuer }, isValid) => {
      if (isValid) {
        this.setState({ issuer });
      }
    };
  
    handleInputFocus = ({ target }) => {
      this.setState({
        focused: target.name
      });
    };
  
    handleInputChange = ({ target }) => {
      if (target.name === 'number') {
        target.value = formatCreditCardNumber(target.value);
      } else if (target.name === 'expiry') {
        target.value = formatExpirationDate(target.value);
      } else if (target.name === 'cvc') {
        target.value = formatCVC(target.value);
      }
  
      this.setState({ [target.name]: target.value });
    };
  
    handleSubmit = e => {
      e.preventDefault();
      const { issuer } = this.state;
      const formData = [...e.target.elements]
        .filter(d => d.name)
        .reduce((acc, d) => {
          acc[d.name] = d.value;
          return acc;
        }, {});
  
      this.setState({ formData });
      this.form.reset();
    };
  
    render() {
      const { name, number, expiry, cvc, focused, issuer, formData } = this.state;
  
      return (
        <div key='Payment'>
          <AppPayment>
            <Card
              number={number}
              name={name}
              expiry={expiry}
              cvc={cvc}
              focused={focused}
              callback={this.handleCallback}
            />
            <CardForm ref={c => (this.form = c)} onSubmit={this.handleSubmit}>
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
              <input type='hidden' name='issuer' value={issuer} />
              <FormActions>
                <button className='btn btn-primary btn-block'>FINALIZAR PAGAMENTO</button>
              </FormActions>
            </CardForm>
            {formData && (
              <AppHighlight>
                {formatFormData(formData).map((d, i) => (
                  <div key={i}>{d}</div>
                ))}
              </AppHighlight>
            )}
            
          </AppPayment>
        </div>
      );
    }
}

const AppPayment = styled.div`
    display: flex;
    position: relative;
    height: 200px;
    align-items: center;
`;

const AppHighlight =styled.div`
  margin: 15px auto 30px;
  max-width: 300px;

  > div {
    padding-left: 40px;
  }
`;

const CardForm = styled.form`
  margin: auto 30px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;

  > input {
    max-width: 300px;
  }
`;

const StyledTypography = styled(Typography)`
  margin-top: 3px!important;
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
`;

