import React, { useState } from 'react';

function BookingForm() {
  const [formData, setFormData] = useState({ date: '', time: '', guests: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.date) errors.date = "Date is required.";
    if (!formData.time) errors.time = "Time is required.";
    if (!formData.guests) errors.guests = "Number of guests is required.";
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Booking submitted", formData);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Date:</label>
      <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} />
      {errors.date && <p>{errors.date}</p>}

      <label htmlFor="time">Time:</label>
      <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} />
      {errors.time && <p>{errors.time}</p>}

      <label htmlFor="guests">Guests:</label>
      <input type="number" id="guests" name="guests" value={formData.guests} onChange={handleChange} />
      {errors.guests && <p>{errors.guests}</p>}

      <button type="submit">Book Table</button>
    </form>
  );
}

export default BookingForm;
