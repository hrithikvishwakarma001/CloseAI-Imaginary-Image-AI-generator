import React from "react";
import SidebarWithHeader from "../components/SidebarWithHeader";
import AllRoutes from "./AllRoutes";
const Navbar = () => {
	return (
		<SidebarWithHeader>
			<AllRoutes />
		</SidebarWithHeader>
	);
};

export default Navbar;
