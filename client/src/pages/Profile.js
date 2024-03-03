import React, { useContext, useEffect, useState } from "react";
import Datapro from "../components/Datapro";
import conf from "../conf/main";
import ax from "../conf/ax";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import Spinner from "../components/Spinner";
import { AuthContext } from "../context/AuthContext";
const Profile = () => {
	const context = useContext(AuthContext);
	const [data, setData] = useState({});
	const [entries, setEntries] = useState([]);
	const [id, setid] = useState();
	const [course, setCourse] = useState([]);
	const picture = context.state.picture;
	const [loading, setLoading] = useState(true);

	const fetchProfile = async () => {
		try {
			const response = await ax.get(conf.findanything);
			setData(response.data);
			setid(response.data.id)
			setEntries(response.data.entries);
			const courses = response.data.entries.map((item) => item.course);
			setCourse(courses);
			setLoading(false);
		} catch (error) {
			console.log("fetchProfile error:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProfile();
	}, []);

	return (
		<div className="body">
			<NavbarTop NavbarLink={NavbarLink} />
			{loading ? <Spinner /> : <Datapro data={[data, entries, course, picture,id]} />}
		</div>
	);
};

export default Profile;
