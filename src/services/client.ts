import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createClient} from '@supabase/supabase-js';

const supabaseUrl: string | undefined = process.env.API_SUPABASE_URL;
const supabaseAnonKey: string | undefined = process.env.API_SUPABASE_ANON_KEY;

export const supabase = createClient(
  String(supabaseUrl),
  String(supabaseAnonKey),
  {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  },
);
