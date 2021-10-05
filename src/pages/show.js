import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectedNumberState, selectedSeasonState } from '../state/showSlice'

const ShowPage = () => {
    const selectedSeason = useSelector(state => state.episode.season) // GET SELECTED SEASON FROM STORE
    const showState = useSelector(state => state.episode.show) // GET SHOW DATA FROM STORE
    const dispatch = useDispatch()

    return (
        <ShowStyled>
            {showState.episodes.map((episode, i) => (
                (episode.season === selectedSeason) ? // ONLY SHOW THE EPISODES FROM THE SELECTED SEASON
                    <article className='episode-container' key={i}> 
                        <Link 
                            className='episode'
                            to={{
                                pathname: '/episode',
                                state: {
                                    episode: episode // SEND EPISODE DATA TO '/episodes' PAGE AS PROPS
                                }
                            }}
                            onClick={() => {dispatch(selectedNumberState(episode.number)); dispatch(selectedSeasonState(episode.season))}} // SET EPISODE NUMBER AND SEASON TO THE ONES SELECTED
                        >
                            <img src={episode.image.medium} alt={'Powerpuff Girls - Season ' + episode.season + ', Episode ' + episode.number}/>
                            <span><b>{episode.number}.&nbsp;</b></span>
                            <span>{episode.name}</span>
                        </Link>
                    </article>
                : (selectedSeason === 0) && // IF 'selectedSeason' IS 0 -> SHOW ALL THE EPISODES
                    <article className='episode-conainer' key={i}>
                        <Link 
                            className='episode'
                            to={{
                                pathname: '/episode',
                                state: {
                                    episode: episode // SEND EPISODE DATA TO '/episodes' PAGE AS PROPS
                                }
                            }}
                            onClick={() => {dispatch(selectedNumberState(episode.number)); dispatch(selectedSeasonState(episode.season))}} // SET EPISODE NUMBER AND SEASON TO THE ONES SELECTED
                        >
                            <img src={episode.image.medium} alt={'Powerpuff Girls - Season ' + episode.season + ', Episode ' + episode.number}/>
                            <span><b>{episode.number}.&nbsp;</b></span>
                            <span>{episode.name}</span>
                        </Link>
                    </article>
            ))}
        </ShowStyled>
    )
}
  
export default ShowPage

const ShowStyled = styled.main`
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap:1rem;
    padding:0 3%;


    .episode{
        display:flex;
        align-items:center;

        img{
            max-width:150px;
            margin-right:1rem;
        }
    }   

    // MEDIA QUERIES
    @media only screen and (max-width: 1200px) {
        grid-template-columns: repeat(2,1fr); 
    } 

    @media only screen and (max-width: 700px) {
        grid-template-columns: 1fr;
    }
`