import { useEffect, useState } from 'react';
import PaymentInfo from '../../../components/PaymentInfo';
<<<<<<< HEAD
import NoEnrollment from '../../../components/PaymentInfo/NoEnrollment';
import useEnrollment from '../../../hooks/api/useEnrollment';
=======
import Tickets from '../../../components/Tickets/Tickets';
>>>>>>> main

export default function Payment() {
  return (
    <>
      <Tickets />
      <PaymentInfo />
    </>
  );
}
