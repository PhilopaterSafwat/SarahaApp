"use client"
import React, { useState } from 'react';
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { motion } from "motion/react"
import { MdOutlineFavorite } from 'react-icons/md';
import { FaTrash } from 'react-icons/fa';

export default function AllMessages({ messages }: { messages: any }) {
    const [navActive, setnavActive] = useState('recived')
    console.log(messages.length);
    function isArabic(text: string) {
        const arabicReg = /[\u0600-\u06FF]/;
        return arabicReg.test(text);
    }

    return (
        <>
            <nav className='w-full mb-4'>
                <ul className='flex bg-gray-300 w-full justify-between rounded-sm p-1'>
                    <li onClick={() => { setnavActive("recived") }} className={`cursor-pointer text-center font-light py-2 rounded-sm w-1/3 ${navActive == "recived" && "active-nav"}`}>الوراده</li>
                    <li onClick={() => { setnavActive("favorite") }} className={`cursor-pointer text-center font-light py-2 rounded-sm w-1/3 ${navActive == "favorite" && "active-nav"}`}>المفضلة</li>
                    <li onClick={() => { setnavActive("all") }} className={`cursor-pointer text-center font-light py-2 rounded-sm w-1/3 ${navActive == "all" && "active-nav"}`}>العامة</li>
                </ul>
            </nav>
            {navActive == "recived" && <div className='recived w-full'>
                <h2>الرسائل الواردة</h2>
                {messages.length === 0 && <>
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
                    {messages.map((message) => (
                        <div key={message._id} className='bg-gray-200 rounded-sm p-4 flex flex-col' dir={isArabic(message.message) ? "rtl" : "ltr"}>
                            <span>{message.message}</span>
                            <div className='buttons p-2 flex gap-4 self-end text-xl '>
                                <button className='bg-gray-300  p-2 rounded-sm cursor-pointer'>
                                    <MdOutlineFavorite className='hover:text-red-500' />
                                </button>
                                <button className='bg-gray-300  p-2 rounded-sm cursor-pointer'>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div >}
            {navActive == "favorite" && <div className='recived w-full'>
                <h2>الرسائل المفضلة</h2>
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
            </div >}
            {navActive == "all" && <div className='recived w-full'>
                <h2>الرسائل العامة</h2>
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
            </div >}
        </>
    );
}
