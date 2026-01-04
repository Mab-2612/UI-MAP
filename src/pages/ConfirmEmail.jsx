import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const ConfirmEmail = () => {
    const { token } = useParams(); // Get token from URL
    const navigate = useNavigate();
    const [status, setStatus] = useState('loading'); // loading, success, error

    useEffect(() => {
        const verifyAccount = async () => {
            try {
                // Call backend endpoint (You need to create this in Step 4 below)
                const res = await fetch(`http://localhost:5000/api/auth/verify/${token}`);
                const data = await res.json();

                if (!res.ok) throw new Error(data.message);
                setStatus('success');
                
                // Redirect to login after 3 seconds
                setTimeout(() => navigate('/login'), 3000);

            } catch (err) {
                setStatus('error');
            }
        };

        verifyAccount();
    }, [token, navigate]);

    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-sm">
                {status === 'loading' && (
                    <>
                        <Loader2 size={48} className="animate-spin text-blue-600 mx-auto mb-4" />
                        <h2 className="text-xl font-bold">Verifying your email...</h2>
                    </>
                )}
                {status === 'success' && (
                    <>
                        <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-green-600">Verified!</h2>
                        <p className="text-gray-500 mt-2">Redirecting you to login...</p>
                    </>
                )}
                {status === 'error' && (
                    <>
                        <XCircle size={48} className="text-red-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-red-600">Verification Failed</h2>
                        <p className="text-gray-500 mt-2">Link may be invalid or expired.</p>
                    </>
                )}
            </div>
        </div>
    );
};

export default ConfirmEmail;