import React, {Fragment} from "react"
import { Menu, Transition } from '@headlessui/react'
import { usePage, Link } from "@inertiajs/react"

const Topics = () => {
    const {topics} = usePage().props

    return (
<Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="md:p-4 py-2 block hover:text-violet-500 hover:shadow-xl">
            دوره ها
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="z-50 absolute right-0 mt-2 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1 ">
              {
                topics.map(topic => {
                  return (
                    <Link href={`/courses?topic=${topic.name}`} key={topic.id}>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            className={`${
                              active ? 'bg-violet-500 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {topic.name}
                          </button>
                        )}
                      </Menu.Item>
                    </Link>
                  )
                })
              }
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    )
}

export default Topics