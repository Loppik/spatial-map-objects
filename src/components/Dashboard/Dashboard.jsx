import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Map from '../Map';
import Table from '../Table';
import { GEO_JSON_URL } from './constants';
import { convertCoordinatesToLatLng, getRandColor, getRandName } from '../helpers';
import useStateRef from '../../hooks/useStateRef';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`

const Dashboard = () => {
  const [map, setMap] = useState();
  const [maps, setMaps] = useState();
  const [polygons, setPolygons] = useState();
  const [mapPolygons, setMapPolygons] = useState();
  const [hoveredPolygonId, setHoveredPolygonId] = useState();
  const [editablePolygon, setEditablePolygon, editablePolygonRef] = useStateRef();

  useEffect(() => {
    axios.get(GEO_JSON_URL)
      .then(response => response.data.features)
      .then(addAdditionalFieldsForPolygons)
      .then(polygons => setPolygons(polygons))
      .catch(e => console.error(e))
  }, []);

  useEffect(() => {
    if (!mapPolygons && polygons && map && maps) {
      let createdMapPolygons = [];
      // Create map polygons
      polygons.forEach(polygon => {
        const paths = convertCoordinatesToLatLng(polygon.geometry.type, polygon.geometry.coordinates);
        const newPolygon = new maps.Polygon({
          paths,
          id: polygon.id,
          initialColor: polygon.color,
          fillColor: polygon.color,
          fillOpacity: 0.35,
          strokeWeight: 0
        });
        maps.event.addListener(newPolygon, 'mouseover', () => onPolygonMouseOver(newPolygon));
        maps.event.addListener(newPolygon, 'mouseout', () => onPolygonMouseOut(newPolygon));
        maps.event.addListener(newPolygon, 'click', onPolygonClick(newPolygon));
        newPolygon.setMap(map);
        createdMapPolygons.push(newPolygon);
      });
      setMapPolygons(createdMapPolygons);
      // remove unused properties
      setPolygons(polygons.map(p => ({id: p.id, date: p.date, name: p.name, color: p.color, comment: p.comment })))
    }
  }, [polygons, map, maps])

  const addAdditionalFieldsForPolygons = (polygons) => polygons.map(polygon => ({
    ...polygon,
    color: getRandColor(),
    name: getRandName(),
    date: new Date(),
    comment: ''
  }))

  const changePolygon = (polygonId, propertyName, value) => {
    const polygonsClone = [...polygons];
    const polygonIndex = polygonsClone.findIndex(p => p.id === polygonId);
    polygonsClone.splice(polygonIndex, 1, {...polygonsClone[polygonIndex], [propertyName]: value});
    setPolygons(polygonsClone);
  }

  const setColorToMapPolygon = (polygonId, color) => {
    const mapPolygon = mapPolygons.find(p => p.id === polygonId);
    mapPolygon.setOptions({ fillColor: color, initialColor: color })
  }

  const getMapPolygon = (polygon) => {
    let mapPolygon;
    if (polygon.setOptions) {
      mapPolygon = polygon;
    } else {
      mapPolygon = mapPolygons.find(p => p.id === polygon.id);
    }
    return mapPolygon
  }

  const onPolygonMouseOver = (polygon) => {
    const mapPolygon = getMapPolygon(polygon);
    mapPolygon.setOptions({ fillColor: 'black', strokeWeight: 2, strokeColor: 'black' });
    setHoveredPolygonId(polygon.id)
  }

  const onPolygonMouseOut = (polygon) => {
    const mapPolygon = getMapPolygon(polygon)
    mapPolygon.setOptions({ fillColor: mapPolygon.initialColor, strokeWeight: 0 });
    setHoveredPolygonId(null);
  }

  const onPolygonClick = (polygon) => () => {
    if (editablePolygonRef.current) {
      editablePolygonRef.current.setOptions({ editable: false });
      if (editablePolygonRef.current.id === polygon.id) {
        setEditablePolygon(null);
        return;
      }
    }
    polygon.setOptions({ editable: true });
    setEditablePolygon(polygon);
  }

  return (
    <Container>
      <Map setMap={setMap} setMaps={setMaps} />
      <Table
        polygons={polygons}
        onPolygonMouseOver={onPolygonMouseOver}
        onPolygonMouseOut={onPolygonMouseOut}
        hoveredPolygonId={hoveredPolygonId}
        changePolygon={changePolygon}
        setColorToMapPolygon={setColorToMapPolygon}
      />
    </Container>
  )
}

export default Dashboard;
