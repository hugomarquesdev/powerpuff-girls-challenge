import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ShowPage from './pages/show'
import EpisodePage from './pages/episode'
import Header from './components/Header'
import { useSelector, useDispatch } from 'react-redux'
import { showData } from './state/showSlice'

const App = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false) // WHILE API FETCHING ISN'T COMPLETED, SET 'isLoaded' TO FALSE
    const showState = useSelector(state => state.episode.show)   
    const [show, setShow] = useState()
    const dispatch = useDispatch()

    useEffect(() => { // SET SHOWDATA'S STATE TO AN OBJECT WITH THE DETAILS, EPISODES AND SEASONS
        dispatch(showData(show))
    },[show])
  
    // FETCH DATA FROM API
    useEffect(() => {
        Promise.all([
            // FETCH SHOW, EPISODES AND SEASONS
            fetch('https://api.tvmaze.com/shows/1955'),
            fetch('https://api.tvmaze.com/shows/1955/episodes'),
            fetch('https://api.tvmaze.com/shows/1955/seasons')
        ])
        .then(res => 
            Promise.all(res.map(res => res.json())))  // CREATES JSON OBJECT WITH SHOW DATA, EPISODES AND SEASONS
        .then(
            (result) => {
                setIsLoaded(true) // IF FETCHING WAS COMPELTED SUCCESSFULLY, SET 'isLoaded' TO TRUE
                setShow({ details: result[0], episodes: result[1], seasons: result[2] }) // SET 'show' STATE TO 3 OBJECTS -> 'details', 'episodes' and 'seasons'
            },
            (error) => {
                setIsLoaded(true) // IF FETCHING HAD AN ERROR, SET 'isLoaded' TO TRUE
                setError(error) // IF THERE'S AN ERROR, SET 'error' TO TRUE
        });
    }, [])
    
    // WHILE IT'S FETCHING THE DATA OR THE 'show' STATE IS STILL EMPTY, SHOW A LOADING MESSAGE
    if (!isLoaded || !showState) {
        return <div>Loading...</div>
    } else 
        // RETURNS ERROR MESSAGE IF THE DATA WASN'T FETCHED CORRECTLY
        if (error) {
            return <div>Error: {error.message}</div>
    } else {
        // THE APP RUNS IF THE DATA WAS FETCHED CORRECTLY
        return (
            <>
                <Header/>
                <Switch>
                    <Route path='/' exact>
                        <ShowPage/>
                    </Route>
                    <Route path='/episode'>
                        <EpisodePage/>
                    </Route>
                    
                </Switch>
            </>
        )
    }
}

export default App