import { Box } from 'native-base'
import * as React from 'react'
import { useEffect } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { GameItem } from '../components/game-item/game-item'
import { YogiCupService } from '../services/yogi-cup-service'
import {
  IGameResponse,
  ITeamResponse,
} from '../utils/result-types/result-types'

export const Games = () => {
  const [refreshing, setRefreshing] = React.useState(false)
  const [games, setGames] = React.useState<IGameResponse[]>([])
  const [currentIndex, setCurrentIndex] = React.useState<number>(0)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await getGamesInfo().then(() => setRefreshing(false))
  }, [])

  const getGamesInfo = async () => {
    await YogiCupService.getGames().then(async (games) => {
      const modGames = await games.map(async (game) => {
        const awayTeamId = game.awayTeamId
        const homeTeamId = game.homeTeamId
        // Get the team by id
        const awayTeam: ITeamResponse = await YogiCupService.getTeamById({
          teamId: awayTeamId,
        })
        const homeTeam: ITeamResponse = await YogiCupService.getTeamById({
          teamId: homeTeamId,
        })

        game.awayTeamWins = awayTeam.gamesWon ?? 0
        game.awayTeamLosses = awayTeam.gamesLost ?? 0
        game.awayTeamTies = awayTeam.gamesTied ?? 0
        game.homeTeamWins = homeTeam.gamesWon ?? 0
        game.homeTeamLosses = homeTeam.gamesLost ?? 0
        game.homeTeamTies = homeTeam.gamesTied ?? 0

        return game
      })
      setGames(await Promise.all(await modGames))
    })
  }

  useEffect(() => {
    onRefresh()
    // For the games, if the startTime equals the current time plus 20 minutes, set that as the current index
    const index = games.findIndex((game) => {
      const startTime = new Date(game.startTime)
      const currentTime = new Date()
      currentTime.setMinutes(currentTime.getMinutes() + 20)
      return startTime.getTime() === currentTime.getTime()
    })
    setCurrentIndex(index)
  }, [])

  return (
    <Box w="100%" h="100%" bg="gray.50">
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={games}
        initialScrollIndex={currentIndex}
        renderItem={({ item }) => (
          <GameItem
            team1Id={item.homeTeamId}
            teamName1={item.homeTeamName}
            team1Nickname={item.homeTeamNickname}
            team1Score={item.homeTeamScore}
            team1WinsTiesLoss={`${item.homeTeamWins} - ${item.homeTeamLosses} - ${item.homeTeamTies}`}
            team2Id={item.awayTeamId}
            teamName2={item.awayTeamName}
            team2Nickname={item.awayTeamNickname}
            team2Score={item.awayTeamScore}
            team2WinsTiesLoss={`${item.awayTeamWins} - ${item.awayTeamLosses} - ${item.awayTeamTies}`}
            time={item.startTime}
            court={item.courtName}
          />
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </Box>
  )
}
