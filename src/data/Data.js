import { useEffect, useState } from "react";
import { getApi } from "../utils/api";

export default function Data() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const { quotes } = await getApi();
        setData(quotes);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  return { data };
}
