import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Shield,
  User,
  Users,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react";
import { toast } from "react-toastify";
import { useAuthStore } from "../../store/authStore";
import { ROLES } from "../../constants/roles";

const roleIcons = {
  Admin: Shield,
  Cuidador: User,
  Familia: Users,
};

const Login = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuthStore();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    validateField("email", form.email);
    validateField("password", form.password);

    if (!form.role) {
      toast.warning("Selecciona un rol");
      return;
    }

    if (errors.email || errors.password || !form.email || !form.password) {
      toast.error("Revisa los campos del formulario");
      return;
    }

    const response = await login(form);

    if (response.success) {
      toast.success("Bienvenido 👋");

      switch (form.role) {
        case ROLES.ADMIN:
          navigate("/admin");
          break;
        case ROLES.CAREGIVER:
          navigate("/caregiver");
          break;
        case ROLES.PATIENT:
          navigate("/patient");
          break;
      }
    } else {
      toast.error("Credenciales incorrectas");
    }
  };
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const validateField = (name, value) => {
    let message = "";

    if (!value) {
      message = "Este campo es obligatorio";
    } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
      message = "Correo inválido";
    } else if (name === "password" && value.length < 6) {
      message = "Mínimo 6 caracteres";
    }

    setErrors((prev) => ({
      ...prev,
      [name]: message,
    }));
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-4">
        {/* Icono superior */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
            <Shield className="text-white" size={28} />
          </div>
        </div>

        {/* Título */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">CareConnect</h1>
          <p className="text-[12px] text-gray-500 py-2">
            Sistema de Gestión de Cuidados
          </p>
        </div>

        {/* Selector Rol */}
        <div>
          <p className="text-xs font-medium text-gray-700 mb-2 mt-[-9px]">
            Seleccionar Rol
          </p>

          <div className="grid grid-cols-3 gap-2">
            {Object.values(ROLES).map((role) => {
              const Icon = roleIcons[role] || User;

              return (
                <button
                  key={role}
                  type="button"
                  onClick={() => setForm({ ...form, role })}
                  className={`flex flex-col items-center justify-center py-3 rounded-xl border text-sm transition-all
                    ${
                      form.role === role
                        ? "bg-white border-indigo-500 shadow text-indigo-600"
                        : "bg-white border-gray-300 text-gray-600 hover:border-indigo-400"
                    }`}
                >
                  <Icon size={18} className="mb-1" />
                  {role}
                </button>
              );
            })}
          </div>
        </div>
        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-2">
          {/* Email */}
          <div>
            <label className="text-xs text-gray-700 font-medium">
              Correo Electrónico
            </label>

            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className={`w-full h-10 pl-10 pr-4 text-sm rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                  errors.email
                    ? "bg-red-50 border-red-500 focus:ring-red-500"
                    : "bg-gray-200 border-transparent focus:ring-indigo-500"
                }`}
                value={form.email}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm({ ...form, email: value });
                  validateField("email", value);
                }}
                onBlur={(e) => validateField("email", e.target.value)}
              />
            </div>

            <p className="text-xs mt-1 min-h-[18px] text-red-500 transition-all">
              {errors.email}
            </p>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between text-sm">
              <label className="text-gray-700 font-medium text-xs">
                Contraseña
              </label>
              <div>
                <span
                  onClick={() => navigate("/forgot-password")}
                  className="text-indigo-600 cursor-pointer hover:underline text-xs"
                >
                  ¿Olvidaste tu contraseña?
                </span>
              </div>
            </div>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className={`w-full h-10 text-sm pl-10 pr-10 py-2 rounded-xl border focus:outline-none focus:ring-1 transition-all ${
                  errors.password
                    ? "bg-red-50 border-red-500 focus:ring-red-500"
                    : "bg-gray-200 border-transparent focus:ring-indigo-500"
                }`}
                value={form.password}
                onChange={(e) => {
                  const value = e.target.value;
                  setForm({ ...form, password: value });
                  validateField("password", value);
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-indigo-600 transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <p className="text-xs mt-1 min-h-[18px] text-red-500 transition-all">
              {errors.password}
            </p>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-xs text-white font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              "Ingresando..."
            ) : (
              <>
                <LogIn size={18} />
                Iniciar Sesión
              </>
            )}
          </button>
        </form>

        {/* Nota inferior */}
        <p className="text-xs text-center text-gray-400 font-style: italic">
          Nota: solo el administrador puede crear cuentas
        </p>
      </div>
    </div>
  );
};

export default Login;
