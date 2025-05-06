"use client"
// import Image from "next/image";
// import userImage from "./../../../../public/felo.jpg"
import { FaShareAlt } from "react-icons/fa";
import AllMessages from "@/app/_components/AllMessages/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "@/app/redux/userSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import toast from "react-hot-toast";

export default function Messages() {
    function CopyFunction(event: any) {

        const copyText = event.currentTarget.textContent


        navigator.clipboard.writeText(copyText);
        toast.success("تم نسخ الرابط بنجاح")
    }
    function CopyValue(event: any) {

        const copyText = event.currentTarget.value


        navigator.clipboard.writeText(copyText);


        toast.success("تم نسخ الرابط بنجاح")
    }
    const [checkingAuth, setCheckingAuth] = useState(true);
    const { user } = useSelector((state: RootState) => state)
    const dispatch = useDispatch<AppDispatch>()
    const { push } = useRouter()
    useEffect(() => {
        dispatch(getUser())
        if (!localStorage.getItem("token")) {
            push("/Login")
        } else {
            setCheckingAuth(false);
        }
    }, [])

    useEffect(() => {
        // console.log("User Data:", user);
    }, [user]);
    if (checkingAuth || user.isLoding) {
        return <p className="text-center text-gray-500 mt-10">جاري التحقق...</p>;
    }
    return (
        <>
            <main className="p-4" dir="rtl">
                {!user.isLoding && <div className="max-w-[700px] h-screen p-6 bg-white m-auto rounded-xl flex flex-col flex-wrap items-center">
                    {/* UserImage */}
                    {/* <div className="userImage w-[150px] h-[150px]  bg-blue-400 rounded-full overflow-hidden  mb-5">
                        <Image src={userImage} alt="UserImage" className="w-full "></Image>
                    </div> */}
                    {/* UserName */}
                    <h2 className="text-3xl mb-3 capitalize">{user?.data.user?.userName}</h2>
                    {/* userLink */}
                    <p onClick={(event) => CopyFunction(event)} className="text-md underline mb-3 cursor-pointer w-full text-center">https://saraha-app-t5sq.vercel.app/SendMessage/{user?.data?.user?._id}</p>
                    {/* button */}
                    <button onClick={(event) => CopyValue(event)} value={`https://saraha-app-t5sq.vercel.app/SendMessage/${user?.data?.user?._id}`} className="mb-3 w-full bg-blue-300 py-2 rounded-sm flex items-center justify-center gap-3  text-white cursor-pointer"><span><FaShareAlt /></span> مشاركة </button>
                    {/* All messages section */}
                    <AllMessages messages={user.data?.messages}></AllMessages>
                </div>}
            </main>
        </>
    );
}
