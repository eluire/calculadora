import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Calculadora from  './Components/Calculadora/Calculadora'
const Routes = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/calculadora" component ={Calculadora}/>
            </Switch>
        </BrowserRouter>
    )
}

export default Routes;