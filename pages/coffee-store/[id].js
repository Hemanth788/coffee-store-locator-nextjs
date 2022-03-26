import Link from "next/link";
import { useRouter } from "next/router";
const CoffeeStore = () => {
  const {
    query: { id },
    ...others
  } = useRouter();

  return (
    <div>
      CoffeeStore - {id}
      <Link href={"/"}>
        <a>Back To Home</a>
      </Link>
      <Link href={"/coffee-store/dynamic"}>
        <a>Dynamic</a>
      </Link>
    </div>
  );
};

export default CoffeeStore;
