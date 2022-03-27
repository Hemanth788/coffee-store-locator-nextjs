import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import styles from "../../styles/coffee-store.module.css";
import cls from "classnames";

const options = {
  method: "GET",
  headers: {
    Accept: "application/json",
    Authorization: `${process.env.FOURSQUARE_API_KEY}`,
  },
};

const CoffeeStore = (props) => {
  const {
    isFallback,
    query: { id },
    ...others
  } = useRouter();

  if (isFallback) {
    return <div>Laoding</div>;
  }

  const {
    location,
    address = "",
    name = "",
    neighbourhood = "",
    imgUrl = "",
  } = props.coffeeStore;

  return (
    <div className={styles.layout}>
      <Head>
        <title>{name}</title>
        <meta name="description" content={`${name} coffee store`}></meta>
      </Head>
      <div className={styles.container}>
        <div className={styles.col1}>
          <div className={styles.backToHomeLink}>
            <Link href="/">
              <a>← Back to home</a>
            </Link>
          </div>
          <div className={styles.nameWrapper}>
            <h1 className={styles.name}>{name}</h1>
          </div>
          <Image
            src={
              imgUrl ||
              "https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            }
            width={600}
            height={360}
            className={styles.storeImg}
            alt={name}
          ></Image>
        </div>

        <div className={cls("glass", styles.col2)}>
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/places.svg"}
              width="24"
              height="24"
              alt="places icon"
            />
            <p className={styles.text}>{location.address}</p>
          </div>
          {location.neighborhood && (
            <div className={styles.iconWrapper}>
              <Image
                src={"/static/icons/nearMe.svg"}
                width="24"
                height="24"
                alt="near me icon"
              />
              <p className={styles.text}>{location.neighborhood}</p>
            </div>
          )}
          <div className={styles.iconWrapper}>
            <Image
              src={"/static/icons/star.svg"}
              width="24"
              height="24"
              alt="star icon"
            />
            {/* <p className={styles.text}>{votingCount}</p> */}
          </div>

          {/* <button className={styles.upvoteButton} onClick={handleUpvoteButton}>
            Up vote!
          </button> */}
        </div>
      </div>
    </div>
  );
};

export async function getStaticProps({ params }) {
  const data = await fetch(
    `https://api.foursquare.com/v3/places/nearby?ll=43.65267%2C-79.39545&query=coffee%20stores`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log("response", response);
      return response.results;
    })
    .catch((err) => console.error(err));
  return {
    props: {
      coffeeStore: data.find((coffeeStore) => {
        return coffeeStore.fsq_id === params.id;
      }),
    },
  };
}

export async function getStaticPaths() {
  const data = await fetch(
    `https://api.foursquare.com/v3/places/nearby?ll=43.65267%2C-79.39545&query=coffee%20stores`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log("response", response);
      return response.results;
    })
    .catch((err) => console.error(err));
  const paths = data.map((coffeeStore) => {
    return {
      params: {
        id: coffeeStore.fsq_id.toString(),
      },
    };
  });
  return {
    paths: paths,
    fallback: true,
  };
}

export default CoffeeStore;
