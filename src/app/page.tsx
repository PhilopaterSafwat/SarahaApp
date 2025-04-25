
import Link from "next/link";
import { RiMessage3Fill } from "react-icons/ri";


export default function Home() {

    return <>
        <main className="p-4">
            <div className="max-w-[700px] py-15 p-6 bg-white m-auto rounded-xl flex flex-col flex-wrap items-center select-none">
                <Link href={"/"} className="Logo flex  items-center gap-2 text-5xl font-bold text-blue-500 text-center justify-center mb-10">
                    <RiMessage3Fill /><h2>whisper</h2>
                </Link>
                {/* buttons */}
                <div className="buttons w-full flex flex-col gap-4">
                    <Link href={"/Login"}><button className="bg-blue-500 text-white w-full py-2 rounded-sm cursor-pointer">دخول</button></Link>
                    <Link href={"/SignUp"}><button className="bg-blue-500 text-white w-full py-2 rounded-sm cursor-pointer">حساب جديد</button></Link>
                </div>
            </div>
        </main>
    </>
}
