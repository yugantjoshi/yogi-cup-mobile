import {
  AspectRatio,
  Box,
  Center,
  FlatList,
  Heading,
  HStack,
  Image,
  ScrollView,
  Stack,
  Text,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { RefreshControl } from "react-native";
import { HomeMetriCardItem } from "../components/home-metric-card-item/home-metric-card-item";
import { YogiCupService } from "../services/yogi-cup-service";
import { IEventResponse } from "../utils/result-types/result-types";

export const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [eventInfo, setEventInfo] = useState<IEventResponse>(
    {} as IEventResponse
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getEventInfo().then(() => setRefreshing(false));
  }, []);

  const getEventInfo = async () => {
    const eventInfo = await YogiCupService.getEventById(1);
    setEventInfo(eventInfo);
  };

  useEffect(() => {
    getEventInfo();
  }, []);

  return (
    <Center w="100%">
      <Box alignItems="center">
        <Box
          maxW="90%"
          w="90%"
          rounded="lg"
          overflow="hidden"
          borderColor="coolGray.200"
          borderWidth="1"
          m="4"
          backgroundColor={"yogiCup.white"}
        >
          <Box>
            <AspectRatio w="100%" ratio={16 / 9} bg="#fff">
              <Image
                resizeMode="contain"
                w="100%"
                h="100%"
                source={require("../../assets/yogi-cup-logo.png")}
                alt="yogi cup"
              />
            </AspectRatio>
          </Box>
          <Stack p="4" space={3}>
            <Stack space={2}>
              <Heading size="md" ml="-1">
                Yogi Cup 2022
              </Heading>
              <Text
                fontSize="xs"
                _light={{
                  color: "yogiCup.orange",
                }}
                _dark={{
                  color: "violet.400",
                }}
                fontWeight="500"
                ml="-0.5"
                mt="-1"
              >
                WHERE SAMP HAPPENS
              </Text>
            </Stack>
            <Text fontWeight="400">Welcome to Yogi Cup 2022!</Text>
            <HStack
              alignItems="center"
              space={4}
              justifyContent="space-between"
            ></HStack>
          </Stack>
        </Box>
      </Box>
      <FlatList
        w={"100%"}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={eventInfo.metrics}
        renderItem={({ item }) => (
          <Center>
            <HomeMetriCardItem
              metric={item.count}
              description={item.description ?? ""}
              width="90%"
              title={item.title}
            />
          </Center>
        )}
        keyExtractor={(item) => `${item.title}`}
      />
    </Center>
  );
};
