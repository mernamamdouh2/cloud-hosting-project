"use client"

import React, { useState } from 'react'

import { DOMAIN } from '@/utils/constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface AddCommentFormProps {
    articleId: number;
}

const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
    const router = useRouter();
    
    const [text, setText] = useState('')
    
    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (text === "") return toast.error("Please write something");
        try {
            await axios.post(`${DOMAIN}/api/comments`, {text , articleId});
            router.refresh();
            setText('');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            toast.error(error?.response?.data.message);
            console.error(error);
        }
    }
    
    return (
        <form onSubmit={formSubmitHandler}>
            <div className="flex">
                <label className="sr-only" htmlFor="text">Search</label>
                <input
                    type="text"
                    id="text"
                    name="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full px-3 py-2 text-gray-900 border-none rounded text-xl"
                    placeholder="Add a comment..."
                />
            </div>
            <div className="flex">
                <button type="submit" className="text-xl text-white bg-green-700 p-2 mt-2 rounded-lg font-bold w-min hover:bg-green-900 transition">
                    Comment
                </button>
            </div>
        </form>
    )
}

export default AddCommentForm
