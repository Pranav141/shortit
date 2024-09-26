import React from 'react';
import UrlForm from '../components/UrlForm';

function Home() {
  return (
    <div className='flex flex-col min-h-screen'>
      <div className='flex-grow '>
        <UrlForm />
      </div>
    </div>
  );
}

export default Home;
