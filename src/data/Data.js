import { useEffect, useState } from "react";
import { getApi } from "../utils/api";

export default function Data() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const {quotes}  = await getApi();
        //{obj로 감싸준 이유는 quotes만 뽑아 바로 볼수있게 하기위해서.. ! }
        console.log(quotes, "quoteS?????")
        setData(quotes);
      } catch (error) {
        console.error(error);
      }
    }
    getData();
  }, []);

  return { data };
}
