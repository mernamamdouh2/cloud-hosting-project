import { Article } from "@prisma/client"
import { DOMAIN } from "@/utils/constants"
import { SingleArticle } from "@/utils/types"

// get articles based on pageNumber
export async function getArticles(pageNumber: string | undefined): Promise<Article[]>{
    const res = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`,
        { cache: 'no-store' }
    )
    if(!res.ok){
        throw new Error('Failed to fetch articles')
    }
    return res.json()
}

// get articles count // not used this route (function)
export async function getArticlesCount(): Promise<number>{
    const res = await fetch(`${DOMAIN}/api/articles/count`,
        { cache: 'no-store' })
    if(!res.ok){
        throw new Error('Failed to get articles count')
    }
    const {count} = await res.json() as {count:number};
    return count;
}

// get articles based on searchText
export async function getArticlesBasedOnSearch(searchText: string): Promise<Article[]>{
    const res = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`)
    if(!res.ok){
        throw new Error('Failed to fetch articles')
    }
    return res.json()
}

// Get single article by id
export async function getSingleArticle(articleId: string): Promise<SingleArticle> {
    const response = await fetch(`${DOMAIN}/api/articles/${articleId}`, {cache: 'no-store'});
    if (!response.ok) {
        throw new Error("Failed to fetch article");
    }
    return response.json();
}