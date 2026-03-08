import { supabase } from '@/lib/supabase';
import DashboardClient from '@/components/DashboardClient';
import { SPORTS_DATA } from '@/data/sports';

export const revalidate = 0; // Disable static caching so roster updates instantly

export default async function Home() {
  // Fetch live players from Supabase
  const { data: players, error } = await supabase
    .from('kuru_jerseys')
    .select('name, gender, jersey_number, sports');

  if (error) {
    console.error('Failed to fetch live roster:', error);
  }

  // Hydrate SPORTS_DATA with the live players
  const hydratedSportsData = SPORTS_DATA.map((sport) => {
    // Find all players who registered for this specific sport
    const sportPlayers = (players || [])
      .filter((p) => p.sports && p.sports.includes(sport.name))
      .map((p) => `${p.name} #${p.jersey_number}`);

    return {
      ...sport,
      players: sportPlayers
    };
  });

  return <DashboardClient sportsData={hydratedSportsData} />;
}
