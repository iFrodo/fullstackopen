import {useState} from 'react';
import {PropTypes} from 'prop-types';

import {Card, Button, Collapse} from 'react-bootstrap';
import {likeBlog} from "../reducers/blogReducer.js";
import {useDispatch} from "react-redux";
import {Link, Route, useParams} from "react-router-dom";

export const BlogInfo = ({blogs}) =>{
    const { id } = useParams(); // Деструктуризация для получения id



    const blog = blogs.find(el => el.id === id);


    if (!blog) {
        return <div>Blog not found</div>;
    }

    return (
        <>
            <h2>Название: {blog.title}</h2>
            <p>Автор: {blog.author}</p>
            <p>URI: {blog.url}</p>
            <p>Likes: {blog.likes}</p>
        </>
    );
}

const Blog = ({blog, deleteHandler, deleteBtnText, moreBtnText, hideBtnText, likeBtnText, user}) => {
    const dispatch = useDispatch()
    Blog.propTypes = {
        blog: PropTypes.object.isRequired,
    };

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const likeBtnHandler = () => {
  dispatch(likeBlog(blog))
    };

    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title><Link to={`/blog/${blog.id}`}>{blog.title}</Link></Card.Title>
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