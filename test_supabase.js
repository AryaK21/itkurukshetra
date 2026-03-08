import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_anon_key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runTests() {
    console.log('Testing Supabase Connection & Overlaps logic...');

    // Test overlapping logic checking
    // Assuming table kuru_jerseys is created and has at least one row or works correctly.
    const gender = 'boy';
    const jersey_number = 10;
    const sports = ['Football'];

    const { data, error } = await supabase
        .from('kuru_jerseys')
        .select('name')
        .eq('gender', gender)
        .eq('jersey_number', jersey_number)
        .overlaps('sports', sports);

    if (error) {
        console.error('Error testing overlaps query:', error);
    } else {
        console.log('Query successful. Data array:', data);
    }
}

runTests();
