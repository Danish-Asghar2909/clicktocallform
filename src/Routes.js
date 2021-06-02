import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import SiteRoute from './SiteRoute';
import Home from './pages/Home';
import Register from './pages/user/Register';
import Login from './pages/user/Login';
import Error404 from './pages/Error404';
import DemoLogin from './pages/user/DemoLogin';
import DemoHome from './pages/user/DemoHome';
import DailedNumber from './pages/user/DailedNumber';
import DailAgents from './pages/user/DailAgents';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <SiteRoute exact path='/' component={Home} />
        <SiteRoute exact path='/home' component={DemoHome} />
        <SiteRoute exact path='/dialed' component={DailedNumber} />
        <SiteRoute exact path='/register' component={Register} />
        <SiteRoute exact path='/agents' component={DailAgents}/>
        {/* DemoLogin is created by me and i replaced it with login to make the form work like i wanted */}
        {/* <SiteRoute exact path='/login' component={Login} /> */}
        <SiteRoute exact path='/login' component={DemoLogin} />
        <SiteRoute exact path='/demo' component={DemoLogin}/>
        <SiteRoute component={Error404} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;