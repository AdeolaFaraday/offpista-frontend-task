import { Loader } from "lucide-react";

const Button = ({ children, onClick, disabled, loading, type = 'button' }: { children: React.ReactNode, onClick?: () => void, disabled?: boolean, loading?: boolean, type?: 'button' | 'submit' | 'reset' }) => {
    return <button
        onClick={onClick || (() => { })}
        type={type}
        disabled={disabled || loading}
        className="w-full bg-blue-600 text-white py-3 flex items-center justify-center rounded-2xl font-semibold shadow-md hover:bg-blue-700 transition"
    >
        {loading ? <Loader className="animate-spin" /> : children}
    </button>;
};

export default Button;