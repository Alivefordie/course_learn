import SmallCourse from "../components/Ins/SmallCourse";
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
const mock = {
	id: 97,
	attributes: {
		title: "D-level",
		description:
			"สอนเนื้อหาโดยปูพื้นฐานความรู้ที่น้องจำเป็นต้องรู้ในการทำข้อสอบ D-level อิงตาม Test Blueprint ปีล่าสุด พร้อมพาน้องตะลุยโจทย์ทั้งซ้อมมือ และข้อสอบจริงปีล่าสุด แถมยังมีโจทย์ที่พี่ปั้น อ.ขลุ่ย และทีมวิชาการแต่งมาให้เพิ่มเติม โดยเป็นแนวที่ใกล้เคียงกับข้อสอบจริง สอนแบบเฉลยละเอียดครบทุกข้อ แถมปล่อยเทคนิคจัดเต็มให้น้องมองออกและทำข้อสอบทันเวลา พร้อมพิชิตคะแนนปังในแต่ละพาร์ท",
		duration: 60,
		price: 3500,
		amount: 2,
		maxCapacity: 40,
		likeCount: 3,
		createdAt: "2024-03-06T03:08:51.549Z",
		updatedAt: "2024-03-09T10:42:21.388Z",
		publishedAt: "2024-03-06T03:09:37.269Z",
		picture: {
			data: {
				id: 139,
				attributes: {
					name: "snow.jpg",
					alternativeText: null,
					caption: null,
					width: 1280,
					height: 720,
					formats: {
						thumbnail: {
							name: "thumbnail_snow.jpg",
							hash: "thumbnail_snow_5a4cd4baca",
							ext: ".jpg",
							mime: "image/jpeg",
							path: null,
							width: 245,
							height: 138,
							size: 7.58,
							url: "/uploads/thumbnail_snow_5a4cd4baca.jpg",
						},
						medium: {
							name: "medium_snow.jpg",
							hash: "medium_snow_5a4cd4baca",
							ext: ".jpg",
							mime: "image/jpeg",
							path: null,
							width: 750,
							height: 422,
							size: 65.47,
							url: "/uploads/medium_snow_5a4cd4baca.jpg",
						},
						small: {
							name: "small_snow.jpg",
							hash: "small_snow_5a4cd4baca",
							ext: ".jpg",
							mime: "image/jpeg",
							path: null,
							width: 500,
							height: 281,
							size: 29.18,
							url: "/uploads/small_snow_5a4cd4baca.jpg",
						},
						large: {
							name: "large_snow.jpg",
							hash: "large_snow_5a4cd4baca",
							ext: ".jpg",
							mime: "image/jpeg",
							path: null,
							width: 1000,
							height: 563,
							size: 120.5,
							url: "/uploads/large_snow_5a4cd4baca.jpg",
						},
					},
					hash: "snow_5a4cd4baca",
					ext: ".jpg",
					mime: "image/jpeg",
					size: 208.83,
					url: "/uploads/snow_5a4cd4baca.jpg",
					previewUrl: null,
					provider: "local",
					provider_metadata: null,
					folderPath: "/",
					createdAt: "2024-03-08T16:40:54.537Z",
					updatedAt: "2024-03-08T16:42:05.602Z",
				},
			},
		},
		owner: {
			data: {
				attributes: {
					username: "Strapi teacher",
				},
			},
		},
		entries: {
			data: [],
		},
	},
};

test("data", () => {
	render(
		<MemoryRouter>
			<SmallCourse course={mock} fetchData={jest.fn()} setLoading={jest.fn()} />
		</MemoryRouter>
	);

	expect(screen.getByText(/ระยะเวลา:/)).toBeInTheDocument();

	expect(screen.getByText(/ครู:/)).toBeInTheDocument();

	expect(screen.getByText(/ชม./)).toBeInTheDocument();

	expect(screen.getByText(/D-level/)).toBeInTheDocument();
});
