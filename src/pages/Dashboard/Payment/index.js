import { useEffect, useState } from 'react';
import PaymentInfo from '../../../components/PaymentInfo';
import NoEnrollment from '../../../components/PaymentInfo/NoEnrollment';
import useEnrollment from '../../../hooks/api/useEnrollment';

export default function Payment() {
  return (
    <PaymentInfo />
  );
};
