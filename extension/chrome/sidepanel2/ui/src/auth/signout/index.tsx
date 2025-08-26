import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import logout from "@/utils/logout";

const SignOut: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      logout();
      navigate({ to: "/" });
    };

    performLogout();
  }, [navigate]);

  return null;
};

export default SignOut;
