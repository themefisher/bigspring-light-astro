import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import {
    GithubAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { firebase } from "../../firebase/config";

export const loginGithubUser = defineAction({
  accept: "json",
  input: z.any(),
  handler: async (credentials) => {
    const credential = GithubAuthProvider.credentialFromResult(credentials);

    if (!credential) {
      throw new Error("No se pudo iniciar sesion con Google");
    }

    await signInWithCredential(firebase.auth, credential!);

    return { ok: true };
  },
});
