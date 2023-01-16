import api from './api';

export async function getActivies(token, date) {
  const response = await api.get(`/activities/all/${date}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
export async function getActiviesDates(token) {
  const response = await api.get('/activities/dates', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
