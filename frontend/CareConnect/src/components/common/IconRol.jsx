import { Activity, Shield, Heart } from "lucide-react";

const IconRol = ({rol}) =>{
    const rolIcon = {
        caregivers: Activity,
        admin: Shield,
        family: Heart
    }
    const Icon = rolIcon[rol]
    return Icon ? <Icon className="w-6 h-6 text-white"/> :null;
}
export default IconRol