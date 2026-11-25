import { Authentications, ServerUser } from '@/lib/ServerUser';
import React from 'react';

const SignLayOut = async ({ children }: { children: React.ReactNode }) => {
    const user = await ServerUser()
    const Id = user?.id as string;
    await Authentications(Id)
    return children;
};


export default SignLayOut;