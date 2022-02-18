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

export interface MatchProps {
  matchData: MatchDTO;
  summoner: string;
}

export const Match = (props: MatchProps) => {
  const { matchData, summoner } = props;

  const { i18n } = useTranslation();

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
    return `${minutes} minutes`;
  };

  const getMatchType = () => {
    if (matchData.info.gameMode !== 'CLASSIC') return matchData.info.gameMode;

    return queueId[matchData.info.queueId].name;
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      backgroundColor={participants[summonerPosition].win ? 'radix.greenA6' : 'radix.redA6'}
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
          {getMatchDuration()}
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
          <Text.Heading variant="h4">{participants[summonerPosition].championName}</Text.Heading>

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
            </Box>

            <Text.Paragraph
              variant="body2"
              textAlign="center"
              sx={{ width: 80 }}
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
          </Box>
        </Box>

        <Box
          marginLeft="auto"
        >
          <Participants
            participants={participants}
            summoner={participants[summonerPosition].summonerName}
            summonerPosition={summonerPosition}
          />
        </Box>
      </Box>
    </Box>
  );
};
