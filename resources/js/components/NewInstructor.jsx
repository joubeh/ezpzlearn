import React, { useState } from "react";
import { router } from '@inertiajs/react'


const NewInstructor = (props) => {
    const [values, setValues] = useState({
        name: ""
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
        router.post('/dashboard/instructor/create', values)
        props.cancel()
        router.reload({ only: ['instructors'] })
    }

    return (
        <div className="bg-white rounded-lg shadow-lg mb-3 p-8">
            <form onSubmit={handleSubmit}>
                <label className="block text-gray-700 text-sm font-bold mb-2">مدرس جدید</label>
                <div className="grid grid-cols-6 gap-2">
                    <input id="name" value={values.name} onChange={handleChange} className="bg-violet-200 col-span-4 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required placeholder="نام مدرس"/>
                    <button className="bg-violet-500 text-white py-2 px-4 w-full rounded hover:bg-violet-400">ذخیره</button>
                    <div onClick={e => props.cancel()} className="bg-red-500 cursor-pointer text-center text-white py-2 px-4 w-full rounded hover:bg-red-400">لغو</div>
                </div>
            </form>
        </div>
    );
}

export default NewInstructor