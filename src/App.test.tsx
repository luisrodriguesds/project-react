import React from 'react';
import {act, fireEvent, render, screen} from '@testing-library/react';
import App from './App';
const wait = (amount = 0): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, amount));
};

const actWait = async (amount = 0): Promise<void> => {
  await act(async () => {
    await wait(amount);
  });
};
test('expect login to be rendered', async () => {
  render(<App />);

  expect(screen.getByText('Email Address')).toBeInTheDocument()
  expect(screen.getByText('Password')).toBeInTheDocument()
  expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()

  const linkElement = screen.getByText('Sign In');
  expect(linkElement).toBeEnabled();
  expect(linkElement).toBeInTheDocument();
    fireEvent.change(screen.getByPlaceholderText('Enter email'), { target: { value: 'lucas@gmail.com' } })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: '123456' } })

   // fireEvent.submit(screen.getByText('Sign In'))
   // fireEvent.keyDown(screen.getByPlaceholderText('Enter email'), { key: 'Enter', code: 'Enter' })
  await actWait(500);

  fireEvent.click(screen.getByRole('button'))
  await actWait(7000);

  //await new Promise<void>(resolve => setTimeout(()=>resolve(), 7000)).then(()=>console.log("fired"));

  //expect(linkElement).toBeInTheDocument();
  console.log(window.location.pathname)
  expect(window.location.pathname==='/catalog').toBeTruthy();
},9000);
