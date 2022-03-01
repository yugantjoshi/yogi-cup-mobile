import { Avatar, Box, HStack, Spacer, Text, VStack } from 'native-base'
import * as React from 'react'

export interface ITeamItemProps {
  teamName: string
  avatarUrl: string
  wins: number
  losses: number
}

export const TeamItem = ({
  teamName,
  avatarUrl,
  wins,
  losses,
}: ITeamItemProps) => {
  return (
    <Box
      borderBottomWidth="1"
      _dark={{
        borderColor: 'gray.600',
      }}
      borderColor="coolGray.200"
      pl="4"
      pr="5"
      py="2"
    >
      <HStack space={3} justifyContent="space-between">
        <Avatar
          size="48px"
          source={{
            uri: avatarUrl,
          }}
        />
        <VStack>
          <Text color="coolGray.800" bold>
            {teamName}
          </Text>
          {/* <Text color="coolGray.600">{teamName}</Text> */}
        </VStack>
        <Spacer />
        <Text fontSize="xs" color="coolGray.800" alignSelf="flex-start">
          {wins} - {losses}
        </Text>
      </HStack>
    </Box>
  )
}
