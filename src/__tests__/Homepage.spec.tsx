import { render, screen, waitFor } from '@testing-library/react';
import userEvents, { TargetElement } from '@testing-library/user-event';
import axios from 'axios';
import { mockAllIsIntersecting } from 'react-intersection-observer/test-utils';

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

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the entry point with the default nat settings', () => {
    render(<App />);
    expect(screen.getByLabelText('search user')).toBeInTheDocument();
    expect(screen.getByLabelText('navigate to home page')).toBeInTheDocument();
    expect(screen.getByLabelText('navigate to settings')).toBeInTheDocument();
    expect(screen.getByText('ES')).toBeInTheDocument();
    expect(screen.queryByLabelText('A user card')).not.toBeInTheDocument();
  });

  it('should load the list of users', async () => {
    mockAxiosResponse(String(process.env.REACT_APP_NAT_SETTINGS_DEFAULT));
    render(<App />);
    await screen.findAllByLabelText('A user card');

    expect(screen.getByText('hector.gomez@example.com')).toBeInTheDocument();
    expect(screen.getByText('isabel.campos@example.com')).toBeInTheDocument();
    expect(
      screen.queryByText('emilia.arias@example.com'),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText('celia.mora@example.com'),
    ).not.toBeInTheDocument();
  });

  it('should load the list of users and its second page', async () => {
    mockAxiosResponse(String(process.env.REACT_APP_NAT_SETTINGS_DEFAULT));
    render(<App />);
    await screen.findAllByLabelText('A user card');

    expect(screen.getByText('hector.gomez@example.com')).toBeInTheDocument();
    expect(screen.getByText('isabel.campos@example.com')).toBeInTheDocument();

    mockAllIsIntersecting(true);

    await screen.findByText('emilia.arias@example.com');
    expect(screen.getByText('emilia.arias@example.com')).toBeInTheDocument();
    expect(screen.getByText('celia.mora@example.com')).toBeInTheDocument();
    mockAllIsIntersecting(true);
    expect(screen.queryByText('No more users to load')).toBeInTheDocument();
  });

  it('should render a user modal with their address and phone number', async () => {
    mockAxiosResponse(String(process.env.REACT_APP_NAT_SETTINGS_DEFAULT));
    render(<App />);
    const modalButton = await screen.findByLabelText(
      'Open address data for Mr Hector Gomez',
    );

    userEvents.click(modalButton);
    expect(
      screen.getByLabelText(`User's phone number 911-897-490`),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(`User's cell number 608-986-691`),
    ).toBeInTheDocument();

    userEvents.click(screen.getByLabelText('close modal'));
    expect(
      screen.queryByLabelText(`User's phone number 911-897-490`),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText(`User's cell number 608-986-691`),
    ).not.toBeInTheDocument();
  });

  it('should render a user modal and be able to close it by clicking on overlay', async () => {
    mockAxiosResponse(String(process.env.REACT_APP_NAT_SETTINGS_DEFAULT));
    render(<App />);
    const modalButton = await screen.findByLabelText(
      'Open address data for Mr Hector Gomez',
    );

    userEvents.click(modalButton);
    expect(
      screen.queryByLabelText(`User's phone number 911-897-490`),
    ).toBeInTheDocument();

    const modalOverlay = (document.querySelector(
      '.ReactModal__Overlay',
    ) as unknown) as TargetElement;
    userEvents.click(modalOverlay);
    expect(
      screen.queryByLabelText(`User's phone number 911-897-490`),
    ).not.toBeInTheDocument();
  });

  it('should print the error message when request fails', async () => {
    mockAxiosResponse('', true);
    render(<App />);

    waitFor(() =>
      expect(screen.getByText('Something went wrong')).toBeInTheDocument(),
    );
  });
});
