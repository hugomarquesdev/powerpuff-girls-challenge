import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header = ({ show }) => ( // RECEIVES SHOW DATA AS PROPS
    <HeaderStyled>
        <div className='image-container'>
            <Link to='/'>
                <img src={show.image.medium} alt='Powerpuff Girls'/>
            </Link>
        </div>
        <div className='content'>
            <Link to='/'>
                <h1>{show.name}</h1>
            </Link>
            <p dangerouslySetInnerHTML={{ __html: show.summary}}></p>
        </div>
    </HeaderStyled>
)
  
export default Header

const HeaderStyled = styled.header`
    position:relative;
    padding:20px 3%;
    display: flex;
    align-items: center;

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
        display: block;
        
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