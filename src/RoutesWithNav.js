import { Outlet } from "react-router-dom";
import NavbarC from "./Components/NavbarC/NavbarC";
import React from 'react';

export default function RoutesWithNav(){

    return(
        <div>
            <NavbarC/>
            <Outlet/>
        </div>
    )
}