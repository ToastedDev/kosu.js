import { countries } from "../../countries";

export enum Gamemode {
  Standard,
  Taiko,
  CatchTheBeat,
  Mania,
}

/**
 * @link https://github.com/ppy/osu-api/wiki#mods
 */
export enum Mods {
  None = 0,
  NoFail = 1,
  Easy = 2,
  TouchDevice = 4,
  Hidden = 8,
  HardRock = 16,
  SuddenDeath = 32,
  DoubleTime = 64,
  Relax = 128,
  HalfTime = 256,
  /**
   * Only set along with DoubleTime. i.e: NC only gives 576
   */
  Nightcore = 512,
  Flashlight = 1024,
  Autoplay = 2048,
  SpunOut = 4096,
  /**
   * Autopilot
   */
  Relax2 = 8192,
  /**
   * Only set along with SuddenDeath. i.e: PF only gives 16416
   */
  Perfect = 16384,
  Key4 = 32768,
  Key5 = 65536,
  Key6 = 131072,
  Key7 = 262144,
  Key8 = 524288,
  FadeIn = 1048576,
  Random = 2097152,
  Cinema = 4194304,
  Target = 8388608,
  Key9 = 16777216,
  KeyCoop = 33554432,
  Key1 = 67108864,
  Key3 = 134217728,
  Key2 = 268435456,
  ScoreV2 = 536870912,
  Mirror = 1073741824,
  KeyMod = Key1 |
    Key2 |
    Key3 |
    Key4 |
    Key5 |
    Key6 |
    Key7 |
    Key8 |
    Key9 |
    KeyCoop,
  FreeModAllowed = NoFail |
    Easy |
    Hidden |
    HardRock |
    SuddenDeath |
    Flashlight |
    FadeIn |
    Relax |
    Relax2 |
    SpunOut |
    KeyMod,
  ScoreIncreaseMods = Hidden | HardRock | DoubleTime | Flashlight | FadeIn,
}

export type Rank = "X" | "XH" | "S" | "SH" | "A" | "B" | "C" | "D" | "F";

/**
 * Uses the ISO3166-1 alpha-2 country code naming.
 * @link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
 */
export type Country = (typeof countries)[number]["code"];

/**
 * @link https://github.com/ppy/osu-api/wiki#response-2
 */
export interface Score {
  score_id: string | null;
  score: string;
  maxcombo: string;
  count50: string;
  count100: string;
  count300: string;
  countmiss: string;
  countkatu: string;
  countgeki: string;
  perfect: "0" | "1";
  enabled_mods: string;
  username?: string;
  user_id: string;
  date: string;
  rank: Rank;
  pp?: string;
  replay_available?: "0" | "1";
}

export interface Event {
  display_html: string;
  beatmap_id: string;
  beatmapset_id: string;
  /**
   * In UTC
   */
  date: string;
  /**
   * How "epic" this event is (between 1 and 32)
   */
  epicfactor: string;
}

/**
 * @link https://github.com/ppy/osu-api/wiki#response-1
 */
export interface User {
  user_id: string;
  username: string;
  /**
   * In UTC
   */
  join_date: string;
  /**
   * Total amount for all ranked, approved, and loved beatmaps played
   */
  count300: string;
  /**
   * Total amount for all ranked, approved, and loved beatmaps played
   */
  count100: string;
  /**
   * Total amount for all ranked, approved, and loved beatmaps played
   */
  count50: string;
  /**
   * Only counts ranked, approved, and loved beatmaps
   */
  playcount: string;
  /**
   * Counts the best individual score on each ranked, approved, and loved beatmaps
   */
  ranked_score: string;
  /**
   * Counts every score on ranked, approved, and loved beatmaps
   */
  total_score: string;
  pp_rank: string;
  level: string;
  /**
   * For inactive players this will be 0 to purge them from leaderboards
   */
  pp_raw: string;
  accuracy: string;
  /**
   * Counts for SS ranks on maps
   */
  count_rank_ss: string;
  /**
   * Counts for SSH ranks on maps
   */
  count_rank_ssh: string;
  /**
   * Counts for S ranks on maps
   */
  count_rank_s: string;
  /**
   * Counts for SH ranks on maps
   */
  count_rank_sh: string;
  /**
   * Counts for SA ranks on maps
   */
  count_rank_a: string;
  /**
   * Uses the ISO3166-1 alpha-2 country code naming.
   * @link https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
   */
  country: Country;
  total_seconds_played: string;
  /**
   * The user's rank in the country.
   */
  pp_country_rank: string;
  /**
   * Contains events for this user
   */
  events: Event[];
}
