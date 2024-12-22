"use client"

import React, { useState } from 'react'

import { useRouter } from 'next/navigation';

const SearchArticleInput = () => {
    const router = useRouter();
    
    const [searchText, setSearchText] = useState('')
    
    const formSubmitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        router.push(`/articles/search?searchText=${searchText}`);
    }
    
    return (
        <form className="my-5 w-full md:w-2/3 m-auto" onSubmit={formSubmitHandler}>
            <div className="flex">
                <label className="sr-only" htmlFor="search">Search</label>
                <input
                    type="search"
                    id="search"
                    name="search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    className="w-full px-3 py-2 text-gray-900 border-none rounded text-xl"
                    placeholder="Search for article"
                />
            </div>
        </form>
    )
}

export default SearchArticleInput
