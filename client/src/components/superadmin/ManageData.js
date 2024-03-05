import React, { useEffect, useState } from "react";
import conf from "../../conf/main";
import ax from "../../conf/ax";
import { Button, Container, Form, FormControl, InputGroup } from "react-bootstrap";

const ManageData = () => {
	const [courses, setCourses] = useState([]);
	const [entries, setEntries] = useState([]);
	const [editingItemId, setEditingItemId] = useState(null);
	const [searchCourse, setSearchCourse] = useState("");
	const [searchEntryId, setSearchEntryId] = useState("");
	const [searchUser, setSearchUser] = useState("");
	const [slip, setSlip] = useState([]);

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

	const fetchSlip = async () => {
		try {
			const response = await ax.get(conf.Slip);
			setSlip(response.data.data);
		} catch (error) {
			console.log("Failed to fetch slip", error);
		}
	};

	useEffect(() => {
		fetchCourse();
		fetchEntries();
		fetchSlip();
	}, []);

	useEffect(() => {
		console.log(slip);
		if (slip && slip.length > 0) {
			slip.forEach((item) => {
				console.log(item.attributes.member);
			});
		}
	}, [slip]);

	const handleEditCourse = (id) => {
		setEditingItemId(id);
	};

	const handleDeleteCourse = async (id) => {
		try {
			const response = await ax.get(
				`${conf.apiUrlPrefix}/users/me?populate[entries][populate][course]=*`
			);
			await ax.delete(`${conf.apiUrlPrefix}/courses/${id}`);
			setCourses(courses.filter((course) => course.id !== id));
		} catch (error) {
			console.log("Failed to delete course", error);
		}
	};

	const handleEditEntry = (id) => {
		setEditingItemId(id);
	};

	const handleDeleteEntry = async (id) => {
		try {
			const response = await ax.get(
				`${conf.apiUrlPrefix}/users/me?populate[entries][populate][course]=*`
			);
			await ax.delete(`${conf.apiUrlPrefix}/entries/${id}`);
			setEntries(entries.filter((entry) => entry.id !== id));
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

	const handleSearchUser = (e) => {
		setSearchUser(e.target.value);
	};

	const filteredCourses = courses.filter((course) =>
		course.attributes.title.toLowerCase().includes(searchCourse.toLowerCase())
	);

	const filteredEntries = entries.filter((entry) => entry.id.toString().includes(searchEntryId));

	// ใช้ filter เพื่อกรอง slip และ entries ตามผู้ใช้ที่ค้นหา
	const filteredSlip = slip.filter(
		(item) =>
			item.attributes.member &&
			item.attributes.member.data &&
			item.attributes.member.data.attributes.username
				.toLowerCase()
				.includes(searchUser.toLowerCase())
	);

	const filteredEntriesByUser = entries.filter(
		(entry) =>
			entry.attributes.owner &&
			entry.attributes.owner.data &&
			entry.attributes.owner.data.attributes.username
				.toLowerCase()
				.includes(searchUser.toLowerCase())
	);

	return (
		<Container>
			<h1 className="header">Manage Data</h1>
			<p className="role">Role: Super Admin</p>

			<div className="search-container">
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Search course..."
						value={searchCourse}
						onChange={handleSearchCourse}
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Search entry ID..."
						value={searchEntryId}
						onChange={handleSearchEntryId}
					/>
				</InputGroup>
				<InputGroup className="mb-3">
					<FormControl
						placeholder="Search user..."
						value={searchUser}
						onChange={handleSearchUser}
					/>
				</InputGroup>
			</div>

			<div className="section">
				<h2 className="section-header">Courses ({courses.length})</h2>
				<div className="data-list">
					{filteredCourses.map((course) => (
						<div key={course.id} className="data-item">
							<div className="course-details">
								<strong>Title:</strong> {course.attributes && course.attributes.title}
								<br />
								<strong>Description:</strong> {course.attributes && course.attributes.description}
								<br />
								<strong>Duration:</strong> {course.attributes && course.attributes.duration}
								<br />
								<strong>Price:</strong> {course.attributes && course.attributes.price}
								<br />
								<strong>Amount:</strong> {course.attributes && course.attributes.amount}
								<br />
								<strong>Owner:</strong>{" "}
								{course.attributes && course.attributes.owner
									? course.attributes.owner.data.attributes.username
									: "N/A"}
								<br />
							</div>
							<div className="data-item-actions">
								<Button onClick={() => handleEditCourse(course.id)} variant="primary">
									Edit
								</Button>
								<Button onClick={() => handleDeleteCourse(course.id)} variant="danger">
									Delete
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className="section">
				<h2 className="section-header">Entries ({filteredEntriesByUser.length})</h2>
				<div className="data-list">
					{filteredEntriesByUser.map((entry) => (
						<div key={entry.id} className="data-item">
							<div className="entry-details">
								<strong>ID:</strong> {entry.id}
								<br />
								<strong>Like:</strong> {entry.attributes && entry.attributes.like}
								<br />
								<strong>Cart:</strong> {entry.attributes && entry.attributes.cart}
								<br />
								<strong>Enroll:</strong> {entry.attributes && entry.attributes.enroll}
								<br />
								<strong>CreatedAt:</strong> {entry.attributes && entry.attributes.createdAt}
								<br />
								<strong>UpdatedAt:</strong> {entry.attributes && entry.attributes.updatedAt}
								<br />
								<strong>Owner:</strong>{" "}
								{entry.attributes &&
								entry.attributes.owner &&
								entry.attributes.owner.data &&
								entry.attributes.owner.data.attributes &&
								entry.attributes.owner.data.attributes.username
									? entry.attributes.owner.data.attributes.username
									: "N/A"}
								<br />
							</div>
							<div className="data-item-actions">
								<Button onClick={() => handleEditEntry(entry.id)} variant="primary">
									Edit
								</Button>
								<Button onClick={() => handleDeleteEntry(entry.id)} variant="danger">
									Delete
								</Button>
							</div>
						</div>
					))}
				</div>
			</div>

			<h2>Slip</h2>
			<div className="row">
				{filteredSlip.map((item, index) => (
					<div className="col-md-4 mb-3" key={index}>
						<div className="card">
							<div className="card-body">
								<h5 className="card-title">Slip ID: {item.id}</h5>
								<p className="card-text">
									Owner:{" "}
									{item.attributes.member &&
										item.attributes.member.data &&
										item.attributes.member.data.attributes.username}
								</p>
								{item.attributes.slip &&
									item.attributes.slip.data &&
									item.attributes.slip.data.attributes.url && (
										<img
											src={conf.url + item.attributes.slip.data.attributes.url}
											className="card-img-top"
											alt={`slip-${index}`}
										/>
									)}
							</div>
						</div>
					</div>
				))}
			</div>
		</Container>
	);
};

export default ManageData;
