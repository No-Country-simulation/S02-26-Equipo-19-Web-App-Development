import { LogOut } from "lucide-react";
import IconRol from "./../common/IconRol"
const Header = ({role}) => {
    const portalRol = {
        family:"familiar",
        admin:"de admin",
        caregivers:"cuidadores",
    }
    return(
        <header className="bg-bg-secondary border-b border-border sticky top-0 z-10 shadow-sm">
            <div className="max-w-full px-8 py-6 flex items-center justify-between">
                <div className="gap-3 flex items-center">
                    <div className={`w-10 h-10 bg-page-${role} flex items-center justify-center rounded-lg`}>
                        <IconRol rol={role}/>
                    </div>
                    <div>
                        <h2 className="font-heading text-f-primary text-base font-semibold">CareConnect</h2>
                        <p className="font-body text-f-secondary text-sm">portal {portalRol[role]}</p>
                    </div>
                </div>
                <div className="p-1 flex items-center gap-2 text-f-secondary rounded-lg cursor-pointer hover:bg-border hover:text-f-primary transition-all">
                    <LogOut className=" w-6  sm:w-4"/>
                    <p className="font-semibold hidden sm:block ">Cerrar Sesion</p>
                </div>
            </div>
        </header>
    )
}
export default Header;
