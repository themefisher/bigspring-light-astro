import { resetPassword } from "@/actions/auth/change-password.action";
import { loginGithubUser } from "@/actions/auth/login-github.action";
import { loginGoogleUser } from "@/actions/auth/login-google.action";
import { loginUser } from "@/actions/auth/login.action";
import { logout } from "@/actions/auth/logout.action";
import { registerUser } from "@/actions/auth/register.action";

export const server = {
  resetPassword,
  loginGithubUser,
  loginGoogleUser,
  loginUser,
  logout,
  registerUser,
};
