import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(req: Request) {
    let body: { gender?: string, jersey_number?: number, sports?: string[] };
    try {
        body = await req.json();
    } catch (e: unknown) {
        console.error("JSON parse error", e);
        return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 });
    }

    try {
        const { gender, jersey_number, sports } = body;

        if (!gender || !jersey_number || !sports || !Array.isArray(sports) || sports.length === 0) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        console.log('check-availability: req body parsed:', { gender, jersey_number, sports });

        // Convert sports array to a Postgres array format for the 'overlaps' operator check
        // Actually, Supabase array overlap can be done using the `overlaps` filter
        const { data, error } = await supabase
            .from('kuru_jerseys')
            .select('name, sports')
            .eq('gender', gender)
            .eq('jersey_number', jersey_number)
            .overlaps('sports', sports) // This checks if any sport in the array matches

        if (error) {
            throw error;
        }

        if (data && data.length > 0) {
            // Find the first overlapping record
            return NextResponse.json({
                available: false,
                takenBy: data[0].name
            });
        }

        return NextResponse.json({ available: true });
    } catch (error: unknown) {
        console.error('Availability check error:', error);
        return NextResponse.json({ error: error instanceof Error ? error.message : 'Server error' }, { status: 500 });
    }
}
