import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { getAllCall, updateCallDetailsById } from './CallAction';
import { MdPhoneMissed } from "react-icons/md";
import { SlCallIn } from "react-icons/sl";
import { SlCallOut } from "react-icons/sl";
import moment from 'moment';
import { RiInboxArchiveFill } from "react-icons/ri";
import { RiInboxUnarchiveFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { MdMoreVert } from "react-icons/md";
function InboxCall(props) {
    const [archivedCall, setArchivedCall] = useState(false);
    const [callData, setCallData] = useState([]);
    useEffect(() => {

        if (archivedCall === true) {
            let archived = props.allCallList.filter(item => item.is_archived === true)
            setCallData(archived);
        } else {
            let unArchived = props.allCallList.filter(item => item.is_archived === false)
            setCallData(unArchived);
        }
    }, [archivedCall,props.allCallList]);



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

                        <div className=' flex w-full'>

                            <div className='flex items-center w-4/5'>
                                <div className='flex justify-start'>
                                    {item.call_type === "missed" ? <MdPhoneMissed className=' text-red-500' />
                                        : null}
                                    {item.call_type === "answered" ? <SlCallIn className=' text-green-500' /> : null}
                                    {item.call_type === "voicemail" ? <SlCallOut className=' text-blue-500' />
                                        : null}
                                </div>
                                <p className='text-lg ml-2 w-4/5'>{item.from}</p>
                                {item.is_archived === true ?
                                    <button className='  border shadow-md rounded-md m-1  p-1 items-center '
                                        onClick={() => props.updateCallDetailsById(item.id, { is_archived: false })}><RiInboxUnarchiveFill/></button>
                                    : <button className='  border shadow-md rounded-md m-1  p-1 items-center '
                                        onClick={() => props.updateCallDetailsById(item.id, { is_archived: true })}><RiInboxArchiveFill /></button>}
                                <Link to={`/call/${item.id}`} className='mr-2 flex justify-end'>
                                    <button><MdMoreVert /></button>
                                </Link>
                            </div>
                            <div className='flex p-2 my-3 mr-0 w-1/5'>

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
    bindActionCreators({ getAllCall,updateCallDetailsById }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(InboxCall);