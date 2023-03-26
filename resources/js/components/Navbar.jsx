import React, {useState} from "react";
import Search from "./Search";
import Topics from "./Topics";
import { Link, usePage } from '@inertiajs/react'


const Navbar = () => {
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const {auth, hasPlus} = usePage().props

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
        <Link href="/">
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
            <ul className="pt-4 text-base text-gray-700 md:flex md:justify-between md:pt-0 items-center">
                {
                    auth ?
                    <>
                        {
                            hasPlus ?
                            <li><Link href="/plus" className="m-1 md:p-2 py-2 block text-sm border-2 border-green-300 rounded-lg hover:bg-green-400 bg-green-500 text-white">پلاس فعال</Link></li>
                            :
                            <li><Link href="/plus" className="m-1 md:p-2 py-2 block text-sm border-2 border-red-300 rounded-lg hover:bg-red-400 bg-red-500 text-white">پلاس غیرفعال</Link></li>
                        }
                        <li><Topics /></li>
                        <li><Link href="/my-account/courses" className="md:p-4 py-2 block hover:text-violet-500 hover:shadow-xl">دوره های من</Link></li>
                        <li><Link href="/my-account" className="md:p-4 py-2 block hover:text-violet-500 hover:shadow-xl">تنظیمات</Link></li>
                        <li><Link as="button" href="/logout" method="post" className="md:p-4 py-2 block hover:text-violet-500 hover:shadow-xl">خروج</Link></li>
                    </>
                    :
                    <>
                        <li><Topics /></li>
                        <li><Link href="/login" className="md:p-4 py-2 block hover:text-violet-500 hover:shadow-xl">ورود</Link></li>
                        <li><Link href="/register" className="md:p-4 py-2 block hover:text-violet-500 hover:shadow-xl">ثبت نام</Link></li>
                    </>
                }
                <li>
                    <Search />
                </li>
            </ul>
        </div>
    </nav>
  );
}

export default Navbar;
