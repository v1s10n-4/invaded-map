export type HighScore = {
  rank: number;
  name: string;
  score: number;
  city_count: number;
  nbShots: number;
  invaders_count: number;
  nbCity: number;
  isMe: boolean;
  isFollow: boolean;
  isFriend: boolean;
}

export type HighScoresResponse = {
  Players: HighScore[];
}