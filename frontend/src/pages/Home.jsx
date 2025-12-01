import React from 'react'
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import FeatureCollection from '../components/FeatureCollection' // Fixed import
import RetroCollection from '../components/RetroCollection'
import VintageBackground from '../components/VintageBackground'

const Home = () => {
  return (
    <div>
      <VintageBackground />
      <Hero />
      <LatestCollection />
      <FeatureCollection /> {/* Fixed component name */}
      <RetroCollection />
      <BestSeller />
      <OurPolicy />
      <NewsletterBox />
    </div>
  )
}

export default Home
