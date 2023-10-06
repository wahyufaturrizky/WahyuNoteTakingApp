import {SignInWithPasswordCredentials} from '@supabase/supabase-js';
import {useMutation} from '@tanstack/react-query';
import {supabase} from '../client';

function useSignIn({options}: {options: any}) {
  return useMutation(
    (data: SignInWithPasswordCredentials) =>
      supabase.auth.signInWithPassword(data),
    {
      ...options,
    },
  );
}

export {useSignIn};
