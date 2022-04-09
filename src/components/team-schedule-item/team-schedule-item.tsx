import { useNavigation } from '@react-navigation/native'
import {
  Box,
  Center,
  Circle,
  Divider,
  HStack,
  Pressable,
  Text,
  VStack,
} from 'native-base'
import * as React from 'react'

export interface ITeamScheduleItemProps {
  awayTeamNickname: string
  awayTeamId: number
  awayTeamName: string
  time: Date
  court: string
  winLoss: string
}

export const TeamScheduleItem = ({
  awayTeamNickname,
  awayTeamId,
  awayTeamName,
  time,
  court,
  winLoss,
}: ITeamScheduleItemProps) => {
  const navigation = useNavigation()

  // Convert ISO 8601 string to Date object
  const date = new Date(time)

  // Get the day of the week from the date
  const day = date.toLocaleString('en-US', { weekday: 'long' })

  // Convert Date object to 12-hour time string
  const timeString = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  })

  // Creates an initial from the team name
  const awayTeamInitials = awayTeamName
    .split(' ')
    .map((word) => word[0])
    .join('')

  const handleTeamPress = (teamId: number) => {
    console.log(`Team ${teamId} pressed`)
    navigation.navigate('Team', {
      teamId,
    })
  }

  return (
    <Pressable onPress={() => handleTeamPress(awayTeamId)}>
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
                {timeString}
              </Text>
              <Text color="coolGray.600">{court}</Text>
            </Center>
          </VStack>
          <VStack alignContent="center" justifyContent="center" space={0.1}>
            <Center>
              <HStack>
                <Circle mr={2} size="40px" bg="yogiCup.navy">
                  {awayTeamInitials}
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
  )
}
