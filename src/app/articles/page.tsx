import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Article } from "@prisma/client";
import ArticleItem from "@/components/articles/ArticleItem";
import type { Metadata } from "next";
import Pagination from "@/components/articles/Pagination";
import SearchArticleInput from "@/components/articles/SearchArticleInput";
import { getArticles } from "@/apiCalls/articleApiCall";
import prisma from "@/utils/db";

interface ArticlesPageProps {
    searchParams: { pageNumber: string }
}

const ArticlesPage = async ({ searchParams }: ArticlesPageProps) => {    
    // delay 10 sec.
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts", { cache: 'force-cache' })
    // this { cache: 'force-cache' } === 'default' === meaning make data cache to store data in cache
    // don't make refresh for data in cache 
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts", { cache: 'no-store' })
    // this { cache: 'no-store' } meaning don't make data cache to doesn't store data in cache
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    // meaning make data cache === { cache: 'force-cache' } 
    // const res = await fetch("https://jsonplaceholder.typicode.com/posts", { next: { revalidate: 50 } })
    // meaning make data cache in first time and each 50 sec. make refresh for data in cache 
    // revalidate is in second
    const { pageNumber } = await searchParams
    const articles: Article[] = await getArticles(pageNumber);
    const count: number = await prisma.article.count();
    const pages = Math.ceil(count / ARTICLE_PER_PAGE);

    return (
        <section className="fix-height container m-auto px-5">
            <SearchArticleInput />
            <div className="flex items-center justify-center flex-wrap gap-7">
                {articles.slice(0, 6).map(item => (
                    <ArticleItem article={item} key={item.id} />
                ))}
            </div>
            <Pagination pages={pages} pageNumber={parseInt(pageNumber)} route="/articles" />
        </section>
    );
}

export default ArticlesPage;

export const metadata: Metadata = {
    title: "Articles Page",
    description: "Articles about programming",
};

