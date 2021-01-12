import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import styled from 'styled-components';
import { GOOGLE_MAP_API_KEY, INITIAL_MAP_CENTER } from './constants';

const Container = styled.div`
  width: 100%;
  height: 100%;
`

const Map = ({ setMap, setMaps }) => {
  const handleApiLoaded = (map, maps) => {
    setMap(map);
    setMaps(maps)
  };

  return (
    <Container>
      <GoogleMapReact
        bootstrapURLKeys={{ key: GOOGLE_MAP_API_KEY }}
        defaultCenter={INITIAL_MAP_CENTER}
        defaultZoom={17}
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
        yesIWantToUseGoogleMapApiInternals
      >
      </GoogleMapReact>
    </Container>
  )
};

export default Map;
