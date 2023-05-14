import axios, { AxiosResponse, type AxiosInstance } from "axios";
import { APIOptions, Gamemode, Mods, Score } from "./types/v1";
import { Score as RawScore } from "./types/v1/raw";

export class osuAPI {
  private _options: APIOptions;
  private _instance: AxiosInstance;

  constructor(options: APIOptions) {
    this._options = options;
    this._instance = axios.create({
      baseURL: "https://osu.ppy.sh/api",
      params: {
        k: options.key,
      },
    });
  }

  private _isNumeric(value: string) {
    return /^-?\d+$/.test(value);
  }

  private _convertScore(score: RawScore): Score {
    return {
      id: score.score_id,
      score: parseInt(score.score),
      maxCombo: parseInt(score.maxcombo),
      "50": parseInt(score.count50),
      "100": parseInt(score.count100),
      "300": parseInt(score.count300),
      miss: parseInt(score.countmiss),
      katu: parseInt(score.countkatu),
      geki: parseInt(score.countgeki),
      perfect: score.perfect === "1" ? true : false,
      mods: parseInt(score.enabled_mods),
      username: score.username,
      userId: score.user_id,
      date: new Date(score.date),
      rank: score.rank,
      pp: score.pp ? parseFloat(score.pp) : undefined,
      replayAvailable: score.replay_available === "1" ? true : false,
    };
  }

  /**
   * Retrieve information about the top 100 scores of a specified beatmap.
   * @link https://github.com/ppy/osu-api/wiki#apiget_scores
   */
  public async getScores(
    beatmapId: string,
    options?: {
      user?: string;
      mode?: Gamemode;
      mods?: Mods;
      limit?: number;
    }
  ): Promise<Score[]> {
    let type: "string" | "id" | undefined;
    if (options && options.user) {
      if (!this._isNumeric(options.user)) type = "string";
      else type = "id";
    }

    const res = await this._instance.get<any, AxiosResponse<RawScore[]>>(
      "/get_scores",
      {
        params: {
          b: beatmapId,
          u: options?.user,
          m: options?.mode,
          type,
          limit: options?.limit,
        },
      }
    );

    return res.data.map((score) => ({
      ...this._convertScore(score),
    }));
  }

  /**
   * Get the top scores for the specified `user`.
   * @link https://github.com/ppy/osu-api/wiki#apiget_user_best
   */
  public async getUserBest(
    user: string,
    mode: Gamemode,
    limit?: number
  ): Promise<(Score & { beatmapId: string })[]> {
    let type: "string" | "id" = "id";
    if (!this._isNumeric(user)) type = "string";

    const res = await this._instance.get<
      any,
      AxiosResponse<(RawScore & { beatmap_id: string })[]>
    >("/get_user_best", {
      params: {
        u: user,
        m: mode,
        limit,
        type,
      },
    });

    return res.data.map((score) => ({
      beatmapId: score.beatmap_id,
      ...this._convertScore(score),
    }));
  }

  /**
   * Gets the `user`'s ten most recent plays over the last 24 hours.
   * @link https://github.com/ppy/osu-api/wiki#apiget_user_recent
   */
  public async getUserRecent(
    user: string,
    mode: Gamemode,
    limit?: number
  ): Promise<(Score & { beatmapId: string })[]> {
    let type: "string" | "id" = "id";
    if (!this._isNumeric(user)) type = "string";

    const res = await this._instance.get<
      any,
      AxiosResponse<(RawScore & { beatmap_id: string })[]>
    >("/get_user_recent", {
      params: {
        u: user,
        m: mode,
        limit,
        type,
      },
    });

    return res.data.map((score) => ({
      beatmapId: score.beatmap_id,
      ...this._convertScore(score),
    }));
  }

  public get options() {
    return this._options;
  }

  public get raw() {
    return this._instance;
  }
}
