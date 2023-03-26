import { router } from "@inertiajs/react";
import React, {useState} from "react";
import { Disclosure } from '@headlessui/react'
import { BsArrowDownCircle, BsArrowUpCircle, BsFillPlusCircleFill } from 'react-icons/bs'
import { MdOndemandVideo } from 'react-icons/md'
import { AiFillFile, AiFillMinusCircle } from 'react-icons/ai'
import NewSession from "./NewSession";


const DashboardContentChapter = (props) => {
    const {chapter} = props
    const [isAddingSession, setIsAddingSession] = useState(false);

    function removeChapter(c) {
        router.post(`/dashboard/chapter/${c}/remove`, {})
        router.reload({ only: ['course'] })
    }

    function removeSession(s) {
        router.post(`/dashboard/session/${s}/remove`, {})
        router.reload({ only: ['course'] })
    }

    return (
        <div className="m-3">
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
                <Disclosure.Panel className="px-4 pt-4 pb-2 text-md text-gray-700 flex items-center gap-2">
                    {
                        !isAddingSession && 
                            <button onClick={e => setIsAddingSession(true)} className={`flex gap-2 items-center bg-violet-500 text-white p-2 px-4 w-max shadow-lg hover:bg-violet-400 text-sm`}>
                                <BsFillPlusCircleFill />
                                جلسه جدید
                            </button>
                    }
                    <button onClick={e => removeChapter(chapter.id)} className={`flex gap-2 items-center bg-red-500 text-white p-2 px-4 w-max shadow-lg hover:bg-red-400 text-sm`}>
                        <AiFillMinusCircle />
                        حذف فصل
                    </button>
                </Disclosure.Panel>
                { isAddingSession && <Disclosure.Panel><NewSession cancel={setIsAddingSession} chapter_id={chapter.id} /></Disclosure.Panel> }
                {
                    chapter.sessions.map(session => {
                        return (
                            <div key={session.id}>
                                <Disclosure.Panel className="px-4 pt-4 pb-2 text-md text-gray-700 flex items-center gap-2">
                                    <button onClick={e => removeSession(session.id)} className={`flex gap-2 items-center bg-red-500 text-white p-2 px-4 w-max shadow-lg hover:bg-red-400 text-sm`}>
                                        <AiFillMinusCircle />
                                        حذف
                                    </button>
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
    );
}

export default DashboardContentChapter