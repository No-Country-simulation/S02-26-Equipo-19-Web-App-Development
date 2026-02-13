const COLOR_VARIANTS = {
    login: "bg-page-login focus:ring-page-login",
    caregivers: "bg-page-caregivers focus:ring-page-caregivers",
    admin: "bg-page-admin focus:ring-page-admin",
    danger: "bg-red-500 focus:ring-red-500",

}

const Button = ({
    children,
    onClick,
    className = "",
    variant = login,
    icon = null,
    type = "button",
}) => {

    const baseStyles =
        `font-body text-bg-primary font-medium py-4 px-2 rounded-lg
     inline-flex items-center justify-center gap-2 focus:ring-4 focus:ring-offset-2
     hover:brightness-90 transition-all duration-200 ease-in-out`

    const colorStyles = COLOR_VARIANTS[variant] || COLOR_VARIANTS["page-login"]

    return (
        <button
            className={`${baseStyles} ${colorStyles} ${className}`}
            onClick={onClick}
            type={type}
        >
            {icon && <span>{icon}</span>}
            {children}
        </button>
    )
}

export default Button