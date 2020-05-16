import axios from "axios";
import MockAdapter from "axios-mock-adapter";

describe("actions", () => {
  let http;

  beforeAll(() => {
    http = new MockAdapter(axios);
  });

  afterEach(() => {
    http.reset();
  });

  afterAll(() => {
    http.restore();
  });

  it("login success", () => {
    const fakeData = {
      email: "testtest@example.com",
      password: "test",
      firstName: "Test",
      lastName: "Test",
    };
    http
      .onPost("https://hype-learning.herokuapp.com/auth/signup")
      .reply(404, { data: fakeData });
  });
  // etc.
});
