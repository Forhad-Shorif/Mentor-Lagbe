import { Authoraization } from '@/lib/ServerUser';
import React from 'react';

const TeacherLayOut = async ({ children }: { children: React.ReactNode }) => {
    await Authoraization('admin')
    return children;
};

export default TeacherLayOut;