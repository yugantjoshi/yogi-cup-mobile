import { Ionicons } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { useContext, useEffect, useState } from 'react'
import { TeamPlayerItem } from './components/team-player-item/team-player-item'
import { Games } from './screens/games'
import { Home } from './screens/home'
import { Login } from './screens/login'
import { Profile } from './screens/profile'
import { Schedule } from './screens/schedule'
import { YogiCupService } from './services/yogi-cup-service'
import { ILoginResponse, ISignInData } from './utils/result-types/result-types'

export type AuthContextData = {
  authData?: AuthData
  isLoading: boolean
  signIn(data: ISignInData): Promise<boolean>
  signOut(): void
}

export type AuthData = {
  accessToken: string
}

const Tab = createBottomTabNavigator()
const TeamScheduleStack = createNativeStackNavigator()

function ScheduleStackScreen() {
  return (
    <TeamScheduleStack.Navigator>
      <TeamScheduleStack.Screen name="Overview" component={Schedule} />
      <TeamScheduleStack.Screen name="Team" component={TeamPlayerItem} />
    </TeamScheduleStack.Navigator>
  )
}

function GameStackScreen() {
  return (
    <TeamScheduleStack.Navigator>
      <TeamScheduleStack.Screen name="All Games" component={Games} />
      <TeamScheduleStack.Screen name="Team" component={TeamPlayerItem} />
    </TeamScheduleStack.Navigator>
  )
}

const AuthContext = React.createContext<AuthContextData>({} as AuthContextData)

const App = () => {
  const [authData, setAuthData] = useState<AuthData>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadStorageData()
  }, [])

  async function loadStorageData(): Promise<void> {
    try {
      //Try get the data from Async Storage
      console.log('Loading User data from Async Storage')
      const authDataSerialized = await AsyncStorage.getItem('@AuthData')
      if (authDataSerialized) {
        //If there are data, it's converted to an Object and the state is updated.
        const authData: AuthData = JSON.parse(authDataSerialized)
        setAuthData(authData)
      }
    } catch (error) {
      console.log(`Could not find token: ${error.message}`)
    } finally {
      //loading finished
      setIsLoading(false)
    }
  }

  const signIn = async ({ email, password }: ISignInData) => {
    try {
      console.info('Signing in...')
      const authData: ILoginResponse = await YogiCupService.login({
        email: email,
        password: password,
      })
      if ('accessToken' in authData) {
        setAuthData({ accessToken: authData.accessToken })
        await AsyncStorage.setItem(
          '@AuthData',
          JSON.stringify(authData.accessToken),
        )
        await AsyncStorage.setItem('@UserData', JSON.stringify(authData.user))
        console.info('Signed in!')
        return true
      } else {
        console.log('Could not sign in')
        return false
      }
    } catch (error) {
      console.log('Could not sign in: ', error)
    }
  }

  const signOut = async () => {
    console.info('Signing out...')
    setAuthData(undefined)
    await AsyncStorage.removeItem('@AuthData')
    console.info('Signed out!')
  }

  return (
    <AuthContext.Provider value={{ authData, isLoading, signIn, signOut }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerStyle: {
            backgroundColor: '#032340',
          },
          headerTintColor: '#fff',
          headerTitle: 'Northeast Yogi Cup',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'home' : 'home-outline'
                break
              case 'Schedule':
                iconName = focused ? 'list' : 'list-outline'
                break
              case 'Leaderboard':
                iconName = focused ? 'trophy' : 'trophy-outline'
                break
              case 'Games':
                iconName = focused ? 'basketball' : 'basketball-outline'
                break
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline'
                break
              default:
                break
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />
          },
          tabBarActiveTintColor: '#032340',
          tabBarInactiveTintColor: '#5D6973',
        })}
      >
        {authData ? (
          <>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Schedule" component={ScheduleStackScreen} />
            <Tab.Screen name="Games" component={GameStackScreen} />
            <Tab.Screen name="Profile" component={Profile} />
          </>
        ) : (
          <Tab.Screen name="Login" component={Login} />
        )}
      </Tab.Navigator>
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export default App
