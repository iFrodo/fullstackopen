const mostLiked = (blogs) => {
    let likes = 0
    for (let i = 0; i < blogs.length; i++) {
        if (likes < blogs[i].likes) {
            likes = blogs[i].likes
        } else if (likes === blogs[i].likes) {
            return likes
        }
    }
    return likes

}

module.exports = mostLiked;