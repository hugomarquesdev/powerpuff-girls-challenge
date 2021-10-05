import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { selectedSeasonState } from '../state/showSlice'
import { Link } from 'react-router-dom'



const Button = ({ text, seasonState, selectedSeason }) => {  // RECEIVES ALL SEASONS AND THE SELECTED SEASON FROM STORE
    const dispatch = useDispatch()

    return (
        <Link to='/'>
            <ButtonStyled
                onClick={() => dispatch(selectedSeasonState(seasonState))} // SET SELECTED SEASON TO THE SEASON CLICKED
                style={selectedSeason === seasonState ? { backgroundColor:'#fff', color:'#000' } : { backgroundColor:'#000'}} // IF THIS BUTTON IS THE ACTIVE SEASON, CHANGE STYLE
            >
                {text}  
            </ButtonStyled>
        </Link>
    )
}
  
export default Button

const ButtonStyled = styled.button`
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

    // MEDIA QUERIES
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
        .seasons{
            grid-template-columns: repeat(2,1fr);
        }  
    }
`