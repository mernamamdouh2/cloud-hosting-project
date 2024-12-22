import { NextRequest, NextResponse } from "next/server";

import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Article } from "@prisma/client";
import { CreateArticleDto } from "@/utils/dtos";
import { createArticleSchema } from "@/utils/validationSchemas";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

// http://localhost:3000 == ~ == domain
/**
 * @method   GET
 * @route    ~/api/articles
 * @desc     Get Articles By Page Number
 * @access   public
 */
export async function GET(request: NextRequest) {
    try {
        const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";
        
        const articles = await prisma.article.findMany({
            skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
            take: ARTICLE_PER_PAGE,
            orderBy:  { createdAt: 'desc'}
        });
        return NextResponse.json(articles, {status: 200});
    }// eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status:500});
    }
}

/**
 * @method   POST
 * @route    ~/api/articles
 * @desc     Create New Article
 * @access   private (only admin can create article)
 */
export async function POST(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json({ message: "Only Admin, access denied" }, { status:403 });
        }
        const body = (await request.json()) as CreateArticleDto;

        // if (body.title === "" || body.title.length < 2 || typeof body.title !== 'string'){
        //     return NextResponse.json({message: "Title is required & must be at least 2 characters long"}, {status:400});
        // }
        
        // if (body.body === "" || body.body.length < 10 || typeof body.body !== 'string'){
        //     return NextResponse.json({message: "Body is required & must be at least 10 characters long"}, {status:400});
        // }

        // "safe" parsing (doesn't throw error if validation fails)
        const validation = createArticleSchema.safeParse(body);
        if (!validation.success){
            return NextResponse.json({message: validation.error.errors[0].message}, {status:400});
        }

        const newArticle: Article = await prisma.article.create({
            data: {
                title: body.title,
                description: body.description,
            }
        })
        
        return NextResponse.json(newArticle, {status: 201});
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status:500});
    }
}