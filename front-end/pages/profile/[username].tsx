import { useEffect, useState } from "react";
import Header from "@components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import UserService from "@services/UserService";
import AddressService from "@services/AddressService";
import { User, Address } from "@types";
import { useRouter } from "next/router";
import Head from "next/head";

const UserByUsername = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState<User | null>(null);
  const [address, setAddress] = useState<Address>({
    street: "",
    city: "",
    state: "",
    zip: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const { username } = router.query;

  const getUserByUsername = async () => {
    const user = await UserService.getUserByUsername(username as string);
    setUser(user);
  };

  const getAddressByUsername = async () => {
    const address = await AddressService.getAddressByUsername(
      username as string
    );
    setAddress(address);
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSaveAddress = async () => {
    if (address) {
      console.log("Saving address:", address); // Add this line to log the address being saved
      try {
        await AddressService.updateAddressByUsername(
          username as string,
          address
        );
        setIsEditing(false);
        console.log("Address saved successfully"); // Add this line to log success
      } catch (error) {
        console.error("Failed to save address:", error); // Add this line to log any errors
      }
    }
  };

  useEffect(() => {
    if (username) {
      getUserByUsername();
      getAddressByUsername();
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
            {isEditing ? (
              <div>
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
                  {t("profile.state")}:
                  <input
                    type="text"
                    name="state"
                    value={address.state}
                    onChange={handleAddressChange}
                    className="border rounded p-2 w-full mb-4"
                  />
                </label>
                <label>
                  {t("profile.zip")}:
                  <input
                    type="text"
                    name="zip"
                    value={address.zip}
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
                <p>
                  <strong>{t("profile.street")}:</strong> {address.street}
                </p>
                <p>
                  <strong>{t("profile.city")}:</strong> {address.city}
                </p>
                <p>
                  <strong>{t("profile.state")}:</strong> {address.state}
                </p>
                <p>
                  <strong>{t("profile.zip")}:</strong> {address.zip}
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

export const getServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default UserByUsername;
