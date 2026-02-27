import { useState } from "react";
import { Mail, ArrowLeft, Shield, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateEmail(email);

    if (!isValid) {
      toast.error("Revisa el correo electrónico");
      return;
    }

    try {
      setLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Se enviaron instrucciones a tu correo 📩");
      setEmail("");
      setError("");
    } catch {
      toast.error("Ocurrió un error");
    } finally {
      setLoading(false);
    }
  };
  const [error, setError] = useState("");
  const validateEmail = (value) => {
    let message = "";

    if (!value) {
      message = "Debe ingresar correo";
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      message = "Correo inválido";
    }

    setError(message);
    return message === "";
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
        {/* Icono superior */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-xl">
            <Shield className="text-white" size={28} />
          </div>
        </div>
        {/* Título */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Recuperar contraseña
          </h1>
          <p className="text-xs text-gray-500 pt-2">
            Por favor ingresa tu correo electrónico
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs text-gray-700 font-medium">
              Correo Electrónico
            </label>

            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 text-gray-400" size={18} />

              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className={`w-full h-10 text-sm pl-10 pr-4 py-2 rounded-xl focus:outline-none focus:ring-1 transition-all ${
                  error
                    ? "bg-red-50 border border-red-500 focus:ring-red-500"
                    : "bg-gray-200 border border-transparent focus:ring-indigo-500"
                }`}
                value={email}
                onChange={(e) => {
                  const value = e.target.value;
                  setEmail(value);
                  validateEmail(value);
                }}
                onBlur={(e) => validateEmail(e.target.value)}
              />
            </div>

            <p className="text-xs mt-1 min-h-[18px] text-red-500 transition-all">
              {error}
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl text-white text-xs font-semibold bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-90 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              "Enviando..."
            ) : (
              <>
                <Send size={18} />
                Enviar instrucciones
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
