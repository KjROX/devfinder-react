import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";

function App() {
  const [enteredSearchResult, setEnteredSearchResult] = useState({});

  useEffect(() => {
    setEnteredSearchResult(fetchApi("kjrox"));
  }, [fetchApi]);

  function dateConverter(string) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date(string);
    const arr = [
      date.getDate(),
      monthNames[date.getMonth()],
      date.getFullYear(),
    ];
    return arr;
  }

  async function fetchApi(search) {
    const response = await fetch(`https://api.github.com/users/${search}`, {
      method: "GET",
      headers: {
        Accept: `application/vnd.github.v3+json`,
      },
    });
    const data = await response.json();
    if (!data.message) {
      const searchResult = {
        profileImage: data.avatar_url,
        bio: data.bio,
        blog: data.blog,
        name: data.name,
        username: data.login,
        usernameLink: data.html_url,
        joiningDate: dateConverter(data.created_at),
        followers: data.followers,
        following: data.following,
        repositories: data.public_repos,
        location: data.location,
        twitterUsername: data.twitter_username,
        company: data.company,
      };
      return searchResult;
    } else {
      console.log(data.message);
      return;
    }
  }
  const searchHandler = (enteredUsername) => {
    const searchResult = fetchApi(enteredUsername);
    // setEnteredSearchResult(searchResult);
    console.log(searchResult);
  };

  return (
    <div className="main">
      <Header />
      <SearchBar onSearch={searchHandler} />
      <Content searchedResult={enteredSearchResult} />
    </div>
  );
}

export default App;
