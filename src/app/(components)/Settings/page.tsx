"use client"
import Image from "next/image";
import settingsImg from "./../../../../public/account_setting_main.svg"
import { FaPen } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa6";
import { MdLock } from "react-icons/md";
import { FaPowerOff } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { UserTokenContext } from "@/app/Context/userTokenContext";







export default function Settings() {
    const [checkingAuth, setCheckingAuth] = useState(true);
    const { push } = useRouter()
    const context = useContext(UserTokenContext);
    if (!context) {
      throw new Error("UserTokenContext must be used within a UserTokenProvider");
    }
    const { setToken } = context;
    
    const profileEdit = () => {
        toast.success("سوف تاتي قريبا هذة الخصية")

    }
    const passwordEdit = () => {
        toast.success("سوف تاتي قريبا هذة الخصية")

    }
    const Logout = () => {
        localStorage.removeItem("token")
        setToken("");
        toast.success("تم تسجيل الخروج بنجاح")
        push("/Login")
    }
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            push("/Login")
        } else {
            setCheckingAuth(false);
        }
    }, [])
    if (checkingAuth) {
        return <p className="text-center text-gray-500 mt-10">جاري التحقق...</p>;
    }
    return (
        <>
            <main className="p-4">
                <div className="max-w-[700px] py-15 p-6 bg-white m-auto rounded-xl flex flex-col flex-wrap items-center select-none">
                    {/* title */}
                    <h2 className="text-3xl mb-5">إعدادت الحساب</h2>
                    {/* setting Img */}
                    <Image src={settingsImg} alt="setting Img" className="max-w-[220px] mb-5"></Image>
                    <ul className="bg-gray-100 p-4 rounded-xl w-full text-blue-500 gap-4 flex flex-col">
                        <li onClick={() => { profileEdit() }} className="bg-gray-200 rounded-xl py-3 px-2 flex items-center justify-between hover:translate-x-3 transition-transform cursor-pointer"><div className="flex items-center gap-3"><FaPen className="text-xl" /><span>تعديل المعلومات</span></div><FaChevronRight className="text-gray-600" />
                        </li>
                        <li onClick={() => { passwordEdit() }} className="bg-gray-200 rounded-xl py-3 px-2 flex items-center justify-between hover:translate-x-3 transition-transform cursor-pointer"><div className="flex items-center gap-3"><MdLock className="text-xl" /><span>كلمة المرور</span></div><FaChevronRight className="text-gray-600" />
                        </li>
                        <li onClick={Logout} className="bg-gray-200 rounded-xl py-3 px-2 flex items-center justify-between hover:translate-x-3 transition-transform cursor-pointer"><div className="flex items-center gap-3"><FaPowerOff className="text-xl" /><span>   تسجيل الخروج  </span></div><FaChevronRight className="text-gray-600" />
                        </li>
                    </ul>
                </div>
            </main>
        </>
    );
}

