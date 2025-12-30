import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";

export default function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  async function onLogout() {
    const res = await logout();
    if (res === true) {
      navigate("/");
    }
  }
  return { onLogout };
}
