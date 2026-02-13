import { ShieldPlus } from 'lucide-react';

const LogoHome = ({ size = 'md' }) => {
    const sizeClasses = {
        sm: 'w-12 h-12',
        md: 'w-16 h-16',
        lg: 'w-24 h-24'
    };

    const iconSizes = {
        sm: 24,
        md: 32,
        lg: 48
    };

    return (
        <div className={`${sizeClasses[size]} bg-page-login rounded-2xl flex items-center justify-center`}>
            <ShieldPlus className="text-bg-primary" size={iconSizes[size]} strokeWidth={2.5} />
        </div>
    );
};

export default LogoHome;