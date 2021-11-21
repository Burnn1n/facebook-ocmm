import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";

function Home({ history }) {
  const TITLE = "admin(1)";
  return (
    <React.Fragment>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="mt-10">
        <h1>Admin page</h1>
        <h1>Admin page</h1>
        <h1>Admin page</h1>
        <h1>Admin page</h1>
        <h1>Admin page</h1>
        <h1>Admin page</h1>
        <h1>Admin page</h1>
      </div>
    </React.Fragment>
  );
}

export default Home;
