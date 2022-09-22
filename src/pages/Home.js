import homeImg from '../images/hair_salon_stations.jpeg'
import womenHaircut from "../images/Women's+haircut.jpg"
import Navbar from "../Navbar";
import { useTranslation } from 'react-i18next';

export default function Home() {
    const { t } = useTranslation();
    return (
        <div className="pageContainer">

            <div className="topPage">
                <img className="pageImg" src={homeImg} alt="hair solan workplace" style={{ minHeight: "100vh - 112px" }}></img>
                <h1 className="pageTitle">{t('home:homeMessage')}</h1>
            </div >
            <div className="mainContent">
                <div className="middleContent">
                    <div className="leftSide">
                        <img className="womenHaircut" src={womenHaircut} alt="women's hair"></img>
                        <div className="messageContainer">
                            <div className="messageInside">
                                <h1 className="titleMessage">
                                    {t('home:treatTitle')}
                                </h1>
                                <p className="welcomeMessage">
                                    {t('home:welcomeMessage')}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="rightSide">
                        <div className="homeHours">
                            <p className="hours">{t('home:hours')}</p>
                            <ul>
                                <li>
                                    {t('home:monday')}
                                    <p className="hoursText">9AM - 5PM</p>

                                </li>
                                <li>
                                    {t('home:tuesday')}
                                    <p className="hoursText">9AM - 5PM</p>
                                </li>
                                <li>
                                    {t('home:wednesday')}
                                    <p className="hoursText">9AM - 5PM</p>
                                </li>
                                <li>
                                    {t('home:thursday')}
                                    <p className="hoursText">9AM - 5PM</p>
                                </li>
                                <li>
                                    {t('home:friday')}
                                    <p className="hoursText">9AM - 5PM</p>
                                </li>
                                <li>
                                    {t('home:saturday')}
                                    <p className="hoursText">9AM - 5PM</p>
                                </li>
                                <li>
                                    {t('home:sunday')}
                                    <p className="hoursText">9AM - 5PM</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>






                <hr className="firstLine"></hr>

                <div className="locationContainer">
                    <h1 className="locationTitle">{t('home:location')}</h1>
                    <p className="locationAddress">
                        Mary's Hair Cuts <br></br>
                    3046 Jefferson Street <br></br>
                    Napa, CA 94558
                </p>
                    <hr className="secondLine"></hr>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3130.405571074042!2d-122.29976334850737!3d38.31643798848224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808506ef160e1403%3A0x30667bd12391e909!2sMary&#39;s%20Hair%20Cuts!5e0!3m2!1sen!2sus!4v1659045100356!5m2!1sen!2sus" width="600" height="450"
                        style={{ border: '0', marginTop: "20px", width: '100%' }}
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                </div>
                <hr className="footerLine"></hr>
                <div className="foot">
                    <p className="footAddress">
                        (707) 253-9312 <br></br>
                        <br></br>
                3046 Jefferson Street<br></br>
                Napa, CA 94558<br></br>
                        <br></br>
                        <br></br>
                    </p>
                    <p className="footer">
                        {t('home:foot')}
                    </p>
                </div>
            </div>
        </div >

    )
}
