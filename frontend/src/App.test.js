import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders the login page by default', () => {
  render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
  );
  const loginElement = screen.getByPlaceholderText(/username|email/i);
  expect(loginElement).toBeInTheDocument();
});

test('renders the register page', () => {
  render(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
  );
  const registerElement = screen.getByPlaceholderText(/username|email/i);
  expect(registerElement).toBeInTheDocument();
});