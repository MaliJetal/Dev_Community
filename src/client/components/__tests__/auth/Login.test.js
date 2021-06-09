import {render, screen} from '@testing-library/react';
import Login from '../../auth/Login';
import React from 'react';

test('first test', () => {
  render(<Login />);
  const email = screen.getByLabelText("email");
  expect(email).toBeInTheDocument();
});