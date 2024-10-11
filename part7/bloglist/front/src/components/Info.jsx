import {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

const Info = () => {
    const blogs = useSelector(state => state.blogs);
    const [authorBlogCount, setAuthorBlogCount] = useState({});

    useEffect(() => {

        const count = {};
        blogs.forEach(blog => {
            let author = blog.user.login
            if (count[author]) {
                count[author]++
            } else {
                count[author] = 1
            }
        })


        setAuthorBlogCount(count);
    }, [blogs]);

    return (
        <div>
            <h2>Авторы и количество созданных ими блогов:</h2>
            <ul>
                {Object.keys(authorBlogCount).map(author => (
                    <li key={author}>
                        {author}: {authorBlogCount[author]}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Info;