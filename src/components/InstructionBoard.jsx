import { useEffect, useRef, useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

const InstructionBoard = () => {
  const [instructions, setInstructions] = useState([]);
  const [inputVal, setInputVal] = useState("");
  const inputFocus = useRef(null);

  useEffect(() => {
    inputFocus.current.focus();
  }, []);

  const handleInput = (e) => {
    setInputVal(e.target.value.toUpperCase());
  };

  const handleAdd = () => {
    if (inputVal.trim() === "") {
      alert("Please add instructions");
      setTimeout(() => {
        inputFocus.current.focus(); //wrap focus inside timeout since JavaScript is single-threaded and alert() blocks execution.
      }, 0);
      return;
    }
    if (inputVal.trim() !== "") {
      setInstructions([...instructions, inputVal]);
      setInputVal("");
    }
  };

  const handleUpMove = (index) => {
    if (index === 0) return;

    setInstructions((prev) => {
      const updatesIns = [...prev];
      [updatesIns[index], updatesIns[index - 1]] = [
        updatesIns[index - 1],
        updatesIns[index],
      ];
      return updatesIns;
    });
  };

  const handleDownMove = (index) => {
    if (index === instructions.length - 1) return;
    setInstructions((prev) => {
      const updatedIns = [...prev];
      [updatedIns[index], updatedIns[index + 1]] = [
        updatedIns[index + 1],
        updatedIns[index],
      ];
      return updatedIns;
    });
  };
  return (
    <section className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
      <h1 className="font-bold text-3xl">Instruction Board</h1>
      <section className="my-2 flex gap-2">
        <input
          type="text"
          placeholder="Add Instructions"
          className="px-6 py-2 rounded-lg border border-gray-400"
          ref={inputFocus}
          value={inputVal}
          onChange={(e) => {
            handleInput(e);
          }}
        />
        <button
          className="px-6 py-2 rounded-lg cursor-pointer bg-amber-400"
          onClick={() => handleAdd()}
        >
          Add
        </button>
      </section>
      <ul className="w-full max-w-md space-y-1">
        {instructions.map((instruction, index) => (
          <li
            key={index}
            className="flex gap-2 items-center justify-center p-2 bg-gray-300 rounded-lg"
          >
            <p>
              <span>{index + 1}. </span>
              {instruction}
            </p>
            <span>
              {index > 0 && (
                <MdKeyboardArrowUp
                  className="cursor-pointer"
                  onClick={() => handleUpMove(index)}
                />
              )}
            </span>
            <span>
              {index < instructions.length - 1 && (
                <MdKeyboardArrowDown
                  className="cursor-pointer"
                  onClick={() => handleDownMove(index)}
                />
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default InstructionBoard;
