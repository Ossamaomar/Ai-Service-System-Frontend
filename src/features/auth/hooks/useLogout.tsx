import { Route } from "@/routes/app/_layout";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "@tanstack/react-router";

export default function useLogout() {
  const { logout } = useAuth();
  const navigate = Route.useNavigate();
  const search = Route.useSearch();
  const router = useRouter();
  async function onLogout() {
    const res = await logout();
    if (res === true) {
      await router.invalidate();
      await navigate({ to: search.redirect || "/" });
    }
  }
  return { onLogout };
}
