import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState(" ");
  const [buttonText, setButtonText] = useState("Copy");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+-=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
    setButtonText("Copy");
  }, [length, numberAllowed, charAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, length);
    window.navigator.clipboard.writeText(password);

    setButtonText("Copied");
  }, [password, length]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-8 my-8 text-white bg-gray-700">
      <h1 className="text-4xl text-center mb-4">Password Generator</h1>
      <div className="flex items-center justify-center shadow rounded-lg overflow-hidden mb-4">
        <input
          type="text"
          value={password}
          className="outline-none w-full py-2 px-4 bg-gray-800 text-white placeholder-gray-400"
          placeholder="Generated Password"
          readOnly
          name="Password"
          ref={passwordRef}
        />
        <button
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md  outline-none "
          onClick={() => {
            copyPasswordToClipboard();
          }}
          onChange={()=>{passwordGenerator()}}
        >
          {buttonText}
        </button>
      </div>
      <div className="flextext-sm gap-x-2">
        <div className="flex items-center gap-x-1">
          <label htmlFor="passwordLength" className="text-white mr-2">
            Length:
          </label>
          <input
            type="number"
            id="passwordLength"
            min={6}
            max={100}
            value={length}
            className="outline-none w-20 py-1 px-2 bg-gray-800 text-white rounded-md"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
        </div>
        <div className="flex align-items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            id="numberInput"
            onChange={() => {
              setNumberAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="numberInput">Numbers</label>
        </div>
        <div className="flex align-items-center gap-x-1">
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label htmlFor="characterInput">Characters</label>
        </div>
      </div>
    </div>
  );
}
``;
export default App;