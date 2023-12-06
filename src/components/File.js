import styles from "@/app/uploaded/uploaded.module.css";
import { useRouter } from "next/navigation";

const File = (props) => {
  const router = useRouter();
  const gotoLine = () => router.push(`/file/${props.name}`);
  return (
    <div className={styles.file}>
      <div className="w-[350px]">
      <h2>{props.name}</h2>
      </div>
      <div>
      <button className={styles.file_btn} onClick={gotoLine}>
        Line Chart
      </button>
      </div>
    </div>
  );
};

export default File;
