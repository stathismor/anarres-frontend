export interface Broadcast {
  time: string
  title: string
  tags?: string
  producer?: string
  isLive?: boolean
}

export interface DaySchedule {
  id: string
  name: string
  broadcasts: Broadcast[]
}

export const mixcloudLinks: Record<string, string> = {
  'Filthy Pagan': 'https://www.mixcloud.com/Filthy_Pagan/',
  naboer: 'https://www.mixcloud.com/naboer0/',
  phren: 'https://www.mixcloud.com/phrenic/',
  winter: 'https://www.mixcloud.com/cosmodvck/',
  ΜαΓιώ: 'https://www.mixcloud.com/itscosmiccandy/',
  viktoria: 'https://www.mixcloud.com/4741292/uploads/',
  saf: 'https://www.mixcloud.com/post_engineering/',
  zois: 'https://www.mixcloud.com/paparoup/',
  'Preacher Boys': 'https://www.mixcloud.com/gusboggar/',
  Cabal: 'https://www.mixcloud.com/Cabal_Stgm/',
  thnthr: 'https://www.mixcloud.com/thnthr/',
  'M.Tsonis': 'https://www.mixcloud.com/DjMtsonis/'
}

export const schedule: DaySchedule[] = [
  {
    id: 'monday',
    name: 'Monday',
    broadcasts: [
      { time: '00:00 - 06:00', title: 'Smokey bars and single malts', tags: 'Darkjazz, Noir Jazz, Nu Jazz' },
      { time: '06:00 - 12:00', title: 'Early Neural Activations', tags: 'Indie, Alternative, Punk' },
      { time: '12:00 - 18:00', title: 'Noonwraith', tags: 'Folk and Chill' },
      { time: '18:00 - 21:00', title: 'Ganuma de Anarres', tags: 'Synthwave, Coldwave, Darkwave' },
      { time: '21:00 - 22:00', title: 'Cosmic Candy', producer: 'ΜαΓιώ', isLive: true },
      { time: '22:00 - 23:00', title: 'Umbra', producer: 'naboer', isLive: true },
      { time: '23:00 - 00:00', title: 'Ganuma de Anarres', tags: 'Synthwave, Coldwave, Darkwave' }
    ]
  },
  {
    id: 'tuesday',
    name: 'Tuesday',
    broadcasts: [
      { time: '00:00 - 06:00', title: 'Dying after Midnight', tags: 'Atmospheric Black/Doom Metal' },
      { time: '06:00 - 12:00', title: 'Echoes in the Exoshpere', tags: 'IDM Ambient, Future Garage' },
      { time: '12:00 - 18:00', title: 'Urban Melancholy', tags: 'Experimental, Electronic, Pop' },
      { time: '18:00 - 22:00', title: 'Black is the Warmest Colour', tags: 'Post Hardcore, Blackgaze, Post Metal' },
      { time: '22:00 - 23:00', title: 'Recap', producer: 'zois', isLive: true },
      { time: '23:00 - 00:00', title: 'Black is the Warmest Colour', tags: 'Post Hardcore, Blackgaze, Post Metal' }
    ]
  },
  {
    id: 'wednesday',
    name: 'Wednesday',
    broadcasts: [
      { time: '00:00 - 06:00', title: 'Depression in a can', tags: 'Slow and Depressive' },
      { time: '06:00 - 12:00', title: 'Acid Vibrations', tags: 'Psych Folk, Acid Folk' },
      { time: '12:00 - 18:00', title: 'Long name!For.Post.Playlist', tags: 'Post Rock' },
      { time: '18:00 - 20:00', title: 'Psychonautics', tags: 'Psychedelic, Garage, World Vibes' },
      { time: '20:00 - 21:00', title: 'Musicology', producer: 'M.Tsonis', isLive: true },
      { time: '21:00 - 22:00', title: 'Psychomagic', producer: 'phren', isLive: true },
      { time: '22:00 - 23:00', title: 'Destroy all Monsters', producer: 'Cabal', isLive: true },
      { time: '23:00 - 00:00', title: 'Psychonautics', tags: 'Psychedelic, Garage, World Vibes' }
    ]
  },
  {
    id: 'thursday',
    name: 'Thursday',
    broadcasts: [
      { time: '00:00 - 06:00', title: 'Dying after Midnight', tags: 'Atmospheric Black/Doom Metal' },
      { time: '06:00 - 12:00', title: 'Dungeons, Synths and Irene', tags: 'Dungeon Synth/Ambient' },
      { time: '12:00 - 18:00', title: 'Urban Melancholy', tags: 'Experimental, Electronic, Pop' },
      { time: '18:00 - 22:00', title: 'Black is the Warmest Colour', tags: 'Post Hardcore, Blackgaze, Post Metal' },
      { time: '22:00 - 23:00', title: 'Cosmodvck', producer: 'winter (bi-weekly)', isLive: true },
      { time: '23:00 - 00:00', title: 'Black is the Warmest Colour', tags: 'Post Hardcore, Blackgaze, Post Metal' }
    ]
  },
  {
    id: 'friday',
    name: 'Friday',
    broadcasts: [
      { time: '00:00 - 06:00', title: 'Smokey bars and single malts', tags: 'Darkjazz, Noir Jazz, Nu Jazz' },
      { time: '06:00 - 12:00', title: 'Acid Vibrations', tags: 'Psych Folk, Acid Folk' },
      { time: '12:00 - 18:00', title: 'Dancing in a Batcave', tags: 'Post Punk, New Wave' },
      { time: '18:00 - 00:00', title: 'Steel Life', tags: 'Power/Heavy/Thrash Metal' }
    ]
  },
  {
    id: 'saturday',
    name: 'Saturday',
    broadcasts: [
      { time: '00:00 - 06:00', title: 'Depression in a can', tags: 'Slow and Depressive' },
      { time: '06:00 - 12:30', title: 'Dungeons, Synths and Irene', tags: 'Dungeon Synth/Ambient' },
      { time: '12:30 - 13:30', title: 'Ιντερμέδιο (bi-weekly)', producer: 'viktoria', isLive: true },
      { time: '13:30 - 18:00', title: 'Noonwraith', tags: 'Folk and Chill' },
      { time: '18:00 - 00:00', title: 'Psychonautics', tags: 'Psychedelic, Garage, World Vibes' }
    ]
  },
  {
    id: 'sunday',
    name: 'Sunday',
    broadcasts: [
      { time: '00:00 - 06:00', title: 'Decadent Futures', tags: 'Synthwave, Post Punk, Darkwave' },
      { time: '06:00 - 10:00', title: 'Early Neural Activations', tags: 'Indie, Alternative, Punk' },
      { time: '10:00 - 12:00', title: 'Guest Playlist (victoria)' },
      { time: '12:00 - 14:00', title: 'Guest Playlist (paparoup)' },
      { time: '14:00 - 16:00', title: 'Long name!For.Post.Playlist', tags: 'Post Rock' },
      { time: '16:00 - 18:00', title: 'Guest Playlist (cabal)' },
      { time: '18:00 - 20:00', title: 'Ganuma de Anarres', tags: 'Synthwave, Coldwave, Darkwave' },
      { time: '20:00 - 22:00', title: 'Guest Playlist (Post_Engineering)' },
      { time: '22:00 - 00:00', title: 'Guest Playlist (victoria)' }
    ]
  }
]

export function getCurrentDay(): string {
  return new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase()
}

