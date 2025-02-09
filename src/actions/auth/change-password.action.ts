import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { sendPasswordResetEmail } from "firebase/auth";
import { firebase } from "../../firebase/config";
import type { AuthError } from "firebase/auth/cordova";

export const resetPassword = defineAction({
  accept: "form",
  input: z.object({
    email: z.string().email(),
  }),
  handler: async ({ email }) => {
    try {
      await sendPasswordResetEmail(firebase.auth, email, {
        url: `${import.meta.env.PUBLIC_WEBSITE_URL}/login`,
      });

      return { message: `Correo de recuperación enviado a ${email}.` };
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/user-not-found") {
        throw new Error("Usuario no encontrado.");
      }

      throw new Error("Error al enviar correo de recuperación.");
    }
  },
});