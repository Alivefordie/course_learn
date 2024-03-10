import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AllCourse from "../pages/allCourse";

describe("AllCourse Component API Calls", () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("fetches courses from the API", async () => {
    // Test 1: Get courses sort by likeMost
    const mockCourses = [
      { id: 1, title: "Course 1" },
      { id: 2, title: "Course 2" },
    ];

    mockAxios
      .onGet("/api/courses?likeMost=true")
      .reply(200, { data: mockCourses });

    render(<AllCourse />);

    await waitFor(() => {
      expect(screen.getByText("Course 1")).toBeInTheDocument();
    });
  });

  it("handles API errors gracefully for likeMost", async () => {
    
    mockAxios.onGet("/api/courses?likeMost=true").reply(500); // Error response

    render(<AllCourse />);

    await waitFor(() => {
      expect(screen.getByText("Error fetching data:")).toBeInTheDocument();
    });
  });

  it("fetches newest courses from the API", async () => {
    // Test 3: Get newest courses
    const mockNewestCourses = [
      { id: 3, title: "New Course 1" },
      { id: 4, title: "New Course 2" },
    ];

    mockAxios
      .onGet("/api/courses?Newest=true")
      .reply(200, { data: mockNewestCourses });

    render(<AllCourse />);

    await waitFor(() => {
      expect(screen.getByText("New Course 1")).toBeInTheDocument(); 
    });
  });

  it("handles API errors gracefully for newest courses", async () => {
    // Test 4: Error handling for newest courses
    mockAxios.onGet("/api/courses?Newest=true").reply(500); // Error response

    render(<AllCourse />);

    await waitFor(() => {
      expect(screen.getByText("Error fetching data:")).toBeInTheDocument();
    });
  });
});
