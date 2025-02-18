import { spotify } from "@/assets";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  UserButton,
  useAuth,
} from "@clerk/clerk-react";
import { Button } from "../ui/button";
import { useState } from "react";

const Header = () => {
  const [data, setData] = useState(null);

  const { getToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const authenticate = async () => {
    setLoading(true);
    try {
      const token = await getToken();
      if (!token) {
        console.error("User not authenticated");
        return;
      }

      const response = await fetch("http://localhost:3000/api/auth", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate");
      }

      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Error during authentication:", error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <header className="p-2 bg-black">
      <nav className="flex justify-between items-center px-4 py-3">
        <div>
          <img
            src={spotify}
            alt="Spotify Logo"
            className="h-8 object-contain"
          />
        </div>
        <div>
          <SignedOut>
            <SignInButton>
              <Button className="cursor-pointer" onClick={authenticate}>
                Sign in
              </Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
};

export default Header;
