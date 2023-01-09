import api from './api';

export async function getActivies(token) {
  const response = await api.get('/activies', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
