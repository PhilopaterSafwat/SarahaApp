"use client"
import { RiMessage3Fill } from "react-icons/ri";
import { BiSolidMessageAltDetail } from "react-icons/bi";
import { FaUserAlt, FaUserPlus } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineLogin } from "react-icons/md";
import { useContext } from "react";
import { UserTokenContext } from "@/app/Context/userTokenContext";

export default function Navbar() {
    const path = usePathname();
    const { token } = useContext(UserTokenContext)


    return (
        <div className="text-3xl font-bold text-blue-500 px-2 md:px-40 py-4 flex items-center justify-between bg-white fixed inset-x-0">
            <Link href={"/"} className="Logo flex gap-2 items-center">
                <RiMessage3Fill /><h1>whisper</h1>
            </Link>

            {token ? (
                <ul className="flex gap-4 md:gap-10 items-center text-2xl">
                    <li>
                        <Link href={"/"} className={`${path === "/" && "p-2 bg-gray-200"} flex items-center justify-center rounded-xl cursor-pointer`}><FaUserAlt /></Link>
                    </li>
                    <li>
                        <Link href={"/Settings"} className={`${path === "/Settings" && "p-2 bg-gray-200"} flex items-center justify-center rounded-xl cursor-pointer`}><IoIosSettings /></Link>
                    </li>
                    <li>
                        <Link href={"/Messages"} className={`${path === "/Messages" && "p-2 bg-gray-200"} flex items-center justify-center rounded-xl cursor-pointer`}><BiSolidMessageAltDetail /></Link>
                    </li>
                </ul>
            ) : (
                <ul className="flex gap-4 md:gap-10 items-center text-2xl">
                    <li>
                        <Link href={"/Login"} className={`${path === "/Login" && "p-2 bg-gray-200"} flex items-center justify-center rounded-xl cursor-pointer`}><MdOutlineLogin /></Link>
                    </li>
                    <li>
                        <Link href={"/SignUp"} className={`${path === "/SignUp" && "p-2 bg-gray-200"} flex items-center justify-center rounded-xl cursor-pointer`}><FaUserPlus /></Link>
                    </li>
                </ul>
            )}
        </div>
    );
}
