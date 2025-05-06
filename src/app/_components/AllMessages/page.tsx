"use client"
import React, { useState } from 'react';
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { motion } from "motion/react"
import { MdOutlineFavorite } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/app/redux/store';
import { deleteMessage } from '@/app/redux/deleteMessage';
import toast from 'react-hot-toast';
import { AddFavoriteMessage } from '@/app/redux/addFavoriteMessage';

export default function AllMessages({ messages }: { messages: any }) {
    const [navActive, setnavActive] = useState('recived')
    const [AllMessages, setAllMessages] = useState(messages)
    const [FavoriteMessages, setFavoriteMessages] = useState(messages.filter((message: any) => message.isFavorite))
    const dispatch = useDispatch<AppDispatch>()
    const handleDelete = (id: string) => {
        dispatch(deleteMessage(id))
        const updatedMessages = AllMessages.filter((message: any) => message._id !== id);
        setAllMessages(updatedMessages);
        setFavoriteMessages(updatedMessages.filter((message: any) => message.isFavorite))
        toast.success("تم حذف الرسالة بنجاح")
    };
    const handleFavorite = (messageId: string) => {
        dispatch(AddFavoriteMessage(messageId))
        const updatedMessages = AllMessages.map((message: any) =>
            message._id === messageId ? { ...message, isFavorite: !message.isFavorite } : message
        );
        setAllMessages(updatedMessages);
        setFavoriteMessages(updatedMessages.filter((message: any) => message.isFavorite));
        const message = updatedMessages.find((msg: any) => msg._id === messageId);
        if (message?.isFavorite) {
            toast.success("تم إضافة الرسالة إلى المفضلة");
        } else {
            toast.success("تم إزالة الرسالة من المفضلة");
        }
    };
    function isArabic(text: string) {
        const arabicReg = /[\u0600-\u06FF]/;
        return arabicReg.test(text);
    }

    return (
        <>
            <nav className='w-full mb-4'>
                <ul className='flex bg-gray-300 w-full justify-between rounded-sm p-1'>
                    <li onClick={() => { setnavActive("recived") }} className={`cursor-pointer text-center font-light py-2 rounded-sm w-1/2 ${navActive == "recived" && "active-nav"}`}>الوراده</li>
                    <li onClick={() => { setnavActive("favorite") }} className={`cursor-pointer text-center font-light py-2 rounded-sm w-1/2 ${navActive == "favorite" && "active-nav"}`}>المفضلة</li>
                </ul>
            </nav>
            {navActive == "recived" && <div className='recived w-full'>
                <h2>الرسائل الواردة</h2>
                {AllMessages.length === 0 && <>
                    <div className='flex w-full items-center justify-center opacity-40 mt-10'>
                        <motion.div
                            animate={{ y: [0, 10, -10, 10, 0] }}
                            transition={{ duration: 4.0, ease: "easeInOut", repeat: Infinity }}>
                            <BiSolidMessageAltDetail className='text-9xl' />
                        </motion.div>
                    </div>
                    <p className='text-center mt-10'>
                        ليس لديك رسائل واردة، قم بمشاركة رابط صفحتك على وسائل التواصل الإجتماعي ودع أصدقائك يرسلون رسائل لك.
                    </p>
                </>
                }
                <div className='flex flex-col gap-5 mt-10'>
                    {AllMessages.map((message: any) => (
                        <div key={message._id} className='bg-gray-200 rounded-sm p-4 flex flex-col' dir={isArabic(message.message) ? "rtl" : "ltr"}>
                            <span>{message.message}</span>
                            <div className='buttons p-2 flex gap-4 self-end text-xl '>
                                <button onClick={() => { handleFavorite(message._id) }} className={`bg-gray-300  p-2 rounded-sm cursor-pointer ${message.isFavorite ? "text-red-500" : ""}`}>
                                    <MdOutlineFavorite  />
                                </button>
                                <button onClick={() => { handleDelete(message._id) }} className='bg-gray-300  p-2 rounded-sm cursor-pointer'>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div >}
            {navActive == "favorite" && <div className='recived w-full'>
                <h2>الرسائل المفضلة</h2>
                {FavoriteMessages.length === 0 && <>
                    <div className='flex w-full items-center justify-center opacity-40 mt-10'>
                        <motion.div
                            animate={{ y: [0, 10, -10, 10, 0] }}
                            transition={{ duration: 4.0, ease: "easeInOut", repeat: Infinity }}>
                            <BiSolidMessageAltDetail className='text-9xl' />
                        </motion.div>
                    </div>
                    <p className='text-center mt-10'>
                        ليس لديك رسائل واردة، قم بمشاركة رابط صفحتك على وسائل التواصل الإجتماعي ودع أصدقائك يرسلون رسائل لك.
                    </p>
                </>
                }
                <div className='flex flex-col gap-5 mt-10'>
                    {FavoriteMessages.map((message: any) => (
                        <div key={message._id} className='bg-gray-200 rounded-sm p-4 flex flex-col' dir={isArabic(message.message) ? "rtl" : "ltr"}>
                            <span>{message.message}</span>
                            <div className='buttons p-2 flex gap-4 self-end text-xl '>
                                <button onClick={() => { handleFavorite(message._id) }} className={`bg-gray-300  p-2 rounded-sm cursor-pointer ${message.isFavorite ? "text-red-500" : ""}`}>
                                    <MdOutlineFavorite  />
                                </button>
                                <button onClick={() => { handleDelete(message._id) }} className='bg-gray-300  p-2 rounded-sm cursor-pointer'>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div >}
        </>
    );
}
