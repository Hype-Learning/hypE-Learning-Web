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
      email: "i@example.com",
      password: "Testowe1",
    };
    http
      .onPost("https://hype-learning.herokuapp.com/auth/signin")
      .reply(200, { data: fakeData });
  });
  // etc.
});
