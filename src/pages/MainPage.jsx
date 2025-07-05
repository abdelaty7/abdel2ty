import React from 'react'
import Navbar from '../components/Main/Navbar'
import Welcome from '../components/Main/Welcome'
import Mix from '../components/Main/Mix'
import About from '../components/Main/About'
import Skills from '../components/Main/Skills'
import Portfolio from '../components/Main/Portfolio'
import Experience from '../components/Main/Experience'
import Certification from '../components/Main/Certification'
import Contact from '../components/Main/Contact'
import Footer from '../components/Main/Footer'

const MainPage = () => {
  return (
    <>
      <Navbar />
      <Welcome />
      <Mix />
      <About />
      <Skills />
      <Portfolio />
      <Experience />
      <Certification />
      <Contact />
      <Footer />
    </>
  )
}

export default MainPage