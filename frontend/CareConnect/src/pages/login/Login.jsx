import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Shield, User, Users } from "lucide-react";
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.role) {
      toast.warning("Selecciona un rol");
      return;
    }

    if (!form.email || !form.password) {
      toast.warning("Completa todos los campos");
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Icono superior */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
            <Shield className="text-white" size={28} />
          </div>
        </div>

        {/* Título */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">CareConnect</h1>
          <p className="text-sm text-gray-500 pt-2">
            Sistema de Gestión de Cuidados
          </p>
        </div>

        {/* Selector Rol */}
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2 mt-[-9px]">
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

        {/* Texto ejemplo */}
        <p className="text-center text-gray-400 text-sm">Lorem ipsum</p>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm text-gray-700">Correo Electrónico</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Correo@gmail.com"
                className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between text-sm">
              <label className="text-gray-700">Contraseña</label>
              <span className="text-indigo-600 cursor-pointer hover:underline">
                ¿olvidaste tu contraseña?
              </span>
            </div>

            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                placeholder="********"
                className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold
              bg-gradient-to-r from-indigo-500 to-purple-600
              hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Nota inferior */}
        <p className="text-xs text-center text-gray-400">
          Nota: para crear una cuenta se necesita contactar con un administrador
        </p>
      </div>
    </div>
  );
};

export default Login;
