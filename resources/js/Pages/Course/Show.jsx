import { Link, usePage, router } from "@inertiajs/react";
import React, {useState} from "react";
import OverlayNavbar from "../../components/OverlayNavbar";
import Rating from '../../components/Rating'
import { BsFillBookmarkPlusFill, BsPlayCircleFill, BsFillPersonFill, BsBookmarkDashFill } from 'react-icons/bs'
import { MdPreview } from 'react-icons/md'
import CourseContent from "../../components/CourseContent";
import Comment from "../../components/Comment";
import htmr from 'htmr';


const Courses = () => {
    const {course, alreadyStarted, addedToLearnLater, comments, auth, newComment} = usePage().props
    
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
        router.post(`/course/${course.id}/comment`, values)
    }


    return (
        <div>
            <OverlayNavbar />
            <div className="relative bg-gray-500 min-h-screen" dir="ltr">
                <img className="w-full md:w-2/3 object-cover blur max-h-screen" src={course.image} alt={course.name} />
                <div
                dir="rtl"
                className="absolute bottom-0 left-0 right-0 min-h-full p-8 text-white bg-black bg-opacity-80 flex items-end"
                >
                <div className="flex justify-between w-full">
                    <div className="font-normal">
                        <p className="text-lg md:text-2xl">{course.name}</p>
                        <p className="text-xs md:text-lg mt-2">{course.summery}</p>
                        <p className="text-lg md:text-lg mt-3">{course.topic.name}</p>
                        <p className="text-lg md:text-lg mt-3 text-amber-500 flex gap-2 justify-start items-center">{course.stars} <Rating rating={course.stars} /></p>
                        <p className="text-lg md:text-lg mt-3  flex gap-2 justify-start items-center">
                            <BsFillPersonFill className="h-6 w-6" />
                            <p>{course.instructors.map((instructor, i, arr) => {
                                if (arr.length - 1 === i) {
                                    return <span key={instructor.id}>{instructor.name}</span>
                                } else {
                                    return <span key={instructor.id}>{instructor.name}, </span>
                                }
                            })}</p>
                        </p>
                        <div className="flex flex-col md:flex-row gap-3 mt-4">
                            {
                                alreadyStarted[0] ? 
                                    <Link href={`/learn/${course.slug}?session=${alreadyStarted[1].id}`} className="bg-violet-600 p-2 px-6 text-center flex items-center justify-center gap-2">
                                        <BsPlayCircleFill />
                                        ادامه یادگیری از {alreadyStarted[1].name}
                                    </Link>
                                    :
                                    <Link href={`/learn/${course.slug}`} className="bg-violet-600 p-2 px-6 text-center flex items-center justify-center gap-2">
                                        <BsPlayCircleFill />
                                        شروع یادگیری
                                    </Link>
                            }
                            {
                                addedToLearnLater ? 
                                    <Link method="post" as="button" href={`/course/${course.id}/learn-later`} className="bg-red-600 p-2 px-6 text-center flex items-center justify-center gap-2">
                                        <BsBookmarkDashFill />
                                        حذف از صف یادگیری
                                    </Link>
                                    :
                                    <Link method="post" as="button" href={`/course/${course.id}/learn-later`} className="bg-violet-600 p-2 px-6 text-center flex items-center justify-center gap-2">
                                        <BsFillBookmarkPlusFill />
                                        بعدا یاد بگیر
                                    </Link>
                            }
                            <button className="bg-violet-600 p-2 px-6 text-center flex items-center justify-center gap-2">
                                <MdPreview />
                                پیش نمایش
                            </button>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="bg-gray-200 p-5">
                <div className="container mx-auto">
                    <div className="mb-3 text-lg">
                        در این دوره یاد میگیرید :
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                        {course.what_you_will_learn.split('(*|ezpz*|)').map(item => {
                            return (
                                <div className="w-full p-4 bg-white text-black rounded-md shadow-lg border-r-4 border-violet-500">
                                    {item}
                                </div>
                            )
                        })}
                    </div>
                    <div className="mb-3 text-lg">
                        توضیحات :
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg mb-3">
                        {htmr(course.description)}
                    </div>
                    <div className="bg-white p-5 rounded-lg shadow-lg mb-3">
                        <div>زبان : {course.language}</div>
                        <div>آخرین بروزرسانی : {course.updated_at}</div>
                        <div>طول دوره : {course.videos_length}</div>
                        <div>ناشر : {course.publisher} - <a href={course.course_link} className="text-blue-500" target="_blank">لینک دوره</a></div>
                        <div>سطح : {course.level}</div>
                    </div>
                    <div className="mb-3 text-lg">
                        محتوای دوره :
                    </div>
                    <CourseContent chapters={course.chapters}/>
                    <div className="mb-3 text-lg">
                        نظرات :
                    </div>
                    {
                        newComment &&
                        <div className={`w-full p-4 bg-green-500 text-white rounded-md shadow-lg mt-2 mb-2`} role="alert">
                            نظر شما ثبت شد منتظر تاییدش باشید
                        </div> 
                    }
                    {auth ? 
                        <div className="flex items-center justify-center shadow-lg mb-3">
                            <form onSubmit={handleSubmit} className="w-full bg-white rounded-lg px-4 pt-2">
                                <div className="flex flex-wrap -mx-3 mb-6">
                                    <h2 className="px-4 pt-3 pb-2 text-gray-800 text-lg">نظر شما چیه؟</h2>
                                    <div className="w-full md:w-full px-3 mb-2 mt-2">
                                        <textarea id="text" value={values.text} onChange={handleChange} className="bg-gray-100 rounded border border-gray-400 leading-normal resize-none w-full h-20 py-2 px-3 font-medium placeholder-gray-700 focus:outline-none focus:bg-white" required></textarea>
                                    </div>
                                    <div className="w-full md:w-full flex items-start px-3">
                                        <div className="-mr-1">
                                        <input type='submit' className="bg-violet-500 text-white py-2 px-6 rounded tracking-wide mr-1 hover:bg-violet-400 cursor-pointer" value='ارسال'/>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                        :
                        <div className="bg-white p-5 rounded-lg shadow-lg mb-3">
                            برای ثبت نظر باید <Link href="/login" className="text-blue-500">وارد حسابتون بشید</Link>
                        </div>
                    }
                    {
                        comments.map(comment => <Comment key={comment.id} comment={comment} courseId={course.id}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Courses