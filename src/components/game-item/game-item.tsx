import { MaterialIcons } from '@expo/vector-icons'
import {
  Center,
  Circle,
  Divider,
  HStack,
  Spacer,
  Text,
  VStack,
} from 'native-base'
import * as React from 'react'
import { useEffect } from 'react'

export interface IGameItemProps {
  teamName1: string
  team1Score: number
  team1WinsTiesLoss: string
  teamName2: string
  team2Score: number
  team2WinsTiesLoss: string
  time: Date
  court: string
}

export const GameItem = ({
  teamName1,
  team1Score,
  team1WinsTiesLoss,
  teamName2,
  team2Score,
  team2WinsTiesLoss,
  time,
  court,
}: IGameItemProps) => {
  const [isLive, setIsLive] = React.useState(false)

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

  useEffect(() => {
    const now = new Date()
    if (now.getTime() === date.getTime() + 1800000) {
      setIsLive(true)
    }

    setTimeout(() => {
      setIsLive(false)
    }, 1200000)
  }, [])

  // Creates an initial from the team name
  const team1Initials = teamName1
    .split(' ')
    .map((word) => word[0])
    .join('')
  const team2Initials = teamName2
    .split(' ')
    .map((word) => word[0])
    .join('')

  return (
    <>
      <HStack space={5} p={3}>
        {/* Game Metadata */}
        <VStack alignContent="flex-start" justifyContent="center">
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
        {/* Team Info */}
        <VStack alignContent="flex-start" justifyContent="center">
          <HStack>
            <Circle mr={2} size="40px" bg="yogiCup.navy">
              {team1Initials}
            </Circle>
            <Center>
              <VStack>
                <Text bold color="coolGray.800">
                  {teamName1}
                </Text>
                <Text color="coolGray.800">{team1WinsTiesLoss}</Text>
              </VStack>
            </Center>
          </HStack>
          <HStack py={4}>
            <Circle mr={2} size="40px" bg="yogiCup.orange">
              <Text color="yogiCup.white">{team2Initials}</Text>
            </Circle>
            <Center>
              <VStack>
                <Text bold color="coolGray.800">
                  {teamName2}
                </Text>
                <Text color="coolGray.800">{team2WinsTiesLoss}</Text>
              </VStack>
            </Center>
          </HStack>
        </VStack>
        {/* Scoreboard */}
        <Spacer />
        <VStack justifyContent="center" alignSelf="flex-start" pr={2}>
          <Center>
            <Text fontSize="2xl" color="coolGray.800" bold>
              {team1Score}
            </Text>
            {isLive ? (
              <>
                <HStack>
                  <Center>
                    <Text fontSize="2xs" color="red">
                      LIVE
                    </Text>
                  </Center>
                  <Spacer />
                  <Center>
                    <MaterialIcons
                      name="fiber-manual-record"
                      size={15}
                      color="red"
                    />
                  </Center>
                </HStack>
              </>
            ) : null}
            <Center>
              <Text fontSize="2xl" color="coolGray.800" bold>
                {team2Score}
              </Text>
            </Center>
          </Center>
        </VStack>
      </HStack>
      <Divider />
    </>
  )
}
