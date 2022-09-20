import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useState } from "react";

export default function Navbar(props) {
    const [displayNav, setDisplayNav] = useState(true);
    const [toggleButtonActive, setActive] = useState(false);
    // if (props.disableNav === true) {
    //     setDisplayNav(true);
    // }


    const { t } = useTranslation();
    const { i18n } = useTranslation();

    let path = window.location.pathname;

    function changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
    }


    // console.log(displayNav);
    return (

        < div >
            <nav className="nav" style={{ display: displayNav ? '' : 'none', height: toggleButtonActive === true ? 'auto' : '12vh' }
            }>
                <div className="navMainContainer">
                    <div>
                        <Link to="/" className="site-title">{t('title')}</Link>
                    </div>
                    <a href="#" className="toggle-button" onClick={(e) => setActive(!toggleButtonActive)} >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </a>
                    <div className={toggleButtonActive === true ? 'navBar-links active' : 'navBar-links'}>
                        <ul>
                            <CustomLink to="/home">{t('home')}</CustomLink>
                            <CustomLink to="/services">{t('services')}</CustomLink>
                            <CustomLink to="/team">{t('team')}</CustomLink>
                            <CustomLink to="/contact">{t('contact us')}</CustomLink>
                            <CustomLink className="bookAppointment" to="/appointment">{t('book')}</CustomLink>

                        </ul>
                    </div>
                </div>
                {/* <Link className="bookAppointment" onClick={(e) => setDisplayNav(false)} to="/appointment">{t('book')}</Link> */}
                <div className="changeLanguage">
                    <button onClick={changeLanguage} value='en' className="language">English</button>
                    <button onClick={changeLanguage} value='es' className="language">Español</button>

                </div>
            </nav>

        </div >
    )
}


function CustomLink({ to, children, ...props }) {
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({ path: resolvedPath.pathname, end: true })

    return (
        <li className={isActive ? "active" : ""}>
            <Link to={to} {...props}> {children}</Link>
        </li>
    )
}