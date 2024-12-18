import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CartItem from "@components/cart/CartItem";

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  const handleRemoveItem = (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
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
                onRemove={() => handleRemoveItem(index)}
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
