import { Box, Center, Divider, HStack, Text, VStack } from 'native-base'
import * as React from 'react'
export interface IEventScheduleItemProps {
  eventItemName: string
  startTime: string
  endTime?: string
  day: string
  details?: string
}

export const EventScheduleItem = ({
  eventItemName,
  startTime,
  endTime,
  day,
  details,
}: IEventScheduleItemProps) => {
  return (
    <Box
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      pl="4"
      pr="5"
      justifyContent={'center'}
    >
      <HStack space={2} py="5">
        <VStack alignContent="center" justifyContent="center">
          <Center>
            <Text color="coolGray.800" bold>
              {day}
            </Text>
            <Text color="coolGray.800" bold>
              {startTime}
            </Text>
            <Text color="coolGray.600" bold>
              {endTime}
            </Text>
          </Center>
        </VStack>
        <VStack alignContent="center" justifyContent="center" space={0.1}>
          <Center>
            <VStack>
              <Text bold color="coolGray.800">
                {eventItemName}
              </Text>
              <Text color="coolGray.800">{details}</Text>
            </VStack>
          </Center>
        </VStack>
      </HStack>
      <Divider />
    </Box>
  )
}
