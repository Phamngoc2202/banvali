import { render, screen } from '@testing-library/react';
import App from './App';

test('renders NOMA homepage hero', () => {
  render(<App />);
  expect(screen.getByText(/Vi Vu Mùa Hè/i)).toBeInTheDocument();
  expect(
    screen.getByRole('link', { name: /^Khám phá bộ sưu tập$/i })
  ).toBeInTheDocument();
});
