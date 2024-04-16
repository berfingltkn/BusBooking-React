import { createContext } from "react";

const FilterUseContext=createContext({from: 0, to:0, dateTrip:new Date()});

export default FilterUseContext;