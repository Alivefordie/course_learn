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

  test("renders the total price", () => {
    const totalPrice = screen.getByText(/TotalPrice/i);
    expect(totalPrice).toBeInTheDocument();
  });

  test("updates name input value", () => {
    const nameInput = screen.getByPlaceholderText("Name");
    fireEvent.change(nameInput, { target: { value: "John Doe" } });
    expect(nameInput.value).toBe("John Doe");
  });

  test("updates email input value", () => {
    const emailInput = screen.getByPlaceholderText("Email");
    fireEvent.change(emailInput, { target: { value: "john.doe@example.com" } });
    expect(emailInput.value).toBe("john.doe@example.com");
  });

  test("updates date input value", () => {
    const dateInput = screen.getByPlaceholderText("Date");
    fireEvent.change(dateInput, { target: { value: "2022-01-01" } });
    expect(dateInput.value).toBe("2022-01-01");
  });

  test("updates phone input value", () => {
    const phoneInput = screen.getByPlaceholderText("Phone");
    fireEvent.change(phoneInput, { target: { value: "1234567890" } });
    expect(phoneInput.value).toBe("1234567890");
  });

});