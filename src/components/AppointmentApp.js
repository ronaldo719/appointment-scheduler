import React, { Component } from "react";
import InputMask from "react-input-mask";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { withTranslation } from 'react-i18next';
import moment from 'moment';


const API_BASE = process.env.REACT_APP_BASE_URL;
// const API_BASE = `https://marysappointments-api.herokuapp.com/api/`;

class AppointmentApp extends Component {

    constructor(props, context) {
        super(props, context);
        const { t } = this.props;
        const chemicalService = [t('appointment:perm'), t('appointment:haircolorretouch'), t('appointment:hightlightsretouch')];
        const hairCuts = [t('appointment:mencut'), t('appointment:womencut'), t('appointment:kidscut')]
        const wax = [t('appointment:waxService')];
        const categoryServices = new Map();
        categoryServices.set('color', chemicalService);
        categoryServices.set('haircut', hairCuts);
        categoryServices.set('wax', wax);
        let serviceOptions = [];
        categoryServices.get("color").map(service => {
            serviceOptions.push(<option value={service}>{service}</option>);
        });


        this.state = {
            appointmentDate: new Date(),
            displayDate: 0,
            clientName: "",
            clientPhone: "",
            clientEmail: "",
            typeOfTime: "anytime",
            category: "color",
            staff: "Anyone",
            services: t('appointment:perm'),
            serviceOptions: serviceOptions,
            categoryServices: categoryServices,
            scheduleForOlga: [],
            scheduleForMary: [],
            intervalTimesForOlga: [],
            intervalTimesForMary: [],
            availableAppointmentsForOlga: [],
            availableAppointmentsForMary: [],
            currAppointmentStep: 1,
            appointmentTimeForOlga: 0,
            appointmentTimeForMary: 0,
            finalAppointmentTime: 0,
            display12Time: 0,
            submitted: false,
            newAppointment: "",
            appointmentDeleted: false
        };
    }
    componentDidMount() {


        axios.get(`${API_BASE}olgaappointments`).then(response => {
            console.log("response via olga db: ", response.data);
            this.handleDBReponse(response.data, "Olga");
        });
        axios.get(`${API_BASE}maryappointments`).then(response => {
            console.log("response via mary db: ", response.data);
            this.handleDBReponse(response.data, "Mary");
        });
    }

    handleDBReponse(response, currStaffDatabase) {
        const appointments = response;
        console.log(appointments);
        const initialIntervalTimesForOlga = new Map();
        const initialIntervalTimesForMary = new Map();

        if (currStaffDatabase === "Olga") {
            this.popullateStaffAppointments(appointments, initialIntervalTimesForOlga);
            this.setState({ intervalTimesForOlga: initialIntervalTimesForOlga });
        } else {
            this.popullateStaffAppointments(appointments, initialIntervalTimesForMary);
            this.setState({ intervalTimesForMary: initialIntervalTimesForMary });
        }

    }

    popullateStaffAppointments(currStaffAppointments, currStaffInitialIntervalTimes) {
        currStaffAppointments.map((item, i) => {
            let appointment_date = moment(item.appointment_date).format('l');
            if (currStaffInitialIntervalTimes.has(appointment_date)) {
                let currIntervalTimes = currStaffInitialIntervalTimes.get(appointment_date)
                currIntervalTimes = this.updateIntervalTimes(currIntervalTimes, item.category, item.start_time);
                currStaffInitialIntervalTimes[appointment_date] = currIntervalTimes
            } else {
                let defaultIntervalTimes = [1030, 1045, 1100, 1115, 1130, 1145, 1200, 1215, 1230, 1245, 1300, 1315, 1330, 1345, 1400, 1415, 1430, 1445, 1500, 1515, 1530, 1545, 1600, 1615, 1630, 1645, 1700, 1715, 1730, 1745, 1800, 1815, 1830, 1845, 1900]
                let updatedIntervalTimes = this.updateIntervalTimes(defaultIntervalTimes, item.category, item.start_time);
                currStaffInitialIntervalTimes.set(appointment_date, updatedIntervalTimes);

            }

        });


    }


