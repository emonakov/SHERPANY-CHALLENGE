import dummyState from './dummy';

it('should return its input', () => {
  expect(dummyState('test')).toEqual('test');
});
