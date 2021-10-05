import styled from 'styled-components'
import { useSelector } from 'react-redux'
import Button from './Button'


const Navbar = () => {
    const selectedSeason = useSelector(state => state.episode.season) // GET SELECTED SEASON
    const showState = useSelector(state => state.episode.show) // GET SHOW DATA FROM STORE

    return (
        <NavbarStyled>
                <Button
                    text='All Seasons' 
                    seasonState={0} 
                    selectedSeason={selectedSeason}
                />
                {showState.seasons.map((season, i) => (
                    <Button 
                        text={`Season ` + season.number} 
                        seasonState={season.number} 
                        selectedSeason={selectedSeason} 
                        key={i}/>
                ))}
        </NavbarStyled>
    )
}
  
export default Navbar

const NavbarStyled = styled.nav`
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

    // MEDIA QUERIES
    @media only screen and (max-width: 950px) {
        display: grid;
        grid-template-columns: repeat(3,1fr);
        grid-gap: 1rem;

        button{
            margin: 0;
        }  
    }   

    @media only screen and (max-width: 700px) {
        grid-template-columns: repeat(2,1fr); 
    }
`