import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import {
  Box,
  Center,
  Circle,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from "native-base";
import * as React from "react";
import { getInitials } from "../../utils/string-format";
import { getDayOfWeek, getTimeOfDay } from "../../utils/date-format";

export interface ITeamScheduleItemProps {
  awayTeamNickname: string;
  awayTeamId: number;
  awayTeamName: string;
  time: Date;
  court: string;
  winLoss: string;
}

export const TeamScheduleItem = ({
  awayTeamNickname,
  awayTeamId,
  awayTeamName,
  time,
  court,
  winLoss,
}: ITeamScheduleItemProps) => {
  const navigation = useNavigation();

  const handleTeamPress = (teamId: number) => {
    console.log(`Team ${teamId} pressed`);
    navigation.navigate("Team", {
      teamId,
    });
  };

  return (
    <Pressable onPress={() => handleTeamPress(awayTeamId)}>
      <Box
        _dark={{
          borderColor: "gray.600",
        }}
        borderColor="coolGray.200"
        pl="4"
        pr="5"
        justifyContent={"center"}
      >
        <HStack space={2} py="5">
          <VStack space={2}>
            <Center>
              <Text color="coolGray.800" bold>
                {getDayOfWeek(time)}
              </Text>
              <Text color="coolGray.800" bold>
                {getTimeOfDay(time)}
              </Text>
              <Text color="coolGray.600">{court}</Text>
            </Center>
          </VStack>
          <VStack alignContent="center" justifyContent="center" space={0.1}>
            <Center>
              <HStack>
                <Circle mr={2} size="40px" bg="yogiCup.navy">
                  {getInitials(awayTeamName)}
                </Circle>
                <Center>
                  <VStack>
                    {awayTeamNickname?.length > 0 && (
                      <Text fontWeight="bold" color="coolGray.800">
                        {awayTeamNickname}
                      </Text>
                    )}
                    <Text fontWeight="light" color="coolGray.800">
                      {awayTeamName}
                    </Text>
                    <Text color="coolGray.800">{winLoss}</Text>
                  </VStack>
                </Center>
              </HStack>
            </Center>
          </VStack>
        </HStack>
        <Divider />
      </Box>
    </Pressable>
  );
};
