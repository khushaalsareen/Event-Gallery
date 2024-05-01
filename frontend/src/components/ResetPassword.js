import axios from 'axios'
import React, { useState,useEffect } from 'react'
import Alerts from './Alerts'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ResetPassword() {
    const [formData, setformData] = useState({
        collegeId: localStorage.getItem('id'),
        password: ''
    });
    const [ActivateAlert, setActivateAlert] = useState(false);
    const [alertMsg, setAlertMsg] = useState({
        statusCode: '',
        msg: ''
    });
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const [Password, setPassword] = useState('');
    const [err, setErr] = useState(false);

    const showToastMessage = () => toast("Password changed successfully!!");

    useEffect(() => {
        setformData({ ...formData, password: Password });
    }, [Password, ConfirmPassword]);

    const handleClick = () => {
        if (Password === ConfirmPassword) {
            console.log(formData);
            axios.post(
                "http://localhost:8000/api/update/resetPasword",
                formData, // Updated formData object
                {
                    headers: { "Content-Type": "application/json" },
                }
            )
                .then((response) => {
                    setErr(false);
                    if (response.data.statusCode === 200) {
                        localStorage.setItem('id', formData.collegeId);
                        showToastMessage()
                        setTimeout(() => {
                            window.location.href = '/';
                        }, 2000); // Adjust th
                       
                        setActivateAlert(true);
                        setAlertMsg({ statusCode: response.data.statusCode, msg: response.data.msg });
                    } else {
                        console.log("Error:", response.data.msg);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                });
        } else {
            setErr(true);
            setActivateAlert(true);
            setAlertMsg({ statusCode: 400, msg: "Password not matched" });
        }
    };
    return (
        <div>
            <div className="flex items-center justify-center p-12 h-screen">
                <div className="mx-auto w-full max-w-[550px] bg-white text-black p-9 rounded-xl">
                    <h1 className="text-4xl font-medium">Reset password</h1>
                    <p className="text-slate-500">Enter Your New PAssword to reset</p>

                    <div className="my-10">
                        <div className="flex flex-col space-y-5">
                            <label for="password">
                                <p className="font-medium text-slate-700 pb-2"> Password</p>
                                <input
                                    id="password"
                                    name="password"
                                    type="text"
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                    placeholder="Password"
                                    onChange={(e) => { setPassword(e.target.value) }}
                                />
                            </label>
                            <label for="ConfirmPassword">
                                <p className="font-medium text-slate-700 pb-2">Confirm Password</p>
                                <input
                                    id="password"
                                    name="ConfirmPassword"
                                    type="password"
                                    className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                    placeholder="Confirm Password"
                                    onChange={(e) => { setConfirmPassword(e.target.value); setErr(false) }}
                                />
                            </label>

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

                                <span>Reset Password</span>
                            </button>
                            <ToastContainer />

                            { err && <p className=" text-red-600 font-medium inline-flex space-x-1 items-center">Passwords don't match !!!</p>}
                        </div>
                    </div>
                </div>
            </div>
            <div className="pt-4">
                {ActivateAlert === true ? alertMsg.statusCode === 200 ? <Alerts msg={alertMsg.msg} type={200} /> : <Alerts msg={alertMsg.msg} type={400} /> : ''}
            </div>
           
        </div>
    );
}

export default ResetPassword