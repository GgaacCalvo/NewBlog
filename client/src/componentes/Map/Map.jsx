import React, { useEffect } from "react";
import styles from "./Map.module.css";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import personIcon from "./assets/personIcon.png";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";

import CircularProgress from "@mui/material/CircularProgress";
import { getUserDetail, getUserId } from "../../redux/actions/actions";

const markerIcon = L.icon({
  iconUrl: personIcon,
  iconRetinaUrl: personIcon,
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [40, 40],
  popupAnchor: [0, -43],
  className: "leaflet-venue-icon",
});

export const Map = () => {
  const dispatch = useDispatch();
  const {
    user: { sub },
  } = useAuth0();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserId(sub));
  }, [dispatch]);
  if (!user.coordinates)
    return (
      <div className={styles.loaderContainer}>
        <CircularProgress />
      </div>
    );

  return (
    <MapContainer
      center={{
        lat: user.coordinates[0],
        lng: user.coordinates[1],
      }}
      zoom={13}
      className={styles.leaftleContainer}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={{
          lat: user.coordinates[0],
          lng: user.coordinates[1],
        }}
        icon={markerIcon}
      ></Marker>

      <Circle
        center={{
          lat: user.coordinates[0],
          lng: user.coordinates[1],
        }}
      ></Circle>
    </MapContainer>
  );
};
