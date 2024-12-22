"use client"

import React, { useState } from 'react'

import { DOMAIN } from '@/utils/constants';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

const AddArticleForm = () => {
    const router = useRouter();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    
    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        if (title === "") return toast.error("Title is required");
        if (description === "") return toast.error("Description is required");
        
        try {
            await axios.post(`${DOMAIN}/api/articles`, { title, description });
            setTitle("");
            setDescription("");
            toast.success("New article added");
            router.refresh();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            toast.error(error?.response?.data.message);
            console.log(error);
        }
    }
    
    return (
        <form className="space-y-3" onSubmit={formSubmitHandler}>
            <div className="flex">
                <label className="sr-only" htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-2 text-gray-700 border rounded text-xl"
                    placeholder="Enter Article Title"
                />
            </div>
            <div className="flex">
                <label className="sr-only" htmlFor="description">Description</label>
                <textarea className="w-full px-3 py-2 text-gray-700 border rounded text-xl" 
                placeholder="Enter Article Description"
                rows={5} id="description"
                name="description" value={description}
                onChange={(e) => setDescription(e.target.value)}></textarea>
            </div>
            <div className="flex">
                <button type="submit" className="w-full text-2xl text-white bg-blue-700 hover:bg-blue-900 p-2 rounded-lg font-bold">
                    Add
                </button>
            </div>
        </form>
    )
}

export default AddArticleForm

