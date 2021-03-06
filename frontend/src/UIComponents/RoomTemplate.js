import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import MemoizedSquare from './Square';
import { sendNoSimSquares } from '../actions/workstation';

const renderSquare = (
  allSquares,
  WallArrays,
  roomCorners,
  noSimSquares,
  outerSquares
) => {
  let black = null;

  if (WallArrays.includes(allSquares)) {
    black = true;
  } else {
    black = false;
  }

  return (
    <div key={allSquares} style={{ width: '20px', height: '20px' }}>
      <MemoizedSquare
        black={black}
        pos={allSquares}
        walls={WallArrays}
        outerSquares={outerSquares}
        roomCorners={roomCorners}
        noSimSquares={noSimSquares}></MemoizedSquare>
    </div>
  );
};

const RoomTemplate = () => {
  const dispatch = useDispatch();

  let height = useSelector(state => state.extractPositionReducer.height);

  let width = useSelector(state => state.extractPositionReducer.width);

  const outerLeftSide = [];
  const outerRightSide = [];
  const outerTopSide = [];
  const outerBotSide = [];

  let z = 23 - height;
  let x = 40 * z;
  let y = 38 - width;

  // Make outer squares non-droppable zone
  for (let outerLeft = 40; outerLeft <= 920; outerLeft += 40) {
    for (let a = outerLeft; a <= outerLeft + y; a++) {
      outerLeftSide.push(a);
    }
  }

  for (let outerRight = 79; outerRight <= 959; outerRight += 40) {
    for (let b = outerRight; b >= outerRight - y; b--) {
      outerRightSide.push(b);
    }
  }

  for (let outerTop = 0; outerTop <= 39 * (z + 1) + z; outerTop++) {
    outerTopSide.push(outerTop);
  }

  for (let outerBot = 960 - 39 * z - z; outerBot <= 999; outerBot++) {
    outerBotSide.push(outerBot);
  }

  const outerVerticalSquares = outerLeftSide.concat(outerRightSide);
  const outerHorizonalSquares = outerTopSide.concat(outerBotSide);
  const outerSquares = outerVerticalSquares.concat(outerHorizonalSquares);

  // Room Corners
  const roomCorners = [
    42 + x + y - 1,
    78 + x - y,
    922 - x + y - 1,
    958 - x - y,
  ];

  // Black Squares
  let leftSideWallArray = [];
  let rightSideWallArray = [];
  let topSideWallArray = [];
  let botSideWallArray = [];

  for (
    let leftSideWall = 41 + y + x;
    leftSideWall < 941 - x;
    leftSideWall += 40
  ) {
    leftSideWallArray.push(leftSideWall);
  }
  for (
    let rightSideWall = 78 - y + x;
    rightSideWall < 978 - x;
    rightSideWall += 40
  ) {
    rightSideWallArray.push(rightSideWall);
  }

  for (let topSideWall = 42 + x + y; topSideWall < 78 + x - y; topSideWall++) {
    topSideWallArray.push(topSideWall);
  }

  for (
    let botSideWall = 922 - x + y;
    botSideWall < 958 - x - y;
    botSideWall++
  ) {
    botSideWallArray.push(botSideWall);
  }

  const verticalWallArrays = leftSideWallArray.concat(rightSideWallArray);
  const horizontalWallArrays = topSideWallArray.concat(botSideWallArray);
  const WallArrays = verticalWallArrays.concat(horizontalWallArrays);

  let noSimSquares = outerSquares.concat(WallArrays);
  noSimSquares = [...new Set(noSimSquares)];
  dispatch(
    sendNoSimSquares(
      noSimSquares,
      leftSideWallArray,
      rightSideWallArray,
      topSideWallArray,
      botSideWallArray
    )
  );

  const squares = [];
  for (let allSquares = 0; allSquares < 1000; allSquares++) {
    squares.push(
      renderSquare(
        allSquares,
        WallArrays,
        roomCorners,
        noSimSquares,
        outerSquares
      )
    );
  }

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(40, [col] 20px)',
        overflow: 'scroll',
      }}>
      {squares}
    </div>
  );
};

export default RoomTemplate;
