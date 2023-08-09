import React from 'react'
import Search from '../Search/search'
import JobList from '../JobList/jobList'
import remote from './remote.svg'
import './home.css'

function Home() {
    return (
        <div className="home">
            <div className="welcome">
                <img src={remote} className="welcome__img" alt="remote"/>
                <h1 className="welcome__text">Curated jobs just for you </h1>
                <p className="welcome__text-small">Explore jobs of your wish here</p>
            </div>
            <Search/>
            <JobList/>
        </div>
    )
}

export default Home