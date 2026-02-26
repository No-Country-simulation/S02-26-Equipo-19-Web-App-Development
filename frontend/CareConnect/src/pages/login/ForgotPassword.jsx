import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Ingresa tu correo electrónico");
      return;
    }

    try {
      setLoading(true);

      // 🔥 Aquí luego irá la llamada real al backend
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Se enviaron instrucciones a tu correo 📩");
      setEmail("");
    } catch {
      toast.error("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200 px-4">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg p-8 space-y-6">
        {/* Volver */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center text-sm text-indigo-600 hover:underline"
        >
          <ArrowLeft size={16} className="mr-1" />
          Volver al login
        </button>

        {/* Título */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Recuperar contraseña
          </h1>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-700">Correo Electrónico</label>

            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />
              <input
                type="email"
                placeholder="Correo@gmail.com"
                className="w-full pl-10 pr-4 py-2 bg-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            {loading ? "Enviando..." : "Enviar instrucciones"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
