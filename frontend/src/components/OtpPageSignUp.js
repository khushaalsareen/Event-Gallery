import axios from 'axios';
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OtpPageSignUp() {
    const [formData, setformData] = useState({
        otp: '',
        collegeId:localStorage.getItem('id')
    })
    const showToastMessage = () => toast("OTP resent successfully!!");
    const showToastMessage1 = () => toast("OTP verified successfully!!");
    const obj = {collegeId:localStorage.getItem('id')}
    const [err, setErr] = useState(false);
    const [minutes,setMinutes] = useState(0);
    const [seconds,setSeconds] = useState(0);
    const buttonClass = seconds > 0 || minutes > 0 ? 'text-gray-200 border-none underline' : 'text-red-500 text-white border-none underline';

    const handleClick = () => {
        console.log(formData);
        axios.post(
          "http://localhost:8000/api/update/verifyOTP",
          formData, // Data object
          {
            headers: { "Content-Type": "application/json" }, // Headers
          }
        )
        .then((response) => {
          if (response.data.statusCode === 200) {
            //   localStorage.setItem('id', formData.collegeId);
              setErr(false);
              showToastMessage1();
              setTimeout(()=>{
                window.location.href = '/auth/login';
              },1000)
              
            console.log("haa otp verified");
          } else {
            console.log("Error:", response.data.msg);
          }
        })
        .catch((error) => {
            setErr(true);
          console.error("Error:", error);
        });
      }
      const handleResend = ()=>{
        axios.post(
          "http://localhost:8000/api/update/resendOtp",
          obj, // Data object
          {
            headers: { "Content-Type": "application/json" }, // Headers
          }
        ).then((response) => {
          if (response.data.statusCode === 200) {
            showToastMessage()
            console.log(" otp resent");
          } else {
            console.log("Error:", response.data.message);
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      }
    return (
        <div>
            <div className="flex items-center justify-center p-12 h-screen">
                <div className="mx-auto w-full max-w-[550px] bg-white text-black p-9 rounded-xl">
                    <h1 className="text-4xl font-medium">OTP Verification</h1>
                    <p className="text-slate-500">Fill up the OTP to verify your email</p>

                    <div className="my-10">
                        <div className="flex flex-col space-y-5">
                            <label for="otp-box">
                                <p className="font-medium text-slate-700 pb-2">OTP</p>
                                <input
                                    id="otp-box"
                                    name="text"
                                    type="text"
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                    placeholder="OTP here"
                                    value={formData.otp}
                                    onChange={(e) => {
                                      setformData({ ...formData, otp: e.target.value });
                                  }}
                                />
                            </label>
                            {/* <div className='flex items-center justify-between'> */}
                              {/* <p>
                                Time Remaining: {" "}
                                <span>
                                  {minutes<10? `0${minutes}`: minutes}:{seconds<10 ? `0${seconds} : seconds`:seconds}
                                </span>
                              </p> */}

                              {/* <button className={buttonClass} disabled={seconds > 0 || minutes > 0} onClick={handleResend}>
                                Resend OTP
                              </button>
                            </div> */}

                            <button onClick={handleClick} className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                    />
                                </svg>

                                <span>Verify the OTP</span>
                            </button>

                            <button onClick={handleResend} className="w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
                                    />
                                </svg>

                                <span>Resend OTP</span>
                            </button>
                            <ToastContainer />
                        </div>
                        { err && <p className=" text-red-600 font-medium inline-flex space-x-1 items-center">Incorrect OTP entered</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OtpPageSignUp