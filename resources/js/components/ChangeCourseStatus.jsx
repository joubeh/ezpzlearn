import { router } from '@inertiajs/react'
import React, { useState } from 'react'


const ChangeCourseStatus = (props) => {
  const [isAvailable, setIsAvailable] = useState(props.status)

    function change() {
        router.post(`/dashboard/course/${props.course}/change-status`, {})
        setIsAvailable(!isAvailable)
    }

  if(isAvailable){
    return(
        <button onClick={e => change()} className={`flex gap-2 items-center bg-green-500 text-white p-2 px-4 w-max shadow-lg hover:bg-green-400 text-sm`}>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                دردسترس
            </span>
            تغییر وضعیت
        </button>
    )
  } else {
    return(
        <button onClick={e => change()} className={`flex gap-2 items-center bg-red-500 text-white p-2 px-4 w-max shadow-lg hover:bg-red-400 text-sm`}>
            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-red-600">
                <span className="h-1.5 w-1.5 rounded-full bg-red-600"></span>
                پنهان
            </span>
            تغییر وضعیت
        </button>
    )
  }
}

export default ChangeCourseStatus