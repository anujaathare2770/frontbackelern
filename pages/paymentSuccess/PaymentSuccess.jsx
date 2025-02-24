// import React from 'react';
// import './paymentSuccess.css';
// import { Link, useParams } from 'react-router-dom';

// const PaymentSuccess = ({ user }) => {
//     const params = useParams();
//     return (
//       <div className="payment-success-page">
//         {user && (
//           <div className="success-message">
//             <h2>Payment successful</h2>
//             <p>Your course subscription has been activated</p>
//             <p>Reference no - {params.id}</p>
//             <Link to={`/${user._id}/dashboard`} className="common-btn">
//               Go to Dashboard
//             </Link>
//           </div>
//         )}
//       </div>
//     );
//   };
  

// export default PaymentSuccess
import React from 'react';
import './paymentSuccess.css';
import { Link, useParams } from 'react-router-dom';

const PaymentSuccess = ({ user }) => {
    const params = useParams();

    if (!user) {
        return (
            <div className="payment-success-page">
                <div className="error-message">
                    <h2>Payment Successful, but user data is missing!</h2>
                    <p>Please log in again to access your dashboard.</p>
                    <Link to="/login" className="common-btn">Login</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="payment-success-page">
            <div className="success-message">
                <h1>Payment Successful 🎉</h1>
                <p>Your course subscription has been activated.</p>
                {params.id ? <p>Reference No: <strong>{params.id}</strong></p> : <p>Reference No: Not Available</p>}
                <Link to={`/${user._id}/dashboard`} className="common-btn">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;
