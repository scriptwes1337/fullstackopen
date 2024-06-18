import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { beforeEach, describe, expect, test, vi } from "vitest";
import Blog from "./Blog";
import { CreateBlog } from "./CreateBlog";

const blog = {
  _id: "1",
  title: "Test Blog",
  author: "Test Author",
  url: "http://testurl.com",
  likes: 10,
  user: {
    username: "test",
  },
};

const user = {
  username: "test",
};

describe("Exercises 5.13 to 5.15", () => {
  let app;
  const mockHandler = vi.fn();

  beforeEach(() => {
    app = render(<Blog blog={blog} user={user} handleLike={mockHandler} />);
  });

  // 5.13
  test("5.13: Checks that the component displaying a blog renders the blog's title and author only by default", () => {
    const titleElement = screen.getByText("Test Blog");
    const authorElement = screen.getByText("Test Author");
    const urlElement = screen.queryByText("http://testurl.com");
    const likesElement = screen.queryByText("10 likes");

    expect(titleElement).toBeInTheDocument();
    expect(authorElement).toBeInTheDocument();
    expect(urlElement).toBeNull();
    expect(likesElement).toBeNull();
  });

  // 5.14
  test("5.14: Checks that the blog's URL and number of likes are shown when button controlling shown details is clicked", () => {
    const viewButton = screen.getByText("view");
    fireEvent.click(viewButton);

    const urlElement = screen.getByText("Url: http://testurl.com");
    const likesElement = screen.getByText("Likes: 10");

    expect(urlElement).toBeInTheDocument();
    expect(likesElement).toBeInTheDocument();
  });

  // 5.15
  test("5.15: Ensures that if like button is clicked twice, the event handler the component received as props is called twice", () => {
    const viewButton = screen.getByText("view");
    fireEvent.click(viewButton);

    const likeButton = screen.getByText("like");
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(mockHandler).toHaveBeenCalledTimes(2);
  });
});

// 5.16
test("5.16: Check that the new blog form calls the event handler it received as props with the right details when a new blog is created", () => {
  const mockCreateBlog = vi.fn();
  const setTitle = vi.fn();
  const setAuthor = vi.fn();
  const setUrl = vi.fn();

  render(
    <CreateBlog
      title=""
      author=""
      url=""
      setTitle={setTitle}
      setAuthor={setAuthor}
      setUrl={setUrl}
      handleCreateBlog={mockCreateBlog}
    />,
  );

  const titleInput = screen.getByLabelText("title:");
  const authorInput = screen.getByLabelText("author:");
  const urlInput = screen.getByLabelText("url:");
  const submitButton = screen.getByText("create");

  fireEvent.change(titleInput, { target: { value: "New Blog" } });
  fireEvent.change(authorInput, { target: { value: "New Author" } });
  fireEvent.change(urlInput, { target: { value: "http://newurl.com" } });
  fireEvent.click(submitButton);

  expect(mockCreateBlog).toHaveBeenCalledTimes(1);
  expect(setTitle).toHaveBeenCalledWith("New Blog");
  expect(setAuthor).toHaveBeenCalledWith("New Author");
  expect(setUrl).toHaveBeenCalledWith("http://newurl.com");
});
