import { shallowMount } from "@vue/test-utils";

import CourseList from "../../src/components/CourseList.vue";

describe("CourseList.vue", () => {
  it("test course list", () => {
    const wrapper = shallowMount(CourseList);
    const message = wrapper.find("h1").text();
    expect(message).toBe("Lista kursów");
  });
});
