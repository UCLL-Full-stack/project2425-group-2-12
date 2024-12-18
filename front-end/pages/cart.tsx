import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CartItem from "@components/cart/CartItem";
import CartService from "@services/CartService";

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const username = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    ).username;

    const fetchCartItems = async (username) => {
      try {
        const data = await CartService.getCartItemsByUsername(username);
        setCartItems(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchCartItems(username); // Initial fetch
  }, []);

  const handleRemoveItem = async (productId: string) => {
    const username = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    ).username;
    try {
      await CartService.removeProductFromCart(username, productId);
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Failed to remove product:", error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <>
      <Head>
        <title>{t("cart.title")}</title>
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{t("cart.title")}</h1>
        {cartItems.length === 0 ? (
          <p>{t("cart.empty")}</p>
        ) : (
          <div>
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onRemove={() => handleRemoveItem(item.productId)}
              />
            ))}
            <div className="flex justify-between items-center mt-4 p-4 border-t">
              <span className="text-xl font-bold">
                {t("cart.total")}: €{totalPrice}
              </span>
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                {t("cart.checkout")}
              </button>
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Cart;
