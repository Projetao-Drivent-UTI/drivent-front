import api from './api';

export async function signUpWithGitHub(code) {
  const response = await api.post('/auth/github', { code });
  console.log(response);
  return response.data;
}

