import React from 'react';
import Navbar from '../components/Navbar';
import UrlForm from '../components/UrlForm';
import Footer from '../components/Footer';

function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div className='flex-grow '>
        <UrlForm />
      </div>
      <Footer />
    </div>
  );
}

export default Home;
