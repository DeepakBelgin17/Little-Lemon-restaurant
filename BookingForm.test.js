import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

describe('BookingForm Component', () => {
  test('renders the form elements correctly', () => {
    render(<BookingForm />);

    // Check if each input field and button is in the document
    expect(screen.getByLabelText(/Date:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Time:/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Guests:/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Book Table/i })).toBeInTheDocument();
  });

  test('shows error messages for empty fields on submit', () => {
    render(<BookingForm />);
    fireEvent.click(screen.getByRole('button', { name: /Book Table/i }));

    // Expect error messages for each required field
    expect(screen.getByText(/Date is required./i)).toBeInTheDocument();
    expect(screen.getByText(/Time is required./i)).toBeInTheDocument();
    expect(screen.getByText(/Number of guests is required./i)).toBeInTheDocument();
  });

  test('does not show error messages when fields are filled in', () => {
    render(<BookingForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Date:/i), { target: { value: '2024-11-10' } });
    fireEvent.change(screen.getByLabelText(/Time:/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/Guests:/i), { target: { value: '2' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Book Table/i }));

    // Verify no error messages are displayed
    expect(screen.queryByText(/Date is required./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Time is required./i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Number of guests is required./i)).not.toBeInTheDocument();
  });

  test('logs the booking data to console on successful submit', () => {
    console.log = jest.fn(); // Mock console.log

    render(<BookingForm />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Date:/i), { target: { value: '2024-11-10' } });
    fireEvent.change(screen.getByLabelText(/Time:/i), { target: { value: '18:00' } });
    fireEvent.change(screen.getByLabelText(/Guests:/i), { target: { value: '2' } });

    // Submit the form
    fireEvent.click(screen.getByRole('button', { name: /Book Table/i }));

    // Verify that console.log was called with the form data
    expect(console.log).toHaveBeenCalledWith("Booking submitted", {
      date: '2024-11-10',
      time: '18:00',
      guests: '2',
    });
  });
});
