import { LogOut } from "lucide-react";
// import { useNavigate } from "react-router-dom";
const LogOutButton = () => {
    // const navigate = useNavigate();
    // const hadleLogOut =  () =>{
    //     navigate("/login")
    // }
    return (
        <button
            className="p-1 flex items-center gap-2 text-f-secondary rounded-lg cursor-pointer hover:bg-border hover:text-f-primary transition-all"
            // onClick={hadleLogOut}
        >
            <LogOut className=" w-6  sm:w-4" />
            <p className="font-semibold hidden sm:block ">Cerrar Sesion</p>
        </button>
    );
};
export default LogOutButton;