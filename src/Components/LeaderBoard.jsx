import React, { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const handleJoin = async () => {
    if (!username.trim()) {
      alert("Please enter a valid username.");
      return;
    }

    try {
      await addDoc(collection(db, "leaderboard"), {
        name: username.trim(),
        score: 0,
      });
      setUsername("");
    } catch (error) {
      console.error("Error adding user: ", error);
      alert(
        "An error occurred while joining the leaderboard. Please try again."
      );
    }
  };

  return (
    <div>
      <h1 className="text-center text-4xl py-10">Real-Time Leaderboard</h1>
      <div className="items-center justify-center text-center">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your name"
          className="items-center border-2 mr-10 rounded-10 p-4 "
        />
        <button
          onClick={handleJoin}
          className="bg-green-600 p-4 rounded-full items-center hover:text-yellow-600"
        >
          Join Competition
        </button>
      </div>
      <h2 className="text-4xl text-center py-10">Leaderboard</h2>
      <div className="user-list flex flex-row items-center justify-center">
        <div className="items-center mr-40">
          <h2 className="text-3xl font-semibold mb-10">Names</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="text-center">
                {user.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center ml-40 items-center">
          <h2 className="text-3xl font-semibold mb-10">Scores</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id} className="text-center">
                {user.score}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
