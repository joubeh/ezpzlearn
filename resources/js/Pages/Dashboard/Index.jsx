import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import { Link, usePage } from '@inertiajs/react'


const Index = () => {
    const {isAdmin, newCommentsCount, usersCount, coursesCount, thisMonthPlusCount} = usePage().props

    return (
        <DashboardLayout>
            <div class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
                <div class="flex h-12 w-12 items-center justify-center rounded-full border border-blue-100 bg-blue-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                </div>

                <div class="mr-4">
                    <h2 class="font-semibold">{newCommentsCount} کامنت جدید</h2>
                    <p class="mt-2 text-sm text-gray-500">منتظرن تا کامنتشون تایید شه</p>
                </div>
                </div>

                <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
                <div class="flex h-12 w-12 items-center justify-center rounded-full border border-orange-100 bg-orange-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                </div>

                <div class="mr-4">
                    <h2 class="font-semibold">{usersCount} کاربر</h2>
                    <p class="mt-2 text-sm text-gray-500">تمام کاربرای برنامه</p>
                </div>
                </div>
                <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
                <div class="flex h-12 w-12 items-center justify-center rounded-full border border-red-100 bg-red-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>

                <div class="mr-4">
                    <h2 class="font-semibold">{coursesCount} دوره</h2>
                    <p class="mt-2 text-sm text-gray-500">کل دوره های موجود</p>
                </div>
                </div>
                <div class="flex items-start rounded-xl bg-white p-4 shadow-lg">
                <div class="flex h-12 w-12 items-center justify-center rounded-full border border-indigo-100 bg-indigo-50">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="currentColor" viewBox="0 0 16 16" id="IconChangeColor"> <path fill-rule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" id="mainIconPathAttribute" fill="green"></path> </svg>
                </div>

                <div class="mr-4">
                    <h2 class="font-semibold">{thisMonthPlusCount} پلاس در این ماه</h2>
                    <p class="mt-2 text-sm text-gray-500">اشتراک های پلاس که این ماه فروختیم</p>
                </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Index