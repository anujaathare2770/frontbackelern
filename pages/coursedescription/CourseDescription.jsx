// import React, { useEffect, useState } from 'react';
// import './courseDescription.css';
// import { useNavigate, useParams } from 'react-router-dom';
// import { CourseData } from '../../context/CourseContext';
// import {server} from '../../main';
// import axios from 'axios';
// import toast from 'react-hot-toast';
// import { UserData } from '../../context/UserContext';
// import Loading from '../../components/loading/Loading';

// const CourseDescription = ({user}) => {
//     const params =useParams();
    
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const {fetchUser} = UserData()

//     const {fetchCourse, course, fetchCourses, fetchMyCourse} =CourseData();

//     useEffect(()=>{
//         fetchCourse(params.id);
//     },[]);

//     const checkoutHandler = async () => {
//       const token = localStorage.getItem("token");
//       setLoading(true);
  
//       try {
//           // Fetch the order details
//           const { data: { order } } = await axios.post(
//               `${server}/api/course/checkout/${params.id}`,
//               {},
//               { headers: { token } }
//           );
  
//           // Check if Razorpay SDK is loaded
//           if (!window.Razorpay) {
//               toast.error("Razorpay SDK not loaded. Please refresh and try again.");
//               setLoading(false);
//               return;
//           }
  
//           const options = {
//               key: "rzp_test_1vxmdhYZZLxudz", // Replace with actual Razorpay key
//               amount: order.amount, // Amount in paise (Fix: `order.amount` instead of `order.id`)
//               currency: "INR",
//               name: "E-learning",
//               description: "Learn with us",
//               order_id: order.id, // Correctly referencing order ID
//               handler: async function (response) {
//                   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = response;
  
//                   try {
//                       const { data } = await axios.post(
//                           `${server}/api/course/payment/verify/${params.id}`,
//                           { razorpay_order_id, razorpay_payment_id, razorpay_signature },
//                           { headers: { token } }
//                       );
  
//                       await fetchUser();
//                       await fetchCourses();
//                       await fetchMyCourse();
//                       toast.success(data.message);
//                       navigate(`/payment-success/${razorpay_payment_id}`);
//                   } catch (error) {
//                       toast.error(error.response?.data?.message || "Payment verification failed.");
//                   } finally {
//                       setLoading(false);
//                   }
//               },
//               theme: { color: "#3cd3f9" },
//           };
  
//           const razorpay = new window.Razorpay(options);
//           razorpay.open();
//       } catch (error) {
//           toast.error("Error during checkout. Please try again.");
//           setLoading(false);
//       }
//   };
  

//   return (
//     <>
//       {loading ?( <Loading/>)
//       :(
//         <>
//         {course && (<div className='course-description'>
//             <div className='course-header'>
//             <img
//                   src={`${server}/${course.image}`}
//                   alt=""
//                   className="course-image"
//                 />
//                 <div className='course-info'>
//                     <h2>{course.title}</h2>
//                     <p>Instructor:{course.createdBy}</p>
//                     <p>Duration:{course.duration} weeks</p>
//                 </div>
                
//             </div>
//             <p>{course.description}</p>
//             <p>Let's get started with this course At ₹{course.price}</p>
//                  {
//                     user && user.subscription.includes(course._id) ?
//                     (<button onClick={()=>navigate(`/course/study/${course._id}`)} className='common-btn'>Study</button>) :
//                     (<button onClick={checkoutHandler} className='common-btn'>Buy Now</button>)
//                  }
//         </div>)}
//     </>
//       )}
//     </>
//   )
// }

// export default CourseDescription;




import React, { useEffect, useState } from 'react';
import './courseDescription.css';
import { useNavigate, useParams } from 'react-router-dom';
import { CourseData } from '../../context/CourseContext';
import { server } from '../../main';
import axios from 'axios';
import toast from 'react-hot-toast';
import { UserData } from '../../context/UserContext';
import Loading from '../../components/loading/Loading';

const CourseDescription = ({ user }) => {
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { fetchUser } = UserData();
    const { fetchCourse, course, fetchCourses, fetchMyCourse } = CourseData();

    useEffect(() => {
        fetchCourse(params.id);
    }, []);

    const checkoutHandler = async () => {
        const token = localStorage.getItem("token");
        setLoading(true);
    
        try {
            // Create Razorpay Order
            const { data: { order } } = await axios.post(
                `${server}/api/course/checkout/${params.id}`,
                {},
                { headers: { token } }
            );
    
            if (!window.Razorpay) {
                toast.error("Razorpay SDK not loaded. Refresh and try again.");
                setLoading(false);
                return;
            }
    
            // Razorpay options
            const options = {
                key: "rzp_test_1vxmdhYZZLxudz",
                amount: order.amount,
                currency: "INR",
                name: "E-learning",
                description: "Learn with us",
                order_id: order.id,
                handler: async function (response) {
                    toast.success("Payment successful!");
    
                    // ✅ Fetch Updated User & Courses
                    await fetchUser();
                    await fetchCourses();
                    await fetchMyCourse(); // ✅ Ensure this updates the dashboard
    
                    // Redirect to success page
                    navigate(`/payment-success/${response.razorpay_payment_id}`);
                },
                prefill: {
                    name: user?.name || "Test User",
                    email: user?.email || "test@example.com",
                    contact: "9999999999",
                },
                theme: { color: "#3cd3f9" },
            };
    
            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error("Checkout Error:", error);
            toast.error("Error during checkout. Please try again.");
            setLoading(false);
        }
    };
    

    return (
        <>
            {loading ? <Loading /> : (
                <>
                    {course && (
                        <div className='course-description'>
                            <div className='course-header'>
                                <img src={`${server}/${course.image}`} alt="" className="course-image" />
                                <div className='course-info'>
                                    <h2>{course.title}</h2>
                                    <p>Instructor: {course.createdBy}</p>
                                    <p>Duration: {course.duration} weeks</p>
                                </div>
                            </div>
                            <p>{course.description}</p>
                            <p>Let's get started with this course at ₹{course.price}</p>
                            {
                                user && user.subscription.includes(course._id) ?
                                    (<button onClick={() => navigate(`/course/study/${course._id}`)} className='common-btn'>Study</button>) :
                                    (<button onClick={checkoutHandler} className='common-btn'>Buy Now</button>)
                            }
                        </div>
                    )}
                </>
            )}
        </>
    );
}

export default CourseDescription;
