import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {Link, useParams} from "react-router-dom";

const Info = () => {
    const blogs = useSelector(state => state.blogs);
    const [authorBlogCount, setAuthorBlogCount] = useState({});

    useEffect(() => {
        const count = {};
        blogs.forEach(blog => {
            let author = blog.user.login;
            if (count[author]) {
                count[author]++;
            } else {
                count[author] = 1;
            }
        });

        setAuthorBlogCount(count);
    }, [blogs]);

    return (
        <div>
            <h2>Авторы и количество созданных ими блогов:</h2>
            <ul>
                {Object.keys(authorBlogCount).map(author => (
                    <li key={author}>
                        <Link to={`/blogs/${author}`}>{author}</Link>: {authorBlogCount[author]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export const UserBlog = () => {
    const { author } = useParams();
    const blogs = useSelector(state => state.blogs);
    const authorBlogs = blogs.filter(blog => blog.user.login === author);

    return (
        <div>
            <h2>Блоги автора {author}</h2>
            <ul>
                {authorBlogs.map(blog => (
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Info;