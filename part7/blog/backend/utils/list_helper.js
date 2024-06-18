const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;

  blogs.forEach((blog) => (sum += blog.likes));

  return sum;
};

const favoriteBlog = (blogs) => {
  let mostLikedBlog = {
    likes: 0,
  };

  blogs.forEach((blog) => {
    if (blog.likes > mostLikedBlog.likes) {
      mostLikedBlog = blog;
    }
  });

  return mostLikedBlog;
};

const mostBlogs = (blogs) => {
  let authors = [];
  let mostActiveAuthor = {
    blogs: 0,
  };

  blogs.forEach((blog) => {
    const authorIndex = authors.findIndex(
      (author) => author.author === blog.author,
    );

    if (authorIndex === -1) {
      authors.push({
        author: blog.author,
        blogs: 1,
      });
    } else {
      authors[authorIndex].blogs += 1;
    }
  });

  authors.forEach((author) => {
    if (author.blogs > mostActiveAuthor.blogs) {
      mostActiveAuthor = author;
    }
  });

  return mostActiveAuthor;
};

const mostLikes = (blogs) => {
  let authors = [];
  let mostLikedAuthor = {
    likes: 0,
  };

  blogs.forEach((blog) => {
    const authorIndex = authors.findIndex(
      (author) => author.author === blog.author,
    );

    if (authorIndex === -1) {
      authors.push({
        author: blog.author,
        likes: blog.likes,
      });
    } else {
      authors[authorIndex].likes += blog.likes;
    }
  });

  authors.forEach((author) => {
    if (author.likes > mostLikedAuthor.likes) {
      mostLikedAuthor = author;
    }
  });

  return mostLikedAuthor;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
