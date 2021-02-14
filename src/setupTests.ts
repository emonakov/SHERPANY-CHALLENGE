// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import 'react-intersection-observer/test-utils';
import 'react-app-polyfill/stable';

const noop = () => undefined;
Object.defineProperty(window, 'scrollTo', { value: noop, writable: true });
