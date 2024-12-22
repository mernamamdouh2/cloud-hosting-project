import { Article } from '@prisma/client';
import { DOMAIN } from '@/utils/constants';
import { SingleArticle } from '@/utils/types';

// Get articles based on pageNumber
export async function getArticles(pageNumber: string | undefined): Promise<Article[]> {
    const res = await fetch(`${DOMAIN}/api/articles?pageNumber=${pageNumber}`,{ cache: 'no-store' });
    if (!res.ok) {
        throw new Error("Failed to fetch articles");
    }
    return res.json();
}

// Get articles count
export async function getArticlesCount(): Promise<number> {
    const res = await fetch(`${DOMAIN}/api/articles/count`, { cache: 'no-store' });
    if (!res.ok) {
        throw new Error("Failed to get articles count");
    }
    const { count } = await res.json() as { count: number };
    return count;
}

// Get articles based on searchText
export async function getArticlesBasedOnSearch(searchText: string): Promise<Article[]> {
    const res = await fetch(`${DOMAIN}/api/articles/search?searchText=${searchText}`);
    if (!res.ok) {
        throw new Error("Failed to fetch articles");
    }
    return res.json();
}

// Get single article by id
export async function getSingleArticle(articleId: string): Promise<SingleArticle> {
    const res = await fetch(`${DOMAIN}/api/articles/${articleId}`, {cache: 'no-store'});
    if (!res.ok) {
        throw new Error("Failed to fetch article");
    }
    return res.json();
}