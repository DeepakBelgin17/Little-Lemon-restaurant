import React from 'react';
import Header from './components/Header';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <BookingForm />
      </main>
      <Footer />
    </div>
  );
}

export default App;
