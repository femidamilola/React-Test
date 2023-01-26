import React from "react";
import axios from "axios";
import { Quote } from "../../interfaces/quote";
import styles from "./styles.module.css";

const QuoteComponent = ({ quote }: { quote: Quote }) => (
  <div className={styles.quote}>
    <h5>Author: {quote.author}</h5>
    <p>{quote.content}</p>
  </div>
);

const getQuotes = async (page: number): Promise<Quote[]> =>
  axios
    .get(`https://quotable.io/quotes?page=${page}`)
    .then((response) => response.data.results);

const getCountPages = async (page: number) =>
  axios
    .get(`https://quotable.io/quotes?page=${page}`)
    .then((response) => response.data.totalPages);

export const Quotes = () => {
  const [loading, setLoading] = React.useState(false);
  const [quotes, setQuotes] = React.useState([] as Quote[]);
  const [pages, setPages] = React.useState(0);

  React.useEffect(() => {
    setLoading(true);
    getCountPages(1).then((d) => setPages(d));
    getQuotes(1)
      .then((d) => setQuotes([...d]))
      .finally(() => setLoading(false));
  }, []);
  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div>
      <select
        defaultValue={1}
        onChange={(e) =>
          getQuotes(Number(e.target.value))
            .then((r) => {
              setLoading(true);
              setQuotes([...r]);
            })
            .finally(() => setLoading(false))
        }
      >
        {Array(pages)
          .fill(1)
          .map((_, idx) => idx + 1)
          .map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
      </select>
      <div>
        {quotes.length &&
          quotes.map((q, i) => <QuoteComponent key={i} quote={q} />)}
      </div>
    </div>
  );
};
