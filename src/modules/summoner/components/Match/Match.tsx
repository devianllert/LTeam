import * as React from 'react';
import { useRouter } from 'next/router';

import { match } from 'assert';
import { MatchDTO, ParticipantDTO, TeamDTO } from '@/modules/riot/interfaces/match.interface';

import { Box } from '@/common/components/system/Box';
import * as Text from '@/common/components/system/Text';

import { ItemsTable } from './components/ItemsTable';
import { PlayerPerformance } from './components/PlayerPerformance';
import { Participants } from './components/Patricipants';

import { queueId } from './constants/queueId';

export interface MatchProps {
  matchData: MatchDTO;
  summoner: string;
}

export const Match = (props: MatchProps) => {
  const { matchData, summoner } = props;
  const router = useRouter();

  const summonerPosition = matchData.metadata.participants.findIndex((id) => id === summoner);
  const { participants } = matchData.info;

  const summonerTeam = matchData.info.teams.find((team) => team.teamId === participants[summonerPosition].teamId) ?? {} as TeamDTO;

  const getKillParticipation = () => {
    const kills = participants[summonerPosition].kills + participants[summonerPosition].assists;
    const KP = (kills / summonerTeam.objectives.champion.kills) * 100;
    return KP;
  };

  const getMatchDuration = () => {
    const minutes = Math.trunc(matchData.info.gameDuration / 60);
    const seconds = matchData.info.gameDuration % 60;
    return `${minutes} min ${seconds} sec`;
  };

  const getMatchStartedAt = () => {
    const date = new Date(matchData.info.gameCreation);
    const formatDate = new Intl.DateTimeFormat('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    return formatDate.format(date);
  };

  const getMatchType = () => {
    if (matchData.info.gameMode !== 'CLASSIC') return matchData.info.gameMode;

    return queueId[matchData.info.queueId].name;
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      backgroundColor={participants[summonerPosition].win ? 'radix.greenA6' : 'radix.redA6'}
      padding={3}
      borderRadius="4px"
    >
      <Box
        position="relative"
        display="flex"
        flexDirection="column"
      >
        <Text.Heading variant="h4" sx={{ position: 'absolute' }}>{participants[summonerPosition].championName}</Text.Heading>

        <Box
          display="flex"
          alignItems="center"
        >
          <Box
            display="flex"
            flexDirection="column"
          >
            <Box
              width={32}
              height={32}
            >
              {(participants[summonerPosition].lane !== 'NONE') && (
                <img
                  width={32}
                  height={32}
                  alt=""
                  src={`https://raw.communitydragon.org/12.3/plugins/rcp-fe-lol-clash/global/default/icon-position-${participants[summonerPosition].lane.toLocaleLowerCase()}-blue.png`}
                />
              )}
            </Box>

            <Text.Paragraph variant="body2" sx={{ marginTop: 1, width: 52 }}>LVL {participants[summonerPosition].champLevel}</Text.Paragraph>
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
              src={`https://ddragon.leagueoflegends.com/cdn/12.3.1/img/champion/${participants[summonerPosition].championName}.png`}
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            marginRight={2}
          >
            <Box
              width={28}
              height={28}
              marginBottom={1}
              backgroundColor="gray"
            />

            <Box
              width={28}
              height={28}
              backgroundColor="gray"
            />
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            marginRight={3}
          >
            <Box
              width={28}
              height={28}
              marginBottom={1}
              backgroundColor="gray"
            />

            <Box
              width={28}
              height={28}
              backgroundColor="gray"
            />
          </Box>

          <Text.Paragraph
            variant="body1"
            sx={{ marginRight: 3, width: 80 }}
          >
            {`${participants[summonerPosition].kills}/${participants[summonerPosition].deaths}/${participants[summonerPosition].assists}`}
          </Text.Paragraph>

          <ItemsTable
            items={[
              participants[summonerPosition].item0,
              participants[summonerPosition].item1,
              participants[summonerPosition].item2,
              participants[summonerPosition].item3,
              participants[summonerPosition].item4,
              participants[summonerPosition].item5,
            ]}
          />

          <Box
            marginLeft={3}
          >
            <PlayerPerformance
              gold={participants[summonerPosition].goldEarned}
              creeps={participants[summonerPosition].totalMinionsKilled}
              damage={participants[summonerPosition].totalDamageDealtToChampions}
              killParticipation={getKillParticipation()}
            />
          </Box>

          <Box
            marginLeft={3}
          >
            <Participants
              participants={participants}
              summoner={participants[summonerPosition].summonerName}
              summonerPosition={summonerPosition}
            />
          </Box>

          <Box
            display="flex"
            marginLeft={4}
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
          >
            <Text.Paragraph variant="body1">
              {getMatchDuration()}
            </Text.Paragraph>

            <Text.Paragraph variant="body1">
              {getMatchStartedAt()}
            </Text.Paragraph>
          </Box>
        </Box>

        <Text.Heading variant="h6" sx={{ position: 'absolute', top: '75%' }}>{getMatchType()}</Text.Heading>
      </Box>
    </Box>
  );
};
