import { Link } from "@inertiajs/react";
import React from "react";
import {BsFillPencilFill, BsFillFileEarmarkArrowUpFill, BsFillEyeFill} from 'react-icons/bs'


const CourseTR = (props) => {
    return(
        <tr class="hover:bg-gray-50">
            <th class="px-6 py-4 font-normal text-gray-900">
                <div class="text-sm">
                    <div class="font-medium text-gray-700">{props.course.name}</div>
                    <div class="text-gray-400">{props.course.summery}</div>
                </div>
            </th>
            <td class="px-6 py-4 text-center">
                {
                    props.course.status === 'available' ?
                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        دردسترس
                    </span>
                    :
                    <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                        <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        پنهان
                    </span>
                }
            </td>
            <td class="px-6 py-4">
                <div class="flex justify-center gap-4">
                    <Link href={`/dashboard/course/${props.course.id}/content`}>
                        <BsFillFileEarmarkArrowUpFill className="h-6 w-6 hover:text-violet-500" />
                    </Link>
                </div>
            </td>
            <td class="px-6 py-4">
                <div class="flex justify-center gap-4">
                    <Link href={`/dashboard/course/${props.course.id}/edit`}>
                        <BsFillPencilFill className="h-6 w-6 hover:text-yellow-500" />
                    </Link>
                </div>
            </td>
            <td class="px-6 py-4">
                <div class="flex justify-center gap-4">
                    <Link href={`/course/${props.course.slug}`}>
                        <BsFillEyeFill className="h-6 w-6 hover:text-violet-500" />
                    </Link>
                </div>
            </td>
        </tr>
    )
}

export default CourseTR