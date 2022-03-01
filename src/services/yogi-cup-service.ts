import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  IGameResponse,
  ILoginResponse,
  IPlayerResponse,
  ITeamPlayerResponse,
  ITeamResponse,
  ITeamScheduleResponse,
} from '../utils/result-types/result-types'

const BASE_URL = 'https://api.yogicup.app/prod/api/v2'

export const YogiCupService = {
  login: async ({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<ILoginResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/user/login`, {
        method: 'POST',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
          remember: true,
        }),
      })
      return await response.json()
    } catch (e) {
      throw new Error(`Error logging in ${e.message}`)
    }
  },

  getGames: async (): Promise<IGameResponse[]> => {
    try {
      let token = await AsyncStorage.getItem('@AuthData')
      token = JSON.parse(token ?? '')
      console.info('Fetching games...')
      const response = await fetch(`${BASE_URL}/game`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      return await response.json()
    } catch (e) {
      throw new Error(`Error fetching games ${e.message}`)
    }
  },

  getTeamSchedule: async ({
    teamId,
  }: {
    teamId: number
  }): Promise<ITeamScheduleResponse[]> => {
    try {
      const token = await AsyncStorage.getItem('@AuthData')
      console.info('Fetching Team Schedule...')
      const response = await fetch(`${BASE_URL}/team/${teamId}/schedule`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      return await response.json()
    } catch (e) {
      throw new Error(`Error fetching the team schedule ${e.message}`)
    }
  },

  getAllPlayers: async (): Promise<ITeamPlayerResponse[]> => {
    try {
      let token = await AsyncStorage.getItem('@AuthData')
      token = JSON.parse(token ?? '')
      console.info('Fetching players...')
      const response = await fetch(`${BASE_URL}/player`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      })
      return await response.json()
    } catch (e) {
      throw new Error(`Error fetching games ${e.message}`)
    }
  },

  getPlayerByUserId: async (): Promise<IPlayerResponse> => {
    try {
      let token = await AsyncStorage.getItem('@AuthData')
      token = JSON.parse(token ?? '')
      const userData = await AsyncStorage.getItem('@UserData')
      const userId = userData ? JSON.parse(userData).id : 'none'
      console.info('Fetching player by user id...')
      const response = await fetch(
        `${BASE_URL}/event/1/players/user/${userId}`,
        {
          method: 'GET',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer ' + token,
          },
        },
      )
      return await response.json()
    } catch (e) {
      throw new Error(`Error fetching games ${e.message}`)
    }
  },

  getPlayerById: async (playerId: number): Promise<IPlayerResponse> => {
    try {
      console.info('Fetching Player by id...')
      const response = await fetch(`${BASE_URL}/player/${playerId}`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      return await response.json()
    } catch (e) {
      throw new Error(`Error fetching player by player id ${e.message}`)
    }
  },

  getTeamById: async ({
    teamId,
  }: {
    teamId: number
  }): Promise<ITeamResponse> => {
    try {
      const response = await fetch(`${BASE_URL}/team/${teamId}`, {
        method: 'GET',
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      })
      return await response.json()
    } catch (e) {
      throw new Error(`Error fetching team by team id ${e.message}`)
    }
  },
}
