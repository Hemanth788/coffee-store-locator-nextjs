import { useState, useContext } from "react";
import { ACTION_TYPES, StoreContext } from "../pages/_app";
export default function useTrackLocation() {
  const [locationErrorMsg, setLocationErrorMsg] = useState("");
  const [isFindingLocation, setIsFindLocation] = useState(false);
  const { dispatch } = useContext(StoreContext);
  const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    dispatch({
      type: ACTION_TYPES.SET_LAT_LONG,
      payload: { latLong: `${latitude},${longitude}` },
    });
    setLocationErrorMsg("");
    setIsFindLocation(false);
  };
  const error = () => {
    setIsFindLocation(false);
    setLocationErrorMsg("Unable to retrieve location");
  };
  const handleTrackLocation = () => {
    setIsFindLocation(true);
    if (!navigator.geolocation) {
      setLocationErrorMsg("Geolocation is not supported by your browser");
    } else {
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };
  return { handleTrackLocation, locationErrorMsg, isFindingLocation };
}
