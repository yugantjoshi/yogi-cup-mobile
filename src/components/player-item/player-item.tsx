import {
  Center,
  Circle,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from 'native-base'
import * as React from 'react'

export interface IPlayerItemProps {
  name: string
  isCaptain: boolean
  points: number
  rebounds: number
  assists: number
  steals: number
}

export const PlayerItem = ({
  name,
  isCaptain,
  points,
  rebounds,
  assists,
  steals,
}: IPlayerItemProps) => {
  const getPlayerInitials = (playerName: string) => {
    return playerName
      .split(' ')
      .map((word) => word[0])
      .join('')
  }

  return (
    <HStack m={4}>
      <Circle mr={2} size="40px" bg="yogiCup.navy">
        {getPlayerInitials(name)}
      </Circle>
      <Center>
        <VStack>
          <Text bold color="coolGray.800">
            {name}
          </Text>
          {isCaptain && <Text color="coolGray.800">{'Captain'}</Text>}
        </VStack>
      </Center>
      <Spacer />
      <Center>
        <Heading fontWeight="bold" size="sm">
          {points}
        </Heading>
      </Center>
      <Spacer />
      <Center>
        <Heading fontWeight="bold" size="sm">
          {rebounds}
        </Heading>
      </Center>
      <Spacer />
      <Center>
        <Heading fontWeight="bold" size="sm">
          {assists}
        </Heading>
      </Center>
      <Spacer />
      <Center>
        <Heading fontWeight="bold" size="sm">
          {steals}
        </Heading>
      </Center>
    </HStack>
  )
}
