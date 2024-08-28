import { useState } from "react";

const BlogForm = ({ handleBlog, user }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');


    const addBlog = (e) => {
        e.preventDefault()
        handleBlog({
            title: title,
            author: author,
            url: url,
            likes:0,
            user: user
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <>

            <form onSubmit={addBlog}>
                <div>
                    <h2>Create new blog</h2>
                    title
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        data-testid='createBlogTitleInput'
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={author}
                        name="Author"
                         data-testid='createBlogAuthorInput'
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        type="text"
                        value={url}
                        name="url"
                         data-testid='createBlogUrlInput'
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button data-testid='createBlogCreateBtn' type="submit">create</button>
            </form>
        </>
    )
};

export default BlogForm