import React from 'react'
import { motion } from "framer-motion"
import InputField from "../../input/InputField";
import {MdBusiness, MdMarkEmailRead} from "react-icons/md";
import {TbCertificate} from "react-icons/tb";
import {FaGlobeAmericas, FaPhone} from "react-icons/fa";
import {BsShieldFillCheck} from "react-icons/bs"
import {AiFillHome} from "react-icons/ai";
import Spinner from "../../../spinner/Spinner";

function OrganizerRegisterApproval(props) {
    return (
        <motion.div
            className="container-fluid d-flex"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 2 }}
        >
            <div className="container-fluid row mt-5 gx-0 gap-0 justify-content-center align-items-center">
                <BsShieldFillCheck color="gold" size={100}/>
                <h1 className="text-center mt-4"><strong>Pending Approval</strong></h1>
                <h4 className="text-center mt-4 px-5 text-muted ">We have received your information and your account is currently under review. Please check back here regularly to check your account status. We will reach out to you via Email if any further steps are required.</h4>
            </div>
        </motion.div>
    )
}

// Removed for now (unncessary), could add back later

/*function OrganizerRegisterEvents(props) {

    function OrganizerRegisterEventsCard(props) {
        return (
            <div className="position-relative">
                {props.icon}
                <h2 className="text-center text-muted">{props.text}</h2>
                <input type="radio" name="events" className="register-event-card d-flex g-0 gap-5 flex-column justify-content-center align-items-center shadow-sm" />
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
                <OrganizerRegisterEventsCard icon={<GiMusicalNotes className="position-absolute top-50 start-50" color="grey" size={100}/>} text="Music Concerts"/>
                <OrganizerRegisterEventsCard icon={<MdSportsFootball className="position-absolute top-50 start-50" color="grey" size={100}/>} text="Sporting Events"/>
            </div>
        </motion.div>
    )
}*/


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
            className="container-fluid d-flex justify-content-center align-items-center"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 2 }}
        >
            <Spinner color={"#ff6178"} loading={props.loading} size={75} />
            <form id="businessForm" onSubmit={props.onSubmit} className="container-fluid row justify-content-center">
                <div className="mb-2 form-group">
                    <div className="row mt-5 mx-5 gx-0 gap-3">
                        <InputField
                            name="businessName"
                            error={props.error.businessNameError}
                            onChange={props.onChange}
                            className="col"
                            icon={<MdBusiness className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Business Name"
                            errorMargin="94%"
                        />
                        <InputField
                            name="businessLicense"
                            error={props.error.businessLicenseError}
                            onChange={props.onChange}
                            className="col"
                            icon={<TbCertificate className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Business License #"
                            errorMargin="94%"
                        />
                    </div>
                    <div className="row mt-5 mx-5 gx-0 gap-3">
                        <InputField
                            name="phone"
                            error={props.error.phoneError}
                            onChange={props.onChange}
                            className="col"
                            icon={<FaPhone className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Phone Number"
                            errorMargin="91%"
                        />
                        <InputField
                            name="address"
                            error={props.error.addressError}
                            onChange={props.onChange}
                            className="col"
                            icon={<AiFillHome className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Address"
                            errorMargin="91%"
                        />
                        <InputField
                            name="suite"
                            onChange={props.onChange}
                            className="col-3"
                            icon={<AiFillHome className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Apt, suite, etc."
                        />
                    </div>
                    <div className="row mt-5 mx-5 gx-0 gap-3">
                        <InputField
                            name="city"
                            error={props.error.cityError}
                            onChange={props.onChange}
                            className="col"
                            icon={<FaGlobeAmericas className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="City"
                            errorMargin="91%"
                        />
                        <InputField
                            name="province"
                            error={props.error.provinceError}
                            onChange={props.onChange}
                            className="col"
                            icon={<FaGlobeAmericas className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Province"
                            errorMargin="91%"
                        />
                        <InputField
                            name="postal"
                            error={props.error.postalError}
                            onChange={props.onChange}
                            className="col"
                            icon={<FaGlobeAmericas className="icon position-absolute" color="grey" size={20}/>}
                            type="text"
                            placeholder="Postal Code"
                            errorMargin="91%"
                        />
                    </div>
                </div>
            </form>
        </motion.div>
    )
}

export {OrganizerRegisterBusiness, OrganizerRegisterEmailConfirmation, OrganizerRegisterApproval}