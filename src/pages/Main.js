import React, { useState, useEffect } from "react";
import { twoDecimal } from "../utils/decimal";
import Data from "../data/Data";
import styled from "styled-components";

const REMITTANCE_NATION = [
  { name: "미국(USD)", value: "USD", },
  { name: "호주(AUD)", value: "AUD", },
]

const RECEIPT_NATION = [
  { name: "한국(KRW)", value:"KRW" },
  { name: "일본(JPY)", value: "JPY" },
  { name: "필리핀(PHP)", value: "PHP" },
];

const Main = () => {
  const [input, setInput] = useState("");
  const [countryOption, setCoutryOption] = useState("KRW");
  const [remitOption, setRemitOption] = useState("USD");
  const [exchangeRateObj, setExchangeRateObj] = useState(null);
  const [total, setTotal] = useState("");

  const receiptCurrency = countryOption; // KRW
  const remittanceCurrency = remitOption; // USD
  const exchangeRate =
  exchangeRateObj &&
  twoDecimal(exchangeRateObj[`USD${receiptCurrency}`] / exchangeRateObj[`USD${remittanceCurrency}`]);

  const { data } = Data();

  const remittanceHandler = (e) => {
    setRemitOption(e.target.value);
    setTotal("");
  };

  const selectHandler = (e) => {
    setCoutryOption(e.target.value);
    setTotal("");
  };

  useEffect(() => {
    setExchangeRateObj(data);
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const TotalCalculation = input * exchangeRate;
    if (input === "" || null || undefined || input < 0 || input > 10000 || input % 1 !== 0) {
      alert("송금액이 바르지 않습니다.");
    } else {
      const result = twoDecimal(TotalCalculation);
      setTotal(result);
    }
  };

  const inputHandler = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  return (
    <section>
      <Body>
        <h1>환율 계산</h1>
        <div>
          <ContentLayout>
            <span>송금국가: &nbsp;</span>
            <select onChange={remittanceHandler}>
              {REMITTANCE_NATION.map((el, idx) => {
                return (
                  <option key={idx} value={el.value}>
                    {el.name} 
                  </option>
                );
              })}
            </select>
          </ContentLayout>
          <ContentLayout>
            <span>수취국가: &nbsp;</span>
            <select onChange={selectHandler}>
              {RECEIPT_NATION.map((el, idx) => {
                return (
                  <option key={idx} value={el.value}>
                    {el.name} 
                  </option>
                );
              })}
            </select>
          </ContentLayout>
          <ContentLayout>
            <span>환율 : {exchangeRate}
            {receiptCurrency} / {remittanceCurrency}</span>
          </ContentLayout>
          <form>
            <ContentLayout>
              <span>송금액 : &nbsp;</span>
              <input
                type="text"
                required
                onChange={inputHandler}
                value={input}
              />
              <span>{remittanceCurrency}</span>
            </ContentLayout>
            <ContentLayout>
              <input
                type="submit"
                value="Submit"
                onClick={handleSubmit}
              />
            </ContentLayout>
          </form>
        </div>
        {total && (
          <ContentLayout>
            수취금액은
            {`${total} ${receiptCurrency}`}
            입니다.
          </ContentLayout>
        )}
      </Body>
    </section>
  );
};

export default Main;

const Body = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 100px auto;
  padding: 10px 20px;
  border: 1px solid gray;

  input,
  select {
    width: 250px;
    height: 30px;
    border: 1px solid gray;
    outline: none;
  }

  select {
    width: 100px;
  }
`;

const ContentLayout = styled.div`
  padding: 5px 0;
`;
