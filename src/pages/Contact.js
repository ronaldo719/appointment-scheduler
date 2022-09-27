import emailjs from "emailjs-com";
import { useState, useRef } from "react";
import { useTranslation } from 'react-i18next';
const serviceID = process.env.REACT_APP_SERVICE_ID;
const templateID = process.env.REACT_APP_TEMPLATE_ID;
const publicKey = process.env.REACT_APP_PUBLIC_KEY;


export default function Contact() {
    const form = useRef();
    const [formSent, setFormSent] = useState(false);
    const { t } = useTranslation();



    // function sends a email to the salon's email account regarding the person's message
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                `${serviceID}`,
                `${templateID}`,
                form.current,
                `${publicKey}`
            )
            .then(
                (result) => {
                    console.log("SUCCESS!", result.text);
                    setFormSent(true);

                },
                (error) => {
                    console.log(error.text);
                }
            );
    };

    return (

        <div className="pageContainer">

            <div>
                <h1 className="contactTitle">{t('contact:contact')}</h1>

            </div>

            <div className="mainContent">


                <div className="contactContent">
                    <div className="leftSideContent">
                        <div className="contactInfo">
                            <h2 className="locationTitles">{t('contact:call')}</h2>
                            <p>
                                <b>{t('contact:phone')}</b> (707) 253-9312
                        <br></br>
                                <br></br>
                                {t('contact:walkin')}
                                <br></br>
                                {t('contact:bookonline')}
                            </p>
                        </div>
                        <hr className="contactInnerLine"></hr>
                        <div>
                            <h2 className="locationTitles">{t('home:location')}</h2>
                            <p>
                                3046 Jefferson Street<br></br>
                Napa, CA 94558<br></br>
                            </p>

                        </div>
                        <hr className="contactInnerLine"></hr>
                        <div className="locationHours">
                            <h2 className="locationTitles">{t('home:hours')}</h2>
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
                    <div className="rightSideContact">
                        <div className="formSent" style={{ display: formSent ? 'block' : 'none' }}>
                            <p className="formSentMessage">{t('contact:formsent')}</p>
                        </div>

                        <form className="contactForm" ref={form} onSubmit={sendEmail} style={{ display: formSent ? 'none' : 'block' }}>
                            <label>
                                {t('contact:name')} *
                    </label>
                            <input className="contactInput" required type="name" name="name" id="name" ></input>
                            <label for="email">
                                {t('contact:email')} *
                    </label>
                            <input className="contactInput" required type="email" name="email" id="email"></input>
                            <label>
                                {t('contact:subject')} *
                    </label>
                            <input className="contactInput" required name="subject" type="text" id="subject"></input>
                            <label for="email_body">
                                {t('contact:message')} *
                    </label>
                            <textarea className="messageContact" required name="message" id="email_body" ></textarea>

                            <input className="contactSubmit" type="submit" value={t('contact:submit')}></input>
                        </form>

                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3130.405571074042!2d-122.29976334850737!3d38.31643798848224!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808506ef160e1403%3A0x30667bd12391e909!2sMary&#39;s%20Hair%20Cuts!5e0!3m2!1sen!2sus!4v1659045100356!5m2!1sen!2sus" width="600" height="450"
                            style={{ border: '0', marginTop: "20px", width: '100%' }}
                            allowfullscreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
                <hr className="footerLine"></hr>
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
        </div>
    )
}