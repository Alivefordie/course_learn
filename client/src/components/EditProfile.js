import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; 
import axios from "axios"; 
import conf from "../conf/main";
import ax from "../conf/ax";

const EditProfile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [picture, setPicture] = useState(null); // Corrected variable name
    const { id } = useParams(); 

    const fetchData = async () => {
        setLoading(true);
        try {
            const jwtToken = sessionStorage.getItem('auth.jwt');
            if (!jwtToken) {
                console.error('JWT token not found.');
                return;
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
            
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
            const jwtToken = sessionStorage.getItem('auth.jwt');
            if (!jwtToken) {
                console.error('JWT token not found.');
                return;
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

            const formData = new FormData();
            formData.append('files', picture, picture.name);
    
            const uploadResponse = await axios.post('http://localhost:1337/api/upload/', formData);
            console.log('File uploaded successfully:', uploadResponse.data);
            const pictureId = uploadResponse.data[0].id;
            console.log(pictureId)

            const updatedUserData = { username, email, picture: pictureId }; 
            const updateUserResponse = await axios.put(`http://localhost:1337/api/users/${id}`, updatedUserData);
    
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
        <div className="container">
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                userData && (
                    <div>
                        <form>
                            
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Username:</label>
                                <input
                                    type="text"
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email:</label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="form-control"
                                />
                            </div>
                            <button type="button" onClick={handleUpdateProfile} className="btn btn-primary">
                                Update Profile
                            </button>
                        </form>
                        {userData.picture && (
                            <img src={`${conf.url}${userData.picture.url}`} alt="Profile" className="profile-picture mt-3" />
                        )}
                        <br/>
                        <input type="file" accept="image/*" name='file' onChange={handleChange} />
                    </div>
                    
                )
            )}
        </div>
    );
};

export default EditProfile;
