import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import { firebase } from "../../firebase/config";
import type { AuthError } from "firebase/auth/cordova";

const { PUBLIC_WEBSITE_URL } = import.meta.env;

export const registerUser = defineAction({
  accept: "form",
  input: z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  }),
  handler: async ({ password, name, email, confirmPassword }, { cookies }) => {
    // Validar Contraseñas

    if (password !== confirmPassword) {
      throw new Error("Contraseñas no coinciden");
    }

    // Creacion de usuario

    try {
      const result = await createUserWithEmailAndPassword(
        firebase.auth,
        email,
        password
      );

      // Actualizar Perfil
      updateProfile(firebase.auth.currentUser!, {
        displayName: name,
      });

      const user = {
        uid: result.user.uid,
        email: result.user.email,
        name: name,
      };

      // Verificar Correo

      await sendEmailVerification(firebase.auth.currentUser!, {
        url: `${PUBLIC_WEBSITE_URL}/protected`,
      });

      return user;
    } catch (error) {
      const firebaseError = error as AuthError;

      if (firebaseError.code === "auth/email-already-in-use") {
        throw new Error("Correo Electrónico ya en uso");
      }

      throw new Error("Valio Verga y no se por que");
    }
  },
});
