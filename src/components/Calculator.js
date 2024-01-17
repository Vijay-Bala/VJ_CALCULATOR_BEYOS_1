import React, { useState } from "react";
import styles from "./Calculator.module.css";
import * as math from "mathjs";
import { mean, median, mode } from "simple-statistics";

const Calculator = () => {
  const [display, setDisplay] = useState("");
  const [memory, setMemory] = useState(0);

  const handleInput = (event) => {
    setDisplay(event.target.value);
  };

  const handleClick = (value) => {
    setDisplay((prevDisplay) => prevDisplay + value);
  };

  const handleClear = () => {
    setDisplay("");
  };

  const handleBackspace = () => {
    setDisplay(display.slice(0, -1));
  };

  const handleEqual = () => {
    try {
      const complexEnv = {
        ...math.create({}),
        i: math.complex(0, 1),
      };

      const result = math.evaluate(display, {
        ...complexEnv,
        sin: (x) => math.sin(math.unit(x, "deg")),
        cos: (x) => math.cos(math.unit(x, "deg")),
        tan: (x) => math.tan(math.unit(x, "deg")),
        sinh: (x) => math.sinh(x),
        cosh: (x) => math.cosh(x),
        tanh: (x) => math.tanh(x),
        asin: (x) => math.asin(x),
        acos: (x) => math.acos(x),
        atan: (x) => math.atan(x),
        log: (x) => math.log(x),
        mean: (arr) => mean(arr),
        median: (arr) => median(arr),
        mode: (arr) => mode(arr),
      });

      setDisplay(result.toString());
    } catch (error) {
      setDisplay("Error");
    }
  };

  const handleMemoryAdd = () => {
    setMemory((prevMemory) => prevMemory + parseFloat(display) || 0);
  };

  const handleMemorySubtract = () => {
    setMemory((prevMemory) => prevMemory - parseFloat(display) || 0);
  };

  const handleMemoryClear = () => {
    setMemory(0);
  };

  const handleMemoryRecall = () => {
    setDisplay(memory.toString());
  };

  const handlePi = () => {
    handleClick("π");
  };

  const handleDecimalToBinary = () => {
    const decimalValue = parseFloat(display);
    if (!isNaN(decimalValue)) {
      setDisplay((decimalValue >>> 0).toString(2));
    } else {
      setDisplay("Error");
    }
  };

  const handleBinaryToDecimal = () => {
    const binaryValue = display;
    const decimalValue = parseInt(binaryValue, 2);
    if (/^[01]+$/.test(binaryValue) && !isNaN(decimalValue)) {
      setDisplay(decimalValue.toString());
    } else {
      setDisplay("Error");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleEqual();
    }
  };

  return (
    <div className="calculator my-1">
      <h2>Scientific Calculator</h2>
      <div className={styles.displaybox}>
        <textarea
          className="display"
          placeholder="Output"
          cols={26}
          rows={2}
          value={display}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="buttons my-3">
        <div className="row">
          <button onClick={() => handleClick("i")}>i</button>
          <button onClick={() => handleClick("!")}>!</button>
          <button onClick={() => handleClick("sin(")}>sin</button>
          <button onClick={() => handleClick("asin(")}>asin</button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("cos(")}>cos</button>
          <button onClick={() => handleClick("acos(")}>acos</button>
          <button onClick={() => handleClick("tan(")}>tan</button>
          <button onClick={() => handleClick("atan(")}>atan</button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("^")}>^</button>
          <button onClick={() => handleClick("7")}>7</button>
          <button onClick={() => handleClick("8")}>8</button>
          <button onClick={() => handleClick("9")}>9</button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("4")}>4</button>
          <button onClick={() => handleClick("5")}>5</button>
          <button onClick={() => handleClick("6")}>6</button>
          <button onClick={() => handleClick("/")}>/</button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("1")}>1</button>
          <button onClick={() => handleClick("2")}>2</button>
          <button onClick={() => handleClick("3")}>3</button>
          <button onClick={() => handleClick("*")}>*</button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("0")}>0</button>
          <button onClick={() => handleClick(".")}>.</button>
          <button onClick={handlePi}>π</button>
          <button onClick={() => handleClick("log(")}>log</button>
        </div>
        <div className="row">
          <button onClick={handleMemoryAdd}>M+</button>
          <button onClick={handleMemorySubtract}>M-</button>
          <button onClick={handleMemoryRecall}>MR</button>
          <button onClick={handleMemoryClear}>MC</button>
        </div>
        <div className="row">
          <button onClick={() => handleClick("(")}>(</button>
          <button onClick={() => handleClick(")")}>)</button>
          <button onClick={() => handleClick("sqrt(")}>√</button>
          <button onClick={handleBackspace}>Del</button>
        </div>
        <div className="row">
          <button onClick={handleBinaryToDecimal}>Bin to Dec</button>
          <button onClick={handleDecimalToBinary}>Dec to Bin</button>
          <button onClick={handleEqual}>=</button>
          <button onClick={handleClear}>C</button>
        </div>
      </div>
    </div>
  );
};

export default Calculator;
