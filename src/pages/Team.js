import olgaImg from '../images/staff/IMG_2066.jpg'
import maryImg from '../images/staff/IMG_1619.jpg'
import { useTranslation } from 'react-i18next';
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebook } from '@fortawesome/free-brands-svg-icons'


export default function Team() {
    const { t } = useTranslation();
    return (
        <div className="pageContainer">

            <h1 className="pageTitle">{t('team:teamTitle')} </h1>

            <div className="mainContent">
                <div className="teamContent">
                    <div className="staffGrid">
                        <div className="gridItem">
                            <img className="staffPicture" src={olgaImg} alt="Olga's selfie"></img>
                            <h2 className="staffTitle">Olga | {t('team:jobTitle')}  <a href="https://www.facebook.com/profile.php?id=100009264777790" target='_blank'>
                                <FontAwesomeIcon icon={faFacebook} className="facebookIcon" />
                            </a></h2>
                            <p>
                                <b>{t('team:services')}:</b> {t('team:servicesMessage')}
                                <br></br>
                                <b>{t('team:experience')}:</b> {t('team:years')}
                                <br></br>
                                <b>{t('team:personalNumber')}:</b> (707) 304-2461
                            </p>
                        </div>
                        <div className="gridItem">
                            <img className="staffPicture" src={maryImg} alt="Mary's selfie"></img>
                            <h2 className="staffTitle">Mary | {t('team:jobTitle')}  <a href="https://facebook.com" target='_blank'>
                                <FontAwesomeIcon className="facebookIcon" icon={faFacebook} />
                            </a></h2>
                            <p>
                                <b>{t('team:services')}:</b> {t('team:servicesMessage')}
                                <br></br>
                                <b>{t('team:experience')}:</b> {t('team:years')}
                                <br></br>
                                <b>{t('team:personalNumber')}:</b> (707) 927-8106
                            </p> </div>
                    </div>
                </div>
                <hr className="footerLine"></hr>

            </div>
            <div className="foot">
                <p className="footAddress">
                    (707) 253-9312  <br></br>
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

    )
}

