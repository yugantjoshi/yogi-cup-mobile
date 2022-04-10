import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Box,
  Button,
  Center,
  Circle,
  Heading,
  HStack,
  Text,
} from "native-base";
import * as React from "react";
import { useEffect } from "react";
import { RefreshControl, ScrollView } from "react-native";
import { useAuth } from "..";
import { HomeMetriCardItem } from "../components/home-metric-card-item/home-metric-card-item";
import { YogiCupService } from "../services/yogi-cup-service";
import {
  IPlayerResponse,
  ITeamPlayerResponse,
  ITeamResponse,
} from "../utils/result-types/result-types";

export const Profile = () => {
  const auth = useAuth();

  const [refreshing, setRefreshing] = React.useState(false);
  const [profile, setProfile] = React.useState<IPlayerResponse>(
    {} as IPlayerResponse
  );
  const [teamName, setTeamName] = React.useState<string>("");

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await getProfileInfo()
      .then((res) => {
        setRefreshing(false);
      })
      .catch((err) => {
        setRefreshing(false);
      });
  }, []);

  useEffect(() => {
    onRefresh();
  }, []);

  const getProfileInfo = async () => {
    const profileInfo: IPlayerResponse =
      await YogiCupService.getPlayerByUserId();
    const teamInfo: ITeamResponse = await YogiCupService.getTeamById({
      teamId: profileInfo.teamId,
    });
    setTeamName(teamInfo.name);
    setProfile(profileInfo);
  };

  const splitName = (name: string = "") => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("");
  };

  return (
    <Box h="100%">
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Box w="100%">
          <Center py={4}>
            <Circle size="lg" bg="yogiCup.navy">
              <Heading fontSize="2xl" color="yogiCup.white">
                {splitName(profile.name)}
              </Heading>
            </Circle>
            <Heading my={4} fontSize="4xl">
              {profile.name}
            </Heading>
            <Heading fontSize="3xl">{teamName}</Heading>
            <Heading m={4} fontSize="lg">
              {profile.bkmsId ? { BKMSID: profile.bkmsId } : null}
            </Heading>
          </Center>
          <Center>
            <HomeMetriCardItem
              width="80%"
              metric={profile.totalPoints}
              title={"Points"}
            />
          </Center>
          <Center>
            <HomeMetriCardItem
              width="80%"
              metric={profile.totalAssists}
              title="Assists"
            />
            <HomeMetriCardItem
              width="80%"
              metric={profile.totalRebounds}
              title={"Rebounds"}
            />
            <HomeMetriCardItem
              width="80%"
              metric={profile.totalSteals}
              title={"Steals"}
            />
            <HomeMetriCardItem
              width="80%"
              metric={profile.totalBlocks}
              title={"Blocks"}
            />
          </Center>
        </Box>
        <Center>
          <Button
            my={3}
            borderColor="yogiCup.blue"
            borderWidth={1}
            bg="yogiCup.white"
            onPress={auth.signOut}
          >
            <Text color="yogiCup.blue">Sign Out</Text>
          </Button>
        </Center>
      </ScrollView>
    </Box>
  );
};
