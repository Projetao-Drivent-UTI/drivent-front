import useAsync from '../useAsync';

import * as oAuth from '../../services/oAuth';

export default function useOAuth() {
  const {
    loading: oAuthLoading,
    error: oAuthError,
    act: oAuthSignIn
  } = useAsync(oAuth.signUpWithGitHub, false);

  return {
    oAuthLoading,
    oAuthError,
    oAuthSignIn
  };
}
