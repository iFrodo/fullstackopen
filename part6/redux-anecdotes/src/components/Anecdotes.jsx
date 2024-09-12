// components/Anecdotes.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { voteFor } from '../reducers/anecdoteReducer'
import { notify, removeNotify } from '../reducers/notificationReducer'
import Notification from './Notification';
import anecdoteService from '../services/anecdoteService';

const Anecdotes = () => {
    const anecdotes = useSelector(state => state.anecdotes);
    const filter = useSelector(state => state.filter);
    const dispatch = useDispatch();

    const filteredAnecdotes = anecdotes.filter(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
    );

    const vote = (id) => {
        const foundedAnecdote = anecdotes.find(anecdote=>{return anecdote.id === id})
        dispatch(notify(foundedAnecdote))
        anecdoteService.vote(foundedAnecdote)
        dispatch(voteFor(id));
    };

    return (
        <>
            <h2>Anecdotes</h2>
            <Notification/>
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
