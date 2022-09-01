import { useRef } from "react";

const SearchBar = (props) => {
  const usernameRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredUsername = usernameRef.current.value;
    props.onSearch(enteredUsername);
    usernameRef.current.value = "";
  };

  return (
    <form action="submit" onSubmit={submitHandler}>
      <div className="search">
        <div className="img-search">
          <img src="./search.svg" alt="" />
        </div>

        <input
          type="text"
          name="search"
          placeholder="Search Github username..."
          ref={usernameRef}
        />
        <span className="error"></span>
        <button>Search</button>
      </div>
    </form>
  );
};
export default SearchBar;
