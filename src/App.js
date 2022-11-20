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
        
        if (state.clearDigits) {
          const newState = {...state, currentOperand:"", clearDigits: false}
          return reducer(newState, {type, payload})
        }
    
        if (payload.digit === "." && !state.currentOperand) {
          return {}
        }
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
    
    case ACTIONS.CLEAR:
       return {}
      
      break;    

    case ACTIONS.DELETE_DIGIT:
       if(state.clearDigits) return {}
       if(!state.currentOperand) return state

       return {
        ...state, currentOperand: state.currentOperand.slice(0, -1)
       } 
       
      break;

    case ACTIONS.CHOOSE_OPERATION:
       if (!state.currentOperand && !state.previousOperand) return {}
       
       if (!state.previousOperand) {
          if(state.currentOperand.charAt(state.currentOperand.length -1) === ".")
            return {
              ...state,
              previousOperand : state.currentOperand.slice(0, -1),
              currentOperand: "",
              operation: payload.operation
            }
        return {
          ...state, 
          previousOperand : state.currentOperand,
          currentOperand:"",
          operation: payload.operation
        }
       }

       if (!state.currentOperand) {
          return {
            ...state,
             operation: payload.operation
          }
       }

       return {
        ...state,
        previousOperand: evaluate(state),
        currentOperand: "",
        operation: payload.operation
       }
      break;
      
    case ACTIONS.EVALUATE:  
       if (
        !state.currentOperand ||
        !state.previousOperand ||
        !state.operation
       ) {
         return state
       }

       return {
        ...state,
        currentOperand: evaluate(state),
        previousOperand: "",
        operation: "",
        clearDigits: true
       }


    break
    
    default:
      return state;
      break;
  }
   

}


function evaluate({currentOperand, previousOperand, operation}) {
    const  current = parseFloat(currentOperand);
    const  prev = parseFloat(previousOperand);
    
    if (isNaN(current) || isNaN(prev)) return ""

    let result = "";

    switch (operation) {
      case "÷":
         result = prev / current;
        break;
      
      case "*":
         result = prev * current;
      
        break;  

      case "+":
         result = prev + current;
      
        break;
      
      case "-":
         result = prev - current;
      
        break;
    
      default:
        break;
    }
    return result.toString();
}

function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});


  return (
    <div className="calculator-grid">
      <div className="output-display">
        <div className="previous-operand">{previousOperand} {operation} </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type: ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
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
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

  export default App;
