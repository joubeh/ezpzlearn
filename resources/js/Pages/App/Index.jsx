import { Link, usePage, router } from '@inertiajs/react'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import CourseCard from "../../components/CourseCard";
import {BiLeftArrow} from 'react-icons/bi'


const Index = () => {
    const {latestCourses, topTopics} = usePage().props
    const [searchQuery, setSearchQuery] = useState('')

    function performSearch(){
        if(!searchQuery || searchQuery.trim() == '') return;
        router.visit(`/courses?search=${searchQuery}`)
    }

    return (
        <Layout>
            <div className='bg-red-400 mb-3 w-max mx-auto'>
                <img src="/assets/logo.jpg" alt="ezpzlearn" />
            </div>
            <div class="w-full md:w-full shadow p-5 rounded-lg bg-white mb-4">
                <div className="grid grid-cols-12 gap-2">
                    <div class="relative col-span-8 md:col-span-10">
                        <div class="absolute flex items-center mr-2 h-full">
                            <svg class="w-6 h-6 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z"></path>
                            </svg>
                        </div>
                        <input onKeyPress={(e) => e.key === 'Enter' && performSearch()} value={searchQuery} onChange={e => setSearchQuery(e.target.value)} type="text" placeholder="جست و جو ..." class="px-10 py-3 w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-xl"/>
                    </div>
                    <button onClick={e => performSearch()} className="bg-violet-500 text-white col-span-4 md:col-span-2 rounded-lg hover:bg-violet-600">
                        جست و جو
                    </button>
                </div>
            </div>

            <div className='mb-3 flex gap-2 items-center'>
                <div className='text-xl'>
                    آخرین دوره ها
                </div>
                <Link href='/courses' className='text-white bg-violet-500 p-2 px-3 flex items-center justify-center gap-2 text-sm'>همه دوره ها<BiLeftArrow /></Link>
            </div>
            <div className="mb-3 md:px-4 md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 space-y-4 md:space-y-0">
                {latestCourses.map(course => <CourseCard key={course.id} course={course}/>)}
            </div>

            {
                topTopics.map(topic => {
                    return (<div key={topic.id} className='mb-3 '>
                        <div className='mb-3 flex gap-2 items-center'>
                            <div className='text-xl'>
                                {topic.name}
                            </div>
                            <Link href={`/courses?topic=${topic.name}`} className='text-white bg-violet-500 p-2 px-3 flex items-center justify-center gap-2 text-sm'>همه دوره های {topic.name}<BiLeftArrow /></Link>
                        </div>
                        <div className="md:px-4 md:grid md:grid-cols-2 lg:grid-cols-4 gap-5 space-y-4 md:space-y-0">
                            {topic.courses.map(course => <CourseCard key={course.id} course={course}/>)}
                        </div>
                    </div>)
                })
            }
        </Layout>
    )
}

export default Index