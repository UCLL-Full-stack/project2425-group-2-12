import React, { useState, useEffect } from "react";
import Head from "next/head";
import Header from "@components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CartItem from "@components/cart/CartItem";
import CartService from "@services/CartService";

const calculateTotalPrice = (items) => {
  return items.reduce((total, item) => total + item.price * item.quantity, 0);
};

const Cart: React.FC = () => {
  const { t } = useTranslation("common");
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const username = JSON.parse(
      localStorage.getItem("loggedInUser") || "{}"
    ).username;

    const fetchCartItems = async (username) => {
      setError("");
      const response = await CartService.getCartItemsByUsername(username);

      if (response.status === 401) {
        setError(t("general.unauthorized"));
      } else if (!response.ok) {
        setError(response.statusText);
      } else {
        const cartItems = await response.json();
        const data = Array.isArray(cartItems)
          ? cartItems.map((item) => ({
              id: item.id,
              cartId: item.cartId,
              productId: item.productId,
              name: item.productName,
              description: item.productDescription,
              price: item.productPrice,
              image: item.productImage,
              quantity: item.quantity,
            }))
          : [];
        setCartItems(data);
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

  const totalPrice = calculateTotalPrice(cartItems);

  return (
    <>
      <Head>
        <title>{t("cart.title")}</title>
      </Head>
      <Header />
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{t("cart.title")}</h1>
        {error && <div className="text-red-500">{error}</div>}
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
