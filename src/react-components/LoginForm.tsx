import { ReactNanoStore } from "@/components/ReactNanoStore";
import { Provider } from "@/tankstack-query/Provider";
import React, { memo } from "react";

export const LoginForm = () => {
  
  return (
    <Provider>
      <form className="mb-4">
        <div className="grid gap-2">
          <div className="grid gap-1">
            <label className="text-neutral-950">Correo</label>
            <input
              className="outline-none border border-neutral/950 rounded px-4 py-3 w-full mt-2 focus:outline-none focus:shadow-outline"
              placeholder="nombre@ejemplo.com"
              type="email"
              name="email"
            />

            <span className="text-red-500 text-sm">Hubo un error</span>

            <label className="text-neutral-950 mt-2">Contraseña</label>
            <input
              placeholder="Contraseña"
              type="password"
              className="outline-none border border-neutral/950 rounded px-4 py-3 w-full mt-2 focus:outline-none focus:shadow-outline"
            />

            <span className="text-red-500 text-sm">Hubo un error</span>
            <p>
              <a
                href="/dashboard/signin/forgot_password"
                className="font-medium text-neutral-500 text-sm hover:underline"
              >
                Olvidaste tu contraseña?
              </a>
            </p>
          </div>
          <button
            className="mt-4 w-full border-2 border-primary bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-primary-dark transition duration-300"
            type="submit"
          >
            Iniciar sesión
          </button>

          <div className="flex justify-center mt-4 gap-6">
            <p>
              <a
                href="/register"
                className="font-medium text-neutral-500 text-sm hover:underline"
              >
                ¿No tienes una cuenta? Regístrate
              </a>
            </p>
          </div>
        </div>
      </form>
    </Provider>
  );
};
