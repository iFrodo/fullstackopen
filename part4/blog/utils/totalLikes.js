const totalLikes = (blog) => {
    console.log(blog)
    let result = 0
    if (blog.length > 1) {
        blog.map(el => result += el.likes)
        return result
    } else {
        return blog.likes
    }

}
module.export = totalLikes