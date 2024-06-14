import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Blog from "./Blog";
import { CreateBlog } from "./CreateBlog";

const blog = {
  _id: "1",
  title: "Test Blog",
  author: "Test Author",
  url: "http://testurl.com",
  likes: 10,
};

const user = {
  username: "testuser",
};

const mockDeleteBlog = vi.fn();

// 5.13
test("Checks that the component displaying a blog renders the blog's title and author only by default", async () => {
  render(<Blog blog={blog} deleteBlog={mockDeleteBlog} user={user} />);

  const titleElement = screen.queryByText("Title: Test Blog");
  const authorElement = screen.queryByText("Author: Test Author");
  const urlElement = screen.queryByText("Url: http://testurl.com");
  const likesElement = screen.queryByText("10 likes");

  expect(titleElement).toBeDefined();
  expect(authorElement).toBeDefined();
  expect(urlElement).toBeNull();
  expect(likesElement).toBeNull();
});
