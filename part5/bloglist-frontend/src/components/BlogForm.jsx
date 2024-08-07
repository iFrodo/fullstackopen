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
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url
                    <input
                        type="text"
                        value={url}
                        name="Author"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
};

export default BlogForm