import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import NavbarTop from "../NavbarTop";
import { Link, useParams } from "react-router-dom";
import ax from "../../conf/ax";
import conf from "../../conf/main";

const CourseV = () => {
	const item = 1; //useParams()
	const [course, setCourse] = useState({});
	const [syllabus, setSyllabus] = useState([]);
	const [currentSyllabusIndex, setCurrentSyllabusIndex] = useState(0);
	const [progress, setProgress] = useState(0);

	const fetchSyllabus = async () => {
		const response = await ax.get(`http://localhost:1337/api/courses/${item}`);
		setCourse(response.data.data);
		setSyllabus(response.data.data.attributes.course_syllabus);
	};

	useEffect(() => {
		fetchSyllabus();
	}, []);

	// useEffect(() => {
	// 	console.log(syllabus);
	// }, [currentSyllabusIndex, syllabus]);

	const handlesyllabusChange = (index) => {
		setCurrentSyllabusIndex(index);
		setProgress(0);
	};

	const getUrlVideo = (videoComponent) => {
		return videoComponent.videoFile.data[0].attributes.url;
	};
	const getUrlFile = (FileComponent) => {
		return FileComponent.material.data[0].attributes.url;
	};

	const componentStyle = (syllabus) => {
		switch (syllabus.__component) {
			case "activity.video":
				return (
					<div className="col-md-8">
						<p>Title: {syllabus.title}</p>
						<p>Description: {syllabus.description}</p>

						<ReactPlayer
							url={conf.url + getUrlVideo(syllabus)}
							controls
							playing={true}
							onProgress={({ playedSeconds }) => {
								// console.log(Math.round(playedSeconds));
								setProgress(Math.round(playedSeconds));
							}}
						/>
						<p>Progress: {progress}</p>
					</div>
				);
			case "activity.text":
				return (
					<div className="col-md-8">
						<p>Title: {syllabus.title}</p>
						<p>Description: {syllabus.description}</p>
					</div>
				);

			case "activity.file":
				return (
					<div className="col-md-8">
						<p>"Title: "{syllabus.title}</p>
						<p>
							Download:{" "}
							<Link to={conf.url + getUrlFile(syllabus)} target="_blank">
								"File"
							</Link>
						</p>
					</div>
				);
		}
	};

	// useEffect(() => {
	// 	const updateLearningProgress = async () => {
	// 		const response = await ax.get("http://localhost:1337/api/progresses?populate=*");
	// 		// const user = response.data.data[0]?.attributes?.users?.data?.id;
	// 		const response1 = await axios.get("http://localhost:1337/api/users/me");
	// 		setuser("find users:", response1.data.id);
	// 		console.log("find users:", response1.data.id);
	// 		const test = response?.data?.data;
	// 		console.log("test l:", test);
	// 		setid(response.data.data[0]?.id);
	// 		console.log("id:", response.data.data[0]?.id);

	// 		if (!test.length) {
	// 			const progressData = {
	// 				data: {
	// 					course: item,
	// 					course_video: null,
	// 					value: 0,
	// 					users: 21,
	// 				},
	// 			};
	// 			const test1 = await ax.post("http://localhost:1337/api/progresses", progressData);
	// 			console.log(test1);
	// 			console.log("postttttttttttttttttttttt");
	// 		} else {
	// 			const fixprogressData = {
	// 				data: { value: progress },
	// 			};

	// 			const test2 = await ax.put(`http://localhost:1337/api/progresses/${id}`, fixprogressData);
	// 			console.log(test2);
	// 			console.log("putttttttttttttttttttttttttttt");
	// 		}
	// 	};
	// 	updateLearningProgress();
	// }, [progress]);

	// useEffect(() => {
	//     updateLearningProgress()
	// }, [progress])

	return (
		<div className="body">
			<NavbarTop />
			<div className="container">
				{syllabus.length > 0 && (
					<div className="row">
						{componentStyle(syllabus[currentSyllabusIndex])}
						<div className="col-md-4">
							<div className="list-group">
								{syllabus.map((item, index) => (
									<button
										key={index}
										className={`list-group-item list-group-item-action ${
											index === currentSyllabusIndex ? "active" : ""
										}`}
										onClick={() => handlesyllabusChange(index)}>
										{item.title}
									</button>
								))}
								{/* สำหรับไปหน้าไปหลัง เอง
                            {currentSyllabusIndex + 1 < syllabus.length ? (
								<>
									{currentSyllabusIndex > 0 && (
										<button
											className={`list-group-item list-group-item-action }`}
											onClick={() => handlesyllabusChange((index) => index - 1)}>
											previous
										</button>
									)}
									<button
										className={`list-group-item list-group-item-action }`}
										onClick={() => handlesyllabusChange((index) => index + 1)}>
										next
									</button>
								</>
							) : (
								<button className={`list-group-item list-group-item-action }`}>End</button>
							)} */}
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default CourseV;
