import React, { useState } from "react";

export default function Input() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`flex space-x-3 overflow-y-scroll border-b border-gray-700 p-3 scrollbar-hide ${
        loading && "opacity-60"
      }`}
    >
      <img
        src="images/people(1).png"
        alt=""
        className="h-11 w-11 cursor-pointer rounded-full"
        onClick={() => {}}
      />
      <div className="w-full divide-y divide-gray-700">
        <div className={` ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What are you thinking about?"
            rows={2}
            className="min-h-[50px] w-full bg-transparent text-lg tracking-wide text-[#d9d9d9] placeholder-gray-500 outline-none"
          />
        </div>
      </div>
    </div>
  );
}
