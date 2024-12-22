import { NextRequest, NextResponse } from 'next/server';

import { cookies } from 'next/headers';

/**
 *  @method  GET
 *  @route   ~/api/users/logout
 *  @desc    Logout User
 *  @access  public
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: NextRequest) {
    try {
        (await cookies()).delete("jwtToken");
        return NextResponse.json({ message: 'Logout' }, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return NextResponse.json(
            { message: 'internal server error' },
            { status: 500 }
        )
    }
}