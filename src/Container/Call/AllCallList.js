import { bindActionCreators } from '@reduxjs/toolkit';
import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getAllCall } from './CallAction';
import { MdPhoneMissed } from "react-icons/md";
import { SlCallIn } from "react-icons/sl";
import { SlCallOut } from "react-icons/sl";
import moment from 'moment';
import { Link } from 'react-router-dom';
import { MdMoreVert } from "react-icons/md";
function AllCallList(props) {
  useEffect(() => {
    props.getAllCall();
  }, []);


  return (
    <div className='p-2 space-y-2 '>
      {props.allCallList.map((item) => (
        <>
          <div className=' p-2 border  shadow-md rounded-md flex flex-col'>
            <div className=' flex justify-between'>
              <div className='flex items-center w-4/5'>
                <div className='flex justify-start'>
                  {item.call_type === "missed" ? <MdPhoneMissed className=' text-red-500' />
                    : null}
                  {item.call_type === "answered" ? <SlCallIn className=' text-green-500' /> : null}
                  {item.call_type === "voicemail" ? <SlCallOut className=' text-blue-500' />
                    : null}
                </div>
                <p className='text-lg ml-2 w-4/5'>{item.from}</p>
                <Link to={`/call/${item.id}`} className='mr-2 flex justify-end'>
                  <button><MdMoreVert /></button>
                </Link>
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
  )
}

const mapStateToProps = ({ call }) => ({
  allCallList: call.allCallList
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getAllCall }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(AllCallList);