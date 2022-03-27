import Image from "next/image";
import Link from "next/link";
import styles from "./card.module.css";
import cls from "classnames";
export default function Card(props) {
  return (
    <Link href={props.href}>
      <a className={styles.cardLink}>
        <div className={cls("glass", styles.container)}>
          <div className={styles.cardHeaderWrapper}>
            <h2 className={styles.cardHeader}>{props.name}</h2>
          </div>
          <div className={styles.cardHeaderWrapper}>
            <Image
              className={styles.cardImage}
              src={props.imgUrl}
              width={260}
              height={160}
              alt={"coffee store"}
            />
          </div>
        </div>
      </a>
    </Link>
  );
}