    updateIntervalTimes(currIntervalTimes, category, startTime) {
        for (let i = 0; i < currIntervalTimes.length; i++) {
            if (category == 'color' && currIntervalTimes[i] == startTime) {
                currIntervalTimes.splice(i, 4);
            }
            else if (category == 'haircut' && currIntervalTimes[i] == startTime) {
                currIntervalTimes.splice(i, 3);
            } else if (category == 'wax' && currIntervalTimes[i] == startTime) {
                currIntervalTimes.splice(i, 1);

            }
        }
        return currIntervalTimes;
    }

    handleServiceOptions(category) {
        let serviceOptions = []
        this.state.categoryServices.get(category.target.value).map(service => {
            serviceOptions.push(<option value={service}>{service}</option>);
        });
        this.setState({ category: category.target.value, services: serviceOptions[0].props.value, serviceOptions: serviceOptions })
    }

    handleSearch = async (event) => {
        event.preventDefault();
        this.setState({ currAppointmentStep: 2, displayDate: moment(this.state.appointmentDate).format('l') });

        let intervalTimes = [1030, 1045, 1100, 1115, 1130, 1145, 1200, 1215, 1230, 1245, 1300, 1315, 1330, 1345, 1400, 1415, 1430, 1445, 1500, 1515, 1530, 1545, 1600, 1615, 1630, 1645, 1700, 1715, 1730, 1745, 1800, 1815, 1830, 1845, 1900];

        const currAppointmentDate = `${this.state.appointmentDate.getMonth() + 1}/${this.state.appointmentDate.getDate()}/${this.state.appointmentDate.getFullYear()}`;
        let serviceTime = this.getServiceTime(this.state.category);
        let currAvailableTimesForOlga = [];
        let currAvailableTimesForMary = [];
        if (this.state.staff == 'Olga') {
            currAvailableTimesForOlga = await this.getStaffTimes(this.state.intervalTimesForOlga, intervalTimes, currAppointmentDate, [], serviceTime);
        } else if (this.state.staff == 'Mary') {
            currAvailableTimesForMary = await this.getStaffTimes(this.state.intervalTimesForMary, intervalTimes, currAppointmentDate, [], serviceTime);
        } else {
            currAvailableTimesForOlga = await this.getStaffTimes(this.state.intervalTimesForOlga, intervalTimes, currAppointmentDate, [], serviceTime);
            currAvailableTimesForMary = await this.getStaffTimes(this.state.intervalTimesForMary, intervalTimes, currAppointmentDate, [], serviceTime);
        }

        this.setState({
            availableAppointmentsForOlga: currAvailableTimesForOlga,
            availableAppointmentsForMary: currAvailableTimesForMary,
            appointmentTimeForOlga: currAvailableTimesForOlga.length > 0 ? currAvailableTimesForOlga[0].props.value : 0,
            appointmentTimeForMary: currAvailableTimesForMary.length > 0 ? currAvailableTimesForMary[0].props.value : 0
        });
    }

    getServiceTime(category) {
        switch (category) {
            case 'color':
                return 60;
            case 'haircut':
                return 45;
            default:
                return 15;
        }
    }

    getStaffTimes = async (currStaffTimes, defaultTimes, currAppointmentDate, currAvailableTimesForStaff, serviceTime) => {
        if (currStaffTimes.has(currAppointmentDate)) {
            let currIntervalTimes = await currStaffTimes.get(currAppointmentDate);
            currAvailableTimesForStaff = this.getIntervalTimes(currIntervalTimes, this.state.typeOfTime, serviceTime);
        } else {
            currAvailableTimesForStaff = this.getIntervalTimes(defaultTimes, this.state.typeOfTime, serviceTime);
        }
        return currAvailableTimesForStaff;
    }



