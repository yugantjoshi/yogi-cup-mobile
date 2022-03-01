import { Box, Center, Heading, HStack, Stack, Text } from 'native-base'
import * as React from 'react'

export interface IHomeMetricCardItem {
  metric: number
  description: string
  width: string
}

export const HomeMetriCardItem = ({
  metric,
  description,
  width,
}: IHomeMetricCardItem) => {
  return (
    <Box
      w={width}
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      m={4}
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}
    >
      <Stack p="4">
        <Center>
          <Heading size="2xl" color="yogiCup.navy">
            {metric}
          </Heading>
          <Text
            fontSize="sm"
            _light={{
              color: 'yogiCup.orange',
            }}
            _dark={{
              color: 'violet.400',
            }}
            fontWeight="500"
            ml="-0.5"
            mt="0.5"
          >
            {description.toUpperCase()}
          </Text>
        </Center>
      </Stack>
    </Box>
  )
}
