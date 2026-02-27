import { useState, useEffect } from "react";
import { Lock } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [validToken, setValidToken] = useState(true);

  useEffect(() => {
    if (!token) {
      setValidToken(false);
      toast.error("Token inválido o expirado");
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.password || !form.confirmPassword) {
      toast.warning("Completa todos los campos");
      return;
    }

    if (form.password.length < 6) {
      toast.warning("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    if (form.password !== form.confirmPassword) {
      toast.error("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Contraseña actualizada correctamente 🔐");
      navigate("/");
    } catch {
      toast.error("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  if (!validToken) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Enlace inválido o expirado
          </h2>
          <button
            onClick={() => navigate("/forgot-password")}
            className="mt-4 text-indigo-600 hover:underline"
          >
            Solicitar nuevo enlace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Nueva contraseña</h1>
          <p className="text-sm text-gray-500 pt-2">
            Ingresa tu nueva contraseña
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password */}
          <div>
            <label className="text-sm text-gray-700">Nueva contraseña</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm text-gray-700">
              Confirmar contraseña
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="password"
                className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={form.confirmPassword}
                onChange={(e) =>
                  setForm({ ...form, confirmPassword: e.target.value })
                }
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold
              bg-gradient-to-r from-indigo-500 to-purple-600
              hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "Actualizando..." : "Actualizar contraseña"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
