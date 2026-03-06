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

    const getFamilyClasses = () => {
        return "border-transparent hover:border-page-family";
    };

    const getCaregiverClasses = () => {
        return "border-transparent hover:border-page-caregivers";
    };

    const getBgClass = () => {
        return isActive ? "bg-bg-tertiary" : "bg-bg-secondary";
    };

    const getBorderClass = () => {
        return rol === "family" ? getFamilyClasses() : getCaregiverClasses();
    };

    return (
        <li
            className={`p-5 ${getBgClass()} mb-3 rounded-xl text-f-secondary border-2 ${getBorderClass()} transition-all cursor-pointer`}
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
