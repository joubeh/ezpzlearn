import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Link, router } from "@inertiajs/react";


const MyAccount = (props) => {
    const [values, setValues] = useState({
        name: props.userName,
        old_password: "",
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

    function handleSubmitName(e) {
        e.preventDefault()
        router.post('/my-account/name/update', values)
    }

    function handleSubmitPassword(e) {
        e.preventDefault()
        router.post('/my-account/password/update', values)
    }

    return (
        <Layout>
            <div className="py-6">
                <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm">
                    <div className="w-full p-8">
                        <h2 className="text-2xl font-semibold text-gray-700 text-center">
                            اطلاعات حساب
                        </h2>

                        <form onSubmit={handleSubmitName}>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">نام</label>
                                <input id="name" value={values.name} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                            </div>
                            <div className="mt-8">
                                <button className="bg-violet-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-violet-400">
                                تغییر نام
                                </button>
                            </div>
                        </form>

                        <form onSubmit={handleSubmitPassword}>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">رمز عبور فعلی</label>
                            <input id="old_password" value={values.old_password} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" required/>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">رمز عبور جدید</label>
                            <input id="password" value={values.password} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" required/>
                        </div>
                        <div className="mt-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">تکرار رمز عبور جدید</label>
                            <input id="password_confirmation" value={values.password_confirmation} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" required/>
                        </div>
                        <div className="mt-8">
                            <button className="bg-violet-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-violet-400">
                            تغییر رمز
                            </button>
                        </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default MyAccount