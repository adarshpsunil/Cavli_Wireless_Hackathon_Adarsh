"use client";

import { getFile } from "@/axios/api";
import LineChart from "@/components/LineChart";
import { useEffect, useState } from "react";

const File = (props) => {
  useEffect(() => {
    const fetchData = async (name) => {
      try {
        const res = await getFile(name);
        console.log(res);
        if (res.data?.status === "success") {
          setData(res.data.data.data);
        }
      } catch (err) {
        console.log(err);
        setError(err.response.data.error || "Error fetching file");
      } finally {
        setLoading(false);
      }
    };

    fetchData(props.params.fileName);
  }, []);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  return (
    <div>
      File Name: {props.params.fileName}
      <hr />
      {loading && <div>Loading...</div>}
      {error && !loading && <div>{error}</div>}
      {!error && !loading && <LineChart data={data} />}
    </div>
  );
};

export default File;
