import React, {useState} from "react";
import { CgProfile } from 'react-icons/cg'
import { router, usePage } from "@inertiajs/react";


const Comment = (props) => {
    const {auth} = usePage().props
    const [isReplying, setIsReplying] = useState(false)
    const [values, setValues] = useState({
        text: "",
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
        router.post(`/course/${props.courseId}/comment/${props.comment.id}/reply`, values)
    }

    return (
        <div className="bg-white p-5 rounded-lg shadow-lg mb-3">
            <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center text-lg font-semibold mb-2">
                    <CgProfile className="w-8 h-8"/>
                    <div>{props.comment.user.name}</div>
                </div>
                { auth && <button onClick={e => setIsReplying(!isReplying)} className={`${isReplying ? "bg-red-500 hover:bg-red-400" : "bg-violet-500 hover:bg-violet-400"} text-white py-1 text-sm px-4 rounded tracking-wide`}>{ isReplying ? "لغو پاسخ" : "پاسخ"}</button> }
            </div>
            <div className="text-md text-gray-700">{props.comment.text}</div>
            <div className="mr-8 mt-4">
                {
                    props.comment.replies && props.comment.replies.map(reply => {
                        return (
                            <div key={reply.id} className="mb-2 rounded-lg border-violet-500 p-2 border-2">
                                <div className="flex gap-1 items-center text-lg font-semibold mb-2">
                                    <CgProfile className="w-8 h-8"/>
                                    <div>{reply.user.name}</div>
                                </div>
                                <div className="text-md text-gray-700">{reply.text}</div>
                            </div>
                        )
                    })
                }
            </div>
            {
                isReplying && 
                <form onSubmit={handleSubmit}>
                    <div className="px-3 mt-2 flex gap-2 items-end">
                        <textarea id="text" value={values.text} onChange={handleChange} className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" required></textarea>
                        <button className="bg-violet-500 hover:bg-violet-400 text-white py-1 text-sm px-4 rounded tracking-wide">ارسال</button>
                    </div>
                </form>
            }
        </div>
    )
}

export default Comment