    handleBackButton = async (event) => {
        event.preventDefault();
        switch (this.state.currAppointmentStep) {
            case 2:
                this.setState({ currAppointmentStep: 1 })
                break;
            case 3:
                this.setState({ currAppointmentStep: 2 });
                break;
            case 4:
                this.setState({ currAppointmentStep: 3 })
                break;
        }
    }

    getIntervalTimes(currIntervalTimes, typeOfTime, serviceTime) {
        let index = 0;
        let currTime = currIntervalTimes[index];
        let minIntervalTime = 0;
        let maxIntervalTime = 0;
        let currAvailableTimes = [];
        if (currIntervalTimes.length > 0) {
            this.setState({ appointmentTimeForOlga: currIntervalTimes[0] })
        } else {
            return currIntervalTimes;
        }
        switch (typeOfTime) {
            case 'morning':
                minIntervalTime = 1030;
                maxIntervalTime = 1200;
                break;
            case 'afternoon':
                minIntervalTime = 1200;
                maxIntervalTime = 1700;
                break;
            case 'evening':
                minIntervalTime = 1700;
                maxIntervalTime = 1900;
                break;
        }
        if (typeOfTime == 'anytime') {
            for (let i = 0; i < currIntervalTimes.length; i++) {
                let endTime = this.addServiceTime(currIntervalTimes[i], serviceTime);
                currAvailableTimes.push(<option value={currIntervalTimes[i]}>{this.convertTo12Format(currIntervalTimes[i].toString())} to {this.convertTo12Format(endTime.toString())}</option>);
            }


        } else {
            while (index < currIntervalTimes.length) {
                if (currTime >= minIntervalTime && currTime <= maxIntervalTime) {
                    let endTime = this.addServiceTime(currIntervalTimes[index], serviceTime);
                    currAvailableTimes.push(<option value={currIntervalTimes[index]}>{this.convertTo12Format(currIntervalTimes[index].toString())} to {this.convertTo12Format(endTime.toString())}</option>);
                }
                index++;
                currTime = currIntervalTimes[index];
            }
        }
        return currAvailableTimes;

    }


    addServiceTime(startTime, serviceTime) {
        let startTimeHour = startTime / 100;
        let serviceTimeHour = serviceTime / 100;
        let startTimeMin = startTime % 100;
        let serviceTimeMin = serviceTime % 100;

        let totalHours = Math.trunc(startTimeHour + serviceTimeHour);
        let totalMins = startTimeMin + serviceTimeMin;
        totalHours = (totalHours + Math.floor(totalMins / 60)) % 24;
        totalMins = totalMins % 60;
        return Math.trunc((totalHours * 100) + totalMins);
    }

    convertTo12Format(currTime) {
        let h1 = currTime.charCodeAt(0) - "0".charCodeAt(0);
        let h2 = currTime.charCodeAt(1) - "0".charCodeAt(0);
        let finalTime = "";
        let hh = h1 * 10 + h2;

        let meridien = "";
        if (hh < 12) {
            meridien = "AM";
        }
        else {
            meridien = "PM";
        }

        hh %= 12;

        // handle 00 and 12 case separately
        if (hh == 0) {
            finalTime += "12:";
            for (let i = 2; i < 5; i++) {
                finalTime += currTime.charAt(i);
            }
        } else {
            finalTime += hh.toString() + ":";
            for (let i = 2; i < 5; i++) {
                finalTime += currTime.charAt(i);
            }
        }
        finalTime += " " + meridien;
        return finalTime;
    }

    handleBookAppointment = async (event, staffName) => {
        event.preventDefault();
        this.setState({ currAppointmentStep: 3, staff: staffName })
    }

    validatePhone(phoneNumber) {
        console.log(phoneNumber);
        const regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return regex.test(phoneNumber);
    }

    validateEmail(email) {
        const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return regex.test(email);
    }

