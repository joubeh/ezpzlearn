import React from "react";
import { Disclosure } from '@headlessui/react'
import { BsArrowDownCircle, BsArrowUpCircle, BsFillCheckCircleFill } from 'react-icons/bs'
import { MdOndemandVideo } from 'react-icons/md'
import { AiFillFile } from 'react-icons/ai'
import { Link } from "@inertiajs/react";


const CourseNavigator = (props) => {
    return (
        <div className="bg-white p-5 rounded-lg shadow-lg">
            {
                props.chapters.map(chapter => {
                    return (
                        <div  key={chapter.id} className="m-3">
                            <Disclosure defaultOpen={chapter.id === props.current_chapter.id}>
                            {({ open }) => (
                                <>
                                <Disclosure.Button className="flex items-center w-full justify-between rounded-lg bg-violet-200 px-4 py-2 text-left text-lg font-medium text-violet-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                                    <span>{chapter.name}</span>
                                    {
                                        open ?
                                            <BsArrowUpCircle />
                                            :
                                            <BsArrowDownCircle />
                                    }
                                </Disclosure.Button>
                                {
                                    chapter.sessions.map((session, i) => {
                                        if(session.type === "video") {
                                            return (
                                                <Link href={`/learn/${props.slug}?session=${session.id}`} key={session.id}>
                                                    <div>
                                                    <Disclosure.Panel className={`${i === 0 && "mt-1"} py-2 text-md flex items-center gap-2 ${session.id === props.current_session.id ? "border-r-4 border-violet-600 rounded-lg text-violet-600 px-3 bg-gray-200" : (`${props.learnedSessions.includes(session.id) ? "text-green-700" : "text-blue-700"} px-4`)}`}>
                                                        {props.learnedSessions.includes(session.id) ? <BsFillCheckCircleFill />: <MdOndemandVideo />}
                                                        <div>{session.name}</div>
                                                        <div> {session.video_length}</div>
                                                    </Disclosure.Panel>
                                                    </div>
                                                </Link>
                                            )
                                        } else {
                                            return (
                                                <a href={`/learn/${props.slug}?session=${session.id}`} key={session.id} target="_blank">
                                                    <div>
                                                    <Disclosure.Panel className={`${i === 0 && "mt-1"} py-2 text-md flex items-center gap-2 text-blue-700 px-4`}>
                                                        <AiFillFile />
                                                        <div>{session.name}</div>
                                                    </Disclosure.Panel>
                                                    </div>
                                                </a>
                                            )
                                        }
                                    })
                                }
                                </>
                            )}
                            </Disclosure>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default CourseNavigator