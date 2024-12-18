import Link from "next/link";
import { useEffect, useState } from "react";
import Language from "./language/Language";
import { useTranslation } from "next-i18next";
import { User } from "@types";

const Header: React.FC = () => {
  const { t } = useTranslation();
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      setLoggedInUser(JSON.parse(storedUser));
    }
  }, []);

  const handleClick = () => {
    localStorage.removeItem("loggedInUser");
    setLoggedInUser(null);
    window.location.reload();
  };

  return (
    <header className="bg-blue-500 p-4">
      <nav className="flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <Link href="/">{t("app.title")}</Link>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-white text-xl hover:bg-blue-700 rounded-lg px-4 py-2"
          >
            {t("header.nav.home")}
          </Link>
          <Link
            href="/cart"
            className="text-white text-xl hover:bg-blue-700 rounded-lg px-4 py-2"
          >
            {t("cart.title")}
          </Link>
          {loggedInUser && (
            <Link
              href={`/profile/${loggedInUser.username}`}
              className="text-white text-xl hover:bg-blue-700 rounded-lg px-4 py-2"
            >
              {loggedInUser.fullname}
            </Link>
          )}
          {!loggedInUser && (
            <Link
              href="/login"
              className="text-white text-xl hover:bg-blue-700 rounded-lg px-4 py-2"
            >
              {t("header.nav.login")}
            </Link>
          )}
          {loggedInUser && (
            <a
              href="#"
              onClick={handleClick}
              className="text-white text-xl hover:bg-blue-700 rounded-lg px-4 py-2"
            >
              {t("header.nav.logout")}
            </a>
          )}
          <Language />
        </div>
      </nav>
    </header>
  );
};

export default Header;
