import {PropTypes} from 'prop-types';
import {Card, Button} from 'react-bootstrap';
import {likeBlog} from "../reducers/blogReducer.js";
import {useDispatch} from "react-redux";
import {Link,  useNavigate, useParams} from "react-router-dom";
import Comments from "./Comments.jsx";



export const BlogInfo = ({blogs,user,deleteHandler}) =>{
    const dispatch = useDispatch()
    BlogInfo.propTypes = {
        blogs: PropTypes.array.isRequired,
        user:PropTypes.object.isRequired,
        deleteHandler:PropTypes.func.isRequired
    };

    const { id } = useParams();

    const blog = blogs.find(el => el.id === id);
    console.log(blog.id)
    const likeBtnHandler = () => {
        dispatch(likeBlog(blog))
    };
    const navigate = useNavigate()
    if (!blog) {
        return <div>Blog not found</div>;
    }
    console.log(blog.user.login , user.login)
    return (
        <>
            <Card className='mb-3'>
                <Card.Body>
                    <Card.Title><Link to={`/blog/${blog.id}`}>{blog.title}</Link></Card.Title>

                        <div>
                            <Card.Text>Url: {blog.url}</Card.Text>
                            <Card.Text>
                                Likes: <span data-testid='likesCount'>{blog.likes}</span>
                                <Button variant="success" className='ml-2' onClick={likeBtnHandler}>
                                    like
                                </Button>
                            </Card.Text>
                            <Card.Text>Author: {blog.author}</Card.Text>
                            {blog.user.login === user.login && (
                                <Button
                                    variant="danger"
                                    onClick={() => {
                                        if (window.confirm('Вы уверены, что хотите удалить этот блог?')) {
                                            deleteHandler(blog);
                                            navigate('/')
                                        }
                                    }}
                                >
                                    delete
                                </Button>
                            )}
                        </div>
                </Card.Body>
            </Card>
            <Comments blogId={blog.id} />
        </>
    );
}

const BlogLink = ({blog}) => {
    BlogLink.propTypes = {
        blog: PropTypes.object.isRequired,
    };


    return (
        <Card className='mb-3'>
            <Card.Body>
                <Card.Title><Link to={`/blog/${blog.id}`}>{blog.title}</Link></Card.Title>
            </Card.Body>
        </Card>
    );
};

export default BlogLink;