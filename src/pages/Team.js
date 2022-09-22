import teamImg from '../images/team-banner-image.jpg'
import olgaImg from '../images/staff/IMG_2066.jpg'
import Navbar from "../Navbar";
import { useTranslation } from 'react-i18next';

export default function Team() {
    const { t } = useTranslation();
    return (
        <div className="pageContainer">

            <div className="topPage">
                <img className="pageImg" src={teamImg} alt="green flower"></img>
                <h1 className="pageTitle">{t('team:teamTitle')}</h1>

            </div>
            <div className="mainContent">


                <div className="teamContent">


                    <div className="staffGrid">
                        <div className="gridItem">
                            <img className="staffPicture" src={olgaImg} alt="Olga's selfie"></img>
                            <h2 className="staffTitle">Olga | {t('team:jobTitle')}</h2>
                            <p>
                                <b>{t('team:services')}</b>: {t('team:servicesMessage')}
                                <br></br>
                                <b>{t('team:experience')}</b>: {t('team:years')}
                            </p>
                        </div>
                        <div className="gridItem">
                            <img className="staffPicture" src={olgaImg} alt="Mary's selfie"></img>
                            <h2 className="staffTitle">Mary | {t('team:jobTitle')}</h2>
                            <p>
                                <b>{t('team:services')}</b>: {t('team:servicesMessage')}
                                <br></br>
                                <b>{t('team:experience')}</b>: {t('team:years')}
                            </p> </div>
                    </div>
                </div>
                <hr className="footerLine"></hr>
                <div className="foot">
                    <p className="footAddress">
                        (707) 304-2461 <br></br>
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



        </div>

    )
}

