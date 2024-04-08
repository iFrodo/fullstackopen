const totalLikes = (blog) => {
    let result = 0
    if (blog.length > 1) {
        blog.map(el => result += el.likes)
        return result
    } else if (blog.length === 1) {
        return blog[0].likes
    }


}
module.exports = totalLikes