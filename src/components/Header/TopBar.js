import React, { useState, useEffect } from 'react'
import { BsFacebook, BsGithub, BsWhatsapp, BsTwitter } from "react-icons/bs";
import dayjs from 'dayjs';

function TopBar() {

    const [time, setTime] = useState("")

    useEffect(() => {

        setInterval(() => {
            setTime(dayjs().format("DD/MM/YYYY, hh:mm:ss A"))
        })

    }, [])

    return (
        <header className='topbar'>
            <div className="container">
                <div className="row">
                    <div className="col-7">
                        <p className="mb-0 text-white">{time}</p>
                    </div>
                   
                </div>
            </div>
            {/* <nav class="navbar navbar-expand-lg navbar-dark " >
                <div class="container-fluid">
                    <a class="navbar-brand" ></a>
                    <div class="collapse navbar-collapse  flex-grow-0" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="navbar-brand" href="#">
                                    <BsGithub />
                                    {/* Github *
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="navbar-brand" href="#">
                                    <BsFacebook />
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="navbar-brand" href="#">
                                    <BsWhatsapp />
                                    {/* whatsapp *
                                </a>
                            </li>
                            <li class="nav-item">

                            </li>
                        </ul>
                        <a class="navbar-brand" href="#">
                            <BsTwitter />
                            {/* twitter *
                        </a>
                    </div>
                </div>
            </nav> */}
        </header >
    )
}

export default TopBar;