import { Button} from '@mui/material';
import React, { Suspense, useState } from 'react';
import MainLayout from './components/layout';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Wait from './components/Wait';

function App() {
  const DepositWithdraw = React.lazy(() => import('./pages/DepositWithdraw'))
  return (
    <div>
      <MainLayout>
        <Router>
        <Switch>
          <Route path='/' render={
            (props) => {
              return <Suspense fallback={<Wait/>}>
                <DepositWithdraw/>
              </Suspense>
            }
          }/>
        </Switch>
        </Router>
      </MainLayout>
    </div>
  );
}

export default App;
