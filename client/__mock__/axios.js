// project/__mocks__/axios.js

const mockAxios = jest.createMockFromModule('axios');

// Customize axios behavior as needed for your tests
mockAxios.get = jest.fn(() => Promise.resolve({ data: {} }));

export default mockAxios;
