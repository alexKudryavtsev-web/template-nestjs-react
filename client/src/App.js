import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import Header from './components/header/Header';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './routes/routes';
import { store } from './store';

function AppRoutes({ isAuth }) {
  return useRoutes(isAuth ? PRIVATE_ROUTES : PUBLIC_ROUTES);
}

function App() {
  const isAuth = false;
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ChakraProvider>
          <Header isAuth={isAuth} />
          <AppRoutes isAuth={isAuth} />
        </ChakraProvider>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
