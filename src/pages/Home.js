import womenHaircut from "../images/Women's+haircut.jpg"
import { useTranslation } from 'react-i18next';
import salonImg from '../images/Flourish_13.jpg';

export default function Home() {
    const { t } = useTranslation();
    return (
        <div className="pageContainer">

            <div className="homePageImg">
                <img className="salonImg" src={salonImg} alt="hair solan workplace" ></img>
            </div >
            <div className="mainContent">
                <div className="middleContent" id="homeMiddle">
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
                                    <p className="hoursText">10:30AM - 7PM</p>

                                </li>
                                <li>
                                    {t('home:tuesday')}
                                    <p className="hoursText">10:30AM - 7PM</p>
                                </li>
                                <li>
                                    {t('home:wednesday')}
                                    <p className="hoursText">10:30AM - 7PM</p>
                                </li>
                                <li>
                                    {t('home:thursday')}
                                    <p className="hoursText">10:30AM - 7PM</p>
                                </li>
                                <li>
                                    {t('home:friday')}
                                    <p className="hoursText">10:30AM - 7PM</p>
                                </li>
                                <li>
                                    {t('home:saturday')}
                                    <p className="hoursText">10:30AM - 7PM</p>
                                </li>
                                <li>
                                    {t('home:sunday')}
                                    <p className="hoursText">Closed</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                </div>


                <hr className="firstLine"></hr>

                <div className="locationContainer">
                    <div className="locationInfo">
                        <h1 className="locationTitle">{t('home:location')}</h1>
                        <p className="locationAddress">
                            Mary's Hair Cuts <br></br>
                    3046 Jefferson Street <br></br>
                    Napa, CA 94558
                     </p>

                    </div>

                    {/* <hr className="secondLine"></hr> */}
                    <iframe className="homeMap" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3130.405571074042!2d-122.29976334850737!3d38.31643798848224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808506ef160e1403%3A0x30667bd12391e909!2sMary&#39;s%20Hair%20Cuts!5e0!3m2!1sen!2sus!4v1659045100356!5m2!1sen!2sus" width="600" height="450"
                        loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

                </div>
                <hr className="footerLine"></hr>

            </div>
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
        </div >

    )
}
