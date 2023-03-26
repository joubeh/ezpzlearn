import React from "react";
import { Link } from "@inertiajs/react";
import {BsClock, BsFillStarFill, BsFillPersonFill} from 'react-icons/bs'


const CourseCard = (props) => {
    return (
        <Link href={`/course/${props.course.slug}`}>
            <div className="max-w-sm bg-white px-6 pt-6 pb-2 rounded-xl shadow-lg transition duration-500">
                <h3 className="mb-3 text-lg font-bold text-violet-500">{props.course.name}</h3>
                <div>
                    <img className="w-full rounded-xl" src={props.course.image} alt={props.course.name}/>
                </div>
                <h1 className="mt-4 text-gray-800 text-md font-bold">{props.course.summery}</h1>
                <div className="my-4">
                    <div className="flex gap-1 items-center mb-2">
                        <BsClock className="h-6 w-6 text-violet-500" />
                        <p>{props.course.videos_length}</p>
                    </div>
                    <div className="flex gap-1 items-center mb-2">
                        <BsFillPersonFill className="h-6 w-6 text-violet-500" />
                        <p>{props.course.instructors.map((instructor, i, arr) => {
                            if (arr.length - 1 === i) {
                                return <span key={instructor.id}>{instructor.name}</span>
                            } else {
                                return <span key={instructor.id}>{instructor.name}, </span>
                            }
                        })}</p>
                    </div>
                    <div className="flex gap-1 items-center mb-2">
                        <BsFillStarFill className="h-6 w-6 text-violet-500" />
                        <p>{props.course.stars}/5</p>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default CourseCard