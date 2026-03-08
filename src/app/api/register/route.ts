import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    let body: { name?: string, gender?: string, jersey_number?: number, sports?: string[] };
    try {
        body = await req.json();
    } catch (e: unknown) {
        console.error("JSON parse error", e);
        return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
    }

    try {
        const { name, gender, jersey_number, sports } = body;

        if (!name || !gender || !jersey_number || !sports || !Array.isArray(sports) || sports.length === 0) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        console.log('register: req body parsed:', { name, gender, jersey_number, sports });

        // Double check availability before inserting
        // A user cannot have the same jersey number IF they are the same gender AND share at least one sport.
        const { data: existingData, error: checkError } = await supabase
            .from('kuru_jerseys')
            .select('name')
            .eq('gender', gender)
            .eq('jersey_number', jersey_number)
            .overlaps('sports', sports);

        if (checkError) throw checkError;

        if (existingData && existingData.length > 0) {
            return NextResponse.json({
                error: `Conflict: Number ${jersey_number} is already taken by ${existingData[0].name} for an overlapping sport.`
            }, { status: 409 });
        }

        // Insert user
        const { data, error } = await supabase
            .from('kuru_jerseys')
            .insert([
                { name, gender, jersey_number, sports }
            ])
            .select();

        if (error) throw error;

        return NextResponse.json({ success: true, user: data[0] });
    } catch (error: unknown) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Server error' }, { status: 500 });
    }
}
