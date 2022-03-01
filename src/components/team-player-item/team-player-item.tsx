import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Spacer,
  VStack,
} from 'native-base'
import * as React from 'react'
import { YogiCupService } from '../../services/yogi-cup-service'
import {
  IPlayerResponse,
  ITeamResponse,
  ITeamViewPlayerResponse,
  ITeamViewResponse,
} from '../../utils/result-types/result-types'
import { PlayerItem } from '../player-item/player-item'

export const TeamPlayerItem = ({ route }: any) => {
  const { awayTeamId } = route.params
  const [teamView, setTeamView] = React.useState<ITeamViewResponse>(
    {} as ITeamViewResponse,
  )

  const getTeamViewInfo = async () => {
    console.log(awayTeamId)
    const team = await YogiCupService.getTeamById({
      teamId: awayTeamId,
    })
    const captainId = team.captainId
    const playerInfo = team.players.map(async (player) => {
      // Get the player by id
      const playerStats: IPlayerResponse = await YogiCupService.getPlayerById(
        player.id,
      )
      console.log(`Got player ${player.id}`)
      const isCaptain = player.id === captainId
      return {
        id: playerStats.id,
        name: playerStats.name,
        isCaptain: isCaptain,
        totalPoints: playerStats.totalPoints,
        totalRebounds: playerStats.totalRebounds,
        totalAssists: playerStats.totalAssists,
        totalSteals: playerStats.totalSteals,
        totalBlocks: playerStats.totalBlocks,
      }
    })
    const players: ITeamViewPlayerResponse[] = await Promise.all(playerInfo)
    setTeamView({
      teamId: team.id,
      teamName: team.name,
      teamWins: team.gamesWon,
      teamLosses: team.gamesLost,
      teamTies: team.gamesTied,
      players: players,
    })
  }

  React.useEffect(() => {
    getTeamViewInfo()
  }, [])

  return (
    <Box alignItems="center">
      <Box
        maxW="100%"
        w="90%"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        m="4"
        _light={{
          backgroundColor: 'gray.50',
        }}
      >
        {/* Header */}
        <VStack p="4" space={3}>
          <Center mb={5}>
            <Heading fontWeight="medium" size="sm">
              {teamView.teamId}
            </Heading>
            <Heading my={1} size="lg">
              {teamView.teamName}
            </Heading>
            <Heading fontWeight="medium" size="xs">
              {teamView.teamWins} - {teamView.teamLosses} - {teamView.teamTies}
            </Heading>
          </Center>
        </VStack>
        <HStack my={4} mx={2}>
          <Heading fontWeight="bold" size="xs">
            PLAYER
          </Heading>
          <Spacer />
          <Spacer />
          <Spacer />
          <Spacer />
          <Heading fontWeight="bold" size="xs">
            PTS
          </Heading>
          <Spacer />
          <Heading fontWeight="bold" size="xs">
            REB
          </Heading>
          <Spacer />
          <Heading fontWeight="bold" size="xs">
            AST
          </Heading>
          <Spacer />
          <Heading fontWeight="bold" size="xs">
            STL
          </Heading>
        </HStack>
        <Divider />
        {teamView.players?.map((player) => {
          return (
            <PlayerItem
              key={player.id}
              name={player.name}
              isCaptain={player.isCaptain}
              points={player.totalPoints}
              rebounds={player.totalRebounds}
              assists={player.totalAssists}
              steals={player.totalSteals}
            />
          )
        })}
      </Box>
    </Box>
  )
}
