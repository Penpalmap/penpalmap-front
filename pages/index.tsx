import { useRouter } from "next/router";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const Home = () => {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/map");
    } else {
      router.push("/connexion");
    }
  }, [user, router]);

  return null;
};

export default Home;
