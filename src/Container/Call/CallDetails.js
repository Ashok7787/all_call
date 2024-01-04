import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getAllCallDetailsById } from './CallAction';
import moment from 'moment';
import { MdPhoneMissed } from "react-icons/md";
import { SlCallIn } from "react-icons/sl";
import { SlCallOut } from "react-icons/sl";

function CallDetails(props) {
    const params = useParams();
    useEffect(() => {
        props.getAllCallDetailsById(params.id);
    }, [params]);
    console.log("callDetails", props.callDetails);
    return (
        <div className='p-2 space-y-2 border m-2 shadow-md rounded-md'>
            <p>From : {props.callDetails.from}</p>
            <p>To : {props.callDetails.to}</p>
            <div className='flex gap-2 items-center'>
            <p>Call Type : </p>
                {props.callDetails?.call_type === "missed" ? <MdPhoneMissed className=' text-red-500' />
                    : null}
                {props.callDetails?.call_type === "answered" ? <SlCallIn className=' text-green-500' /> : null}
                {props.callDetails?.call_type === "voicemail" ? <SlCallOut className=' text-blue-500' />
                    : null}
                    <p>{props.callDetails.call_type}</p>
            </div>
            <p>Duration : {props.callDetails.duration}</p>
            <p>Is Archived : {props.callDetails.is_archived === true ? "Yes" : "No"}</p>
            <div className='flex justify-between'>
                <p className=' text-sm'>{moment(props.CallDetails?.created_at).format("hh:mm:ss")} </p>
                <p className=' text-sm'>{moment(props.CallDetails?.created_at).format("DD-MM-YYYY")} </p>
            </div>

        </div>
    )
}

const mapStateToProps = ({ call }) => ({
    callDetails: call.callDetails
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ getAllCallDetailsById }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CallDetails);
