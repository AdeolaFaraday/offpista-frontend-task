const Select = ({ label, name, options, register, error }: { label?: string, name: string, options: { label: string, value: string }[], register: any, error?: string }) => {
    return (
        <select className="flex-1 w-full p-3 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-gray-100" name={name} {...register(name)}>
            {options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
    );
};

export default Select;