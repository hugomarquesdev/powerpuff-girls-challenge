import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const ShowPage = ({ episodes, seasons }) => {  // RECEIVES EPISODE AND SEASONS DATA AS PROPS
    const [activeSeason, setActiveSeason] = useState(0) // THIS STATE CHANGES TO THE NUMBER OF THE SEASON WHERE THE USER CLICKS

    return (
        <ShowStyled>
            <div className='seasons'>
                <button 
                    onClick={() => setActiveSeason(0)} // SET 'activeSeason' TO 0 (0 WILL SHOW ALL SEASONS)
                    style={activeSeason === 0 ? { backgroundColor:'#fff', color:'#000' } : { backgroundColor:'#000'}} // IF THIS BUTTON IS THE ACTIVE SEASON, CHANGE STYLE
                >
                    All Seasons
                </button>
                {seasons.map((season, i) => (
                    <button
                        onClick={() => setActiveSeason(season.number)} // SET 'activeSeason' TO SEASON'S NUMBER CLICKED
                        style={activeSeason === season.number ? { backgroundColor:'#fff', color:'#000' } : { backgroundColor:'#000'}} // IF THIS BUTTON IS THE ACTIVE SEASON, CHANGE STYLE
                        key={i}
                    >
                        Season {season.number}
                    </button>
                ))}
            </div> 

            <div className='episodes'>
                {episodes.map((episode, i) => (
                    (episode.season === activeSeason) ? // ONLY SHOW THE EPISODES FROM THE SELECTED(CLICKED) SEASON (activeSeason)
                        <div className='episode-container' key={i}> 
                            <Link 
                                className='episode'
                                to={{
                                    pathname: '/episodes',
                                    state: {
                                        episode: episode // SEND EPISODE DATA TO '/episodes' PAGE AS PROPS
                                    }
                                }}
                            >
                                <img src={episode.image.medium} alt={'Powerpuff Girls - Season ' + episode.season + ', Episode ' + episode.number}/>
                                <span><b>{episode.number}.&nbsp;</b></span>
                                <span>{episode.name}</span>
                            </Link>
                        </div>
                   : (activeSeason === 0) && // IF 'activeSeason' IS 0 -> SHOW ALL THE EPISODES
                        <div className='episode-conainer' key={i}>
                            <Link 
                                className='episode'
                                to={{
                                    pathname: '/episodes',
                                    state: {
                                        episode: episode // SEND EPISODE DATA TO '/episodes' PAGE AS PROPS
                                    }
                                }}
                            >
                                <img src={episode.image.medium} alt={'Powerpuff Girls - Season ' + episode.season + ', Episode ' + episode.number}/>
                                <span><b>{episode.number}.&nbsp;</b></span>
                                <span>{episode.name}</span>
                            </Link>
                        </div>
                ))}
            </div>   
        </ShowStyled>
    )
}
  
export default ShowPage

const ShowStyled = styled.div`
    padding:0 3%;

    .seasons{
        border:1px solid #fff;
        border-left:0;
        border-right:0;
        padding:1rem 0;
        margin-bottom:20px;     
        
        button{
            border:1px solid #fff;
            color: #fff;
            padding: 0.5rem 1rem;
            margin: 0 0.5rem;
            font-weight:500;

            :hover{
                background-color: #fff !important;
                color:#000;
            }
        }
    }

    .episodes{
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-gap:1rem;

        .episode{
            display:flex;
            align-items:center;

            img{
                max-width:150px;
                margin-right:1rem;
            }
        }
    }

    

    // MEDIA QUERIES
    @media only screen and (max-width: 1200px) {
        .episodes{
            grid-template-columns: repeat(2,1fr);
        }   
    } 

    @media only screen and (max-width: 950px) {
        .seasons{
            display: grid;
            grid-template-columns: repeat(3,1fr);
            grid-gap: 1rem;

            button{
                margin: 0;
            }
        }   
    }   

    @media only screen and (max-width: 700px) {
        .episodes{
            grid-template-columns: 1fr;
        }  
        
        .seasons{
            grid-template-columns: repeat(2,1fr);
        }  
    }
`