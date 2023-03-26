import { Link } from "@inertiajs/react";
import React from "react";
import { CgProfile } from 'react-icons/cg'


const DashboardComment = (props) => {
    return (
        <div className="bg-white p-5 rounded-lg shadow-lg mb-3">
            <div className="flex justify-between items-center">
                <div className="flex gap-1 items-center text-lg font-semibold mb-2">
                    <CgProfile className="w-8 h-8"/>
                    <div>{props.comment.user.name} در <Link className="text-blue-500" href={`/course/${props.comment.course.slug}`}>{props.comment.course.name}</Link></div>
                </div>
                <div className="flex gap-1 items-center">
                    <Link method="post" as="button" href={`/dashboard/comment/${props.comment.id}/approve`} className="text-white rounded-lg bg-green-500 p-1 px-2">تایید</Link>
                    <Link method="post" as="button" href={`/dashboard/comment/${props.comment.id}/remove`} className="text-white rounded-lg bg-red-500 p-1 px-2">حذف</Link>
                </div>
            </div>
            <div className="text-md text-gray-700">{props.comment.text}</div>
        </div>
    )
}

export default DashboardComment