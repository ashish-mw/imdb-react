import { useEffect } from "react";

import Nav from "./Nav";

const Page = (props) => {
  useEffect(() => {
    if (props.title) {
      document.title = `${props.title} | ${process.env.REACT_APP_NAME}`;
    }
  }, [props.title]);

  return (
    <div className="container">
      <Nav />
      {props.children}
    </div>
  );
};

export default Page;
