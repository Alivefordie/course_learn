import axios from "axios";
import React, { useEffect, useState } from "react";

const ManageData = () => {
    const [courses, setCourses] = useState([]);
    const [entries, setEntries] = useState([]);
    const [editingItemId, setEditingItemId] = useState(null);
    const [deletingItemId, setDeletingItemId] = useState(null);

    const fetchCourse = async () => {
        try {
            const response = await axios.get("http://localhost:1337/api/courses?populate=*");
            setCourses(response.data.data);
        } catch(error) {
            console.log("Failed to fetch courses data", error);
        }
    };
    
    const fetchEntries = async () => {
        try {
            const response = await axios.get("http://localhost:1337/api/entries?populate[owner]=*");
            setEntries(response.data.data);
            console.log(response.data.data)
        } catch(error) {
            console.log("Failed to fetch entries data", error);
        }
    };

    const handleEditCourse = (id) => {
        setEditingItemId(id);
    };

    const handleDeleteCourse = async (id) => {
        try {
            await axios.delete(`http://localhost:1337/api/courses/${id}`);
            setCourses(courses.filter(course => course.id !== id));
        } catch(error) {
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
        } catch(error) {
            console.log("Failed to delete entry", error);
        }
    };

    useEffect(() => {
        fetchCourse();
        fetchEntries();
    }, []);

    return(
        <div className="manage-data-container">
            <h1 className="header">Manage Data</h1>
            <p className="role">Role: Super Admin</p>
            <div className="section">
                <h2 className="section-header">Courses</h2>
                <div className="data-list">
                    {courses.map(course => (
                        <div key={course.id} className="data-item">
                            <strong>Title:</strong> {course.attributes.title}<br/>
                            <strong>Description:</strong> {course.attributes.description}<br/>
                            <strong>Duration:</strong> {course.attributes.duration}<br/>
                            <strong>Price:</strong> {course.attributes.price}<br/>
                            <strong>Amount:</strong> {course.attributes.amount}<br/>
                            <strong>Owner:</strong> {course.attributes.owner ? course.attributes.owner.data.attributes.username : 'N/A'}<br/>
                            <div className="data-item-actions">
                                <button onClick={() => handleEditCourse(course.id)} className="edit-button btn btn-primary">Edit</button>
                                <button onClick={() => handleDeleteCourse(course.id)} className="delete-button btn btn-danger">Delete</button>
                                {editingItemId === course.id && (
                                    <div className="edit-form">
                                        {/*รอทำ*/}
                                    </div>
                                )}
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
                            <strong>ID:</strong> {entry.id}<br/>
                            <strong>Like:</strong> {entry.attributes.like}<br/>
                            <strong>Cart:</strong> {entry.attributes.cart}<br/>
                            <strong>Enroll:</strong> {entry.attributes.enroll}<br/>
                            <strong>CreatedAt:</strong> {entry.attributes.createdAt}<br/>
                            <strong>UpdatedAt:</strong> {entry.attributes.updatedAt}<br/>
                            <strong>Owner:</strong> {entry.attributes.owner ? entry.attributes.owner.data.attributes.username : 'N/A'}<br/>
                            <div className="data-item-actions">
                                <button onClick={() => handleEditEntry(entry.id)} className="edit-button btn btn-primary">Edit</button>
                                <button onClick={() => handleDeleteEntry(entry.id)} className="delete-button btn btn-danger">Delete</button>
                                {editingItemId === entry.id && (
                                    <div className="edit-form">
                                        {/*รอทำ*/}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ManageData;
