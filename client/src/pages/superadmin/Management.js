import React from "react";
import NavbarLink from "../../components/NavbarLink";
import NavbarTop from "../../components/NavbarTop";
import ManageData from "../../components/superadmin/ManageData";

const Management = () => { 

    return (
        <div>
            <NavbarTop NavbarLink={NavbarLink} />
            <ManageData/>
        </div>
    );
};

export default Management;
