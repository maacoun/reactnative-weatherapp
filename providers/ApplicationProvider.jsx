import React, { createContext, useReducer, useContext, useEffect } from "react"

const LOCAL_STORAGE_ID = "weather-app";
let storedData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID))
