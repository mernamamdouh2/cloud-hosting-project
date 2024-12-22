import { NextRequest, NextResponse } from "next/server";

import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from 'bcryptjs';
import prisma from "@/utils/db";
import { updateUserSchema } from "@/utils/validationSchemas";
import { verifyToken } from "@/utils/verifyToken";

interface Props {
    params: { id: string }
}
/**
 * @method   GET
 * @route    ~/api/users/profile/:id
 * @desc     Get Profile by ID
 * @access   private (only user himself can get his account)
 */
export async function GET(request: NextRequest, {params}:Props) {
    try {
        const user = await prisma.user.findUnique({ 
            where: {id: parseInt(params.id)},
            select: {
                id: true,
                email: true,
                username: true,
                createdAt: true,
                isAdmin: true,
            }
        });
        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        
        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id !== user.id){
            return NextResponse.json({message: "Your aren't allow, access denied"}, {status: 403});
        }
        
        return NextResponse.json(user, {status: 200});
    }// eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status:500});
    }
}


/**
 * @method   PUT
 * @route    ~/api/users/profile/:id
 * @desc     Update Profile by ID
 * @access   private (only user himself can update his account)
 */
export async function PUT(request: NextRequest, {params}:Props) {
    try {
        const user = await prisma.article.findUnique({ where: {id: parseInt(params.id)}});
        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }

        const userFromToken = verifyToken(request);
        if(userFromToken === null || userFromToken.id !== user.id){
            return NextResponse.json({message: "Your aren't allow, access denied"}, {status: 403});
        }    
            
        const body = await request.json() as UpdateUserDto;
        const validation = updateUserSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }
        
        if(body.password){
            const salt = await bcrypt.genSalt(10)
            body.password = await bcrypt.hash(body.password, salt);
        }
        const UpdateUser = await prisma.user.update({ 
            where: {id: parseInt(params.id)},
            data: {
                username: body.username,
                email: body.email,
                password: body.password
            }
        });
        
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...rest } = UpdateUser;
        return NextResponse.json({...rest}, {status: 200});
    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status:500});
    }
}


/**
 * @method   DELETE
 * @route    ~/api/users/profile/:id
 * @desc     Delete Profile
 * @access   private (only user himself can delete his account)
 */
export async function DELETE(request: NextRequest, {params}:Props) {
    try {
        const user = await prisma.user.findUnique({ 
            where: {id: parseInt(params.id)},
            include: { comments: true }
        });
        if (!user) {
            return NextResponse.json({message: "User not found"}, {status: 404});
        }
        
        const userFromToken = verifyToken(request);
        
        if(userFromToken !== null && userFromToken.id === user.id){
            // deleting the user
            await prisma.user.delete({ where: {id: parseInt(params.id)}});
            // deleting the comments that belong to this user
            const commentIds: number[] = user?.comments.map(comment => comment.id)
            await prisma.comment.deleteMany({ where: {id: {in: commentIds}}});

            return NextResponse.json({message: "Your Profile (Account) has been deleted"}, {status: 200});
        }
        return NextResponse.json({message: "only user himself can delete his profile, forbidden"}, {status: 403}); //forbidden

    } // eslint-disable-next-line @typescript-eslint/no-unused-vars
    catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status:500});
    }
}