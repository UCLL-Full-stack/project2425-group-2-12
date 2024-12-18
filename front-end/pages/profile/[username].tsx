import Head from "next/head";
import UserService from "@services/UserService";
import { User } from "@types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "@components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const UserByUsername = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);

  const router = useRouter();
  const { username } = router.query;

  const getUserByUsername = async () => {
    const user = await UserService.getUserByUsername(username as string);
    setUser(user);
  };

  useEffect(() => {
    if (username) {
      getUserByUsername();
    }
  }, [username]);

  return (
    <>
      <Head>
        <title>{t("profile.title", { username })}</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        {user ? (
          <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
            <h1 className="text-2xl font-bold mb-4">
              {t("profile.title", { username: user.username })}
            </h1>
            <p>
              <strong>{t("profile.fullname")}:</strong>{" "}
              {user.firstName + " " + user.lastName}
            </p>
            <p>
              <strong>{t("profile.email")}:</strong> {user.email}
            </p>
            <p>
              <strong>{t("profile.role")}:</strong> {user.role}
            </p>
          </div>
        ) : (
          <p>{t("general.loading")}</p>
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default UserByUsername;
