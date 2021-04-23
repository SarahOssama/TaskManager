import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title, onAdd, showAdd }) => {
  const onClick = () => {
    // fetch('https://jsonplaceholder.typicode.com/todos/1')
    // .then(response => response.json())
    // .then(json => console.log(json))
    //console.log("click");
  };
  return (
    <header className="header">
      <h1>{title}</h1>
      <Button
        color={showAdd ? "green" : "red"}
        text={showAdd ? "Close" : "Add"}
        onClick={onAdd}
      />
    </header>
  );
};

Header.defaultProps = {
  title: "Task Tracker",
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;

// const Header = (props) => {
//     return (
//         <header>
//             <h1>{props.title}</h1>
//         </header>
//     )
// }
