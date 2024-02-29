import axios from "axios";
import React, { useEffect, useState } from "react";


const ManageData = () => {
    const [courses, setCourses] = useState([]);
    const [entries, setEntries] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);

    const fetchCourse = async () => {
        try {
            const response = await axios.get("http://localhost:1337/api/courses?populate=*");
            setCourses(response.data.data);
        } catch (error) {
            console.log("Failed to fetch courses data", error);
        }
    };
    
    const fetchEntries = async () => {
        try {
            const response = await axios.get("http://localhost:1337/api/entries?populate[owner]=*");
            setEntries(response.data.data);
        } catch (error) {
            console.log("Failed to fetch entries data", error);
        }
    };

    const handleEditCourse = (id) => {
        setEditingItemId(id);
    };

    // Function to delete a course
    const handleDeleteCourse = async (id) => {
        try {
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
            await axios.delete(`http://localhost:1337/api/entries/${id}`);
            setEntries(entries.filter(entry => entry.id !== id));
        } catch (error) {
            console.log("Failed to delete entry", error);
        }
    };

    useEffect(() => {
        fetchCourse();
        fetchEntries();
    }, []);

    return (
        <div className="manage-data-container">
            <h1 className="header">Manage Data</h1>
            <p className="role">Role: Super Admin</p>
            <div className="section">
                <h2 className="section-header">Courses</h2>
                <div className="data-list">
                    {courses.map(course => (
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
                <h2 className="section-header">Entries</h2>
                <div className="data-list">
                    {entries.map(entry => (
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
