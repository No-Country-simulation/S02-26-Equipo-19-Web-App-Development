const Input = ({
    type = 'text',
    placeholder,
    value,
    onChange,
    className = ''
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className={`
        w-full px-4 py-4 rounded-lg border border-border
        bg-bg-secondary text-f-primary font-body
        placeholder:text-f-secondary
        focus:outline-none focus:ring-2 focus:ring-page-login focus:border-transparent
        transition-all duration-200
        ${className}
      `}
        />
    );
};

export default Input;