const _ = require('lodash');
const mostBlogsWithAutor = (blogs) => {
    const authorCounts = _.countBy(blogs, 'author');
    const maxAuthor = _.maxBy(Object.keys(authorCounts), (author) => authorCounts[author]);
    return {
        author: maxAuthor,
        blogs: authorCounts[maxAuthor]
    };
};

module.exports = mostBlogsWithAutor;