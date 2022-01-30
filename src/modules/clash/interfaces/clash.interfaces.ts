export interface TeamMember {
  summonerId: string;
  teamId: string;
  position: 'FILL' | 'UTILITY' | 'TOP' | 'JUNGLE' | 'BOTTOM' | 'MIDDLE' | 'UNSELECTED';
  role: 'CAPTAIN' | 'MEMBER';
}

export interface Team {
  id: string;
  tournamentId: string;
  name: string;
  iconId: string;
  tier: string;
  captain: string;
  abbreviation: string;
  players: {
    summonerId: string;
    position: 'FILL' | 'UTILITY' | 'TOP' | 'JUNGLE' | 'BOTTOM' | 'MIDDLE' | 'UNSELECTED';
    role: 'CAPTAIN' | 'MEMBER';
  };
}
