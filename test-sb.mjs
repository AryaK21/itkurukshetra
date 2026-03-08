import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nkypvoqkfjetdjabtnzp.supabase.co';
const supabaseAnonKey = 'sb_publishable_Te_lR1cH48fyJYUSMDIkMQ_Sc2v6CSq';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log('Testing Supabase ping...');
  const { data, error } = await supabase.from('kuru_jerseys').select('*').limit(1);
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Success, data:', data);
  }
}
run();
