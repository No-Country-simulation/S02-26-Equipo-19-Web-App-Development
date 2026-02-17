import IconRol from "./../common/IconRol";
import LogOutButton from "./../common/LogOutButton"
const Header = ({ rol }) => {
    const portalRol = {
        family: "Familiar",
        admin: "Administrador",
        caregivers: "Cuidador",
    };
    return (
        <header className="bg-bg-secondary border-b border-border sticky top-0 z-10 shadow-sm">
            <div className="max-w-full px-8 py-6 flex items-center justify-between">
                <div className="gap-3 flex items-center">
                    <div
                        className={`w-10 h-10 bg-page-${rol} flex items-center justify-center rounded-lg`}
                    >
                        <IconRol rol={rol} />
                    </div>
                    <div>
                        <h2 className="font-heading text-f-primary text-base font-semibold">
                            CareConnect
                        </h2>
                        <p className="font-body text-f-secondary text-sm">
                            Portal {portalRol[rol]}
                        </p>
                    </div>
                </div>
                <LogOutButton />
            </div>
        </header>
    );
};
export default Header;
