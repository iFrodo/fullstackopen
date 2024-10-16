import { useState } from "react";
import { Form, Button } from 'react-bootstrap';

const BlogForm = ({ handleBlog, user }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (e) => {
        e.preventDefault();
        handleBlog({
            title: title,
            author: author,
            url: url,
            likes: 0,
            user: user,
        });

        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <Form onSubmit={addBlog}>
            <h2>Create new blog</h2>
            <Form.Group controlId="formBasicTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    value={title}
                    name="Title"
                    placeholder="Enter title"
                    data-testid='createBlogTitleInput'
                    onChange={({ target }) => setTitle(target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicAuthor">
                <Form.Label>Author</Form.Label>
                <Form.Control
                    type="text"
                    value={author}
                    name="Author"
                    placeholder="Enter author"
                    data-testid='createBlogAuthorInput'
                    onChange={({ target }) => setAuthor(target.value)}
                />
            </Form.Group>

            <Form.Group controlId="formBasicUrl">
                <Form.Label>URL</Form.Label>
                <Form.Control
                    type="text"
                    value={url}
                    name="url"
                    placeholder="Enter URL"
                    data-testid='createBlogUrlInput'
                    onChange={({ target }) => setUrl(target.value)}
                />
            </Form.Group>

            <Button variant="primary" type="submit" data-testid='createBlogCreateBtn' style={{ padding: '15px' }}>
                Create
            </Button>
        </Form>
    );
};

export default BlogForm;