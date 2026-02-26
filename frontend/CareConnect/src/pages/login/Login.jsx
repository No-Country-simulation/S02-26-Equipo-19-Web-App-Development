import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { ROLES } from "../../constants/roles";
import Input from "../../components/common/Input";
import Button from "../../components/common/Button";

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

    const response = await login(form);

    if (response.success) {
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
      alert("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        {/* Selector de Rol */}
        <div className="flex justify-between">
          {Object.values(ROLES).map((role) => (
            <button
              type="button"
              key={role}
              onClick={() => setForm({ ...form, role })}
              className={`px-4 py-2 rounded ${
                form.role === role ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {role}
            </button>
          ))}
        </div>

        <Input
          type="email"
          placeholder="Correo electrónico"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Input
          type="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Ingresando..." : "Iniciar Sesión"}
        </Button>
      </form>
    </div>
  );
};

export default Login;
