import {
  AspectRatio,
  Box,
  Center,
  Heading,
  HStack,
  Image,
  ScrollView,
  Stack,
  Text,
} from 'native-base'
import * as React from 'react'
import { HomeMetriCardItem } from '../components/home-metric-card-item/home-metric-card-item'

export const Home = () => {
  return (
    <Center>
      <ScrollView
        w="100%"
        h="100%"
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        <Box alignItems="center">
          <Box
            maxW="100%"
            w="90%"
            rounded="lg"
            overflow="hidden"
            borderColor="coolGray.200"
            borderWidth="1"
            m="4"
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
            <Box>
              <AspectRatio w="100%" ratio={16 / 9} bg="#fff">
                <Image
                  resizeMode="contain"
                  w="100%"
                  h="100%"
                  source={require('../../assets/yogi-cup-logo.png')}
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
                    color: 'yogiCup.orange',
                  }}
                  _dark={{
                    color: 'violet.400',
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
        <Center>
          <HomeMetriCardItem
            metric={1}
            description={'GOAL OF SAMP'}
            width={'90%'}
          />
        </Center>
        <Center>
          <HStack>
            <HomeMetriCardItem
              metric={111}
              description={'TEAMS'}
              width={'40%'}
            />
            <HomeMetriCardItem
              metric={336}
              description={'PLAYERS'}
              width={'40%'}
            />
          </HStack>
        </Center>
        <Center>
          <HStack>
            <HomeMetriCardItem
              metric={27}
              description={'CENTERS'}
              width={'90%'}
            />
          </HStack>
        </Center>
      </ScrollView>
    </Center>
  )
}
