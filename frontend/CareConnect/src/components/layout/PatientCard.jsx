import { Activity, CircleAlert } from "lucide-react";
const PatientCard = ({patient}) => {
    return (
        <div className="p-5 bg-bg-secondary border border-border rounded-lg flex items-center justify-between">
            <div>  
                <h3 className="text-2xl font-heading text-f-primary font-medium  ">{patient?.patientName || "Paciente"}</h3>
                <p className="mt-3 text-sm text-f-secondary flex items-baseline ">
                    <Activity size={14}/>
                    Estable
                </p>
            </div>
            
            <div className="p-1.5 text-main-alert bg-alert ">
                <CircleAlert />
            </div>
        </div>
    );
};

export default PatientCard;
