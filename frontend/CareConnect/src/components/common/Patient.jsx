const Patient = ({ name, age, estable, isActive, onClick, rol = "family" }) => {
    let info;
    if (!estable) {
        info = {
            circle: "bg-green-500",
            text: "Estable",
        };
    } else {
        info = {
            circle: "bg-yellow-500",
            text: "Requiere Atencion",
        };
    }

    const getHoverClass = () => {
        return rol === "family" ? "bg-page-family-hover border-page-family" : "bg-page-caregivers-hover border-page-caregivers";
    };

    const getBgClass = () => {
        return isActive ? getHoverClass() : "bg-bg-tertiary border-transparent";
    };

    return (
        <li
            className={`p-5 ${getBgClass()} mb-3 rounded-xl text-f-secondary hover:${getHoverClass()} border-2 transition-all`}
            onClick={onClick}
        >
            <h4 className="text-base text-f-primary font-heading">{name}</h4>
            <p className="text-sm font-body">{age} años</p>
            <div className="mt-2 flex items-baseline gap-1">
                <div
                    className={`${info.circle} w-2 h-2  rounded-sm font-body`}
                ></div>
                <p className="text-xs font-f-secundray font-body">
                    {info.text}
                </p>
            </div>
        </li>
    );
};
export default Patient;
