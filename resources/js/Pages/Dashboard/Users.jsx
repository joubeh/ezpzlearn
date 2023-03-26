import React, {useState} from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { router } from "@inertiajs/react";
import {BsFillPlusCircleFill} from 'react-icons/bs'
import User from "../../components/User";


const Users = (props) => {
    const [isAdding, setIsAdding] = useState(false);
    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
        role: "admin",
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
        router.post('/dashboard/user/create', values)
    }

    return (
        <DashboardLayout>
            <button className={`flex gap-2 items-center mb-3 text-lg cursor-pointer ${!isAdding && "bg-violet-500 text-white p-2 px-4 w-max shadow-lg hover:bg-violet-400 text-sm"}`} onClick={e=>setIsAdding(!isAdding)}>
                <BsFillPlusCircleFill />
                افزودن کاربر
            </button>
            {
                isAdding &&
                <div className="bg-white rounded-lg shadow-lg mb-3">
                    <form onSubmit={handleSubmit}>
                        <div className="w-full p-8">
                            <div>
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
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">دسترسی</label>
                                <select id="role" value={values.role} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required>
                                    <option value="admin">ادمین</option>
                                    <option value="editor">ادیتور</option>
                                </select>
                            </div>
                            <div className="mt-8">
                                <button className="bg-violet-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-violet-400">افزودن</button>
                            </div>
                        </div>
                    </form>
                </div>
            }
            <div className="mb-3 text-lg">
                کاربران
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg mb-3">
                <table class="w-full border-collapse bg-white text-sm text-gray-500">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">نام</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">دسترسی</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">اشتراک پلاس</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">حذف</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                        { props.users.map(user => <User key={user.id} user={user} />) }
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    )
}

export default Users