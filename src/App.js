import { Route, Switch } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ShowPage from './pages/show'
import EpisodesPage from './pages/episodes'
import Header from './components/Header'

const App = () => {
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [show, setShow] = useState()
  
    // FETCH DATA FROM API
    useEffect(() => {
        Promise.all([
            // FETCH SHOW, EPISODES AND SEASONS
            fetch('https://api.tvmaze.com/shows/1955'),
            fetch('https://api.tvmaze.com/shows/1955/episodes'),
            fetch('https://api.tvmaze.com/shows/1955/seasons')
        ])
        .then(res => 
            Promise.all(res.map(res => res.json())))  // CREATES JSON OBJECT WITH SHOW DATA AND EPISODES
        .then(
            (result) => {
                setIsLoaded(true) // WHILE FETCHING, SET 'isLoaded' TO TRUE
                setShow({ details: result[0], episodes: result[1], seasons: result[2] }) // SET 'show' STATE TO 3 OBJECTS -> 'details' (SHOW DATA), 'episodes' (EPISODES DATA), 'seasons' (SEASONS DATA)
            },
            (error) => {
                setIsLoaded(true) // WHILE FETCHING, SET 'isLoaded' TO TRUE
                setError(error) // IF THERE'S AN ERROR, SET 'error' TO TRUE
        });
    }, [])
    
    // WHILE IT'S FETCHING THE DATA OR THE 'show' STATE IS STILL EMPTY, SHOW A LOADING MESSAGE
    if (!isLoaded || !show) {
        return <div>Loading...</div>
    } else 
        // RETURNS ERROR MESSAGE IF THE DATA WASN'T FETCHED CORRECTLY
        if (error) {
            return <div>Error: {error.message}</div>
    } else {
        // THE APP RUNS IF THE DATA WAS FETCHED CORRECTLY
        return (
            <>
                <Header show={show.details}/> {/* SEND SHOW DATA AS PROPS */}
                <Switch>
                    <Route path='/' exact>
                        <ShowPage episodes={show.episodes} seasons={show.seasons}/> {/* SEND EPISODES AND SEASONS DATA AS PROPS */}
                    </Route>
                    <Route path='/episodes'>
                        <EpisodesPage/>
                    </Route>
                </Switch>
            </>
        )
    }
}

export default App