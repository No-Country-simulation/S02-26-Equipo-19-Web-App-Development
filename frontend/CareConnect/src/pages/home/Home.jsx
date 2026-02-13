import { useState } from 'react';
import { ShieldCheck, User, Users, LogIn } from 'lucide-react';
import LogoHome from './components/LogoHome';
import RoleCard from './components/RoleCard';
import Input from '../../components/common/Input';
import Link from '../../components/common/Link';
import Button from '../../components/common/Button';

const Home = () => {
    const [selectedRole, setSelectedRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const roles = [
        { id: 'admin', label: 'Admin', icon: <ShieldCheck size={32} /> },
        { id: 'cuidador', label: 'Cuidador', icon: <User size={32} /> },
        { id: 'familia', label: 'Familia', icon: <Users size={32} /> }
    ];

    const handleLogin = () => {
        console.log('Login attempt:', { selectedRole, email, password });
    };

    return (
        <div className="min-h-screen bg-bg-primary flex items-center justify-center px-4 py-8">
            <div className="w-full max-w-md bg-bg-secondary rounded-3xl shadow-lg p-8">
                {/* Logo and Title */}
                <div className="flex flex-col items-center mb-8">
                    <LogoHome size="lg" />
                    <h1 className="font-heading text-3xl font-bold text-f-primary mt-4">
                        CareConnect
                    </h1>
                    <p className="font-body text-f-secondary mt-2">
                        Sistema de Gestión de Cuidados
                    </p>
                </div>

                {/* Role Selection */}
                <div className="mb-6">
                    <h2 className="font-body text-f-primary font-semibold mb-4">
                        Seleccionar Rol
                    </h2>
                    <div className="grid grid-cols-3 gap-3">
                        {roles.map((role) => (
                            <RoleCard
                                key={role.id}
                                icon={role.icon}
                                label={role.label}
                                isSelected={selectedRole === role.id}
                                onClick={() => setSelectedRole(role.id)}
                            />
                        ))}
                    </div>
                </div>

                {/* Lorem ipsum placeholder */}
                <p className="text-center text-f-secondary text-sm mb-6">
                    Lorem impsu
                </p>

                {/* Email Input */}
                <div className="mb-4">
                    <label className="font-body text-f-primary font-medium block mb-2">
                        Correo Electrónico
                    </label>
                    <Input
                        type="email"
                        placeholder="Correo@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="mb-6">
                    <div className="flex justify-between  items-center mb-2">
                        <label className="font-body text-f-primary font-medium">
                            Contraseña
                        </label>
                        <Link href="#" className='text-right'>¿olvidaste tu contraseña?</Link>
                    </div>
                    <Input
                        type="password"
                        placeholder="***********"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Login Button */}
                <Button
                    variant="login"
                    onClick={handleLogin}
                    icon={<LogIn size={20} />}
                    className="w-full"
                >
                    Iniciar Sesión
                </Button>

                {/* Footer Note */}
                <p className="text-center text-f-secondary text-xs mt-6">
                    Nota: para crear una cuenta se necesita contactar con el administrador
                </p>
            </div>
        </div>
    );
};

export default Home;