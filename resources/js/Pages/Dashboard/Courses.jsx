import React from "react";
import CourseTR from "../../components/CourseTR";
import DashboardLayout from "../../components/DashboardLayout";
import {BsFillPlusCircleFill} from 'react-icons/bs'
import { Link } from "@inertiajs/react";


const Courses = (props) => {
    return (
        <DashboardLayout>
            <div className="mb-3 text-lg flex items-center justify-between">
                دوره ها
                <Link href="/dashboard/course/create" className='flex gap-2 items-center mb-3 cursor-pointer bg-violet-500 text-white p-2 px-4 w-max shadow-lg hover:bg-violet-400 text-sm'>
                    <BsFillPlusCircleFill />
                    افزودن دوره
                </Link>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-lg mb-3">
                <table class="w-full border-collapse bg-white text-sm text-gray-500">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">نام</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">وضعیت</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">محتوا</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">ویرایش</th>
                            <th scope="col" class="px-6 py-4 font-medium text-gray-900">نمایش</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100 border-t border-gray-100">
                        {props.courses.map(course => <CourseTR key={course.id} course={course}/>)}
                    </tbody>
                </table>
            </div>
        </DashboardLayout>
    )
}

export default Courses