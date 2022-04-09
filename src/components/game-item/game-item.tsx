import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import {
  Center,
  Circle,
  Divider,
  HStack,
  Pressable,
  Spacer,
  Text,
  VStack,
} from 'native-base'
import * as React from 'react'
import { useEffect } from 'react'

export interface IGameItemProps {
  team1Id: number
  teamName1: string
  team1Nickname: string
  team1Score: number
  team1WinsTiesLoss: string
  team2Id: number
  teamName2: string
  team2Nickname: string
  team2Score: number
  team2WinsTiesLoss: string
  time: Date
  court: string
}

export const GameItem = ({
  team1Id,
  teamName1,
  team1Nickname,
  team1Score,
  team1WinsTiesLoss,
  team2Id,
  teamName2,
  team2Nickname,
  team2Score,
  team2WinsTiesLoss,
  time,
  court,
}: IGameItemProps) => {
  const navigation = useNavigation()

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

  const handleTeamPress = (teamId: number) => {
    console.log(`Team ${teamId} pressed`)
    navigation.navigate('Team', {
      teamId,
    })
  }

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
          <Pressable
            onPress={() => {
              handleTeamPress(team1Id)
            }}
          >
            <HStack>
              <Center>
                <Circle mr={2} size="40px" bg="yogiCup.navy">
                  {team1Initials}
                </Circle>
              </Center>
              <Center>
                <VStack>
                  {team1Nickname?.length > 0 && (
                    <Text fontWeight="bold" color="coolGray.800">
                      {'team1Nickname'}
                    </Text>
                  )}
                  <Text fontWeight="light" color="coolGray.800">
                    {teamName1}
                  </Text>
                  <Text color="coolGray.800">{team1WinsTiesLoss}</Text>
                </VStack>
              </Center>
            </HStack>
          </Pressable>
          <Pressable
            onPress={() => {
              handleTeamPress(team2Id)
            }}
          >
            <HStack py={4}>
              <Center>
                <Circle mr={2} size="40px" bg="yogiCup.orange">
                  <Text color="yogiCup.white">{team2Initials}</Text>
                </Circle>
              </Center>
              <Center>
                <VStack>
                  {team2Nickname?.length > 0 && (
                    <Text fontWeight="bold" color="coolGray.800">
                      {'team2Nickname'}
                    </Text>
                  )}
                  <Text fontWeight="light" color="coolGray.800">
                    {teamName2}
                  </Text>
                  <Text color="coolGray.800">{team2WinsTiesLoss}</Text>
                </VStack>
              </Center>
            </HStack>
          </Pressable>
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
