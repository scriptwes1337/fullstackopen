const { test, describe } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");

describe("Exercise 4.3", () => {
  test("Dummy always returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    assert.strictEqual(result, 1);
  });
});

describe("Exercise 4.4", () => {
  const blogWithOneLike = [
    {
      likes: 1,
    },
  ];

  test("Find total likes - When list has only one blog with one like, equals the likes of that", () => {
    const result = listHelper.totalLikes(blogWithOneLike);
    assert.strictEqual(result, 1);
  });
});
