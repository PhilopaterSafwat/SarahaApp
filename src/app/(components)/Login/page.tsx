"use client"
import { UserTokenContext } from "@/app/Context/userTokenContext";
import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { RiMessage3Fill } from "react-icons/ri";
import * as Yup from "yup";
export default function Login() {
    const userTokenContext = useContext(UserTokenContext);

    if (!userTokenContext) {
        throw new Error("UserTokenContext must be used within a UserTokenProvider");
    }

    const { setToken } = userTokenContext;

    const [Loading, setLoading] = useState(false)
    const { push } = useRouter()
    type LoginValues = {
        email: string;
        password: string;
    };
    async function handleLogin(values: LoginValues) {
        try {
            setLoading(true)
            const user = await axios.post("https://whisperapi-production.up.railway.app/auth/login", values, {
                headers: {
                    "accept-language": "en"
                }
            })
            setToken(user.data.data.token)
            const token = user.data.data.token

            if (token) {
                localStorage.setItem("token", JSON.stringify(token))
                push("/Messages")
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response && error.response.data && error.response.data.msg) {
                    if (error.response.data.msg == "emaill or password is invaild") {
                        toast.error("البريد الإلكتروني أو كلمة المرور غير صالحة")
                    } else {
                        toast.error(error.response.data.msg)
                    }
                } else {
                    toast.error("Something went wrong, please try again.")
                    console.error(error)
                }
            }
        } finally {
            setLoading(false)
        }
    }
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('البريد الالكتروني خطاء').required('البريد الالكتروني مطلوب'),
        password: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'الحد الأدنى ثمانية أحرف، على الأقل حرف كبير واحد، وحرف صغير واحد ورقم واحد').required('كلمة المرور مطلوبه'),
    })
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validationSchema
        , onSubmit: handleLogin
    })
    return (
        <>
            <main className="p-4">
                <div className="max-w-[700px] py-15 p-6 bg-white m-auto rounded-xl flex flex-col flex-wrap items-center select-none">
                    <Link href={"/"} className="Logo flex  items-center gap-2 text-5xl font-bold text-blue-500 text-center justify-center mb-4">
                        <RiMessage3Fill /><h2>whisper</h2>
                    </Link>
                    <h2 className="text-3xl mb-10">دخول</h2>
                    <form className="w-full" onSubmit={formik.handleSubmit}>
                        <div className="relative z-0 w-full mb-5 group">
                            <input value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 right-2 -z-50 origin-[0]  rtl:peer-focus:translate-x-1/4 rtl:peer-focus:right-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">البريد الالكتروني</label>
                        </div>
                        {formik.errors.email && formik.touched.email && <div dir="rtl" className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">{formik.errors.email}</div>}
                        <div className="relative z-0 w-full mb-5 group">
                            <input value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-black bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-300 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                            <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 right-2 -z-50 origin-[0]  rtl:peer-focus:translate-x-1/4 rtl:peer-focus:right-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">كلمة المرور</label>
                        </div>
                        {formik.errors.password && formik.touched.password && <div dir="rtl" className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">{formik.errors.password}</div>}
                        {Loading && <button className="flex justify-center bg-blue-500 text-white w-full py-2 rounded-sm cursor-not-allowed" type="button">
                            <div role="status">
                                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </button>}
                        {!Loading && <button className="flex justify-center bg-blue-500 text-white w-full py-2 rounded-sm cursor-pointer" type="submit">
                            دخول
                        </button>}
                        <div className="mt-8 flex w-full items-center gap-5 justify-center text-gray-800">
                            <Link href={"/SignUp"}>تسجيل</Link>
                            <span className="text-black">|</span>
                            <Link href="">نسيت الرقم السري؟</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}
