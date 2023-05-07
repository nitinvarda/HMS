import React from "react";
import { useLocation } from "react-router-dom";

function useQuery() {
    const { search } = useLocation();
    console.log(search)
  
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }

export default useQuery;