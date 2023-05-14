import { Country, Gamemode, Mods, Rank } from "./raw";

export interface APIOptions {
  key: string;
}

export interface Score {
  id: string | null;
  score: number;
  maxCombo: number;
  "50": number;
  "100": number;
  "300": number;
  miss: number;
  katu: number;
  geki: number;
  /**
   * 1 = maximum combo of map reached, 0 otherwise
   */
  perfect: boolean;
  /**
   * bitwise flag representation of mods used.
   * @see https://github.com/ppy/osu-api/wiki#mods
   */
  mods: Mods;
  username?: string;
  userId: string;
  date: Date;
  rank: Rank;
  /**
   * Float value , 4 decimals
   */
  pp?: number;
  replayAvailable?: boolean;
}

export interface Event {
  html: string;
  beatmapId: string;
  beatmapsetId: string;
  /**
   * In UTC
   */
  date: string;
  /**
   * How "epic" this event is (between 1 and 32)
   */
  epicFactor: string;
}

/**
 * @link https://github.com/ppy/osu-api/wiki#response-1
 */
export interface User {
  id: string;
  username: string;
  /**
   * In UTC
   */
  join_date: string;
  /**
   * Total amount for all ranked, approved, and loved beatmaps played
   */
  "300": string;
  /**
   * Total amount for all ranked, approved, and loved beatmaps played
   */
  "100": string;
  /**
   * Total amount for all ranked, approved, and loved beatmaps played
   */
  "50": string;
  /**
   * Only counts ranked, approved, and loved beatmaps
   */
  playcount: string;
  /**
   * Counts the best individual score on each ranked, approved, and loved beatmaps
   */
  rankedScore: string;
  /**
   * Counts every score on ranked, approved, and loved beatmaps
   */
  totalScore: string;
  rank: string;
  level: string;
  /**
   * For inactive players this will be 0 to purge them from leaderboards
   */
  rawPp: string;
  accuracy: string;
  /**
   * Counts for SS ranks on maps
   */
  ss: string;
  /**
   * Counts for SSH ranks on maps
   */
  ssh: string;
  /**
   * Counts for S ranks on maps
   */
  s: string;
  /**
   * Counts for SH ranks on maps
   */
  sh: string;
  /**
   * Counts for SA ranks on maps
   */
  a: string;
  /**
   * Uses the ISO3166-1 alpha-2 country code naming.
   * @link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  country: Country;
  totalSecondsPlayed: string;
  /**
   * The user's rank in the country.
   */
  countryRank: string;
  /**
   * Contains events for this user
   */
  events: Event[];
}

export { Gamemode, Mods, Rank };
