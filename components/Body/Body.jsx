import modcss from "./Body.module.css";
//
const Body = ({ children, ...rest }) => {
  //
  return (
    <body
      className={`scrollbar-thin dark:text-slate-100 ${modcss.body}`}
      {...rest}
    >
      {children}
    </body>
  );
};

export default Body;