    handleAppointmentInformation = async (event) => {
        event.preventDefault();
        if (this.state.submitted) {
            return;
        }
        this.setState({ submitted: true });
        if (this.validatePhone(this.state.clientPhone) === false) {
            this.setState({ clientPhone: "" });
            return alert("Invalid phone number. Please try again.");
        }
        if (this.validateEmail(this.state.clientEmail) === false) {
            this.setState({ clientEmail: "" });
            return alert("Invalid email. Please try again.");
        }

        const language = this.state.categoryServices.get("wax") == "Waxing (Eyebrows & Mustache)" ? "english" : "spanish";


        let phoneNumber = "";
        // Ensure phone number is only numbers
        for (let i = 0; i < this.state.clientPhone.length; i++) {
            if (this.state.clientPhone[i] != '(' && this.state.clientPhone[i] != ')' && this.state.clientPhone[i] != '-' && this.state.clientPhone[i] != ' ') {
                phoneNumber += this.state.clientPhone[i]
            }
        }
        let serviceTime = this.getServiceTime(this.state.category);
        let startTime = this.state.staff == 'Mary' ? this.state.appointmentTimeForMary : this.state.appointmentTimeForOlga;
        let displayTime = this.convertTo12Format(startTime.toString());
        let endTime = await this.addServiceTime(startTime, serviceTime);

        const newAppointment = {
            name: this.state.clientName.toLowerCase(),
            email: this.state.clientEmail,
            phone: phoneNumber,
            category: this.state.category,
            service: this.state.services,
            start_time: startTime,
            staff: this.state.staff,
            end_time: endTime,
            appointment_date: this.state.appointmentDate,
            display_time: displayTime,
            language: language
        }
        let timeIn12 = await this.convertTo12Format(startTime.toString());
        this.setState({ currAppointmentStep: 4, display12Time: timeIn12, clientPhone: phoneNumber })
        let currStaff = this.state.staff.toLowerCase();
        console.log(newAppointment);
        console.log(this.state.services);
        axios
            .post(`${API_BASE}${this.state.staff.toLowerCase()}appointmentCreate`, newAppointment)
            .then(response =>
                this.setState({ currAppointmentStep: 4, display12Time: timeIn12, newAppointment: newAppointment })
            )
            .catch(err => {
                console.log(err);

            });

    }

    deleteAppointment = async (event) => {
        event.preventDefault();
        const phoneNum = await this.state.clientPhone;

        await axios
            .delete(`${API_BASE}${this.state.staff.toLowerCase()}appointmentDelete`, {
                data: {
                    phone: phoneNum
                }
            })
            .then(response => {
                console.log(response);
                this.setState({ appointmentDeleted: true });

            })
            .catch(err => {
                console.log(err);
                alert(err);

            });

    }



    returnHome = async (event) => {
        return (
            <Link to='/home' className="homeButton"></Link>
        )
    }




