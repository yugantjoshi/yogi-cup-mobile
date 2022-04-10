import { Box } from "native-base";
import * as React from "react";
import { useEffect } from "react";
import { FlatList, RefreshControl } from "react-native";
import { GameItem } from "../components/game-item/game-item";
import { YogiCupService } from "../services/yogi-cup-service";
import {
  IGameResponse,
  ITeamResponse,
} from "../utils/result-types/result-types";

export const Games = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [games, setGames] = React.useState<IGameResponse[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getGamesInfo().then(() => setRefreshing(false));
  }, []);

  const getGamesInfo = async () => {
    const allGames = await YogiCupService.getGames();
    setGames(allGames);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <Box w="100%" h="100%" backgroundColor={"yogiCup.white"}>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={games}
        initialNumToRender={10}
        renderItem={({ item }) => (
          <GameItem
            team1Id={item.homeTeamId}
            teamName1={item.homeTeamName}
            team1Nickname={item.homeTeamNickname}
            team1Score={item.homeTeamScore}
            team2Id={item.awayTeamId}
            teamName2={item.awayTeamName}
            team2Nickname={item.awayTeamNickname}
            team2Score={item.awayTeamScore}
            time={item.startTime}
            court={item.courtName}
          />
        )}
        keyExtractor={(item) => `${item.id}`}
      />
    </Box>
  );
};
