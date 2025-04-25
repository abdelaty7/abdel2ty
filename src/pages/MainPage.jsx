import React from 'react'
import Navbar from '../components/Main/Navbar'
import Welcome from '../components/Main/Welcome'
import Counter from '../components/Main/Counter'
import About from '../components/Main/About'
import Experience from '../components/Main/Experience'
import Portfolio from '../components/Main/Portfolio'
import Contact from '../components/Main/Contact'
import Footer from '../components/Main/Footer'

const MainPage = () => {
  return (
    <>
      <Navbar />
      <Welcome />
      <Counter />
      <About />
      <Experience />
      <Portfolio />
      <Contact />
      <Footer />
    </>
  )
}

export default MainPage