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

  it("login failed", () => {
    const fakeData = {
      email: "test123456@example.com",
      password: "a",
    };
    http
      .onPost("https://hype-learning.herokuapp.com/auth/signin")
      .reply(401, { data: fakeData });
  });
  // etc.
});
