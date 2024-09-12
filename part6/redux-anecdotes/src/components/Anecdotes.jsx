// components/Anecdotes.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setNotify, removeNotify } from '../reducers/notificationReducer'
import Notification from './Notification';
import { voteForAnecdote } from '../reducers/anecdoteReducer';
import { setNotification } from '../reducers/notificationReducer';

const Anecdotes = () => {
    const anecdotes = useSelector(state => state.anecdotes);
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();


    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    const vote = (id) => {
        const foundedAnecdote = anecdotes.find(anecdote => { return anecdote.id === id })
        // dispatch(setNotification(`you voted '${anecdote.content}'`, 10))
        dispatch(setNotification(foundedAnecdote,3))
        // dispatch(setNotify(foundedAnecdote))
        dispatch(voteForAnecdote(foundedAnecdote));
    };

    return (
        <>
            <h2>Anecdotes</h2>
            <Notification />
            {filteredAnecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    );
};

export default Anecdotes;
