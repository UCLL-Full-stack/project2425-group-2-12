import { useEffect, useState } from "react";
import useSWR from "swr";
import Header from "@components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AddressService from "@services/AddressService";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";

const fetcher = async (url: string) => {
  const storedUser = localStorage.getItem("loggedInUser");
  if (!storedUser) {
    throw new Error("User not authenticated");
  }

  const { token } = JSON.parse(storedUser);
  const response = await fetch(`http://localhost:3000${url}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
};

const useInterval = (callback: () => void, delay: number) => {
  useEffect(() => {
    const interval = setInterval(callback, delay);
    return () => clearInterval(interval);
  }, [callback, delay]);
};

const UserByUsername = () => {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();
  const { username } = router.query;

  const { data: user, mutate: mutateUser } = useSWR(
    username ? `/users/username/${username}` : null,
    fetcher
  );

  const { data: address, mutate: mutateAddress } = useSWR(
    username ? `/address/${username}` : null,
    fetcher
  );

  useInterval(() => {
    mutateUser();
    mutateAddress();
  }, 5000); // Poll every 5 seconds

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    mutateAddress((prev) => (prev ? { ...prev, [name]: value } : null), false);
  };

  const handleSaveAddress = async () => {
    if (address) {
      console.log("Saving address:", address);
      try {
        await AddressService.updateAddressByUsername(
          username as string,
          address
        );
        setIsEditing(false);
        console.log("Address saved successfully");
      } catch (error) {
        console.error("Failed to save address:", error);
      }
    }
  };

  if (!user || !address) return <div>Loading...</div>;

  return (
    <>
      <Head>
        <title>{t("profile.title", { username })}</title>
      </Head>
      <Header />
      <main className="p-6 min-h-screen flex flex-col items-center">
        {user ? (
          <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
            <div className="mb-4">
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
            </div>
            {isEditing ? (
              <div>
                <h1 className="text-2xl font-bold mb-4">
                  {t("profile.address")}
                </h1>
                <label>
                  {t("profile.street")}:
                  <input
                    type="text"
                    name="street"
                    value={address.street}
                    onChange={handleAddressChange}
                    className="border rounded p-2 w-full mb-4"
                  />
                </label>
                <label>
                  {t("profile.house")}:
                  <input
                    type="text"
                    name="house"
                    value={address.house}
                    onChange={handleAddressChange}
                    className="border rounded p-2 w-full mb-4"
                  />
                </label>
                <label>
                  {t("profile.postalCode")}:
                  <input
                    type="text"
                    name="postalCode"
                    value={address.postalCode}
                    onChange={handleAddressChange}
                    className="border rounded p-2 w-full mb-4"
                  />
                </label>
                <label>
                  {t("profile.city")}:
                  <input
                    type="text"
                    name="city"
                    value={address.city}
                    onChange={handleAddressChange}
                    className="border rounded p-2 w-full mb-4"
                  />
                </label>
                <label>
                  {t("profile.country")}:
                  <input
                    type="text"
                    name="country"
                    value={address.country}
                    onChange={handleAddressChange}
                    className="border rounded p-2 w-full mb-4"
                  />
                </label>
                <button
                  onClick={handleSaveAddress}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                >
                  {t("profile.save")}
                </button>
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold mb-4">
                  {t("profile.address")}
                </h1>
                <p>
                  <strong>{t("profile.street")}:</strong>{" "}
                  {address.street + " " + address.house}
                </p>
                <p></p>
                <p>
                  <strong>{t("profile.city")}:</strong>{" "}
                  {address.postalCode + " " + address.city}
                </p>
                <p>
                  <strong>{t("profile.country")}:</strong> {address.country}
                </p>
                <button
                  onClick={() => setIsEditing(true)}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 transition duration-300"
                >
                  {t("profile.edit")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <p>{t("profile.loading")}</p>
        )}
      </main>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common", "profile"])),
  },
});

export default UserByUsername;
