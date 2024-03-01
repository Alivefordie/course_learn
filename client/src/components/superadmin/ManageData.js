import axios from "axios";
import React, { useEffect, useState } from "react";
import conf from "../../conf/main";
import ax from "../../conf/ax";

const ManageData = () => {
    const [courses, setCourses] = useState([]);
    const [entries, setEntries] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [searchCourse, setSearchCourse] = useState("");
    const [searchEntryId, setSearchEntryId] = useState("");

    const fetchCourse = async () => {
        try {
            const response = await ax.get(conf.Course);
            setCourses(response.data.data);
        } catch (error) {
            console.log("Failed to fetch courses data", error);
        }
    };

    const fetchEntries = async () => {
        try {
            const response = await ax.get(conf.Entries);
            setEntries(response.data.data);
        } catch (error) {
            console.log("Failed to fetch entries data", error);
        }
    };

    const handleEditCourse = (id) => {
        setEditingItemId(id);
    };

    const handleDeleteCourse = async (id) => {
        try {
            const jwtToken = sessionStorage.getItem('auth.jwt');
            if (!jwtToken) {
                console.error('JWT token not found.');
                return;
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;

            const response = await axios.get("http://localhost:1337/api/users/me?populate[entries][populate][course]=*");
            await axios.delete(`http://localhost:1337/api/courses/${id}`);
            setCourses(courses.filter(course => course.id !== id));
        } catch (error) {
            console.log("Failed to delete course", error);
        }
    };

    const handleEditEntry = (id) => {
        setEditingItemId(id);
    };

    const handleDeleteEntry = async (id) => {
        try {
            const jwtToken = sessionStorage.getItem('auth.jwt');
            if (!jwtToken) {
                console.error('JWT token not found.');
                return;
            }
            axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
            
            const response = await axios.get("http://localhost:1337/api/users/me?populate[entries][populate][course]=*");
            await axios.delete(`http://localhost:1337/api/entries/${id}`);
            setEntries(entries.filter(entry => entry.id !== id));
        } catch (error) {
            console.log("Failed to delete entry", error);
        }
    };

    const handleSearchCourse = (e) => {
        setSearchCourse(e.target.value);
    };

    const handleSearchEntryId = (e) => {
        setSearchEntryId(e.target.value);
    };

    const filteredCourses = courses.filter(course =>
        course.attributes.title.toLowerCase().includes(searchCourse.toLowerCase())
    );

    const filteredEntries = entries.filter(entry =>
        entry.id.toString().includes(searchEntryId)
    );

    useEffect(() => {
        fetchCourse();
        fetchEntries();
    }, []);

    return (
        <div className="manage-data-container">
            <h1 className="header">Manage Data</h1>
            <p className="role">Role: Super Admin</p>

            <div className="search-container">
                {/*course */}
                <input
                    type="text"
                    placeholder="Search course..."
                    value={searchCourse}
                    onChange={handleSearchCourse}
                    className="search-input"
                />

                {/*entries*/}
                <input
                    type="text"
                    placeholder="Search entry ID..."
                    value={searchEntryId}
                    onChange={handleSearchEntryId}
                    className="search-input"
                />
            </div>

            <div className="section">
                <h2 className="section-header">Courses ({courses.length})</h2>
                <div className="data-list">
                    {filteredCourses.map(course => (
                        <div key={course.id} className="data-item">
                            <div className="course-details">
                                <strong>Title:</strong> {course.attributes && course.attributes.title}<br />
                                <strong>Description:</strong> {course.attributes && course.attributes.description}<br />
                                <strong>Duration:</strong> {course.attributes && course.attributes.duration}<br />
                                <strong>Price:</strong> {course.attributes && course.attributes.price}<br />
                                <strong>Amount:</strong> {course.attributes && course.attributes.amount}<br />
                                <strong>Owner:</strong> {course.attributes && course.attributes.owner ? course.attributes.owner.data.attributes.username : 'N/A'}<br />
                            </div>
                            <div className="data-item-actions">
                                <button onClick={() => handleEditCourse(course.id)} className="edit-button btn btn-primary">Edit</button>
                                <button onClick={() => handleDeleteCourse(course.id)} className="delete-button btn btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section">
                <h2 className="section-header">Entries ({entries.length})</h2>
                <div className="data-list">
                    {filteredEntries.map(entry => (
                        <div key={entry.id} className="data-item">
                            <div className="entry-details">
                                <strong>ID:</strong> {entry.id}<br />
                                <strong>Like:</strong> {entry.attributes && entry.attributes.like}<br />
                                <strong>Cart:</strong> {entry.attributes && entry.attributes.cart}<br />
                                <strong>Enroll:</strong> {entry.attributes && entry.attributes.enroll}<br />
                                <strong>CreatedAt:</strong> {entry.attributes && entry.attributes.createdAt}<br />
                                <strong>UpdatedAt:</strong> {entry.attributes && entry.attributes.updatedAt}<br />
                                <strong>Owner:</strong> {entry.attributes && entry.attributes.owner && entry.attributes.owner.data && entry.attributes.owner.data.attributes && entry.attributes.owner.data.attributes.username ? entry.attributes.owner.data.attributes.username : 'N/A'}<br />
                            </div>
                            <div className="data-item-actions">
                                <button onClick={() => handleEditEntry(entry.id)} className="edit-button btn btn-primary">Edit</button>
                                <button onClick={() => handleDeleteEntry(entry.id)} className="delete-button btn btn-danger">Delete</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageData;
