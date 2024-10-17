import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Comments = ({ blogId }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newComment, setNewComment] = useState({ text: '', author: '' });
console.log(blogId)
    useEffect(() => {
        const fetchComments = async () => {
            try {
                const response = await axios.get(`/api/comments/post/${blogId}`);
                setComments(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [blogId]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewComment({ ...newComment, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/comments', { ...newComment, blogId });
            setComments([...comments, response.data]);
            setNewComment({ text: '', author: '' });
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return <div>Loading comments...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h3>Comments</h3>
            {comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id}>
                        <p>{comment.text}</p>
                        <p>Author: {comment.author}</p>
                        <p>Date: {new Date(comment.createdAt).toLocaleString()}</p>
                    </div>
                ))
            ) : (
                <span>No comments yet</span>
            )}

            <h4>Add a Comment</h4>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Text:
                        <textarea name="text" value={newComment.text} onChange={handleInputChange} required />
                    </label>
                </div>
                <div>
                    <label>
                        Author:
                        <input type="text" name="author" value={newComment.author} onChange={handleInputChange} required />
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Comments;