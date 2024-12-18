import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CartItem from "@components/cart/CartItem";
import ProductService from "@services/ProductService";

const Cart: React.FC = () => {
  const { t } = useTranslation();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      const cart = await ProductService.getCart();
      setCartItems(cart.items);
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (index: number) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    setCartItems(updatedCart);
    await ProductService.updateCart(updatedCart);
  };

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {cartItems.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onRemove={() => handleRemoveItem(index)}
              />
            ))}
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
