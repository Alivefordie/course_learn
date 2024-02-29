import React, { useEffect, useState } from "react";
import Datapro from "../components/Datapro";
import conf from "../conf/main";
import ax from "../conf/ax";
import NavbarTop from "../components/NavbarTop";
import NavbarLink from "../components/NavbarLink";
import Spinner from "../components/Spinner";

const Profile = () => {
	const [data, setData] = useState({});
	const [entries, setEntries] = useState([]);
	const [course, setCourse] = useState([]);
	const [picture, setpicture] = useState("");
	const [loading, setLoading] = useState(true);

	const fetchProfile = async () => {
		try {
			const response = await ax.get(conf.findanything);
			setData(response.data);
			setEntries(response.data.entries);
			const courses = response.data.entries.map((item) => item.course);
			setCourse(courses);
		} catch (error) {
			console.log("fetchProfile error:", error);
			setLoading(false);
		}
	};

	const fetchProfilePicture = async () => {
		try {
			const response = await ax.get(conf.Picture);
			const pictureUrl = response.data.picture.map((item) => item.url);
			setpicture(pictureUrl);

			// console.log(pictureUrl)
		} catch (error) {
			console.log("fetchProfilePicture error:", error);
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchProfile();
		fetchProfilePicture();
		setLoading(false);
	}, []);

	return (
		<div>
			<NavbarTop NavbarLink={NavbarLink} />
			{loading ? (
				<div className="body">
					<Spinner />
				</div>
			) : (
				<Datapro data={[data, entries, course, picture]} />
			)}
		</div>
	);
};

export default Profile;
