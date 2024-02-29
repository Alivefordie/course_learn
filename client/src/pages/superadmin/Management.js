import React, { useEffect, useState } from "react";
import NavbarLink from "../../components/NavbarLink";
import NavbarTop from "../../components/NavbarTop";
import ax from "../../conf/ax";
import conf from "../../conf/main";
import ManageData from "../../components/superadmin/ManageData";

const Management = () => {


    const fetchData = async () => {
        try {

        } catch (error) {
            console.log("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); 

    return (
        <div>
            <NavbarTop NavbarLink={NavbarLink} />
            <ManageData/>
        </div>
    );
};

export default Management;
