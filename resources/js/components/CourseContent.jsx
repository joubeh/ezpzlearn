import React from "react";
import { Disclosure } from '@headlessui/react'
import { BsArrowDownCircle, BsArrowUpCircle } from 'react-icons/bs'
import { MdOndemandVideo } from 'react-icons/md'
import { AiFillFile } from 'react-icons/ai'


const CourseContent = (props) => {
    return (
        <div className="bg-white p-5 rounded-lg shadow-lg mb-3">
            {
                props.chapters.map(chapter => {
                    return (
                        <div  key={chapter.id} className="m-3">
                            <Disclosure>
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
                                    chapter.sessions.map(session => {
                                        return (
                                            <div key={session.id}>
                                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-md text-gray-700 flex items-center gap-2">
                                                    { session.type === "video" ? <MdOndemandVideo /> : <AiFillFile /> }
                                                    <div>{session.name}</div>
                                                    { session.type === "video" && <div> - {session.video_length}</div> }
                                                </Disclosure.Panel>
                                            </div>
                                        )
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

export default CourseContent