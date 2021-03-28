import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

import './Footer.css';
import cfrefLogo from '../assets/CFREF_logo.png';
import ccLogo from '../assets/CC_logo.png';
import institutionLogo from '../assets/uwaterloo_logo.png';

export default function Footer() {
    return (
        <div className='footer'>
            <div className='footer-info'>
                <p>© ArGan's Lab</p>
                <p><FontAwesomeIcon icon={faBuilding} /> School of Pharmacy, University of Waterloo</p>
                <p><FontAwesomeIcon icon={faMapMarkerAlt} /> 10 Victoria St S A, Kitchener, ON, Canada</p>
                <p><FontAwesomeIcon icon={faEnvelope} /> <a href='mailto:aravindhan.ganesan@uwaterloo.ca'>Aravindhan Ganesan</a></p>
            </div>
            <div className='footer-acknowledgements'>
                <img src={cfrefLogo} alt='Canada First Research Fund logo' className='footer-logo' />
                <img src={ccLogo} alt='Compute Canada logo' className='footer-logo' />
                <div className='v-line'></div>
                <img src={institutionLogo} alt='University of Waterloo logo' className='footer-logo' />
            </div>
        </div>
    );
}
