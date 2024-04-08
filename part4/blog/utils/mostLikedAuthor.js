const _ = require('lodash');
const mostLikedAuthor = (blogs) => {
    const authorLikes = _.groupBy(blogs, 'author');
    const maxLikes = _.maxBy(Object.keys(authorLikes), (author) => _.sumBy(authorLikes[author], 'likes'));
    return {
      author: maxLikes,
      likes: _.sumBy(authorLikes[maxLikes], 'likes')
    };
  };
module.exports = mostLikedAuthor;