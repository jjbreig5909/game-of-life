import React, { useState, useCallback, useRef, useEffect } from 'react';
import Slider from '@material-ui/core/Slider'
import produce from 'immer'; //Immer is used for "double-buffering", see "produce" function below

const initialSize = { 
  numRows: 25,
  numCols: 25,
}

const possibleNeighbors = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function Grid() {

  const [running, setrunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [sum, setSum] = useState(0);
  const runningRef = useRef(running);
  runningRef.current = running;
  const timeRef = useRef(300);
  const numRows = 25;
  const numCols = 25;
  const [grid, setGrid] = useState(initialState);

  function initialState() {
    const rows = [];
    for (let i = 0; i < numRows; i++) {
      rows.push(Array.from(Array(numCols), () => 0));
    }
    return rows;
  }

  function handleSliderChange(e, newValue){
    timeRef.current = 1000-newValue;
  }

  
  
  const playGame = useCallback(() => {
    if (!runningRef.current) { //Checks to see if game is running
      return;
    }
    setGrid((g) => {
      let newGen = false;
      newGen = false;
      return produce(g, (gridCopy) => { //Using immer for double buffering
        for (let i = 0; i < numRows; i++) { //These for loops iterate through each cell of the grid
          for (let k = 0; k < numCols; k++) {
            let neighbors = 0;
            possibleNeighbors.forEach(([x, y]) => { //Checking for status of neighbors for each cell, board wraps around edges
              const newI = (i + x +numRows) % numRows; 
              const newK = (k + y + numCols) % numCols;
              if (newI >= 0 && newI < numRows && newK >= 0 && newK < numCols) {
                neighbors += g[newI][newK];
              }
            });
            if (neighbors < 2 || neighbors > 3) { //These are the rules of the game.
              gridCopy[i][k] = 0;
            } else if (g[i][k] === 0 && neighbors === 3) {
              newGen = true;
              gridCopy[i][k] = 1;
            }
          }
        }
        if(newGen) {
          setGeneration((num) => (num + 1)); //Iterating each generation number
        }
        setSum(
          gridCopy.flat().reduce((total, cell) => { //Adding up the cell populations
            return total + cell
          })
        )
      });
    });
    setTimeout(playGame, timeRef.current);
  }, [timeRef.current]);

  return (
    <div className = 'container'>
        <div className = 'buttons'>
      <button
        onClick={() => {
          setrunning(!running);
          if (!running) {
            runningRef.current = true;
            playGame();
          }
        }}
      >
        {!runningRef.current ? 'Start' : 'Stop'}
      </button>
      <button
        onClick={() => {
          const rows = [];
          for (let i = 0; i < numRows; i++) {
            rows.push(
              Array.from(Array(numCols), () => (Math.random() > 0.75 ? 1 : 0))
            );
          }
          setGrid(rows);
          setSum(
            grid.flat().reduce((total, cell) => { //Adding up the cell populations
              return total + cell
            })
          )
        }}
      >
        Random
      </button>
      <button
        onClick={() => {
          setGrid(initialState);
          setGeneration(0);
          setSum(0);
        }}
      >
        Reset
      </button>
      </div>
      <div className = 'spacer'>

      </div>
      <div className = 'slider'>
        <Slider 
        defaultValue={300}
        onChange = {handleSliderChange}
        aria-labelledby="discrete-slider-small-steps"
        min={1}
        max={1000}
        valueLabelDisplay="auto"
        />
      </div>
      <div className = 'grid'
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${numCols},15px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div
              key={`${i}-${k}`}
              onClick={() => {
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1;
                });
                setGrid(newGrid);
              }}
              style={{ 
                width: 14,
                height: 15,
                backgroundColor:
                grid[i][k] && sum > 125
                  ? 'green'
                  : grid[i][k] && sum > 85
                  ? 'blue'
                  : grid[i][k] && sum > 50
                  ? 'purple'
                  : grid[i][k] && sum >= 0
                  ? 'red'
                  : undefined,
                border: 'solid 1.5px black',
              }}
            />
          ))
        )}
      </div>
        <p className='info'> Generation: {generation}</p>
        <p className='info'> Cell Population: {sum}</p>
    </div>
  );
}
export default Grid;