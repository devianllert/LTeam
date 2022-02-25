import * as React from 'react';
import Timeago from 'timeago-react';
import { useTranslation } from 'next-i18next';

import { MatchDTO, TeamDTO } from '@/modules/riot/interfaces/match.interface';

import { Box } from '@/common/components/layout/Box';
import * as Text from '@/common/components/system/Text';

import { ItemsTable } from './components/ItemsTable';
import { PlayerPerformance } from './components/PlayerPerformance';
import { Participants } from './components/Patricipants';

import { queueId } from './constants/queueId';
import { SummonerSpells } from '../riot/interfaces/summonerSpells.interface';
import { Rune } from '../riot/interfaces/summonerRunes.interface';
import { secondRuneType } from './constants/runesType';

import { getChampionImgUrl, getSummonerSpellUrl } from '@/modules/ddragon/path';
import { getSecondRuneTypeUrl, getPositionUrl, getMainRuneImgUrl } from '@/modules/communityDragon';

export interface MatchProps {
  matchData: MatchDTO;
  summoner: string;
  summonerSpells: SummonerSpells;
  summonerRunes: Rune[];
}

export const Match = (props: MatchProps) => {
  const {
    matchData,
    summoner,
    summonerSpells,
    summonerRunes,
  } = props;

  const { i18n } = useTranslation();

  const summonerPosition = matchData.metadata.participants.findIndex((id) => id === summoner);
  const { participants } = matchData.info;
  const summonerData = participants[matchData.metadata.participants.findIndex((id) => id === summoner)];
  const runeId = summonerData.perks.styles[0].selections[0].perk;

  const summonerTeam = matchData.info.teams.find((team) => team.teamId === summonerData.teamId) ?? {} as TeamDTO;

  const getKillParticipation = () => {
    const kills = summonerData.kills + summonerData.assists;
    const KP = (kills / summonerTeam.objectives.champion.kills) * 100;
    return KP;
  };
  const getSummonerKDA = () => {
    const kills = summonerData.kills + summonerData.assists;
    const kda = kills / summonerData.deaths;
    return kda.toFixed(2);
  };

  const getMatchDuration = () => {
    const minutes = Math.trunc(matchData.info.gameDuration / 60);
    return minutes;
  };

  const getMatchType = () => {
    if (matchData.info.gameMode !== 'CLASSIC') return matchData.info.gameMode;

    return queueId[matchData.info.queueId].name;
  };

  const getWardStats = () => {
    const stealthWards = summonerData.wardsPlaced;
    const controlWards = summonerData.detectorWardsPlaced;
    const wardsDestroied = summonerData.wardsKilled;
    return `${stealthWards}/${controlWards}/${wardsDestroied}`;
  };

  const spells = Object.keys(summonerSpells.data);
  const getSpell = (spellKey: string) => {
    const summonerSpell = spells.find((spellName) => summonerSpells.data[spellName].key === spellKey);
    return summonerSpell as string;
  };

  // const getSummonerMainRuneImg = () => {
  //   const summonerRune = summonerRunes.find((rune) => rune.id === runeId);
  //   const runePath = summonerRune?.iconPath.trim().split('/').slice(3).join('/') ?? '';

  //   return `${path.mainRune}${runePath.toLocaleLowerCase()}`;
  // };
  const summonerMainRune = summonerRunes.find((rune) => rune.id === runeId)?.iconPath;

  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor={summonerData.win ? 'radix.greenA6' : 'radix.redA6'}
      borderRadius="4px"
    >
      <Box
        py={2}
        px={3}
        display="flex"
        alignItems="center"
        borderBottom="1px solid"
        borderColor="radix.grayA6"
      >

        <Text.Body variant="body3" sx={{ mr: 2 }}>{getMatchType()}</Text.Body>

        <Text.Caption variant="caption1" color="text.secondary" sx={{ mr: 2 }}>
          {`${getMatchDuration()} minutes`}
        </Text.Caption>

        <Text.Caption variant="caption1" color="text.secondary">
          <Timeago
            datetime={matchData.info.gameCreation}
            locale={i18n.language}
            live={false}
          />
        </Text.Caption>
      </Box>

      <Box
        py={2}
        px={3}
        display="flex"
      >
        <Box>
          <Text.Heading variant="h4">{summonerData.championName}</Text.Heading>

          <Box
            display="flex"
            alignItems="center"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              <Box
                width={32}
                height={32}
              >
                {(summonerData.lane !== 'NONE') && (
                  <img
                    width={32}
                    height={32}
                    alt=""
                    src={getPositionUrl(summonerData.lane.toLocaleLowerCase())}
                  />
                )}
              </Box>

              <Text.Paragraph variant="body2" sx={{ marginTop: 1, width: 52 }}>LVL {summonerData.champLevel}</Text.Paragraph>
            </Box>

            <Box
              width={64}
              height={64}
              marginLeft={2}
              marginRight={2}
            >
              <img
                width={64}
                height={64}
                alt=""
                src={getChampionImgUrl(summonerData.championName)}
              />
            </Box>

            <Box
              display="flex"
              mx={3}
            >
              <Box
                display="flex"
                flexDirection="column"
                marginRight={2}
              >
                <Box
                  width={28}
                  height={28}
                  marginBottom={1}
                  backgroundColor="black"
                >
                  {summonerData.summoner1Id && (
                    <img
                      alt=""
                      width={28}
                      height={28}
                      src={getSummonerSpellUrl(getSpell(summonerData.summoner1Id.toString()))}
                    />
                  )}
                </Box>

                <Box
                  width={28}
                  height={28}
                  backgroundColor="black"
                >
                  {summonerData.summoner2Id && (
                  <img
                    alt=""
                    width={28}
                    height={28}
                    src={getSummonerSpellUrl(getSpell(summonerData.summoner2Id.toString()))}
                  />
                  )}
                </Box>
              </Box>

              <Box
                display="flex"
                flexDirection="column"
              >
                <Box
                  width={28}
                  height={28}
                  marginBottom={1}
                >
                  {summonerMainRune && (
                    <img
                      alt=""
                      width={28}
                      height={28}
                      src={getMainRuneImgUrl(summonerMainRune)}
                    />
                  )}
                </Box>

                <Box
                  width={28}
                  height={28}
                >
                  {secondRuneType[summonerData.perks.styles[1].style] && (
                    <img
                      alt=""
                      width={28}
                      height={28}
                      src={getSecondRuneTypeUrl(secondRuneType[summonerData.perks.styles[1].style] as string)}
                    />
                  )}
                </Box>
              </Box>
            </Box>

            <ItemsTable
              items={[
                summonerData.item0,
                summonerData.item1,
                summonerData.item2,
                summonerData.item3,
                summonerData.item4,
                summonerData.item5,
              ]}
            />

            <Box
              marginLeft={3}
            >
              <PlayerPerformance
                gold={summonerData.goldEarned}
                damage={summonerData.totalDamageDealtToChampions}
              />
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              marginLeft={3}
            >
              <Text.Paragraph
                variant="body2"
                textAlign="center"
                sx={{ width: 80 }}
              >
                {`${summonerData.kills}/${summonerData.deaths}/${summonerData.assists}`}
              </Text.Paragraph>

              <Text.Paragraph
                variant="body2"
                textAlign="center"
                sx={{ width: 80 }}
              >
                {`${getSummonerKDA()} KDA`}
              </Text.Paragraph>
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              marginLeft={3}
            >
              <Text.Paragraph
                variant="body2"
                textAlign="center"
                sx={{ width: 100 }}
              >
                {`${summonerData.totalMinionsKilled} (${(summonerData.totalMinionsKilled / getMatchDuration()).toFixed(1)}) CS`}
              </Text.Paragraph>

              {summonerData.challenges?.laneMinionsFirst10Minutes && (
              <Text.Paragraph
                variant="body2"
                textAlign="center"
                sx={{ width: 160 }}
              >
                {`${summonerData.challenges.laneMinionsFirst10Minutes} per lane stage`}
              </Text.Paragraph>
              )}
            </Box>

            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              marginLeft={3}
            >
              <Text.Paragraph
                variant="body2"
                textAlign="center"
                sx={{ width: 100 }}
              >
                {`${getKillParticipation().toFixed(2)}% KP`}
              </Text.Paragraph>

              <Text.Paragraph
                variant="body2"
                textAlign="center"
                sx={{ width: 160 }}
              >
                {getWardStats()}
              </Text.Paragraph>
            </Box>
          </Box>
        </Box>

        <Box
          marginLeft="auto"
        >
          <Participants
            participants={participants}
            summonerPosition={summonerPosition}
          />
        </Box>
      </Box>
    </Box>
  );
};
