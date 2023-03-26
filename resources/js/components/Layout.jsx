import React from "react";
import Navbar from "./Navbar";
import { usePage } from "@inertiajs/react";

const Layout = ({ children }) => {
    const props = usePage().props
    const getAlertColor = () => {
        switch(props.flashType){
            case "ERROR":
                return "red";
            case "SUCCESS":
                return "green";
            default:
                return "violet";
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="container mx-auto p-5">
                {
                    props.flash && 
                    <div className={`w-full p-4 bg-${getAlertColor()}-500 text-white rounded-md shadow-lg`} role="alert">
                        {props.flash}
                    </div>    
                }
                {children}
            </div>
        </div>
    )
}

export default Layout