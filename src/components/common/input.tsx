const Input = ({ label, name, type, placeholder, register, error }: { label?: string, name: string, type: string, placeholder: string, register: any, error?: string }) => {
    return (
        <div>
            {label && <label className="block text-gray-700 mb-1">{label}</label>}
            <input
                className="w-full p-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-100"
                type={type}
                name={name}
                placeholder={placeholder}
                {...register(name)}
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
        </div>
    );
};

export default Input;