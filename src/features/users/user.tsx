import React from "react";
import axios from "axios";
import { Quote, User } from "../../interfaces/quote";
import styles from "./styles.module.css";

const UserComponent = ({ user }: { user: User }) => (
  <div className={styles.container}>
    <div className={styles.image}>
      <img
        src={user.picture.large}
        srcSet={user.picture.thumbnail}
        alt={user.name.first}
      />
    </div>
    <div className={styles.name}>
      Name: {user.name.first + " " + user.name.last}
    </div>
    <p>Email: {user.email}</p>
    <p>City: {user.location.city}</p>
    <p>Country: {user.location.country}</p>
  </div>
);

const getUser = async (): Promise<User> =>
  axios
    .get(`https://randomuser.me/api/`)
    .then((response) => response.data.results[0]);

export const Users = () => {
  const [loading, setLoading] = React.useState(false);
  const [user, setUser] = React.useState(null as User);

  React.useEffect(() => {
    setLoading(true);
    getUser()
      .then((d) => setUser(d))
      .finally(() => setLoading(false));
  }, []);
  return loading ? (
    <div>Loading ...</div>
  ) : (
    <div>
      <div>{user && <UserComponent user={user} />}</div>
      <button
        onClick={() => {
          setLoading(true);
          getUser()
            .then((d) => setUser(d))
            .finally(() => setLoading(false));
        }}
      >
        Get User
      </button>
    </div>
  );
};
