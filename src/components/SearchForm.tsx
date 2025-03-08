import { useState } from "react";
import { useForm } from "react-hook-form";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import "../assets/css/minecraft-button.css";
import { MinecraftProfile } from "./MinecraftProfile";

type FormData = {
  username: string;
};

export function SearchForm() {
  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: "onChange",
  });

  const onSubmit = async (data: FormData) => {
    setError(null);
    setUserData(null);
    setLoading(true);

    try {
        const response = await fetch(`https://mojang-api-pi.vercel.app/mojang/${data.username}`);

        if (!response.ok) {
            throw new Error('Usuario no encontrado');
        };

        const result = await response.json();
        setUserData(result);
    } catch (err: any) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-10 py-8 bg-primary border-2 border-secondary shadow-md text-white mx-auto">
      <header>
        <h3 className="text-xl text-center font-minecraft">Buscar Perfil</h3>
        <p className="text-sm text-center text-gray-400 italic">
          Busca un usuario de Minecraft
        </p>
      </header>

      <form
        className="flex flex-col items-center gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="block w-full">
          <span className="text-xs font-medium">Nombre / UUID</span>
          <input
            {...register("username", {
              required: "⚠ Este campo es obligatorio",
              maxLength: {
                value: 16,
                message: "⚠ Máximo 16 caracteres permitidos",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message:
                  "⚠ Solo letras, números y guiones bajos (_) permitidos",
              },
            })}
            type="text"
            id="UserNickName"
            placeholder="Notch / 069a79f4-44e9-4726-a5be..."
            className={`mt-1 w-full px-3 py-2 border rounded-md text-white bg-[#1E1E1E] focus:ring-2 focus:ring-secondary outline-none ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
          />
        </label>
        {errors.username && (
          <p className="text-red-400 text-sm italic">
            {errors.username.message}
          </p>
        )}

        <button
          type="submit"
          className={`button-minecraft flex items-center gap-2 ${loading ? 'cargando' : ''}`}
          disabled={loading}
        >
          <MagnifyingGlassIcon className="w-5 h-5" />
          {loading ? 'Cargando...' : 'Buscar'}
        </button>
      </form>

      {userData && (
        <MinecraftProfile profileData={userData} />
      )}

      {error && (
        <p className="text-red-400 text-sm italic">{error}</p>
      )}
    </div>
  );
}
