import axios from "axios";
import { server } from "../main";
import { createContext, useContext, useEffect, useState } from "react";

const CourseContext =createContext();

export const CourseContextProvider =({children}) =>{
    const [courses, setCourses] = useState([]);
    const [course, setCourse] = useState([]);
    const [mycourse, setMyCourse]= useState([]);

    async function fetchCourses() {
        try {
            const {data} = await axios.get(`${server}/api/course/all`);
        
            setCourses(data.courses);
        } catch (error) {
            console.log(error);
        }
    }

    async function fetchCourse(id) {
        try {
            const {data} = await axios.get(`${server}/api/course/${id}`);
            setCourse(data.course);
        } catch (error) {
            console.log(error);
        }
    }
    async function fetchMyCourse() {
        try {
            const { data } = await axios.get(`${server}/api/mycourse`, {
                headers: { token: localStorage.getItem("token") },
            });
    
            console.log("📥 API Response:", data);  // ✅ Debug Log
            setMyCourse(data.courses);
        } catch (error) {
            console.error(" Error fetching enrolled courses:", error);
        }
    }
    
    

    useEffect(() => {
        fetchCourses();
        fetchMyCourse();
    }, []);
    
    useEffect(() => {
        console.log("✅ Updated My Courses State:", mycourse);
    }, [mycourse]);  // ✅ Logs every time `mycourse` changes
    
    return (<CourseContext.Provider value={{courses, fetchCourses,fetchCourse, course,mycourse, fetchMyCourse}}>
    {children}</CourseContext.Provider>);
}

export const CourseData= () => useContext(CourseContext);