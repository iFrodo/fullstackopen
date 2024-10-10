import React, {useState} from 'react';
import {PropTypes} from 'prop-types';
import blogService from '../services/blogService';
import {Card, Button, Collapse} from 'react-bootstrap';

const Blog = ({blog, deleteHandler, deleteBtnText, moreBtnText, hideBtnText, likeBtnText, user}) => {
    Blog.propTypes = {
        blog: PropTypes.string.isRequired,
    };

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const likeBtnHandler = () => {
        blog.likes++;
        blogService.change(blog).then(updatedBlog => {
            // Обновляем состояние блогов
            setBlogs(prevBlogs => prevBlogs.map(b => (b.id === updatedBlog.id ? updatedBlog : b)));
        });
    };

    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Button variant="primary" onClick={toggleVisibility} className='mb-2'>
                    {visible ? hideBtnText : moreBtnText}
                </Button>
                <Collapse in={visible}>
                    <div>
                        <Card.Text>Url: {blog.url}</Card.Text>
                        <Card.Text>
                            Likes: <span data-testid='likesCount'>{blog.likes}</span>
                            <Button variant="success" className='ml-2' onClick={likeBtnHandler}>
                                {likeBtnText}
                            </Button>
                        </Card.Text>
                        <Card.Text>Author: {blog.author}</Card.Text>
                        {blog.user.login === user.login && (
                            <Button
                                variant="danger"
                                onClick={() => {
                                    if (window.confirm('Вы уверены, что хотите удалить этот блог?')) {
                                        deleteHandler(blog);
                                    }
                                }}
                            >
                                {deleteBtnText}
                            </Button>
                        )}
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    );
};

export default Blog;