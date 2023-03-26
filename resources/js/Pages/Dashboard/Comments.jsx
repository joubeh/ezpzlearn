import { usePage } from "@inertiajs/react";
import React from "react";
import DashboardLayout from "../../components/DashboardLayout";
import DashboardComment from "../../components/DashboardComment";


const Comments = () => {
    const {comments} = usePage().props

    return (
        <DashboardLayout>
            <div className="mb-3 text-lg">
                کامنت های جدید
            </div>
            {
                comments.length > 0 ?
                <>
                    {comments.map(comment => <DashboardComment key={comment.id} comment={comment}/>)}
                </>
                :
                <div>
                    کامنت جدیدی نداریم
                </div>
            }
        </DashboardLayout>
    )
}

export default Comments