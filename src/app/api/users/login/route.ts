import { NextRequest, NextResponse } from "next/server";
import { LoginUserDto } from "@/utils/dtos";
import { loginSchema } from "@/utils/validationSchemas";
import prisma from "@/utils/db";
import bcrypt from 'bcryptjs';
import { setCookie } from '@/utils/generateToken';

/**
 * @method   POST
 * @route    ~/api/users/login
 * @desc     Login User
 * @access   public
 */
export async function POST(request: NextRequest) {
    try {
        const body = (await request.json()) as LoginUserDto;
        const validation = loginSchema.safeParse(body);
        if (!validation.success) {
            return NextResponse.json({ message: validation.error.errors[0].message }, { status: 400 });
        }

        const existedUser = await prisma.user.findUnique({ where: { email: body.email } });
        if (!existedUser) {
            return NextResponse.json({ message: "Invalid Email or password" }, { status: 400 });
        }
        
        const isPasswordMatch = await bcrypt.compare(body.password, existedUser.password);
        if(!isPasswordMatch){
            return NextResponse.json({ message: "Invalid Email or password" }, { status: 400 });
        }

        const cookie = setCookie({
            id: existedUser.id,
            isAdmin: existedUser.isAdmin,
            username: existedUser.username
        });

        return NextResponse.json(
            { message: 'Authenticated' },
            {
                status: 200,
                headers: { "Set-Cookie": cookie }
            }
        )
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}