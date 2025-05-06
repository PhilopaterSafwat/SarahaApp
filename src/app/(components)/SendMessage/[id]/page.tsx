"use client"
import { senMessage } from '@/app/redux/sendMessage';
import { AppDispatch, RootState } from '@/app/redux/store';
import { getUserById } from '@/app/redux/userIdSlice';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

export interface User {
    _id: string;
    userName: string;
    email: string;
    gender: 'male' | 'female';
}
export type sendMessage = {
    message: string,
    recipientId: string
}

export default function SendMessage() {
    const [Loading, setLoading] = useState(false)
    const dispatch = useDispatch<AppDispatch>()
    const { id } = useParams<{ id: string }>();
    const {userByid} = useSelector((state: RootState) => state);


    useEffect(() => {
        dispatch(getUserById(id))
    }, [])
    useEffect(() => {
        console.log(userByid);

    }, [userByid])

    async function handleSend(values: sendMessage) {
        setLoading(true)
        try {
            await dispatch(senMessage(values)).unwrap();
            toast.success("تم إرسال الرسالة بنجاح");

        } catch (error) {
            toast.error("فشل في إرسال الرسالة");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    const formik = useFormik({
        initialValues: {
            message: '',
            recipientId: id
        }, validationSchema: ""
        , onSubmit: handleSend
    })
    if (!userByid?.data?.user?.userName) {
        return <p className="text-center text-gray-500 mt-10">جاري التحقق...</p>;
    }
    return (
        <>
            <main className="p-4" dir="rtl">
                <div className="max-w-[700px] min-h-5 p-6 bg-white m-auto rounded-xl flex flex-col flex-wrap items-center">
                    {/* UserImage */}
                    {/* <div className="userImage w-[150px] h-[150px]  bg-blue-400 rounded-full overflow-hidden  mb-5">
                        <Image src={userImage} alt="UserImage" className="w-full "></Image>
                    </div> */}
                    {/* UserName */}
                    <h2 className="text-3xl mb-3 capitalize">{userByid?.data?.user?.userName}</h2>
                    <form action="" className='w-full' onSubmit={formik.handleSubmit}>
                        <textarea value={formik.values.message} onChange={formik.handleChange} onBlur={formik.handleBlur} dir='auto' name="message" id="message" placeholder='اكتب رسالة صريحه' className=' placeholder:text-right placeholder:text-gray-400 w-full outline-0 bg-gray-100 rounded-md p-3 resize-none min-h-[150px]'></textarea>
                        {Loading ? <button className="flex justify-center bg-blue-500 text-white w-full py-2 rounded-sm cursor-not-allowed" type="button">
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </button>
                            : <button className="flex justify-center bg-blue-500 text-white w-full py-2 rounded-sm cursor-pointer" type="submit">
                                ارسال
                            </button>}
                    </form>
                </div>
            </main>
        </>
    );
}
