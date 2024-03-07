import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import conf from "../conf/main";
import ax from "../conf/ax";
import NavbarTop from "./NavbarTop";
import NavbarLink from "./NavbarLink";

const EditProfile = () => {
	const [userData, setUserData] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [picture, setPicture] = useState(null);
	const { id } = useParams();

	const fetchData = async () => {
		setLoading(true);
		try {
			const jwtToken = sessionStorage.getItem("auth.jwt");
			if (!jwtToken) {
				console.error("JWT token not found.");
				return;
			}

			const response = await ax.get(conf.EditProfile);
			setUserData(response.data);
			setUsername(response.data.username);
			setEmail(response.data.email);
		} catch (error) {
			setError("Failed to fetch data");
			console.error("Failed to fetch data:", error);
		} finally {
			setLoading(false);
		}
	};

	const handleUpdateProfile = async () => {
		setLoading(true);
		try {
			const jwtToken = sessionStorage.getItem("auth.jwt");
			if (!jwtToken) {
				console.error("JWT token not found.");
				return;
			}

			const formData = new FormData();
			formData.append("files", picture, picture.name);
			const uploadResponse = await ax.post(`${conf.apiUrlPrefix}/upload/`, formData);
			console.log("File uploaded successfully:", uploadResponse.data);
			const pictureId = uploadResponse.data[0].id;
			const updatedUserData = { username, email, picture: pictureId };
			const updateUserResponse = await ax.put(`${conf.apiUrlPrefix}/users/${id}`, updatedUserData);
			setUserData(updateUserResponse.data);
			console.log("Profile updated successfully:", updateUserResponse.data);

		} catch (error) {
			setError("Failed to update profile");
			console.error("Failed to update profile:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleChange = (event) => {
		setPicture(event.target.files[0]);
	};

	return (
		<div className="body">
			<NavbarTop NavbarLink={NavbarLink} />
			{loading ? (
				<p>Loading...</p>
			) : error ? (
				<p>Error: {error}</p>
			) : (
				userData && (
					<div className="container">
						<form>
							<div className="mb-3">
								<label htmlFor="username" className="form-label">
									Username
								</label>
								<input
									type="text"
									id="username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="form-control"
									placeholder="Enter username"
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="email" className="form-label">
									Email
								</label>
								<input
									type="email"
									id="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="form-control"
									placeholder="Enter email"
								/>
							</div>
							<div className="mb-3">
								<label htmlFor="profilePicture" className="form-label">
									Profile Picture
								</label>
								<input
									type="file"
									accept="image/*"
									id="profilePicture"
									name="file"
									onChange={handleChange}
									className="form-control"
								/>
							</div>
							<button type="button" onClick={handleUpdateProfile} className="btn btn-primary">
								Update Profile
							</button>
						</form>
						<div className="mt-3">
							{userData.picture && (
								<img
									src={`${conf.url}${userData.picture.url}`}
									alt="Profile"
									className="img-fluid"
								/>
							)}
						</div>
					</div>
				)
			)}
		</div>
	);
};

export default EditProfile;