    render() {
        const { t } = this.props;

        const servicePrices = new Map([
            [t('appointment:perm'), "95"],
            [t('appointment:haircolorretouch'), "65"],
            [t('appointment:hightlightsretouch'), "150"],
            [t('appointment:mencut'), "25-28"],
            [t('appointment:womencut'), "28-30"],
            [t('appointment:kidscut'), "23-25"],
            [t('appointment:waxService'), "15-20"]
        ]);

        const closedDays = (date) => {
            const day = date.getDay();;
            return day !== 0;
        }

        return (

            <div className="mainContainer">
                <div className="wrapper-progressBar">
                    <ul class="progressBar">
                        <li className="active">{t('appointment:searchBar')}</li>
                        <li className={this.state.currAppointmentStep >= 2 ? "active" : ""} >{t('appointment:appointmentsBar')}</li>
                        <li className={this.state.currAppointmentStep >= 3 ? "active" : ""}>{t('appointment:informationBar')}</li>
                        <li className={this.state.currAppointmentStep > 3 ? "active" : ""}>{t('appointment:conformationBar')}</li>
                    </ul>
                </div>
                <div className="formContainer">



                    <form onSubmit={this.handleSearch} style={{ display: this.state.currAppointmentStep === 1 ? 'block' : 'none' }}>
                        <label className="appointmentLabel">
                            {t('appointment:dateSearch')}:
                        </label>
                        <DatePicker className="datePicker" required={true} filterDate={closedDays} minDate={new Date()} onChange={(date) => this.setState({ appointmentDate: date })} selected={this.state.appointmentDate} />

                        <label className="appointmentLabel">
                            {t('appointment:timeSearch')}:
                        </label>
                        <select value={this.state.typeOfTime} onChange={(e) => this.setState({ typeOfTime: e.target.value })}>
                            <option value="anytime">{t('appointment:anytime')}</option>
                            <option value="morning">{t('appointment:morning')}</option>
                            <option value="afternoon">{t('appointment:afternoon')}</option>
                            <option value="evening">{t('appointment:evening')}</option>
                        </select>

                        <label className="appointmentLabel">
                            {t('appointment:categorySearch')}:
                         </label>
                        <select value={this.state.category} onChange={(e) => this.handleServiceOptions(e)}>
                            <option value="color">{t('appointment:colorCategory')}</option>
                            <option value="haircut">{t('appointment:haircutCategory')}</option>
                            <option value="wax">{t('appointment:wax')}</option>
                        </select>

                        <label className="appointmentLabel">
                            {t('appointment:serviceSearch')}:
                    </label>
                        <select value={this.state.services} onChange={(e) => this.setState({ services: e.target.value })} >
                            {this.state.serviceOptions}
                        </select>

                        <label className="appointmentLabel">
                            {t('appointment:staffSearch')}:
                        </label>
                        <select value={this.state.staff} onChange={(e) => this.setState({ staff: e.target.value })}>
                            <option value="Anyone"> {t('appointment:anyone')}</option>
                            <option value="Olga">Olga</option>
                            <option value="Mary">Mary</option>
\
                        </select>

                        <input className="appointmentSubmit" type="submit" value={t('appointment:searchBar')} ></input>
                    </form>

                    <form style={{ display: this.state.currAppointmentStep === 2 ? 'block' : 'none' }}>
                        <div style={{ display: this.state.availableAppointmentsForOlga.length === 0 && this.state.staff != 'Mary' ? 'block' : 'none' }}>
                            <label className="appointmentLabel">
                                {this.state.displayDate}
                            </label>
                            <label className="appointmentLabel" >
                                Olga
                        </label>
                            <div className="noAppointment">
                                {this.state.availableAppointmentsForOlga.length === 0 ? t('appointment:noappointments') : ""}
                            </div>

                        </div>
                        <div style={{ display: this.state.availableAppointmentsForOlga.length > 0 ? 'block' : 'none' }}>
                            <label className="appointmentLabel">
                                {this.state.displayDate}
                            </label>
                            <label className="appointmentLabel" >
                                Olga
                        </label>
                            <select value={this.state.appointmentTimeForOlga} onChange={(e) => this.setState({ appointmentTimeForOlga: e.target.value })} >
                                {this.state.availableAppointmentsForOlga}
                            </select>
                            <input className="appointmentSubmit" type="submit" value={t('appointment:book')} onClick={(event) => { this.handleBookAppointment(event, "Olga"); }}></input>
                        </div>
                        <div style={{ display: this.state.availableAppointmentsForMary.length === 0 && this.state.staff != 'Olga' ? 'block' : 'none' }}>
                            <label className="appointmentLabel" >

                                {this.state.displayDate}
                            </label>
                            <label className="appointmentLabel" >

                                Mary
                        </label>
                            <div className="noAppointment">
                                {this.state.availableAppointmentsForMary.length === 0 ? t('appointment:noappointments') : ""}
                            </div>

                        </div>
                        <div style={{ display: this.state.availableAppointmentsForMary.length > 0 ? 'block' : 'none' }}>
                            <label className="appointmentLabel" >

                                {this.state.displayDate}
                            </label>
                            <label className="appointmentLabel">
                                Mary
                        </label>
                            <select value={this.state.appointmentTimeForMary} onChange={(e) => this.setState({ appointmentTimeForMary: e.target.value })} >
                                {this.state.availableAppointmentsForMary}
                            </select>
                            <input className="appointmentSubmit" type="submit" value={t('appointment:book')} onClick={(event) => { this.handleBookAppointment(event, "Mary"); }} ></input>
                        </div>

                    </form >
                    <form onSubmit={this.handleAppointmentInformation} style={{ display: this.state.currAppointmentStep === 3 ? 'block' : 'none' }}>
                        <label className="appointmentLabel" >
                            {t('appointment:name')}
                        </label>
                        <input className="appointmentInputText" required type="text" placeholder="John Doe" value={this.state.clientName} onChange={(e) => this.setState({ clientName: e.target.value })}></input>
                        <label className="appointmentLabel">
                            {t('appointment:email')}
                        </label>
                        <input className="appointmentInputText" required type="text" placeholder="johndoe@gmail.com" value={this.state.clientEmail} onChange={(e) => this.setState({ clientEmail: e.target.value })}></input>
                        <label className="appointmentLabel">
                            {t('appointment:phone')}
                        </label>
                        <InputMask className="phoneInput"

                            placeholder="(999)-999-9999"
                            value={this.state.clientPhone}
                            onChange={(e) => this.setState({ clientPhone: e.target.value })}
                            mask="(999) 999-9999"
                            maskChar="_"
                        />

                        <input className="appointmentSubmit" type="submit" value={t('appointment:submit')} />

                    </form>

                    <div className="confirmedContainer" style={{ display: this.state.currAppointmentStep > 3 && this.state.appointmentDeleted === false ? 'block' : 'none' }}>
                        <p className="confirmedMessage">

                            {t('appointment:hi')} {this.state.clientName},
                            <br></br>
                            <br></br>
                            {t('appointment:appointmentconfirmed')} {this.state.staff} {t('appointment:on')} {this.state.displayDate}, {t('appointment:at')} {this.state.display12Time}. {t('appointment:details')}
                        </p>

                        <div className="confirmedPopUp">
                            <div className="confirmedHeader">
                                {t('appointment:confirmed')}
                                {this.state.displayDate}, {t('appointment:at')} {this.state.display12Time}
                            </div>
                            <div className="confirmedSalonInfo">
                                <ul className="confirmedDetails">
                                    <li>Mary's Salon</li>
                                    <li>3046 Jefferson Street</li>
                                    <li>(707) 304-2461 </li>
                                </ul>
                            </div>
                            <div className="confirmedAppointmentInfo">
                                <ul className="confirmedDetails">
                                    <li>{t('appointment:serviceSearch')}: {this.state.services}</li>
                                    <li>{t('appointment:duration')}: {this.getServiceTime(this.state.category)} {t('appointment:minutes')}</li>
                                    <li>{t('appointment:staffSearch')}: {this.state.staff} </li>
                                    <li>{t('appointment:cost')}: {servicePrices.get(this.state.services)} </li>
                                </ul>
                            </div>
                        </div>
                        <div className="deleteAppointment">
                            <button className="deleteButton" onClick={this.deleteAppointment}>{t('appointment:deleteAppointment')}</button>
                        </div>

                    </div>

                    <div className="deleteMessage" style={{ display: this.state.currAppointmentStep === 4 && this.state.appointmentDeleted === true ? 'block' : 'none' }}>
                        <p className="deleteP">{t('appointment:appointmentDeleted')}</p>
                    </div>

                    <div className="btn-holder">
                        <button className="backButton" onClick={this.handleBackButton} style={{ display: this.state.currAppointmentStep === 2 || this.state.currAppointmentStep === 3 ? 'block' : 'none' }}> {t('appointment:back')}</button>

                    </div>
                    <div className="returnHome" style={{ display: this.state.currAppointmentStep === 4 ? 'block' : 'none' }}>
                        <button className="homeButton" >
                            <Link to='/' className="linkHome">{t('appointment:returnhome')}</Link>
                        </button>
                    </div>

                </div>

            </div >

        );
    }

}
export default withTranslation()(AppointmentApp);
