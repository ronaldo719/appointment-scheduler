
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import logo from './images/maryshaircutslogo.jpeg'


export default function Navbar() {
    const [toggleButtonActive, setActive] = useState(false);
    const [spanishActive, setSpanishActive] = useState(true);
    const [englishActive, setEnglishActive] = useState(false);

    const { t } = useTranslation();
    const { i18n } = useTranslation();

    // function used to change the websites language
    function changeLanguage(e) {
        i18n.changeLanguage(e.target.value);
        setEnglishActive(!englishActive);
        setSpanishActive(!spanishActive);
    }

    //function for toggle button to retract after pressing a category
    function toggleMenuRetract(e) {
        setActive(!toggleButtonActive);

    }


    return (

        < div >
            <nav className="nav" >
                <div className="navMainContainer">
                    <div className="salon_title_logo" >
                        <div className="logo_div">
                            <Link to="/" ><img src={logo} className="logo_img" ></img></Link>
                        </div>


                        <div className="salonName">
                            Mary's Hair Cuts
                        </div>
                    </div>
                    <a href="#" className="toggle-button" onClick={(e) => setActive(!toggleButtonActive)} >
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </a>

                    <div className={toggleButtonActive === true ? 'navBar-links active' : 'navBar-links'}>
                        <ul>
                            <CustomLink to="/home" onClick={toggleMenuRetract} >{t('home')}</CustomLink>
                            <CustomLink to="/services" onClick={toggleMenuRetract} >{t('services')}</CustomLink>
                            <CustomLink to="/team" onClick={toggleMenuRetract}>{t('team')}</CustomLink>
                            <CustomLink to="/contact" onClick={toggleMenuRetract}>{t('contact us')}</CustomLink>
                            {/* <CustomLink className="bookAppointment" to="/appointment">{t('book')}</CustomLink> */}

                        </ul>
                    </div>
                </div>

                <div className="changeLanguage">
                    <button onClick={changeLanguage} value='en' className={englishActive === true ? 'englishActive' : 'englishDeactive'}>English</button>
                    <button onClick={changeLanguage} value='es' className={spanishActive === true ? 'spanishActive' : 'spanishDeactive'} id="spanishButton">Español</button>

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