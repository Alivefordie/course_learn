import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Payment from "./Payment";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";


describe("Payment", () => {
  let mockAxios;

  beforeEach(() => {
    mockAxios = new MockAdapter(axios);
  });

  afterEach(() => {
    mockAxios.restore();
  });

  it("fetches payment from the API", async () => {
    // Test 1: Get courses sort by likeMost
    const postData = [
      { paymentAmout: "0" },
    ];

    mockAxios
      .onGet("/api/tansactions")
      .reply(200, { data: postData });

    render(<Payment />);

    await waitFor(() => {
      expect(screen.getByText("Test Pay")).toBeInTheDocument();
    });
  });

});