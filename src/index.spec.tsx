import ReactDOM from 'react-dom';
jest.mock('react-dom');

it('renders without crashing', () => {
  require('./index');
  expect(ReactDOM.render).toHaveBeenCalled();
});
