/**
 * Champion free rotation response object
 */
export interface ChampionRotationDTO {
  /**
   * Champions id list for new players
   */
  freeChampionIdsForNewPlayers: number[];

  /**
   * Champions id list
   */
  freeChampionIds: number[];

  /**
   * Max level to get new players rotation
   */
  maxNewPlayerLevel: number[];
}
