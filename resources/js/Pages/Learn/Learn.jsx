import { usePage } from "@inertiajs/react";
import React from "react";
import Layout from "../../components/Layout";
import CourseNavigator from '../../components/CourseNavigator';


const Learn = () => {
    const {course, current_session, current_chapter, learnedSessions} = usePage().props
    
    return (
        <Layout>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-2">
                <div className="lg:col-span-3 bg-white p-3 rounded-lg shadow-lg">
                    <video controls>
                        <source src="http://localhost:2280/s3/video.mp4" type="video/mp4"/>
                        Your browser does not support the video tag.
                    </video>
                </div>
                <CourseNavigator learnedSessions={learnedSessions} chapters={course.chapters} slug={course.slug} current_session={current_session} current_chapter={current_chapter}/>
            </div>
        </Layout>
    )
}

export default Learn