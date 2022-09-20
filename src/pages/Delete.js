import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";
import InputMask from "react-input-mask";
import { useState } from "react";
import axios from "axios";
import moment from 'moment';






export default function Delete() {
    const { t } = useTranslation();
    const API_BASE = process.env.REACT_APP_BASE_URL;
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [staff, setStaff] = useState("olga");
    const [currStep, setCurrStep] = useState(0);
    const [currAppointment, setAppointment] = useState("");
    let appointmentFound = false;
    let appointments = [];
    const handleSubmit = async (event) => {
        event.preventDefault();
        await axios.get(`${API_BASE}${staff}appointments`).then(response => {
            console.log("response via db: ", response.data);
            appointments = response.data;
        });

        let phoneNumber = "";
        // Ensure phone number is only numbers
        for (let i = 0; i < phone.length; i++) {
            if (phone[i] != '(' && phone[i] != ')' && phone[i] != '-' && phone[i] != ' ') {
                phoneNumber += phone[i];
            }
        }

        //find appointment
        appointments.map((appointment, i) => {
            if (phoneNumber === appointment.phone.toString()) {
                //display appointment
                setCurrStep(1);
                appointmentFound = true;
                setPhone(phoneNumber);
                setAppointment(appointment);
            }
        });

        //if no appointments found alert user
        if (!appointmentFound) {
            alert(t('delete:noAppointment'));
        }


    }

    const displayAppointmentInfo = (appointment) => {

        return (
            <div>
                <div className="deleteContainer" style={{ display: currStep === 1 ? 'block' : 'none' }}>
                    <div>
                        <h2 className="deleteInfo">{t('delete:cancelMessage')}</h2>
                    </div>
                    <ul className="confirmedDetails">
                        <li>{t('delete:name')}: {appointment.name}</li>
                        <li>{t('delete:service')}: {appointment.service}</li>
                        <li>{t('delete:time')}: {appointment.display_time} </li>
                        <li>{t('delete:date')}: {moment(appointment.appointment_date).format('l')} </li>
                        <li>{t('delete:staff')}: {appointment.staff} </li>
                    </ul>
                    <button className="cancelButton" onClick={deleteAppointment} >{t('delete:cancelAppointment')}</button>
                </div>

                <div className="deleteMessage" style={{ display: currStep === 2 ? 'block' : 'none' }}>
                    <p className="deleteP">{t('delete:appointmentCanceled')}</p>
                    <button className="returnButton" >
                        <Link to='/' className="linkHome">{t('delete:returnhome')}</Link>
                    </button>
                </div>
            </div>
        );

    }


    const deleteAppointment = async (event) => {
        event.preventDefault();
        const phoneNum = phone;

        await axios
            .delete(`${API_BASE}${staff}appointmentDelete`, {
                data: {
                    phone: phoneNum
                }
            })
            .then(response => {
                console.log(response);
                setCurrStep(2);

            })
            .catch(err => {
                console.log(err);
                alert(err);

            });

    }



    return (
        <div className="deleteContainer">
            <form className="deleteForm" onSubmit={handleSubmit} style={{ display: currStep === 0 ? 'block' : 'none' }}>
                <h1 className="deleteInfo">{t('delete:information')}</h1>
                <label className="deleteLabel" >
                    {t('delete:name')}
                </label>
                <br></br>
                <input className="deleteInputText" required type="text" placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)}></input>

                <br></br>
                <label className="deleteLabel" >
                    {t('delete:staff')}
                </label>
                <br></br>
                <select value={staff} onChange={(e) => setStaff(e.target.value)} className="deleteSelect">
                    <option value="olga">Olga</option>
                    <option value="mary">Mary</option>
                </select>

                <label className="deleteLabel">
                    {t('delete:phone')}
                </label>
                <br></br>
                <InputMask className="deleteInputText"

                    placeholder="(999)-999-9999"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    mask="(999) 999-9999"
                    maskChar="_"
                />
                <input className="deleteSubmit" type="submit" value={t('delete:search')} />
            </form>

            <div>
                {typeof (currAppointment) === "string" ? "" : displayAppointmentInfo(currAppointment)}
            </div>


        </div >

    )
}

