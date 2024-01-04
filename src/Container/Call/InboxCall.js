import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getAllCall } from './CallAction';
import { MdPhoneMissed } from "react-icons/md";
import { SlCallIn } from "react-icons/sl";
import { SlCallOut } from "react-icons/sl";
import moment from 'moment';
import { RiInboxArchiveFill } from "react-icons/ri";
import { RiInboxUnarchiveFill } from "react-icons/ri";
function InboxCall(props) {
    const [archivedCall, setArchivedCall] = useState(false);
    const [callData, setCallData] = useState([]);
    useEffect(() => {
        props.getAllCall();
        if (archivedCall === true) {
            let archived = props.allCallList.filter(item => item.is_archived === true)
            setCallData(archived);
        } else {
            let unArchived = props.allCallList.filter(item => item.is_archived === false)
            setCallData(unArchived);
        }
    }, [archivedCall]);



    return (<>
        <div>
            {!archivedCall ?
                <button className=' w-full border shadow-md rounded-md m-1  p-2 items-center flex justify-center' onClick={() => setArchivedCall(true)}><RiInboxArchiveFill />Archived</button>
                : <button className=' w-full border shadow-md rounded-md m-1  p-2 items-center flex justify-center' onClick={() => setArchivedCall(false)}><RiInboxUnarchiveFill />Unarchived</button>}
        </div>
        <div className='p-2 space-y-2 '>
            {callData.map((item) => (
                <>
                    <div className=' p-2 border  shadow-md rounded-md flex flex-col'>

                        <div className=' flex justify-between'>

                            <div className='flex gap-2 items-center'>
                                {item.call_type === "missed" ? <MdPhoneMissed className=' text-red-500' />
                                    : null}
                                {item.call_type === "answered" ? <SlCallIn className=' text-green-500' /> : null}
                                {item.call_type === "voicemail" ? <SlCallOut className=' text-blue-500' />
                                    : null}
                                <p className='text-lg'>{item.from}</p>
                            </div>
                            <div className='flex p-2 my-3 mr-0'>

                                <h1>{Math.floor(item.duration / 3600)}:{Math.floor((item.duration % 3600) / 60)}:{item.duration % 60}</h1>
                            </div>
                        </div>
                        <div className='flex justify-between'>
                            <p className=' text-sm'>{moment(item.created_at).format("hh:mm:ss")} </p>
                            <p className=' text-sm'>{moment(item.created_at).format("DD-MM-YYYY")} </p>
                        </div>

                    </div>

                </>
            ))}
        </div>
    </>
    )
}

const mapStateToProps = ({ call }) => ({
    allCallList: call.allCallList
});
const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ getAllCall }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(InboxCall);