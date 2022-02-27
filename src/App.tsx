import React, { useEffect, useState } from 'react';
import Routes from './routes';
import { AppContext } from './libs/context-lib';
import { Hub } from 'aws-amplify';

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    Hub.listen(/.*/, (data) => {
      console.log(data);
    });
  }, []);

  return (
    <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
      <Routes />
    </AppContext.Provider>
  );
}

export default App;