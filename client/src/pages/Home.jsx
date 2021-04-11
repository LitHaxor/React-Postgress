import React from 'react'
import AddResturant from '../components/AddResturant'
import Header from '../components/Header'
import ResturantList from '../components/ResturantList'

const HomePage = () => {
    return (
        <div className="container">
            <Header/>
           
            <AddResturant/>

            <ResturantList/>

        </div>
    )
}

export default HomePage
