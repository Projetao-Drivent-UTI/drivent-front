import React, { useState } from 'react';
import Card from 'react-credit-cards';
import styled from 'styled-components';
import 'react-credit-cards/es/styles-compiled.css';

import { usePaymentProcess } from '../../hooks/api/usePayment';

import Typography from '@material-ui/core/Typography';

export default function CardBox({ ticketId }) {
  class PaymentForm extends React.Component {
    state = {
      cvc: '',
      expiry: '',
      focus: '',
      name: '',
      number: '',
    };
  
    handleInputFocus = (e) => {
      this.setState({ focus: e.target.name });
    };
    
    handleInputChange = (e) => {
      const { name, value } = e.target;
      
      this.setState({ [name]: value });
    };
  
    handleSubmit = e => {
      e.preventDefault();
      const formData = this.state;
      usePaymentProcess({
        ticketId: ticketId,
        cardData: formData
      });
    };
  
    render() {
      return (
        <AppPayment>
          <Card
            cvc={this.state.cvc}
            expiry={this.state.expiry}
            focused={this.state.focus}
            name={this.state.name}
            number={this.state.number}
          />
          <form ref={c => (this.form = c)}  onSubmit={this.handleSubmit}>
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
            <FormActions>
              <button className='btn btn-primary btn-block'>FINALIZAR PAGAMENTO</button>
            </FormActions>
          </form>
        </AppPayment>
      );
    }
  }
  return (
    <Box>
      <PaymentForm  />
    </Box>
  );
};

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

const CardForm = styled.form`
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
