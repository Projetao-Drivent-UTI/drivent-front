import styled from 'styled-components';
import PaymentForm from './CardRender';

export default function CardBox( ) {
  return (
    <Box>
      <PaymentForm></PaymentForm>
    </Box>
  );
};

const Box = styled.div`
  display:flex;
  align-items: flex-start;
  margin-bottom: 20px;
`;
