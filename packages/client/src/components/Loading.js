import React from "react";

import { FaRegHourglass } from "react-icons/fa";

const Loading = () => {
  return (
    <p className="text-muted text-center">
      <FaRegHourglass /> Loading
    </p>
  );
};

export default React.memo(Loading);
