"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/app/uploaded/uploaded.module.css";
import File from "@/components/File";
import { getFiles } from "@/axios/api";

const Page = () => {
  const router = useRouter();
  const handleAdd = () => router.push("/upload");
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getFiles();
      if (res.data.status !== "success") {
        setFiles([]);
      } else {
        console.log("added");
        setFiles(res.data.fileNames);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(files);
  return (
    <div>
      <div className="flex justify-between items-center h-[60px] bg-white  px-5 py-0 border-b-[#e6e6e6] border-b border-solid">
        <h2 className="text-lg font-bold">View your uploaded files here</h2>
        <div className="flex mr-11 w-[500px] justify-evenly">
        <button className="w-[180px] h-10 bg-black border text-[#dd83e6] hover:text-black text-sm font-semibold text-center leading-10 cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease-in-out] rounded-[15px] border-solid border-[#e6e6e6] hover:bg-[#dd83e6]" onClick={fetchData}>
          Refresh
        </button>
        <button className="w-[180px] h-10 bg-black border text-[#dd83e6] hover:text-black text-sm font-semibold text-center leading-10 cursor-pointer transition-[background-color] duration-[0.3s] ease-[ease-in-out] rounded-[15px] border-solid border-[#e6e6e6] hover:bg-[#dd83e6]" onClick={handleAdd}>
          Add file
        </button>
        </div>
      </div>
      <hr />
      <div className={styles.files_holder}>
        {loading && <p>Loading...</p>}
        {!loading &&
          files &&
          files.map((file, index) => <File key={index} name={file} />)}
        {!loading && (!files || files.length === 0) && <p>No files found</p>}
      </div>
    </div>
  );
};

export default Page;
