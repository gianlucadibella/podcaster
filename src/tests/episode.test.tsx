import { MemoryRouter, Router } from 'react-router-dom'
import { type Result } from '../types'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { createMemoryHistory } from 'history'
import { Episode } from '../components/Episode'

// data dummy for testing, this is the data that will be passed to the component
const fakePodcast: Result[] = [
  {
    wrapperType: 'track',
    kind: 'podcast',
    artistId: 1535844019,
    collectionId: 1535809341,
    trackId: 1535809341,
    artistName: 'The Joe Budden Network',
    collectionName: 'The Joe Budden Podcast',
    trackName: 'The Joe Budden Podcast',
    collectionCensoredName: 'The Joe Budden Podcast',
    trackCensoredName: 'The Joe Budden Podcast',
    artistViewUrl: 'https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019?uo=4',
    collectionViewUrl: 'https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=4',
    feedUrl: 'https://jbpod.libsyn.com/applepodcast',
    trackViewUrl: 'https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=4',
    artworkUrl30: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/30x30bb.jpg',
    artworkUrl60: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.jpg',
    artworkUrl100: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/100x100bb.jpg',
    collectionPrice: 0.00,
    trackPrice: 0.00,
    collectionHdPrice: 0,
    releaseDate: '2023-04-19T07:00:00Z',
    collectionExplicitness: 'notExplicit',
    trackExplicitness: 'explicit',
    trackCount: 382,
    trackTimeMillis: 10192,
    country: 'USA',
    currency: 'USD',
    primaryGenreName: 'Music',
    contentAdvisoryRating: 'Explicit',
    artworkUrl600: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/600x600bb.jpg',
    genreIds: [
      '1310',
      '26'
    ],
    genres: [
      'Music',
      'Podcasts'
    ]
  },
  {
    country: 'USA',
    artworkUrl60: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.jpg',
    artistViewUrl: 'https://itunes.apple.com/us/artist/the-joe-budden-network/1535844019?mt=2&uo=4',
    contentAdvisoryRating: 'Explicit',
    trackViewUrl: 'https://podcasts.apple.com/us/podcast/episode-620-who-said/id1535809341?i=1000610181965&uo=4',
    collectionViewUrl: 'https://itunes.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?mt=2&uo=4',
    episodeUrl: 'https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_620.mp3?dest-id=2422538',
    trackTimeMillis: 8665000,
    episodeContentType: 'audio',
    artworkUrl160: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/160x160bb.jpg',
    episodeFileExtension: 'mp3',
    closedCaptioning: 'none',
    collectionId: 1535809341,
    collectionName: 'The Joe Budden Podcast',
    artistIds: [
      1535844019
    ],
    artworkUrl600: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/600x600bb.jpg',
    genres: [
      {
        name: 'Music',
        id: '1310'
      }
    ],
    episodeGuid: '511fae18-1dcd-47da-9cd3-3e91ab709b0f',
    description: 'The gang records their first episode without Joe as they begin with the latest news on Jonathan Majors as additional abuse allegations come to light (12:47) and Tiffany Haddish attempts to defend him (25:57). Desiigner seeks mental health treatment after exposing himself on an airplane (36:55), Frank Ocean pulls out of weekend 2 of Coachella due to an injury (1:00:33), and *SPOILER ALERT* Snowfall series finale recap (1:05:00). Also, the JBP gives their thoughts on the Chance the Rapper dancing video (1:29:01), Eagles QB Jalen Hurts pens a love letter to black women (1:40:06), + MORE!\n  \n Become a Patron of The Joe Budden Podcast for additional bonus episodes and visual content for all things JBP.: Tap in here www.patreon.com/JoeBudden\n \n Sleeper Picks:\n Ice | Lloyd Banks - “Cliffhanger”\n Melyssa | SamTRax (feat. Amber Oliver) - “You Are”\n Parks | Your Old Droog & Madlib - “Pronouns”\n Ish | Yung Bleu & Chris Brown - “Distant Lover”',
    shortDescription: 'The gang records their first episode without Joe as they begin with the latest news on Jonathan Majors as additional abuse allegations come to light (12:47) and Tiffany Haddish attempts to defend him (25:57). Desiigner seeks mental health treatment...',
    trackId: 1000610181965,
    trackName: 'Episode 620 | "Who Said?"',
    feedUrl: 'https://jbpod.libsyn.com/applepodcast',
    releaseDate: '2023-04-22T07:00:00Z',
    previewUrl: 'https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_620.mp3?dest-id=2422538',
    kind: 'podcast-episode',
    wrapperType: 'podcastEpisode'
  },
  {
    country: 'USA',
    artworkUrl60: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/60x60bb.jpg',
    artistViewUrl: 'https://itunes.apple.com/us/artist/the-joe-budden-network/1535844019?mt=2&uo=4',
    contentAdvisoryRating: 'Explicit',
    trackViewUrl: 'https://podcasts.apple.com/us/podcast/episode-602-the-honey-pack/id1535809341?i=1000599713875&uo=4',
    collectionViewUrl: 'https://itunes.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?mt=2&uo=4',
    episodeUrl: 'https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_602.mp3?dest-id=2422538',
    trackTimeMillis: 11029000,
    episodeContentType: 'audio',
    artworkUrl160: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/160x160bb.jpg',
    episodeFileExtension: 'mp3',
    closedCaptioning: 'none',
    collectionId: 1535809341,
    collectionName: 'The Joe Budden Podcast',
    artistIds: [
      1535844019
    ],
    artworkUrl600: 'https://is2-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/600x600bb.jpg',
    genres: [
      {
        name: 'Music',
        id: '1310'
      }
    ],
    episodeGuid: '8d4a62b2-ae92-4283-abc9-0cebef99e201',
    description: 'Friend of the Show and Colts Linebacker Zaire Franklin returns to the JBP as the gang starts by recapping the Chiefs/Eagles Super Bowl (20:31) before turning their attention to Rihanna’s halftime performance (47:20). Floyd Mayweather Jr. has agreed to an exhibition boxing match (1:30:28), everyone shares their thoughts on the red boots (1:38:15), and have the aliens arrived on earth (1:44:00)? Also, a train derailment in Ohio has caused an environmental disaster (1:52:55), Rest in Peace to Dave Jolicoeur of De La Soul, aka Trugoy the Dove (2:16:15), and will Damar Hamlin play in the NFL ever again? (2:23:25) + MORE! \n  \n Become a Patron of The Joe Budden Podcast for additional bonus episodes and visual content for all things JBP.: Tap in here www.patreon.com/JoeBudden\n  \n Sleeper Picks:\n Joe | RINI (feat. Bibi Bourelly) - “My Luv”\n Ice | Shotgun Suge - “I Dont Party”\n Parks | De La Soul, Handsome Boy Modeling School, & Starchild Excalibur - “If It Wasn’t for You”\n Ish | Sabrina Claudio - “Nurture”\n Melyssa Ford | Adi Oasis - “Whisper My Name”\n Zaire | Babyface Ray - “Ashanti”',
    shortDescription: 'Friend of the Show and Colts Linebacker Zaire Franklin returns to the JBP as the gang starts by recapping the Chiefs/Eagles Super Bowl (20:31) before turning their attention to Rihanna’s halftime performance (47:20). Floyd Mayweather Jr. has agreed...',
    trackId: 1000599713875,
    trackName: 'Episode 602 | "The Honey Pack"',
    feedUrl: 'https://jbpod.libsyn.com/applepodcast',
    releaseDate: '2023-02-15T08:30:00Z',
    previewUrl: 'https://traffic.libsyn.com/secure/jbpod/Joe_Budden_Podcast_602.mp3?dest-id=2422538',
    kind: 'podcast-episode',
    wrapperType: 'podcastEpisode'
  }
]

describe('Episode Component', () => {
  test('Renders the correct link to episode player', () => {
    // We simulate a click on the first episode of the podcast and check if the navigate function is called with the correct path
    const history = createMemoryHistory()
    const navigateMock = jest.fn()
    const ComponentWithRouter = render(
            <MemoryRouter history={history}>
                <Episode navigate={ navigateMock } podcast={ fakePodcast } podcastId={ fakePodcast[0].collectionId.toString() } setSelectEpisode={ jest.fn() } key={ Math.random() } />
            </MemoryRouter>
    )
    const { getByText } = ComponentWithRouter
    const button = getByText(fakePodcast[1].trackName)
    button.click()
    // Se simulamos un click en el primer episodio del podcast y comprobamos si la función navigate se llama con la ruta correcta
    expect(navigateMock).toHaveBeenCalledWith(`/podcast/${fakePodcast[1].collectionId}/episode/${fakePodcast[1].trackId}`)
  })
})
