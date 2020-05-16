import { shallowMount } from "@vue/test-utils";

import ErrorPageComponent from "../../src/components/ErrorPageComponent.vue";

describe("ErrorPageComponent.vue", () => {
  it("test error", () => {
    const wrapper = shallowMount(ErrorPageComponent);
    const message = wrapper.find("p").text();
    expect(message).toBe("Strona, której szukasz nie istnieje!");
  });
});
