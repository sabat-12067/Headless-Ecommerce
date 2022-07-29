import React from 'react'
import headphone from '../../assets/images/headphone.png'
import headsets from '../../assets/images/headset.png'
import hometheater from '../../assets/images/hometheater.copy.jpg'
import speaker from '../../assets/images/speaker.png'

const categories = [
  {name: 'Headphones', image: headphone},
  {name: 'Headsets', image: headsets},
  {name: 'Home Theater', image: hometheater},
  {name: 'Speakers', image: speaker}
]

const Categories = () => {
  return (
    <h1>Categories</h1>
  )
}

export default Categories