import AsyncStorage from "@react-native-async-storage/async-storage";
import { Box, Button, FlatList, Heading, ScrollView } from "native-base";
import React, { useEffect } from "react";
import { GestureResponderEvent, RefreshControl } from "react-native";
import { EventScheduleItem } from "../components/event-schedule-item/event-schedule-item";
import { TeamScheduleItem } from "../components/team-schedule-item/team-schedule-item";
import { YogiCupService } from "../services/yogi-cup-service";
import {
  IGame,
  ITeamPlayerResponse,
  ITeamResponse,
  ITeamScheduleResponse,
} from "../utils/result-types/result-types";

export const Schedule = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [games, setGames] = React.useState<IGame[]>([]);
  const [isTeamScheduleSelected, setIsTeamScheduleSelected] =
    React.useState(true);
  const [playerTeamId, setPlayerTeamId] = React.useState(0);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getTeamScheduleInfo()
      .then(() => setRefreshing(false))
      .catch(() => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  const getTeamScheduleInfo = async () => {
    try {
      const playerInfo = await YogiCupService.getPlayerByUserId();
      const teamId = playerInfo.teamId;
      setPlayerTeamId(teamId);

      const teamSchedule: ITeamScheduleResponse[] =
        await YogiCupService.getTeamSchedule({
          teamId: teamId,
        });
      const gamesForEachDay = teamSchedule.map((day) => {
        return day.games.map((game) => {
          return {
            ...game,
          };
        });
      });
      const flattenedGames = gamesForEachDay.reduce((acc, curr) => {
        return acc.concat(curr);
      });
      const schedule = flattenedGames.map(async (scheduledGame) => {
        if (scheduledGame.homeTeamId === teamId) {
          console.log("home team");
          const awayTeam: ITeamResponse = await YogiCupService.getTeamById({
            teamId: scheduledGame.awayTeamId,
          });
          scheduledGame.awayTeamWins = awayTeam.gamesWon ?? 0;
          scheduledGame.awayTeamLosses = awayTeam.gamesLost ?? 0;
          scheduledGame.awayTeamTies = awayTeam.gamesTied ?? 0;
          console.log(`Set away team ${awayTeam.name}`);
          return scheduledGame;
        } else {
          console.log("away team");
          const homeTeam: ITeamResponse = await YogiCupService.getTeamById({
            teamId: scheduledGame.homeTeamId,
          });
          scheduledGame.homeTeamWins = homeTeam.gamesWon ?? 0;
          scheduledGame.homeTeamLosses = homeTeam.gamesLost ?? 0;
          scheduledGame.homeTeamTies = homeTeam.gamesTied ?? 0;
          console.log(`Set home team ${homeTeam.name}`);
          return scheduledGame;
        }
      });
      setGames(await Promise.all(schedule));
    } catch (e) {
      setGames([]);
      throw new Error("Error getting team schedule");
    }
  };

  const onToggle = (e: GestureResponderEvent) => {
    setIsTeamScheduleSelected(!isTeamScheduleSelected);
  };

  return (
    <Box w="100%" h="100%" backgroundColor={"yogiCup.white"}>
      <Button.Group
        isAttached
        colorScheme="orange"
        mx={{
          base: "auto",
          md: 0,
        }}
        size="md"
        p={4}
      >
        <Button
          onPress={onToggle}
          variant={isTeamScheduleSelected ? "solid" : "outline"}
        >
          Team Schedule
        </Button>
        <Button
          onPress={onToggle}
          variant={!isTeamScheduleSelected ? "solid" : "outline"}
        >
          Event Schedule
        </Button>
      </Button.Group>

      {isTeamScheduleSelected ? (
        <>
          <Heading fontSize="xl" p={1}>
            Team Schedule
          </Heading>
          <Heading fontWeight="light" fontSize="sm" p={1} mt={-1}>
            *Times are subject to change
          </Heading>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={games}
            renderItem={({ item }) => (
              <TeamScheduleItem
                awayTeamNickname={
                  item.awayTeamId === playerTeamId
                    ? item.homeTeamNickname
                    : item.awayTeamNickname
                }
                awayTeamId={
                  item.awayTeamId === playerTeamId
                    ? item.homeTeamId
                    : item.awayTeamId
                }
                awayTeamName={
                  item.awayTeamId === playerTeamId
                    ? item.homeTeamName
                    : item.awayTeamName
                }
                time={item.startTime}
                court={item.courtName}
                winLoss={
                  item.awayTeamId === playerTeamId
                    ? `${item.homeTeamWins} - ${item.homeTeamLosses} - ${item.homeTeamTies}`
                    : `${item.awayTeamWins} - ${item.awayTeamLosses} - ${item.awayTeamTies}`
                }
              />
            )}
            keyExtractor={(item) => `${item.id}`}
          />
        </>
      ) : (
        <>
          <Heading fontSize="xl" p={4}>
            Event Schedule
          </Heading>
          <ScrollView w="100%" h="100%">
            <EventScheduleItem
              eventItemName={"Registration & Breakfast"}
              startTime={"8:00 AM"}
              endTime={"9:00 AM"}
              day={"Saturday"}
            />
            <EventScheduleItem
              eventItemName={"Arrival Program"}
              startTime={"9:00 AM"}
              endTime={"9:45 AM"}
              day={"Saturday"}
            />
            <EventScheduleItem
              eventItemName={"Season Preparation"}
              startTime={"9:45 AM"}
              endTime={"10:00 AM"}
              day={"Saturday"}
            />
            <EventScheduleItem
              eventItemName={"Photobooth Session A"}
              startTime={"9:45 AM"}
              endTime={"10:00 AM"}
              day={"Saturday"}
              details={"Ongoing"}
            />
            <EventScheduleItem
              eventItemName={"Regular Season"}
              startTime={"10:00 AM"}
              endTime={"2:10 PM"}
              day={"Saturday"}
            />
            <EventScheduleItem
              eventItemName={"Rolling Lunch"}
              startTime={"11:30 AM"}
              endTime={"1:30 PM"}
              day={"Saturday"}
            />
            <EventScheduleItem
              eventItemName={"Regular Season"}
              startTime={"3:40 PM"}
              endTime={"7:45 PM"}
              day={"Saturday"}
            />
            <EventScheduleItem
              eventItemName={"Photobooth Session B"}
              startTime={"4:00 PM"}
              endTime={"6:00 PM"}
              day={"Saturday"}
              details={"Ongoing"}
            />
            <EventScheduleItem
              eventItemName={"Rolling dinner"}
              startTime={"5:00 PM"}
              endTime={"6:45 PM"}
              day={"Saturday"}
              details={"Ongoing"}
            />
            <EventScheduleItem
              eventItemName={"Arti"}
              startTime={"7:45 PM"}
              endTime={"7:55 PM"}
              day={"Saturday"}
            />
            <EventScheduleItem
              eventItemName={"Announcements"}
              startTime={"7:55 PM"}
              endTime={"8:05 PM"}
              day={"Saturday"}
            />
            <EventScheduleItem
              eventItemName={"Departure to Hotel"}
              startTime={"7:55 PM"}
              day={"Saturday"}
            />
            <EventScheduleItem
              eventItemName={"Arrival and Breakfast"}
              startTime={"7:00 AM"}
              endTime={"8:00 AM"}
              day="Sunday"
            />
            <EventScheduleItem
              eventItemName={"Morning Program & Bracket Reveal"}
              startTime={"8:00 AM"}
              endTime={"8:40 AM"}
              day="Sunday"
            />
            <EventScheduleItem
              eventItemName={"Playoff Preparation"}
              startTime={"8:40 AM"}
              endTime={"8:50 AM"}
              day="Sunday"
            />
            <EventScheduleItem
              eventItemName={"Playoffs"}
              startTime={"8:50 AM"}
              endTime={"1:30 PM"}
              day="Sunday"
            />
            <EventScheduleItem
              eventItemName={"Lunch"}
              startTime={"11:30 AM"}
              endTime={"12:30 PM"}
              day="Sunday"
              details="Ongoing"
            />
            <EventScheduleItem
              eventItemName={"K1 Finals"}
              startTime={"1:30 PM"}
              endTime={"2:15 PM"}
              day="Sunday"
            />
            <EventScheduleItem
              eventItemName={"K2 Finals"}
              startTime={"2:15 PM"}
              endTime={"3:00 PM"}
              day="Sunday"
            />
            <EventScheduleItem
              eventItemName={"Awards Ceremony"}
              startTime={"3:00 PM"}
              endTime={"3:15 PM"}
              day="Sunday"
            />
          </ScrollView>
        </>
      )}
    </Box>
  );
};
