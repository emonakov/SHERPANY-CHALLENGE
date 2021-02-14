import { render, screen, waitFor } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import axios from 'axios';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

import App from '../App';
import { getResults } from '../__mocks__/usersResponse';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Home page search', () => {
  const mockAxiosResponse = (nat: string, isError = false) => {
    if (!isError) {
      mockAxios.get
        .mockImplementationOnce(() =>
          Promise.resolve({
            data: getResults(nat, 0),
          }),
        )
        .mockImplementationOnce(() =>
          Promise.resolve({
            data: getResults(nat, 1),
          }),
        );
    }
  };

  beforeEach(() => jest.clearAllMocks());

  it('should search for the user by name or address', async () => {
    mockAxiosResponse(String(process.env.REACT_APP_NAT_SETTINGS_DEFAULT));
    render(<App />);
    await screen.findAllByLabelText('A user card');
    mockAllIsIntersecting(true);
    await screen.findByText('emilia.arias@example.com');
    userEvents.type(screen.getByLabelText('search user'), 'emilia arias');
    await waitFor(() => {
      expect(screen.getByLabelText('user searching list')).toBeInTheDocument();
    });
    expect(screen.getAllByLabelText('A user card')).toHaveLength(1);
    expect(screen.getByText(/Emilia Arias/)).toBeInTheDocument();
  });

  it('should clean search and return to the fetched list of users', async () => {
    mockAxiosResponse(String(process.env.REACT_APP_NAT_SETTINGS_DEFAULT));
    render(<App />);
    const allUserCards = await screen.findAllByLabelText('A user card');
    userEvents.type(screen.getByLabelText('search user'), 'hector gomez');
    await screen.findByLabelText('user searching list');
    expect(screen.getAllByLabelText('A user card')).toHaveLength(1);

    userEvents.type(
      screen.getByLabelText('search user'),
      '{selectall}{backspace}',
    );
    await screen.findByLabelText('user list');
    expect(screen.getAllByLabelText('A user card')).toHaveLength(
      allUserCards.length,
    );
  });

  it('should print nothing found message', async () => {
    mockAxiosResponse(String(process.env.REACT_APP_NAT_SETTINGS_DEFAULT));
    render(<App />);
    await screen.findAllByLabelText('A user card');
    userEvents.type(
      screen.getByLabelText('search user'),
      'some random search request',
    );
    await waitFor(() =>
      expect(screen.getByText('Nothing found')).toBeInTheDocument(),
    );
  });
});
