import { render, screen } from '@testing-library/react';
import userEvents from '@testing-library/user-event';
import axios from 'axios';

import App from '../App';
import { getResults } from '../__mocks__/usersResponse';
jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('Home page entry', () => {
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
    } else {
      mockAxios.get.mockImplementation(() => Promise.reject('network error'));
    }
  };

  const gotoSettingsPage = async (nat: string) => {
    mockAxiosResponse(nat);
    const result = render(<App />);
    await screen.findAllByLabelText('A user card');
    userEvents.click(screen.getByText('Settings'));

    return {
      ...result,
      goBack: () => userEvents.click(screen.getByText('Home')),
    };
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should go to a settings page, change nothing and return back to the original list of users', async () => {
    const { goBack } = await gotoSettingsPage(
      String(process.env.REACT_APP_NAT_SETTINGS_DEFAULT),
    );

    userEvents.click(screen.getByLabelText('Open Drop'));
    userEvents.click(screen.getAllByText('ES')[1]);
    goBack();
    expect(screen.getByText('ES')).toBeInTheDocument();
    expect(screen.getByText('hector.gomez@example.com')).toBeInTheDocument();
    expect(screen.getByText('isabel.campos@example.com')).toBeInTheDocument();
  });

  it('should go to a settings page once more and change nat settings, then load new users', async () => {
    const { goBack } = await gotoSettingsPage(
      String(process.env.REACT_APP_NAT_SETTINGS_DEFAULT),
    );

    userEvents.click(screen.getByLabelText('Open Drop'));
    userEvents.click(screen.getByText('GB'));
    mockAxiosResponse('GB');
    goBack();
    expect(screen.getByText('GB')).toBeInTheDocument();
    await screen.findAllByLabelText('A user card');
    expect(screen.getByText('abigail.knight@example.com')).toBeInTheDocument();
    expect(screen.getByText('susie.garcia@example.com')).toBeInTheDocument();
  });
});
