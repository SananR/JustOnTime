import React, {useState} from 'react'
import { motion } from "framer-motion"
import InputField from "../../input/InputField";
import {MdBusiness, MdMarkEmailRead, MdSportsFootball} from "react-icons/md";
import {GiMusicalNotes} from "react-icons/gi"
import {TbCertificate} from "react-icons/tb";
import {FaGlobeAmericas, FaPhone} from "react-icons/fa";
import {AiFillHome} from "react-icons/ai";

import "./organizerSignupForms.css"

function OrganizerRegisterEvents(props) {

    function OrganizerRegisterEventsCard(props) {
        return (
            <div className="register-event-card d-flex g-0 gap-5 flex-column justify-content-center align-items-center shadow-sm">
                {props.icon}
                <h2 className="text-center text-muted">{props.text}</h2>
            </div>
        )
    }

    return (
        <motion.div
            className="container-fluid d-flex"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 2 }}
        >
            <div className="container-fluid row gap-5 mt-5 justify-content-center align-items-center">
                <OrganizerRegisterEventsCard icon={<GiMusicalNotes color="grey" size={100}/>} text="Music Concerts"/>
                <OrganizerRegisterEventsCard icon={<MdSportsFootball color="grey" size={100}/>} text="Sporting Events"/>
            </div>
        </motion.div>
    )
}


function OrganizerRegisterEmailConfirmation(props) {
    return (
        <motion.div
            className="container-fluid d-flex"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 2 }}
        >
            <div className="container-fluid row mt-5 gx-0 gap-0 justify-content-center align-items-center">
                <MdMarkEmailRead color="red" size={100}/>
                <h1 className="text-center mt-4"><strong>Awaiting Email Confirmation...</strong></h1>
                <h4 className="text-center mt-4 text-muted ">Please confirm the email address used during registration to continue.</h4>
            </div>
        </motion.div>
    )
}

function OrganizerRegisterBusiness(props) {
    return (
        <motion.div
            className="container-fluid d-flex"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 2 }}
        >
            <form onSubmit={props.onSubmit} className="container-fluid row justify-content-center">
                <div className="mb-2 form-group">
                    <div className="row mt-5 mx-5 gx-0 gap-3 justify-content-center align-items-center">
                        <InputField
                            name="businessName"
                            onChange={props.onChange}
                            className="col"
                            icon={<MdBusiness className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Business Name"
                            errorMargin="86%"
                        />
                        <InputField
                            name="businessLicense"
                            onChange={props.onChange}
                            className="col"
                            icon={<TbCertificate className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Business License #"
                            errorMargin="86%"
                        />
                    </div>
                    <div className="row mt-5 mx-5 gx-0 gap-3 justify-content-center align-items-center">
                        <InputField
                            name="phone"
                            onChange={props.onChange}
                            className="col"
                            icon={<FaPhone className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Phone Number"
                            errorMargin="86%"
                        />
                        <InputField
                            name="address"
                            onChange={props.onChange}
                            className="col"
                            icon={<AiFillHome className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Address"
                            errorMargin="86%"
                        />
                        <InputField
                            name="suite"
                            onChange={props.onChange}
                            className="col-3"
                            icon={<AiFillHome className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Apt, suite, etc."
                            errorMargin="86%"
                        />
                    </div>
                    <div className="row mt-5 mx-5 gx-0 gap-3 justify-content-center align-items-center">
                        <InputField
                            name="city"
                            onChange={props.onChange}
                            className="col"
                            icon={<FaGlobeAmericas className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="City"
                            errorMargin="86%"
                        />
                        <InputField
                            name="province"
                            onChange={props.onChange}
                            className="col"
                            icon={<FaGlobeAmericas className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Province"
                            errorMargin="86%"
                        />
                        <InputField
                            name="postal"
                            onChange={props.onChange}
                            className="col"
                            icon={<FaGlobeAmericas className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Postal Code"
                            errorMargin="86%"
                        />
                    </div>
                </div>
            </form>
        </motion.div>
    )
}

export {OrganizerRegisterEvents, OrganizerRegisterBusiness, OrganizerRegisterEmailConfirmation}