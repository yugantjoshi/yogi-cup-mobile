import { Box, Center, Heading, HStack, Stack, Text } from "native-base";
import * as React from "react";

export interface IHomeMetricCardItem {
  title: string;
  metric: number;
  description?: string;
  width: string;
}

export const HomeMetriCardItem = ({
  title,
  metric,
  description,
  width,
}: IHomeMetricCardItem) => {
  return (
    <Box
      w={width}
      my={2}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      backgroundColor={"yogiCup.white"}
    >
      <Stack p="4">
        <Center>
          <Heading size="2xl" color="yogiCup.navy">
            {metric}
          </Heading>
          <Text
            fontSize="sm"
            _light={{
              color: "yogiCup.orange",
            }}
            _dark={{
              color: "violet.400",
            }}
            fontWeight="500"
            ml="-0.5"
            mt="0.5"
          >
            {title?.toUpperCase()}
          </Text>
          {description ? (
            <Text fontWeight="400">{description ?? ""}</Text>
          ) : null}
        </Center>
      </Stack>
    </Box>
  );
};
