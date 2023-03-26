import React, {useState, useEffect} from "react";
import { router, usePage } from "@inertiajs/react";
import DashboardLayout from "../../components/DashboardLayout";
import Select from 'react-select';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import NewTopic from "../../components/NewTopic";
import NewInstructor from "../../components/NewInstructor";
import ChangeCourseStatus from '../../components/ChangeCourseStatus'


const EditCourse = () => {
    const {topics, instructors, course, courseInstructors} = usePage().props
    const [topicsOptions, setTopicsOptions] = useState([]);
    const [instructorsOptions, setInstructorsOptions] = useState([]);
    const [description, setDescription] = useState(course.description);
    const [WYWL, setWYWL] = useState([]);
    const [WYWLItem, setWYWLItem] = useState('');
    const [isAddingTopic, setIsAddingTopic] = useState(false);
    const [isAddingInstructor, setIsAddingInstructor] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [selectedInstructors, setSelectedInstructors] = useState(null);

    useEffect(()=>{
        let TSP = [];
        let ISP = [];
        topics.forEach(topic => {
            TSP.push({
                value: topic.id,
                label: topic.name
            });
        });
        instructors.forEach(instructor => {
            ISP.push({
                value: instructor.id,
                label: instructor.name
            });
        });

        setTopicsOptions(TSP);
        setInstructorsOptions(ISP);

        TSP.forEach(item => {
            if(item.value === course.topic_id){
                setSelectedTopic(item);
            }
        })
        let SIS = []
        courseInstructors.forEach(item => {
            SIS.push({
                value: item.id, label: item.name
            })
        })
        setSelectedInstructors(SIS);
        const whatYouWillLearn = course.what_you_will_learn.split('(*|ezpz*|)')
        setWYWL(whatYouWillLearn)
    }, [topics, instructors]);

    const [values, setValues] = useState({
        name: course.name,
        slug: course.slug,
        summery: course.summery,
        language: course.language,
        image: course.image,
        preview_video: course.preview_video,
        course_link: course.course_link,
        publisher: course.publisher,
        level: course.level,
        stars: course.stars
    })

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    useEffect(() => {
        setValues(values => ({
            ...values,
            topic: selectedTopic,
        }))
    }, [selectedTopic])
    useEffect(() => {
        setValues(values => ({
            ...values,
            instructors: selectedInstructors,
        }))
    }, [selectedInstructors])
    useEffect(() => {
        setValues(values => ({
            ...values,
            description: description,
        }))
    }, [description])
    useEffect(() => {
        setValues(values => ({
            ...values,
            what_you_will_learn: WYWL,
        }))
    }, [WYWL])

    function handleSubmit(e) {
        e.preventDefault()
        router.post(`/dashboard/course/${course.id}/update`, values)
    }

    return (
        <DashboardLayout>
            <div className="mb-3 text-lg flex justify-between items-center">
                <div>ویرایش {course.name}</div>
                <div><ChangeCourseStatus course={course.id} status={course.status === 'available' ? true : false}/></div>
            </div>
            { isAddingTopic && <NewTopic cancel={setIsAddingTopic} /> }
            { isAddingInstructor && <NewInstructor cancel={setIsAddingInstructor} /> }
            <div className="bg-white rounded-lg shadow-lg mb-3">
                    <form onSubmit={handleSubmit}>
                        <div className="w-full p-8">
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">دسته</label>
                                <div className="grid grid-cols-6 gap-2">
                                    <Select
                                        className="col-span-5"
                                        defaultValue={selectedTopic}
                                        onChange={setSelectedTopic}
                                        options={topicsOptions}
                                        placeholder={'انتخاب کنید'}
                                        value={selectedTopic}
                                    />
                                    { !isAddingTopic && <div onClick={e => setIsAddingTopic(true)} className="bg-violet-500 text-center cursor-pointer text-white py-2 px-4 w-full rounded hover:bg-violet-400">دسته جدید</div> }
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">مدرسان</label>
                                <div className="grid grid-cols-6 gap-2">
                                    <Select
                                        className="col-span-5"
                                        defaultValue={selectedInstructors}
                                        onChange={setSelectedInstructors}
                                        options={instructorsOptions}
                                        isMulti={true}
                                        placeholder={'انتخاب کنید'}
                                        value={selectedInstructors}
                                    />
                                    { !isAddingInstructor && <div onClick={e => setIsAddingInstructor(true)} className="bg-violet-500 text-center cursor-pointer text-white py-2 px-4 w-full rounded hover:bg-violet-400">مدرس جدید</div> }
                                </div>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">نام</label>
                                <input id="name" value={values.name} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">اسلاگ</label>
                                <input id="slug" value={values.slug} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">خلاصه</label>
                                <input id="summery" value={values.summery} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                            </div>
                            <div className="mt-4" dir="ltr">
                                <label dir="rtl" className="block text-gray-700 text-sm font-bold mb-2">توضیحات</label>
                                <ReactQuill theme="snow" value={description} onChange={setDescription}/>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">زبان</label>
                                <input id="language" value={values.language} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">چه چیزهایی یاد میگیرید</label>
                                <div className="grid grid-cols-6 gap-2">
                                    <input value={WYWLItem} onChange={e => setWYWLItem(e.target.value)} className="col-span-5 bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text"/>
                                    <div onClick={e => { if(WYWLItem === '' || WYWLItem === null)return; setWYWL([...WYWL, WYWLItem]); setWYWLItem(''); }} className="bg-violet-500 text-center cursor-pointer text-white py-2 px-4 w-full rounded hover:bg-violet-400">افزودن</div>
                                </div>
                                <ul className="list-disc mr-8 mt-2">
                                    {WYWL.map(item => <li>{item}</li>)}
                                </ul>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">عکس</label>
                                <input id="image" value={values.image} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">پیشنمایش</label>
                                <input id="preview_video" value={values.preview_video} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">ناشر</label>
                                <input id="publisher" value={values.publisher} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">سایت دوره</label>
                                <input id="course_link" value={values.course_link} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">سطح</label>
                                <input id="level" value={values.level} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                            </div>
                            <div className="mt-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2">امتیاز</label>
                                <input id="stars" value={values.stars} onChange={handleChange} className="bg-violet-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="text" required/>
                            </div>
                            <div className="mt-8">
                                <button className="bg-violet-500 text-white font-bold py-2 px-4 w-full rounded hover:bg-violet-400">افزودن</button>
                            </div>
                        </div>
                    </form>
                </div>
        </DashboardLayout>
    )
}

export default EditCourse