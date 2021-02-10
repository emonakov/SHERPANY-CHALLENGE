import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { store } from './store';

import './index.css';
import App from './App';

const queryClient = new QueryClient();

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
  document.getElementById('root'),
);
