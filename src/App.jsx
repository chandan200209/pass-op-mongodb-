import { useState } from 'react'
import Navbar from '../src/components/Navbar';
import Manager from './components/Manager';
import Footer from './components/Footer';

function App() {

  return (
    <div className='min-h-screen'>
      <Navbar />
      <div className='min-h-[calc(100vh-64px)]'><Manager /></div>
      <Footer />
    </div>
  )
}

export default App;
