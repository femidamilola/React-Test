import React from "react";
import axios from "axios";
import styles from "./styles.module.css";
interface Stat {
  [key: string]: number | string;
}
const StatComponent = ({ stat }: { stat: Stat }) => (
  <div className={styles.stat}>
    <h5>Date: {stat.dateChecked}</h5>
    <div className={styles.statContainer}>
      {Object.keys(stat).map((key, i) => (
        <p key={i}>
          {key}: {stat[key]}
        </p>
      ))}
    </div>
  </div>
);

const getStats = async (): Promise<Stat[]> =>
  axios
    .get(`https://api.covidtracking.com/v1/us/daily.json`)
    .then((response) => response.data);

export const Stats = () => {
  const [loading, setLoading] = React.useState(false);
  const [stats, setStats] = React.useState([] as Stat[]);

  React.useEffect(() => {
    setLoading(true);
    getStats()
      .then((d) => setStats([...d]))
      .finally(() => setLoading(false));
  }, []);
  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div>
      <div>
        {stats.length &&
          stats.map((q, i) => <StatComponent key={i} stat={q} />)}
      </div>
    </div>
  );
};
