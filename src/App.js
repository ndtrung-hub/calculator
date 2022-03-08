import "./App.css";
import { useState } from "react";

const DECIMAL = "decimal";

const ADD = { name: "add", value: "+" };
const SUBTRACT = { name: "subtract", value: "-" };
const MULTIPLY = { name: "multiply", value: "*" };
const DIVIDE = { name: "divide", value: "/" };
const EQUAL = { name: "equals", value: "=" };
const CLR = { name: "clear", value: "CLEAR" };

const NUMS = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "zero",
];
const OPERATORS = [ADD, SUBTRACT, MULTIPLY, DIVIDE, EQUAL, CLR];

function App() {
  const [result, setResult] = useState("0");
  const [number, setNumber] = useState([]);
  const [opeArr, setOperator] = useState([]);

  function handleOperator(event) {
    switch (event.target.id) {
      case CLR.name:
        setResult(0);
        setNumber([]);
        setOperator([]);
        break;
      case MULTIPLY.name:
      case DIVIDE.name:
      case ADD.name:
        if (opeArr.length >= 2) {
          if(isNaN(preprocessNumber([opeArr[opeArr.length - 1]]))&&isNaN(preprocessNumber(number))) break;
        }
      case SUBTRACT.name:
        if (isNaN(preprocessNumber(number))) {
          setOperator((prev) => [...prev, event.target.innerText]);
        } else {
          setOperator((prev) => [
            ...prev,
            preprocessNumber(number),
            event.target.innerText,
          ]);
        }
        setNumber([]);
        break;
      case EQUAL.name:
        if (!isNaN(preprocessNumber(number))) {
          setOperator((prev) => [
            ...prev,
            preprocessNumber(number),
            event.target.innerText,
          ]);
        }
        let output = preprocessNumber([
          eval([...opeArr, preprocessNumber(number)].join("")),
        ]);
        console.log(output);
        setResult(output);
        setNumber([]);
        setOperator([output]);
        break;
      default:
        break;
    }
  }

  //this function check number is a integer or a float
  function preprocessNumber(number) {
    const regexInt = /^[0-9]$/g;
    let temp = number.join("");
    return regexInt.test(temp) ? parseInt(temp) : parseFloat(temp);
  }

  function handleNumber(event) {
    if (opeArr.length == 1) {
      if (!isNaN(preprocessNumber([opeArr[0]]))) {
        setResult(0);
        setOperator([]);
      }
    }
    switch (event.target.textContent) {
      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
        if (event.target.textContent === "0" && number.length === 1) {
          break;
        }
        setNumber((prev) => [...prev, event.target.textContent]);
        break;
      case ".":
        setNumber((prev) =>
          number.indexOf(".") === -1 ? [...prev, "."] : [...prev]
        );
        break;
      default:
        break;
    }
  }

  return (
    <div className="App">
      <div id="num-container">
        {NUMS.map((id, index) => {
          return (
            <button
              type="button"
              id={id}
              key={id + index}
              onClick={handleNumber}
            >
              {index}
            </button>
          );
        })}
        <button type="button" id={DECIMAL} key={DECIMAL} onClick={handleNumber}>
          .
        </button>
      </div>
      <div id="operator-container">
        {OPERATORS.map((item) => {
          return (
            <button
              type="button"
              id={item.name}
              key={item.name}
              onClick={handleOperator}
            >
              {item.value}
            </button>
          );
        })}
      </div>
      <div>
        <p id="display">{number.length !== 0 ? number : result}</p>
        <p id="display">{opeArr}</p>
      </div>
    </div>
  );
}

export default App;
