export interface IGameResponse {
  id: number
  courtName: string
  homeTeamId: number
  homeTeamName: string
  homeTeamNickname: string
  homeTeamScore: number
  homeTeamWins: number
  homeTeamLosses: number
  homeTeamTies: number
  awayTeamId: number
  awayTeamName: string
  awayTeamNickname: string
  awayTeamScore: number
  awayTeamWins: number
  awayTeamLosses: number
  awayTeamTies: number
  startTime: Date
  leagueId: number
}

export interface ILoginResponse {
  accessToken: string
  user: IUserData
}

export interface IUserData {
  user: {
    id: number
    firstName: string
    middleName: string
    lastName: string
    bkmsId: number
    email: string
    phoneNumber: number
    dob: number
    center: number
    shirtSize: string
    sweatpantSize: string
    role: string
  }
}

export interface ISignInData {
  email: string
  password: string
}

export interface ITeamScheduleResponse {
  date: Date
  games: [IGame]
}

export interface ITeamResponse {
  id: number
  name: string
  teamNickname: string
  leagueId: number
  leagueName: string
  eventId: number
  eventName: string
  captainId: number
  drawId: number
  present: boolean
  shirtsGiven: boolean
  keyGiven: boolean
  rank: number
  gamesWon: number
  gamesLost: number
  gamesTied: number
  players: [ITeamPlayerResponse]
}

export interface ITeamPlayerResponse {
  id: number
  userId: number
  teamId: number
  eventId: number
}

export interface IPlayerResponse {
  id: number
  playerId: number
  teamId: number
  leagueId: number
  eventId: number
  name: string
  bkmsId: number
  email: string
  phone: string
  dob: string
  centerId: number
  centerName: string
  shirtSize: string
  sweatpantSize: null
  totalPoints: number
  totalRebounds: number
  totalAssists: number
  totalSteals: number
  totalBlocks: number
}

export interface ITeamViewResponse {
  teamId: number
  teamName: string
  teamNickname: string
  teamWins: number
  teamLosses: number
  teamTies: number
  players: ITeamViewPlayerResponse[]
}

export interface ITeamViewPlayerResponse {
  id: number
  name: string
  isCaptain: boolean
  totalPoints: number
  totalRebounds: number
  totalAssists: number
  totalSteals: number
  totalBlocks: number
}

export interface IGame {
  id: number
  courtId: number
  leagueId: number
  awayTeaNickname: string
  awayTeamName: string
  awayTeamId: number
  startTime: Date
  courtName: string
  awayTeamWins: number
  awayTeamLosses: number
  awayTeamTies: number
}

export interface IEventResponse {
    id: number
    name: string
    description: string
    startDate: Date
    endDate: Date
    metrics: [
      {
        title: string
        count: number
        description: string
      }
    ]
}