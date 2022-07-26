import React, { useEffect, forwardRef } from "react";
import { useFileReader } from "../../src/hooks";
import { useAppData } from "../../app/store";
import { pick } from "../../src/util";

//
export default forwardRef(ChooseFile);
function ChooseFile(
  {
    // pass app cache key to store file data under
    // {
    //   name:          string
    //   size:          bytes
    //   type:          string
    //   lastModified:  timestamp
    //   data:          dataUrl
    //   *file:          File{}  # redux throws @File{}
    // }
    FILE = "wzcagoycqzyfxwfqrewzur",
    //
    children,
    //
    ...rest
    //
  },
  ref
) {
  const appdata = useAppData();
  const ID = `ChooseFile.${appdata.id()}`;
  //
  // use browser api to read file into `urlData` object
  const __ = useFileReader();
  const onChange = ({ target }) => {
    const file = target?.files[0];
    if (file) {
      //
      // store file info @context under provided key name [FILE]
      appdata.set(FILE, {
        ...pick(file, ["name", "lastModified", "size", "type"]),
        // file,
      });
      __.read(file);
    }
  };
  //
  useEffect(() => {
    if (!__.error && !__.loading && __.data) {
      // success; cache dataUrl
      appdata.set(FILE, { ...appdata(FILE), data: __.data });
    }
  }, [__.error, __.loading, __.data]);
  //
  return (
    <label htmlFor={ID} {...rest}>
      {children}
      {/* provide `children` component to render instead <input> */}
      {/* hide default input box; keep it in DOM to receive events */}
      <input
        ref={ref}
        onChange={onChange}
        type="file"
        id={ID}
        name={ID}
        className="sr-only !hidden"
      />
    </label>
  );
}
