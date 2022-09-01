import "./App.css";
import Content from "./components/Content";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";

function App() {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));

  const [enteredSearchResult, setEnteredSearchResult] = useState({});

  useEffect(() => {
    fetchApi("kjrox").then((data) => {
      setEnteredSearchResult(data);
    });
  }, []);

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
  const searchHandler = async (enteredUsername) => {
    const searchResult = await fetchApi(enteredUsername);
    setEnteredSearchResult(searchResult);
  };

  const themeChanger = () => {
    if (theme === "darkMode") {
      setTheme("lightMode");
      localStorage.setItem("theme", "lightMode");
    } else {
      setTheme("darkMode");
      localStorage.setItem("theme", "darkMode");
    }
  };

  return (
    <div className={`full ${theme === "darkMode" ? "dark-theme" : ""}`}>
      <div>
        <Header webTheme={theme} changeTheme={themeChanger} />
        <SearchBar onSearch={searchHandler} />
        <Content searchedResult={enteredSearchResult} />
      </div>
    </div>
  );
}

export default App;
