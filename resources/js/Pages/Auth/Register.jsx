import React, {useState} from "react";
import Layout from "../../components/Layout";
import { Link, router } from "@inertiajs/react";


const Register = () => {
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        router.post('/register', values)
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit}>
            <div className="py-6">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
                    <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage: "url('/assets/auth-image.avif')"}}></div>
                    <div className="w-full p-8 lg:w-1/2">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">ثبت نام</h2>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">نام</label>
                            <input id="name" value={values.name} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">ایمیل</label>
                            <input id="email" value={values.email} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" required/>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">رمز عبور</label>
                            <input id="password" value={values.password} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" required/>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">تکرار رمز عبور</label>
                            <input id="password_confirmation" value={values.password_confirmation} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" required/>
                        </div>
                        <div className="mt-8">
                            <button className="bg-violet-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-violet-400">ثبت نام</button>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <span className="border-b w-1/5 md:w-1/4"></span>
                            <Link href="/login" className="text-xs text-gray-500 uppercase">قبلا ثبت نام کردی؟ از اینجا وارد شو</Link>
                            <span className="border-b w-1/5 md:w-1/4"></span>
                        </div>
                    </div>
                </div>
            </div>
            </form>
        </Layout>
    )
}

export default Register