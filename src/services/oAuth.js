import api from './api';

export async function signUpWithGitHub(code) {
  const response = await api.post('/auth/github', { code });
  return response.data;
}

