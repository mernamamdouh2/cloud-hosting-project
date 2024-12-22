import { NextRequest, NextResponse } from "next/server";

import { UpdateCommentDto } from "@/utils/dtos";
import prisma from "@/utils/db";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
    params: { id: string }
}

/**
 * @method   PUT
 * @route    ~/api/comments/:id
 * @desc     Update Comment
 * @access   private (only owner of the comment)
 */
export async function PUT(request: NextRequest, {params}:Props) {
    try {
        const comment = await prisma.comment.findUnique({ where: {id: parseInt(params.id)}});
        if (!comment) {
            return NextResponse.json({message: "Comment not found"}, {status: 404});
        }

        const user = verifyToken(request);
        if (user === null || user.id !== comment.userId) {
            return NextResponse.json({ message: "you aren't allowed, access denied" }, { status: 403 });
        }
        
        const body = await request.json() as UpdateCommentDto;
        const UpdateComment = await prisma.comment.update({ 
            where: {id: parseInt(params.id)},
            data: { text: body.text },
        });
        return NextResponse.json(UpdateComment, {status: 200});
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status:500});
    }
}


/**
 * @method   DELETE
 * @route    ~/api/comments/:id
 * @desc     Delete Comment
 * @access   private (only admin or owner of the comment)
 */
export async function DELETE(request: NextRequest, {params}:Props) {
    try {
        const comment = await prisma.comment.findUnique({ where: {id: parseInt(params.id)}});
        if (!comment) {
            return NextResponse.json({message: "Comment not found"}, {status: 404});
        }

        const user = verifyToken(request);
        if (user === null) {
            return NextResponse.json({ message: "No token provided, access denied" }, { status: 401 });
        }
        
        if (user.isAdmin || user.id === comment.userId) {
            await prisma.comment.delete({ where: {id: parseInt(params.id)}});
            return NextResponse.json({message: "Comment Deleted"}, {status: 200});
        }
        
        return NextResponse.json({ message: "you aren't allowed, access denied" }, { status: 403 });
        
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status:500});
    }
}