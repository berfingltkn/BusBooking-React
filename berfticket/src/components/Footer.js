import React from 'react'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import '../styles/Footer.css';

export function Footer() {
  return (
    <div className='footer'>
      <div className='socialMedia'>
        <FacebookIcon />
        <InstagramIcon />
        < TwitterIcon />

      </div>
      <p>All rights reserved | BerfTicket</p>
      
    </div>
  )
}

export default Footer
