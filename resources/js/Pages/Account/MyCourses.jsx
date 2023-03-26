import { Link, usePage } from "@inertiajs/react";
import React from "react";
import Layout from "../../components/Layout";


const MyCourses = () => {
    const { onGoing, learnLaters } = usePage().props
    console.log(learnLaters);

    return (
        <Layout>
            <div className="mb-3 text-lg">
                در حال یادگیری :
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {onGoing.map(c => {
                    return (
                        <Link href={`/course/${c[0].slug}`} key={c[0].id}>
                            <div className="bg-white p-5 rounded-lg shadow-lg mb-3 flex flex-col gap-4 items-center justify-center text-center">
                                <div>{c[0].name}</div>
                                <div className="inline-flex items-center justify-center overflow-hidden rounded-full">
                                    <svg className="w-20 h-20">
                                        <circle
                                        className="text-gray-300"
                                        strokeWidth="5"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="30"
                                        cx="40"
                                        cy="40"
                                        />
                                        <circle
                                        className="text-violet-500"
                                        strokeWidth="5"
                                        strokeDasharray="188.49"
                                        strokeDashoffset={`${188.49 - ((c[1] / 100) * 188.49)}`}
                                        strokeLinecap="round"
                                        stroke="currentColor"
                                        fill="transparent"
                                        r="30"
                                        cx="40"
                                        cy="40"
                                        />
                                    </svg>
                                    <span className="absolute text-xl text-violet-500">{Math.round(c[1])}%</span>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>

            <div className="mb-3 text-lg">
                بعدا یادمیگیرم :
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {learnLaters.map(c => {
                    return (
                        <Link href={`/course/${c.slug}`} key={c.id}>
                            <div className="bg-white p-5 rounded-lg shadow-lg mb-3 gap-4 text-center">
                                <div>{c.name}</div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </Layout>
    )
}

export default MyCourses