import React, { useState } from "react";
import { router } from '@inertiajs/react'


const NewSession = (props) => {
    const [values, setValues] = useState({
        name: "",
        url: "",
        type: "video",
        video_length: ""
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
        router.post(`/dashboard/chapter/${props.chapter_id}/session/create`, values)
        props.cancel();
        router.reload({ only: ['course'] })
    }

    return (
        <div className="bg-white rounded-lg mb-3 p-8 border-2 border-violet-500">
            <form onSubmit={handleSubmit}>
                <label className="block text-gray-700 text-sm font-bold mb-2">جلسه جدید</label>
                <input id="name" value={values.name} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required placeholder="نام جلسه"/>
                <input id="url" value={values.url} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required placeholder="لینک"/>
                <select id="type" value={values.type} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none">
                    <option value="video">ویدیو</option>
                    <option value="resource">فایل</option>
                </select>
                { values.type === 'video' && <input id="video_length" value={values.video_length} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none mb-2 focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" placeholder="مدت ویدیو"/>}
                <div className="flex gap-2">
                    <button className="bg-violet-500 text-white py-2 px-4 w-full rounded hover:bg-violet-400">ذخیره</button>
                    <div onClick={e => props.cancel()} className="bg-red-500 cursor-pointer text-center text-white py-2 px-4 w-full rounded hover:bg-red-400">لغو</div>
                </div>
            </form>
        </div>
    );
}

export default NewSession