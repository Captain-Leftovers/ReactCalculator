import { useReducer } from "react";
import "./styles.css";
import DigitButton from "./components/DigitButton";
import OperationButton from "./components/OperationButton";

export const ACTIONS = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete-digit",
  EVALUATE: "evaluate",
}

function reducer (state, {type, payload} ){
  switch (type) {
    case ACTIONS.ADD_DIGIT:
        if (payload.digit === "0" && state.currentOperand === "0") {
          return state
        }
        if (payload.digit !== "0" && state.currentOperand === "0" && payload.digit !== ".") {
          return {...state, currentOperand:payload.digit}
        }
        if (payload.digit === "." && state.currentOperand.includes(".")) {
          return state
        }

        return {
        ...state , currentOperand : `${state.currentOperand || ""}${payload.digit}`
       }
      break;
  
    default:
      return state;
      break;
  }
   

}


function App() {
  const [{currentOperand, previousOperant, operation}, dispatch] = useReducer(reducer, {});


  return (
    <div className="calculator-grid">
      <div className="output-display">
        <div className="previous-operand">{previousOperant} {operation} </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two">AC</button>
      <button>DEL</button>
      <OperationButton operation="÷" dispatch={dispatch} />
      <DigitButton digit="1" dispatch={dispatch} />
      <DigitButton digit="2" dispatch={dispatch} />
      <DigitButton digit="3" dispatch={dispatch} />
      <OperationButton operation="*" dispatch={dispatch} />
      <DigitButton digit="4" dispatch={dispatch} />
      <DigitButton digit="5" dispatch={dispatch} />
      <DigitButton digit="6" dispatch={dispatch} />
      <OperationButton operation="+" dispatch={dispatch} />
      <DigitButton digit="7" dispatch={dispatch} />
      <DigitButton digit="8" dispatch={dispatch} />
      <DigitButton digit="9" dispatch={dispatch} />
      <OperationButton operation="-" dispatch={dispatch} />
      <DigitButton digit="." dispatch={dispatch} />
      <DigitButton digit="0" dispatch={dispatch} />
      <button className="span-two">=</button>
    </div>
  );
}

  export default App;
