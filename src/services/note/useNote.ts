import {SignInWithPasswordCredentials} from '@supabase/supabase-js';
import {useMutation, useQuery} from '@tanstack/react-query';
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

function useCreateNote({options}: {options: any}) {
  return useMutation(
    data => supabase.from('note').insert(data).select() as any,
    {
      ...options,
    },
  );
}

const fetchNote = async ({query = {}}) =>
  supabase
    .from('note')
    .select('*')
    .then(data => data);

const useNoteList = ({query = {}, options}: any) =>
  useQuery(['note-list', query], () => fetchNote({query}), {
    ...options,
  });

const fetchNoteDetail = async ({id}: {id: string}) => {
  return supabase
    .from('note')
    .select('*')
    .eq('id', id)
    .then(data => data);
};

const useNoteDetail = ({id, options}: {id: string; options: any}) =>
  useQuery(['note-detail', id], () => fetchNoteDetail({id}), {
    ...options,
  });

function useUpdateNote({id, options}: {id: string; options: any}) {
  return useMutation(
    (data: any) =>
      supabase
        .from('note')
        .update({...data, updated_at: new Date()})
        .eq('id', id)
        .select() as any,
    {
      ...options,
    },
  );
}

const useDeleteNote = ({options}: {options: any}) =>
  useMutation(
    (data: any) => supabase.from('note').delete().eq('id', data.id) as any,
    {
      ...options,
    },
  );

export {
  useSignIn,
  useCreateNote,
  useNoteList,
  useNoteDetail,
  useUpdateNote,
  useDeleteNote,
};
