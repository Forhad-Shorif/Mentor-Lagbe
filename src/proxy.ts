import { NextResponse, type NextRequest } from 'next/server'
import { ServerUser } from './lib/ServerUser'


// This function can be marked `async` if using `await` inside
export async function proxy(request: NextRequest) {
    const user = await ServerUser()
    if (user) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    if (!user) {

    }

}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
    matcher: ['/sign-in', '/sign-up']
}