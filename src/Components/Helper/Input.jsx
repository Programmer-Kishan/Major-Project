import React from "react";

import { blueGrey } from "@mui/material/colors";

const Input = (props) => {
  const color = blueGrey[200];

  return (
    <input
      type={props.type}
      placeholder={props.placeholder}
      className={`w-[50%] text-xl outline-none p-2 rounded-sm bg-slate-500 opacity-60
      placeholder:text-white mx-auto text-white`}
      onChange={props.onChange}
    />
  );
};

export default Input;
