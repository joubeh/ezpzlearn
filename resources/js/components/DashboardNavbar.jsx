import React, {useState} from "react";
import { Link, usePage } from '@inertiajs/react'


const DashboardNavbar = () => {
  const {isAdmin} = usePage().props
  const [isMenuOpened, setIsMenuOpened] = useState(false);

  return (
    <nav
        className="
        flex flex-wrap
        items-center
        justify-between
        w-full
        py-4
        md:py-0
        px-4
        text-lg text-gray-700
        bg-white
        shadow-xl
        "
    >
    <div>
        <Link href="/dashboard">
            PLACE APP LOGO AND NAME
        </Link>
        </div>
    
        <svg
            xmlns="http://www.w3.org/2000/svg"
            onClick={e => setIsMenuOpened(!isMenuOpened)}
            className="h-6 w-6 cursor-pointer md:hidden block"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
            />
        </svg>
    
        <div className={`${!isMenuOpened && 'hidden'} w-full md:flex md:items-center md:w-auto`}>
            <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0">
                <li><Link href="/dashboard/courses" className="md:p-4 py-2 block hover:text-violet-500 hover:shadow-xl">دوره ها</Link></li>
                {isAdmin && <li><Link href="/dashboard/users" className="md:p-4 py-2 block hover:text-violet-500 hover:shadow-xl">کاربران</Link></li>}
                <li><Link href="/dashboard/comments" className="md:p-4 py-2 block hover:text-violet-500 hover:shadow-xl">کامنت ها</Link></li>
                {/* <li><Link href="#" className="md:p-4 py-2 block hover:text-violet-500 hover:shadow-xl"></Link></li> */}
                <li><Link as="button" href="/logout" method="post" className="md:p-4 py-2 block hover:text-violet-500 hover:shadow-xl">خروج</Link></li>
            </ul>
        </div>
    </nav>
  );
}

export default DashboardNavbar;
