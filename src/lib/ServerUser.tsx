import { redirect } from "next/navigation";
import { auth } from "./auth"; // path to your Better Auth server instance
import { headers } from "next/headers";

export const ServerUser = async () => {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    return session?.user
};
      
export const Authoraization = async (role:string) => {

    const session = await auth.api.getSession({
        headers: await headers() // you need to pass the headers object.
    })
    if(!session || session?.user.role !== role){
        redirect('/')
    }
    return session;
}