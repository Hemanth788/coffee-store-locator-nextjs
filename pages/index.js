import Head from "next/head";
import Image from "next/image";
import { useEffect, useState, useContext } from "react";
import Banner from "../components/banner";
import Card from "../components/card";
import useTrackLocation from "../hooks/useTrackLocation";
import fetchCoffeeStores from "../lib/coffee-stores";
import styles from "../styles/Home.module.css";
import { StoreContext, ACTION_TYPES } from "./_app";
export default function Home(props) {
  const { locationErrorMsg, handleTrackLocation, isFindingLocation } =
    useTrackLocation();
  const { state, dispatch } = useContext(StoreContext);
  const { coffeeStores, latLong } = state;
  useEffect(() => {
    async function fetchNearbyCoffeeStores() {
      const fetchedCoffeeStores = await fetchCoffeeStores(latLong, 30);
      console.log("fetchedCoffeeStores", fetchedCoffeeStores);
      dispatch({
        type: ACTION_TYPES.SET_COFFEE_STORES,
        payload: { coffeeStores: fetchedCoffeeStores },
      });
    }
    fetchNearbyCoffeeStores();
  }, [dispatch, latLong]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Coffee Connoisseur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Banner
          buttonText={isFindingLocation ? "Locating..." : "View stores nearby"}
          handleOnClick={() => {
            handleTrackLocation();
          }}
        />
        {locationErrorMsg && <p>Something went wrong: {locationErrorMsg} </p>}
        <div className={styles.heroImage}>
          <Image
            src={"/static/hero-image.png"}
            alt={"hero hero hero"}
            width={700}
            height={400}
          />
        </div>
        {coffeeStores?.length != 0 && (
          <>
            <h2 className={styles.heading2}>Stores near you</h2>
            <div className={styles.cardLayout}>
              {coffeeStores?.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`coffee-store/${coffeeStore.fsq_id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
        {props.coffeeStores.length != 0 && (
          <>
            <h2 className={styles.heading2}>Toronto Stores</h2>
            <div className={styles.cardLayout}>
              {props.coffeeStores.map((coffeeStore) => {
                return (
                  <Card
                    key={coffeeStore.fsq_id}
                    name={coffeeStore.name}
                    imgUrl={
                      coffeeStore.imgUrl ||
                      "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    }
                    href={`coffee-store/${coffeeStore.fsq_id}`}
                    className={styles.card}
                  />
                );
              })}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export async function getStaticProps(context) {
  const dataWithImages = await fetchCoffeeStores();

  return {
    props: {
      coffeeStores: dataWithImages,
    },
  };
}
