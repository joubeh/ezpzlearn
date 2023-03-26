import React, {Fragment, useEffect, useState} from "react";
import { Dialog, Transition } from '@headlessui/react'
import { BsSearch } from 'react-icons/bs'
import { Link } from "@inertiajs/react";


const Search = () => {
  let [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [courses, setCourses] = useState([])
  const [isProcessing, setIsProcessing] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  useEffect(() => {
    if(!query || query.trim() === '') { setCourses([]); setIsProcessing(false); return; }
    setIsProcessing(true)
    const timeOutId = setTimeout(() => {
      console.log(query)
      fetch(`/search?q=${query}`)
      .then(res => res.json())
      .then(data => {
        setIsProcessing(false)
        setCourses(data)
      })
      .catch(e => console.log(e))
    }, 1000);
    return () => clearTimeout(timeOutId);
  }, [query])

  return (
    <>
        <button
            type="button"
            onClick={openModal}
            className="p-4 rounded-full h-full bg-violet-500 block hover:bg-violet-400 text-white"
            >
            <BsSearch />
        </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform overflow-hidden rounded-2xl bg-white p-10 text-right align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-700 text-center"
                  >
                    دنبال چی میگردی؟
                  </Dialog.Title>
                  <div className="mt-2">
                    <input value={query} onInput={e => setQuery(e.target.value)} type={'text'} className="focus:ring-0 w-full mb-3 focus:outline-none mt-3 border-violet-500 border-2 shadow-lg py-2 px-6 text-sm leading-5 text-gray-900 rounded-xl" placeholder="جست و جو..."/>
                    {
                      isProcessing &&
                        <div className="mb-3 w-full">
                          <svg className="animate-spin mx-auto h-8 w-8 text-violet-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                        </div>
                    }
                    {
                      courses.map(c => <SearchResultItem key={c.id} course={c}/>)
                    }
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

const SearchResultItem = (props) => {
  return (
    <Link href={`/course/${props.course.slug}`}>
      <div className="p-2 px-4 m-1 border-2 shadow-inner rounded-lg hover:bg-violet-300 transition-all">
        <div>{props.course.name}</div>
        <div className="text-gray-600 text-sm mt-1">{props.course.instructors.map((i, idx, is) => <span key={i.id}>{idx != 0 && ', '}{i.name}</span>)}</div>
      </div>
    </Link>
  )
}


export default Search