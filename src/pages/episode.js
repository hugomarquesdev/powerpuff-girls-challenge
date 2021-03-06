import { useLocation } from 'react-router-dom'
import styled from 'styled-components'

const EpisodesPage = () => {
    const location = useLocation() // HOOK FROM 'react-router-dom' TO GET PROPS PASSED THROUGH <Link/>
    const { episode } = location.state ? location.state : false // IF THERE'S CONTENT/PROPS PASSED THROUGH <Link/> ADD IT TO 'episode'. IF THERE'S NOT, SET 'episode' TO FALSE
    
    if (episode) { //IF EPISODE HAS CONTENT, RETURN EPISODE'S CONTENT
        return (
            <EpisodesStyled>                
                <div className='image-container'>
                    <img src={episode.image.original} alt={'Powerpuff Girls - Season ' + episode.season + ', Episode ' + episode.number}/>
                </div>
                <div className='content'>
                    <div className='info'>
                        <span>Season {episode.season}</span>
                        <span>Episode {episode.number}</span>
                    </div>
                    <div className='data'>
                        <h2><b>{episode.number}.&nbsp;</b>{episode.name}</h2>
                        <p dangerouslySetInnerHTML={{ __html: episode.summary}}></p>
                    </div>
                </div>
            </EpisodesStyled>
        )
    } else { // IF EPISODE HASN'T CONTENT (FALSE), SEND USER TO HOMEPAGE
        window.location.href = '/'
    }
}
  
export default EpisodesPage

const EpisodesStyled = styled.main`
    padding:0 3%;
    position:relative;
    display: flex;
    align-items: center;
    gap: 3%;

    .image-container{
        img{
            max-width:600px;
        }
    }

    .content{
        max-width:700px;

        .info{
            position:absolute;
            top:0;
            padding:1rem 0;
            margin-bottom:20px;
            
            span{
                border:1px solid #fff;
                background-color:#fff;
                color: #000;
                padding: 0.5rem 1rem;
                margin: 0 0.5rem;
                font-weight:500;
            }
        }

        h2{
            margin-bottom:1rem;
        }
    }
    
    
    // MEDIA QUERIES
    @media only screen and (max-width: 950px) {
        flex-wrap:wrap;

        .image-container{
            img{
                width:100%;
            }
        }

        .content{
            margin-top:1rem;

            .info{
                position:unset;
            }
        }
    }
`