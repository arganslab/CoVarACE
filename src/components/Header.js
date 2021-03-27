import './Header.css';
import headerLogo from '../assets/heading_1024.png';

export default function Header() {
    return (
        <div className='header'>
            <img src={headerLogo} alt='CoVarACE logo' className='header-logo' />
            <h2 className='header-desc'>COVID19 Variants-ACE2 Predicted Binding Affinity Database</h2>
        </div>
    );
}
