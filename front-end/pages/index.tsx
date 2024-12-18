import React, { useEffect, useState } from "react";
import Head from "next/head";
import Header from "@components/header";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProductCard from "@components/products/ProductCard";
import ProductService from "@services/ProductService";
import AddProductForm from "@components/products/AddProductForm";
import Modal from "@components/Modal"; // Assuming you have a Modal component

const Home: React.FC = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getProducts();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts(); // Initial fetch

    const storedUser = localStorage.getItem("loggedInUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setIsAdmin(user.role === "admin");
    }
  }, []);

  const handleAddProductClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleProductAdded = async () => {
    try {
      const data = await ProductService.getProducts();
      setProducts(data);
      setShowModal(false); // Close the modal
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleDeleteProduct = async (productId: number) => {
    try {
      await ProductService.deleteProduct(productId);
      setProducts(products.filter((product) => product.id !== productId));
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return (
    <>
      <Head>
        <title>{t("app.title")}</title>
        <meta name="description" content="Courses app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">{t("home.title")}</h1>
        {isAdmin && (
          <button
            onClick={handleAddProductClick}
            className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          >
            {t("home.addProductButton")}
          </button>
        )}
        <Modal show={showModal} onClose={handleCloseModal}>
          <AddProductForm onProductAdded={handleProductAdded} />
        </Modal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductCard
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              description={product.description}
              isAdmin={isAdmin}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          ))}
        </div>
      </main>
    </>
  );
};

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, ["common"])),
  },
});

export default Home;
