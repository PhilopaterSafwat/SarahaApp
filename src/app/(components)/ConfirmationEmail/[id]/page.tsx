"use client"
import axios from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React, { useCallback, useEffect } from 'react'
import { RiMessage3Fill } from 'react-icons/ri'

export default function ConfirmationEmail() {
    const { id } = useParams();
    interface User {
        userName: string;
        email: string;
        password: string;
        gender: 'male' | 'female';
        phone: string;
        confirmEmail: boolean;
        role: 'User' | 'Admin';
        isDeleted: boolean;
        createdAt: string;
        updatedAt: string;
        __v: number;
    }
    const confirmApi = useCallback(async () => {
        try {
            const { data }: { data: User } = await axios.patch(
                `https://whisperapi-production.up.railway.app/auth/confirm-email`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${id}`,
                    }
                }
            );
            console.log(data);
        } catch (error) {
            console.log(error);
            console.log(id);
        }
    }, [id]);

    useEffect(() => {
        confirmApi();
    }, [confirmApi]);

    return (
        <>
            <main className="p-4">
                <div className="max-w-[700px] py-15 p-6 bg-white m-auto rounded-xl flex flex-col flex-wrap items-center select-none">
                    <Link href={"/"} className="Logo flex  items-center gap-2 text-5xl font-bold text-blue-500 text-center justify-center mb-4">
                        <RiMessage3Fill /><h2>whisper</h2>
                    </Link>
                    <h2 className='text-3xl mt-5'>
                        تم تفعيل حسابك اضغط <Link href={"/Login"} className='text-blue-500 underline'>هنا</Link> لتسجيل الدخول
                    </h2>
                </div>

            </main>
        </>
    )
}
