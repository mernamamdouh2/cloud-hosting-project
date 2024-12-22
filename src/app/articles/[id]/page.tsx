import AddCommentForm from "@/components/comments/AddCommentForm";
import CommentItem from "@/components/comments/CommentItem";
import Link from "next/link";
import React from 'react';
import { SingleArticle } from "@/utils/types";
import { cookies } from "next/headers";
import { getSingleArticle } from "@/apiCalls/articleApiCall";
import { verifyTokenForPage } from "@/utils/verifyToken";

interface SingleArticlePageProps {
    params: { id: string }
}
const SingleArticlePage = async ({ params }: SingleArticlePageProps) => { 
    const token = (await cookies()).get("jwtToken")?.value || "";
    const userPayload = verifyTokenForPage(token);
    
    const article: SingleArticle = await getSingleArticle(params.id);

    return (
        <section className="fix-height container m-auto w-full px-5 pt-8 md:w-3/4">
            <div className="bg-white p-7 rounded-lg mb-7">
                <h1 className="text-3xl font-bold text-gray-700 mb-2">
                    {article.title}
                </h1>
                <div className="text-gray-400">
                    {new Date(article.createdAt).toDateString()}
                </div>
                <p className="text-gray-800 text-xl mt-5">
                    {article.description}
                </p>
            </div>
            <div className="mt-7">
                {
                    userPayload ? (<AddCommentForm articleId={article.id}/>)
                    : (<p className="text-center text-blue-900 md:text-xl">
                        To write a comment you should 
                        <Link className="mx-1 text-blue-500 border-b-2 border-blue-400" href="/login">Login</Link>
                        first
                    </p>)
                }
            </div>
            <h4 className="text-xl text-gray-800 ps-1 font-semibold mb-2 mt-7">Comments</h4>
            {
                article.comments.length === 0 ?
                (<div className="text-gray-500 text-xl py-5 text-center">No comments yet.</div>)
                :(
                    article.comments.map((comment) => (
                        <CommentItem key={comment.id} comment={comment} userId={userPayload?.id}/>
                    ))
                )
            }
        </section>
    )
}

export default SingleArticlePage
