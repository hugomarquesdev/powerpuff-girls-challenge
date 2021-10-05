import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Navbar from '../components/Navbar'
import { useDispatch } from 'react-redux'
import { selectedNumberState, selectedSeasonState } from '../state/showSlice'

const Header = () => {
    const showState = useSelector(state => state.episode.show) // GET SHOW DATA FROM STORE
    const dispatch = useDispatch()
    
    return(
        <HeaderStyled>
            <div className='details'>
                <div className='image-container'>
                    <Link 
                        to='/' 
                        onClick={() => {dispatch(selectedNumberState(0)); dispatch(selectedSeasonState(0))}} // SET SELECTED EPISODE NUMBER AND SELECTED SEASON TO 0
                    >
                        <img src={showState.details.image.medium} alt='Powerpuff Girls'/>
                    </Link>
                </div>
                <div className='content'>
                    <Link to='/'>
                        <h1>{showState.details.name}</h1>
                    </Link>
                    <p dangerouslySetInnerHTML={{ __html: showState.details.summary}}></p>
                </div>
            </div>
            <Navbar/>
        </HeaderStyled>
    )
}
  
export default Header

const HeaderStyled = styled.header`
    position:relative;
    padding:20px 3%;
    display: flex;
    flex-direction:column;

    .details{
        padding-bottom:20px;
        display:flex;
        align-items:center;
    }

    .image-container{
        max-width:150px;

        img{
            width:100%;
            height:100%;
        }
    }

    .content{
        margin-left:2rem;

        h1{
            margin-bottom:1rem;
        }

        p{
            max-width: 600px;
        }
    }

    // MEDIA QUERIES
    @media only screen and (max-width: 950px) {
        .details{
            display: block;
        }
        
        .image-container{
            position: absolute;
            z-index: -1;
            opacity: 0.5;
            top: 0;
            left: 50%;
            transform: translateX(-50%);
            height:100%;
        }

        .content{
            margin-left: 0;
            text-align: center;

            p{
                margin:0 auto;
            }
        }
    }   
`