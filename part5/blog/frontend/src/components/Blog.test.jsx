import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import Blog from "./Blog";
import { CreateBlogForm } from "./CreateBlogForm";

// 5.13
test("renders title and author but not URL or likes by default", () => {
  const blog = {
    _id: "1",
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 10,
  };

  render(<Blog blog={blog} onDelete={() => {}} />);

  const titleElement = screen.getByText("Test Blog");
  const authorElement = screen.queryByText("Author: Test Author");
  const urlElement = screen.queryByText("Url: http://testurl.com");
  const likesElement = screen.queryByText("10 likes");

  expect(titleElement).toBeInTheDocument();
  expect(authorElement).toBeNull();
  expect(urlElement).toBeNull();
  expect(likesElement).toBeNull();
});

// 5.14
test("renders URL and likes when button is clicked", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 10,
  };

  render(<Blog blog={blog} />);

  const button = screen.getByText("view");
  fireEvent.click(button);

  const urlElement = screen.getByText("Url: http://testurl.com");
  const likesElement = screen.getByText("10 likes");

  expect(urlElement).toBeInTheDocument();
  expect(likesElement).toBeInTheDocument();
});

// 5.15
test("calls event handler twice when like button is clicked twice", () => {
  const blog = {
    title: "Test Blog",
    author: "Test Author",
    url: "http://testurl.com",
    likes: 10,
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} handleLike={mockHandler} />);

  const viewButton = screen.getByText("view");
  fireEvent.click(viewButton);

  const likeButton = screen.getByText("like");
  fireEvent.click(likeButton);
  fireEvent.click(likeButton);

  expect(mockHandler).toHaveBeenCalledTimes(2);
});

// 5.16
test("calls event handler with correct details when a new blog is created", () => {
  const createBlog = vi.fn();
  const setTitle = vi.fn();
  const setAuthor = vi.fn();
  const setUrl = vi.fn();

  render(
    <CreateBlogForm
      onCreateBlog={createBlog}
      title=""
      author=""
      url=""
      setTitle={setTitle}
      setAuthor={setAuthor}
      setUrl={setUrl}
    />
  );

  const titleInput = screen.getByLabelText("Title");
  const authorInput = screen.getByLabelText("Author");
  const urlInput = screen.getByLabelText("URL");
  const createButton = screen.getByText("Create");

  fireEvent.change(titleInput, { target: { value: "Test Blog" } });
  fireEvent.change(authorInput, { target: { value: "Test Author" } });
  fireEvent.change(urlInput, { target: { value: "http://testurl.com" } });
  fireEvent.click(createButton);

  expect(createBlog).toHaveBeenCalledWith();
  expect(setTitle).toHaveBeenCalledWith("Test Blog");
  expect(setAuthor).toHaveBeenCalledWith("Test Author");
  expect(setUrl).toHaveBeenCalledWith("http://testurl.com");
});
