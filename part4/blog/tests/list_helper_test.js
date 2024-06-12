const { test, describe, after, beforeEach } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/Blog");
const api = supertest(app);
const mongoose = require("mongoose");

const exampleBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

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

describe("Exercise 4.5*", () => {
  test("Find the most liked blog", () => {
    const result = listHelper.favoriteBlog(exampleBlogs);
    assert.deepStrictEqual(result, exampleBlogs[2]);
  });
});

describe("Exercise 4.6*", () => {
  test("Find the author with the most blogs", () => {
    const expected = {
      author: "Robert C. Martin",
      blogs: 3,
    };
    const result = listHelper.mostBlogs(exampleBlogs);

    assert.deepStrictEqual(result, expected);
  });
});

describe("Exercise 4.7*", () => {
  test("Find  the author with the most likes", () => {
    const expected = {
      author: "Edsger W. Dijkstra",
      likes: 17,
    };
    const result = listHelper.mostLikes(exampleBlogs);

    assert.deepStrictEqual(result, expected);
  });
});

// TESTING THE BACKEND SECTION
describe("Testing the backend", () => {
  beforeEach(async () => {
    await Blog.deleteMany();

    const testBlog = {
      author: "Test",
      url: "Test",
    };

    await api.post("/api/blogs").send(testBlog).expect(201);
  });

  test("4.8: Verify that application returns correct amount of blog posts in JSON format", async () => {
    const result = await api
      .get("/api/blogs")
      .expect("Content-Type", /application\/json/)
      .expect(200);

    assert.strictEqual(result.body.length, 1);
  });

  test("4.9: Verify that the unique identifier property of the blog posts is named id, by default the database names the property _id", async () => {
    const findTestBlog = await Blog.findOne({ author: "Test" });

    const result = await api
      .get("/api/blogs")
      .expect("Content-Type", /application\/json/)
      .expect(200);

    assert.strictEqual(result.body[0].id, findTestBlog.id);
  });

  after(async () => {
    await mongoose.connection.close();
  });
});
