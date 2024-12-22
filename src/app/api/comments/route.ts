import { NextRequest, NextResponse } from "next/server";

import { CreateCommentDto } from "@/utils/dtos";
import { createCommentSchema } from "@/utils/validationSchemas";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

/**
 * @method   POST
 * @route    ~/api/comments
 * @desc     Create New Comment
 * @access   private (only logged in user)
 */

export async function POST(request: NextRequest) {
    try{
        const user = verifyToken(request);
        if (!user) {
            return NextResponse.json({ message: "Not authorized, Only logged in user, access denied" }, { status: 401 });
        }
        
        const body = await request.json() as CreateCommentDto;
        const validation = createCommentSchema.safeParse(body)
        if (!validation.success){
            return NextResponse.json({message: validation.error.errors[0].message}, {status:400});
        }
        
        const newComment = await prisma.comment.create({
            data: {
                text: body.text,
                articleId: body.articleId,
                userId: user.id
            },
        });
        
        return NextResponse.json(newComment, {status:201});
    }// eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status:500});
    }
}


/**
 * @method   GET
 * @route    ~/api/comments
 * @desc     Get All Comments
 * @access   private (only admin)
 */

export async function GET(request: NextRequest) {
    try {
        const user = verifyToken(request);
        if (user === null || user.isAdmin === false) {
            return NextResponse.json({ message: "Only Admin, access denied" }, { status:403 });
        }
        const comments = await prisma.comment.findMany();
        return NextResponse.json(comments, {status: 200});
    }// eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status:500});
    }
}