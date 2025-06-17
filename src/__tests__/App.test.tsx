import { render, screen } from '@testing-library/react';
import App from 'src/App';

test('renders welcome message', () => {
  render(<App />);
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});