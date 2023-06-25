import { createClient } from '@supabase/supabase-js'
import 'react-native-url-polyfill/auto';

const supabaseUrl = "https://qebnmxnfniqfbjrbkwpx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFlYm5teG5mbmlxZmJqcmJrd3B4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2MjczNjMsImV4cCI6MTk5MDIwMzM2M30.msNmZJ4EBF1vjHb2aDfIIhZKtRBKiAGiiqrGNaKumTE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        persistSession: false
    }
})