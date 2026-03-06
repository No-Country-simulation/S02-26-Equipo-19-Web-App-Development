const Link = ({ href = '#', children, className = '' }) => {
    return (
        <a
            href={href}
            className={`
        font-body text-page-login hover:underline
        transition-all duration-200
        ${className}
      `}
        >
            {children}
        </a>
    );
};

export default Link;