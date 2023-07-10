import "@testing-library/jest-dom";

import {server} from "./mocks/server";

beforeAll(() => server.listen());

beforeEach(() => {
	jest.spyOn(console, "error");
	console.error.mockImplementation(() => null);
});

afterEach(() => {
	server.resetHandlers();
	console.error.mockRestore();
});

afterAll(() => server.close());
