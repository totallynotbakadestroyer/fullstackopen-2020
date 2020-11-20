const _ = require("lodash");
// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((x, y) => y.likes + x, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.slice().sort((a, b) => a.likes - b.likes)[blogs.length - 1];
};

const mostBlogs = (blogs) => {
  return _.maxBy(
    _.map(
      _.countBy(blogs, (x) => x.author),
      (val, key) => ({ author: key, blogs: val })
    ),
    (x) => x.blogs
  );
};

const mostLikes = (blogs) => {
  return _.maxBy(
    _.map(
      _.groupBy(blogs, (x) => x.author),
      (val, key) => ({ author: key, likes: _.sumBy(val, (val) => val.likes) })
    ),
    (x) => x.likes
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
