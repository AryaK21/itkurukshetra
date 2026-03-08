import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nkypvoqkfjetdjabtnzp.supabase.co';
const supabaseAnonKey = 'sb_publishable_Te_lR1cH48fyJYUSMDIkMQ_Sc2v6CSq';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function run() {
  console.log('Clearing old test data...');
  const { error } = await supabase.from('kuru_jerseys').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  if (error) console.error(error);
  console.log('Done clearing.');
}
run();
