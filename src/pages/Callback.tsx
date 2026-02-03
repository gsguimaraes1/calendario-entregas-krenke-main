import { useHandleSignInCallback } from '@logto/react';
import { useNavigate } from 'react-router-dom';

const Callback = () => {
    const navigate = useNavigate();
    const { isLoading } = useHandleSignInCallback(() => {
        // Navigate to root after sign-in
        navigate('/');
    });

    if (isLoading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#2563eb] mx-auto mb-4"></div>
                    <p className="text-white text-xl font-bold">Finalizando login...</p>
                </div>
            </div>
        );
    }

    return null;
};

export default Callback;
