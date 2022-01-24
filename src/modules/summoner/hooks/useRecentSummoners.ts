import * as React from 'react';
import createPersistedState from 'use-persisted-state';

import { RecentSummoner } from '../interfaces/summoner.interface';

const useRecentSummonersState = createPersistedState('recent-summoners');
const useFavoriteSummonersState = createPersistedState('favorite-summoners');

export const useRecentSummoners = () => {
  const [recentSummoners, setRecentSummoners] = useRecentSummonersState<RecentSummoner[]>([]);
  const [favoriteSummoners, setFavoriteSummoners] = useFavoriteSummonersState<RecentSummoner[]>([]);

  const addRecentSummoner = React.useCallback((newSummoner: RecentSummoner) => {
    if (recentSummoners.some((summoner) => summoner.id === newSummoner.id)) return;
    if (favoriteSummoners.some((summoner) => summoner.id === newSummoner.id)) return;

    setRecentSummoners((prevSummoners) => [
      newSummoner,
      ...(prevSummoners.length >= 5
        ? prevSummoners.slice(0, prevSummoners.length - 1)
        : prevSummoners
      ),
    ]);
  }, [favoriteSummoners, recentSummoners, setRecentSummoners]);

  const deleteRecentSummoner = React.useCallback((id: string) => {
    const filtredRecentSummoners = recentSummoners.filter((summoner) => summoner.id !== id);
    setRecentSummoners(filtredRecentSummoners);
  }, [recentSummoners, setRecentSummoners]);

  const addFavoriteSummoner = React.useCallback((newSummoner: RecentSummoner) => {
    if (favoriteSummoners.some((summoner) => summoner.id === newSummoner.id)) return;

    deleteRecentSummoner(newSummoner.id);

    setFavoriteSummoners((prevSummoners) => [
      newSummoner,
      ...prevSummoners,
    ]);
  }, [favoriteSummoners, setFavoriteSummoners, deleteRecentSummoner]);

  const deleteFavoriteSummoner = React.useCallback((id: string) => {
    const filtredFavoriteSummoners = favoriteSummoners.filter((summoner) => summoner.id !== id);
    setFavoriteSummoners(filtredFavoriteSummoners);
  }, [favoriteSummoners, setFavoriteSummoners]);

  return {
    recent: recentSummoners,
    favorites: favoriteSummoners,
    addRecentSummoner,
    addFavoriteSummoner,
    deleteRecentSummoner,
    deleteFavoriteSummoner,
  } as const;
};
