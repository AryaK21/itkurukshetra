import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nkypvoqkfjetdjabtnzp.supabase.co';
const supabaseAnonKey = 'sb_publishable_Te_lR1cH48fyJYUSMDIkMQ_Sc2v6CSq';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log('Testing Overlaps Logic...');
  const { data, error } = await supabase.from('kuru_jerseys').select('*').eq('gender', 'girl').eq('jersey_number', 10).overlaps('sports', ['Football']);
  console.log('Data:', data);
  if (error) console.error(error);
}
run();
