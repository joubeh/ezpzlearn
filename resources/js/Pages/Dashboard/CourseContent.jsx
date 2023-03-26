import { usePage } from "@inertiajs/react";
import React, {useState} from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { BsFillPlusCircleFill } from 'react-icons/bs'
import NewChapter from "../../components/NewChapter";
import DashboardContentChapter from "../../components/DashboardContentChapter";
import ChangeCourseStatus from "../../components/ChangeCourseStatus";


const CourseContent = () => {
    const {course} = usePage().props
    const [isAddingChapter, setIsAddingChapter] = useState(false);

    return (
        <DashboardLayout>
            <div className="mb-3 text-lg flex justify-between items-center">
                <div>{course.name}</div>
                <div><ChangeCourseStatus course={course.id} status={course.status === 'available' ? true : false}/></div>
            </div>
            { isAddingChapter && <NewChapter cancel={setIsAddingChapter} course_id={course.id} /> }
            <div className="bg-white p-5 rounded-lg shadow-lg mb-3">
                {
                    !isAddingChapter &&
                        <button className={`flex gap-2 items-center mb-4 mr-3 bg-violet-500 text-white p-2 px-4 w-max shadow-lg hover:bg-violet-400 text-sm`} onClick={e=>setIsAddingChapter(true)}>
                            <BsFillPlusCircleFill />
                            فصل جدید
                        </button>
                }
                {
                    course.chapters.map(chapter => {
                        return (
                            <DashboardContentChapter key={chapter.id} chapter={chapter} />
                        )
                    })
                }
            </div>
        </DashboardLayout>
    )
}

export default CourseContent