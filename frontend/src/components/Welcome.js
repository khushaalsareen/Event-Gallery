import React from 'react'
import { Link } from 'react-router-dom'

function Welcome() {
    return (
        <>
            <div >

                <div className="text-center mb-10">
                    <h1 className="font-bold text-3xl text-gray-900">Hey There!</h1>
                    {/* <p>NITJ Event Gallery</p> */}
                    {/* <strong className="font-bold text-gray-900 ">to EventO</strong> */}
                </div>
                <div className="mt-10">
                    <div className="text-justify">
                    Welcome to the NITJ Event Gallery, your hub for experiencing the vibrant tapestry of events hosted by various clubs and societies at our college. Explore an array of captivating gatherings, from academic symposiums to cultural celebrations, each meticulously crafted to enrich your college experience. Immerse yourself in the dynamic energy of our community as you browse through the diverse range of activities. Whether you're passionate about technology, arts, or sports, there's something here for everyone. Join us as we showcase the creativity, talent, and innovation of our students, and get ready to be inspired by the extraordinary events unfolding right here at NITJ.
                    </div>
                    {/* <div className="text-justify">
                        Beyond academics, you'll find a vibrant college life with various clubs and activities. This journey is about growth, creativity, and lasting memories. Get ready to shape unforgettable experiences and create a successful future. We're here to support you every step of the way. Cheers to your adventure in event management!
                    </div> */}

                    <div className="my-5">
                        <Link to='/auth/signUp'>
                            <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold my-4">


                                REGISTER
                            </button>
                        </Link>

                        <Link to='/auth/login'>
                            <button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold">


                                LOGIN
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Welcome