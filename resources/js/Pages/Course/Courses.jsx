import { Link, usePage } from "@inertiajs/react";
import React from "react";
import CourseCard from "../../components/CourseCard";
import Layout from "../../components/Layout";
import { FiArrowRightCircle, FiArrowLeftCircle } from 'react-icons/fi'
import CoursesFilter from "../../components/CoursesFilter";


const Courses = () => {
    const {courses} = usePage().props
    
    return (
        <Layout>
            <CoursesFilter />
            <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 space-y-4 md:space-y-0">
                {courses.data.map(course => <CourseCard key={course.id} course={course}/>)}
            </div>
            <div className="mt-5 mx-auto w-max text-xl">
                <ul className="flex gap-2 items-center justify-center">
                    {courses.links[0].url && <li><Link href={courses.links[0].url} className="text-violet-500 transition hover:bg-violet-100"><FiArrowRightCircle className="w-8 h-8"/></Link></li>}
                    {
                        courses.links.map((l, idx, ls) => {
                            if(idx === 0 || idx === ls.length-1) return;
                            return (
                                <li><Link href={l.url} className={`border-2 border-violet-500 p-2 px-4 text-violet-500 transition rounded-full ${l.active && 'bg-violet-500 text-white'}`}>{l.label}</Link></li>
                            )
                        })
                    }
                    {courses.links[courses.links.length-1].url && <li><Link href={courses.links[courses.links.length-1].url} className="text-violet-500 transition hover:bg-violet-100"><FiArrowLeftCircle className="w-8 h-8"/></Link></li>}
                </ul>
            </div>
        </Layout>
    )
}

export default Courses