import api from './api';

export async function getTicketPayment(token) {
  const response = await api.get('/payments', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
