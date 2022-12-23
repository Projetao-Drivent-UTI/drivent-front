import { useEffect } from 'react';
import PaymentInfo from '../../../components/PaymentInfo';
import Tickets from '../../../components/Tickets/Tickets';

export default function Payment() {
  return (
    <>
      <Tickets />
      <PaymentInfo />
    </>
  );
}
