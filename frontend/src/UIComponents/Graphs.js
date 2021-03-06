import React from 'react';
import { useSelector } from 'react-redux';

import CarouselGraphPage from './CarouselGraphPage';

import '../styles/graphs.css';

const Graphs = props => {
  const graphs = props.graphData;

  // Find _id of clicked room from LoadPagination
  const clickedRoomID = useSelector(state => state.extractPositionReducer._id);

  // Find data of clicked room
  let currentRoom;
  let totalExhibits;
  let totalAccessPoints;

  for (let i = 0; i < graphs.length; i++) {
    if (graphs[i].roomID === clickedRoomID) {
      currentRoom = graphs[i];
      totalExhibits = currentRoom.totalExhibits;
      totalAccessPoints = currentRoom.totalAccessPoints;
    }
  }

  // Avoid app crash
  if (!currentRoom) {
    return <CarouselGraphPage />;
  }

  let attractionPct = new Array(currentRoom.totalAttractionPower.length).fill(
    0
  );
  let revisitingPct = new Array(currentRoom.totalAttractionPower.length).fill(
    0
  );
  // Find collective totalAttractionPower and totalRevisitingPower for the same room
  // prettier-ignore
  let attractionPower = new Array(currentRoom.totalAttractionPower.length).fill(0);
  // prettier-ignore
  let revisitingPower = new Array(currentRoom.totalRevisitingPower.length).fill(0);
  // Find all the exhibits that got visited in different simulations for the same room
  let totalExhibitsVisited = [];
  // Find types of visitors
  let schoolCounter = 0;
  let familyCounter = 0;
  let otherCounter = 0;
  // Find total visitors
  let totalVisitors = 0;
  // Find data needed for the heatmap
  let rangeX = currentRoom.rangeX;
  let rangeY = currentRoom.rangeY;

  // Access Points graph
  let groupMovementCoords = [''];
  let numberOfVisitorsPerGroup = [''];

  // prettier - ignore;
  let userPerAccessPointConnection = Array(totalAccessPoints.length).fill(0);

  // For every simulation that happened in the current room
  for (let i = 0; i < graphs.length; i++) {
    if (currentRoom.roomID === graphs[i].roomID) {
      // Find total Attraction and Revisiting power of exhibits
      for (let y = 0; y < currentRoom.totalAttractionPower.length; y++) {
        attractionPower[y] += graphs[i].totalAttractionPower[y];
        if (graphs[i].totalAttractionPower[y] === 0) {
          revisitingPower[y] += 0;
        } else {
          revisitingPower[y] += graphs[i].totalRevisitingPower[y] / 120;
        }
      }
      // Find total exhibits visited
      for (let z = 0; z < graphs[i].arrayOfSimulations.length; z++) {
        totalExhibitsVisited = totalExhibitsVisited.concat(
          graphs[i].arrayOfSimulations[z].exhibitsVisited
        );
        // Find the coordinates of the visitors' movement
        if (graphs[i].arrayOfSimulations[z].groupMovementCoords) {
          groupMovementCoords.push(
            graphs[i].arrayOfSimulations[z].groupMovementCoords
          );
        }
        // Find total number of visitors
        if (graphs[i].arrayOfSimulations[z].numberOfVisitors) {
          numberOfVisitorsPerGroup.push(
            graphs[i].arrayOfSimulations[z].numberOfVisitors
          );
        }
        // Find type of visitors
        switch (graphs[i].arrayOfSimulations[z].typeOfVisitors) {
          case 'School':
            schoolCounter += graphs[i].arrayOfSimulations[z].numberOfVisitors;
            break;
          case 'Family':
            familyCounter += graphs[i].arrayOfSimulations[z].numberOfVisitors;
            break;
          case 'Other':
            otherCounter += graphs[i].arrayOfSimulations[z].numberOfVisitors;
            break;
          default:
            break;
        }
      }
      groupMovementCoords.shift();
      numberOfVisitorsPerGroup.shift();
      // Access Points Connected Graph
      for (let g = 0; g < graphs[i].arrayOfSimulations.length; g++) {
        // prettier-ignore
        for (let a = 0; a < graphs[i].totalAccessPoints.length; a++) {
          if (graphs[i].arrayOfSimulations[g].accessPointsConnected.includes(graphs[i].totalAccessPoints[a])) {
            userPerAccessPointConnection[a] += numberOfVisitorsPerGroup[g];
          }
        }
      }
      totalExhibitsVisited = [...new Set(totalExhibitsVisited)];
      totalExhibitsVisited.sort((a, b) => a - b);
      totalVisitors += graphs[i].totalVisitors;
      for (let a = 0; a < currentRoom.totalAttractionPower.length; a++) {
        attractionPct[a] = Math.round(
          (attractionPower[a] / totalVisitors) * 100
        );
        revisitingPct[a] = Math.round(
          (revisitingPower[a] / attractionPower[a]) * 100
        );
      }
    }
  }

  let finalGroupMovementCoords = groupMovementCoords;

  // console.log(attractionPower);
  // console.log(numberOfVisitorsPerGroup);

  // console.log(userPerAccessPointConnection);
  // console.log(groupMovementCoords);
  // console.log(numberOfVisitorsPerGroup);
  // console.log(finalGroupMovementCoords);
  // console.log(arrayOfSimulationsCounter);
  // console.log(`The attraction is: ${attractionPower}`);
  // console.log(`The revisting is: ${revisitingPower}`);
  // console.log(`The total Exhibits visited are: ${totalExhibitsVisited}`);
  // console.log(`There are ${schoolCounter} School`);
  // console.log(`There are ${familyCounter} Family`);
  // console.log(`There are ${otherCounter} Other`);
  // console.log(`The total visitors are: ${totalVisitors}`);

  return (
    <CarouselGraphPage
      attractionPower={attractionPct}
      revisitingPower={revisitingPct}
      totalExhibits={totalExhibits}
      totalExhibitsVisited={totalExhibitsVisited}
      schoolCounter={schoolCounter}
      familyCounter={familyCounter}
      otherCounter={otherCounter}
      totalVisitors={totalVisitors}
      rangeX={rangeX}
      rangeY={rangeY}
      finalGroupMovementCoords={finalGroupMovementCoords}
      numberOfVisitorsPerGroup={numberOfVisitorsPerGroup}
      totalAccessPoints={totalAccessPoints}
      userPerAccessPointConnection={userPerAccessPointConnection}
    />
  );
};

export default Graphs;
