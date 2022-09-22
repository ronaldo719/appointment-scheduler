import React from 'react';
import { Fade } from 'react-slideshow-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import "react-slideshow-image/dist/styles.css";
import serviceImg from '../images/hair+top+banner+image.jpg'
import Navbar from "../Navbar";
import { useTranslation } from 'react-i18next';


const fadeImages = () => {
    // const logo = require("../images/slideshow/IMG_0992.JPG")
    const images = [
        require("../images/slideshow/IMG_0992.JPG"),
        require("../images/slideshow/IMG_1038.JPG"),
        require("../images/slideshow/IMG_1129.JPG"),
        require("../images/slideshow/IMG_1130.JPG"),
        require("../images/slideshow/IMG_1168.JPG"),
        require("../images/slideshow/IMG_1177.JPG")
    ];

    const nextArrow = <FontAwesomeIcon icon={faArrowRight} />
    const backArrow = <FontAwesomeIcon icon={faArrowLeft} />

    const buttonStyle = {
        background: 'none',
        fontSize: '2rem',
        margin: '30px',
        padding: '5px',
        textAlign: 'center',
        color: 'white',
        border: '0',
        height: '30px',
        width: '30px',
    };

    const properties = {
        prevArrow: <button className="slideShowButtons" style={{ ...buttonStyle }}>{backArrow}</button>,
        nextArrow: <button className="slideShowButtons" style={{ ...buttonStyle }}>{nextArrow}</button>
    }

    return (
        <div>
            <Fade nextArrow={properties.nextArrow} prevArrow={properties.prevArrow} duration={4000} >
                {
                    images.map((fadeImage, index) => (
                        <div className="each-slide" key={index}>
                            <div className="image-container">
                                <img className="slideShowImages" src={fadeImage} />
                            </div>
                        </div>
                    ))
                }
            </Fade >
        </div >
    );
};

export default function Services() {
    const { t } = useTranslation();
    return (
        <div className="pageContainer">
            {/* <Navbar /> */}
            <div className="topPage">
                <img className="pageImg" src={serviceImg} alt="women's hair"></img>
                <h1 className="pageTitle">{t('services:serviceTitle')}</h1>
            </div>
            <div className="mainContent">
                <div className="hairServices">
                    <div className="leftServices">


                        <div className="haircuts">
                            <h2>{t('services:serviceTitle')}</h2>
                            <h1 className="serviceHeaders">{t('services:haircuts&styling')}</h1>
                            <p>
                                {t('services:haircutsMessage1')}

                            </p>
                        </div>
                        <hr className="innerLine"></hr>
                        <div className="chemicalServices">
                            <h1 className="serviceHeaders">{t('services:chemical')}</h1>
                            <p>
                                {t('services:chemicalpart1')}
                            </p>

                        </div>
                    </div>
                    <div className="prices">
                        <h3 className="pricesTitle">{t('services:prices')}</h3>
                        <hr className="priceLine"></hr>
                        <ul className="pricesList">
                            <li>
                                {t('services:mencut')}
                            </li>
                            <li>
                                {t('services:womencut')}
                            </li>
                            <li>
                                {t('services:kidscut')}
                            </li>
                            <li>
                                {t('services:perm')}
                            </li>
                            <li>
                                {t('services:haircolorretouch')}
                            </li>
                            <li>
                                {t('services:hightlightsretouch')}
                            </li>
                            <li>
                                {t('services:wax')}
                            </li>

                        </ul>
                    </div>


                </div>
                <hr className="footerLine"></hr>
                <div className="slideContainer">
                    {fadeImages()}
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
