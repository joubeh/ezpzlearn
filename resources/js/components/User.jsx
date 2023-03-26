import { Link } from "@inertiajs/react";
import React from "react";
import {BsTrash} from 'react-icons/bs'


const User = (props) => {
    return(
        <tr class="hover:bg-gray-50">
            <th class="px-6 py-4 font-normal text-gray-900">
                <div class="text-sm">
                    <div class="font-medium text-gray-700">{props.user.name}</div>
                    <div class="text-gray-400">{props.user.email}</div>
                </div>
            </th>
            <td class="px-6 py-4 text-center">
                {
                    props.user.role === 'user' ?
                        <span class="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600">کاربر ساده</span>
                        :
                        (
                            props.user.role === 'editor' ?
                                <span class="inline-flex items-center gap-1 rounded-full bg-violet-50 px-2 py-1 text-xs font-semibold text-violet-600">ادیتور</span>
                                :
                                <span class="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600">ادمین</span>
                        )
                }
            </td>
            <td class="px-6 py-4 text-center">
                {
                    props.user.plus_status ?
                    <span class="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        <span class="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        فعال
                    </span>
                    :
                    <span class="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-1 text-xs font-semibold text-red-600">
                        <span class="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                        غیرفعال
                    </span>
                }
            </td>
            <td class="px-6 py-4">
                <div class="flex justify-center gap-4">
                    <Link href={`/dashboard/user/${props.user.id}/remove`} method="post" as="button">
                        <BsTrash className="h-6 w-6 hover:text-red-600" />
                    </Link>
                </div>
            </td>
        </tr>
    )
}

export default User