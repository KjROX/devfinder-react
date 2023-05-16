const Header = (props) => {
  return (
    <header>
      <h1>
        <b>devfinder</b>
      </h1>
      <div onClick={props.changeTheme}>
        <h2>{props.webTheme === "darkMode" ? "Light" : "Dark"}</h2>
        <img
          src={
            props.webTheme === "darkMode"
              ? `./assets/icons8-sun.svg`
              : `./assets/moon.svg`
          }
          alt=""
        />
      </div>
    </header>
  );
};

export default Header;
