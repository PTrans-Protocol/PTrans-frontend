import { Button} from '@mui/material';
import React, { Suspense, useState } from 'react';
import MainLayout from './components/layout';
import {Route, BrowserRouter as Router, Switch } from 'react-router-dom';

function App() {
  const DepositWithdraw = React.lazy(() => import('./pages/DepositWithdraw'))
  return (
    <div>
      <MainLayout>
        <Router>
        <Switch>
          <Route path='/' render={
            (props) => {
              return <Suspense fallback={null}>
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
