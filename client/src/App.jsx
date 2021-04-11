import React from 'react'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import HomePage from './pages/Home';
import ResturantDetail from './pages/ResturantDetail';
import UpdateResturant from './pages/UpdateResturant';
import { RestaurantsContextProvider } from './contexts/ResturantContext';

const App = () =>{
    return  (
        <RestaurantsContextProvider>
             <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={HomePage}/>
                    <Route exact path="/resturants/:id" component={ResturantDetail}/>
                    <Route exact path="/resturants/:id/update" component={UpdateResturant}/>
                </Switch>
            </BrowserRouter>
        </RestaurantsContextProvider>
    )
}

export default App;