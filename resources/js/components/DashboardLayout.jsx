import React from "react";
import { usePage } from "@inertiajs/react";
import DashboardNavbar from "./DashboardNavbar";

const DashboardLayout = ({ children }) => {
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
            <DashboardNavbar />
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

export default DashboardLayout