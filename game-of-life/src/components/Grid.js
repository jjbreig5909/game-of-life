import React, { useState, useCallback, useRef, useEffect } from 'react';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import produce from 'immer'; //Immer is used for "double-buffering", see "produce" function below
import './Grid.css';

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
  // Declaring all of the variables here:
  const [running, setRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [population, setPopulation] = useState(0);
  const runningRef = useRef(running);
  runningRef.current = running;
  const timeRef = useRef(500);
  const [gridRows, setGridRows] = useState(25);
  const [gridColumns, setGridColumns] = useState(25);
  const [grid, setGrid] = useState(initialState);

  function initialState() { // Function sets the initial grid size.
    const rows = [];
    for (let i = 0; i < gridRows; i++) {
      rows.push(Array.from(Array(gridColumns), () => 0));
    }
    return rows;
  }

  const marks = [ //Variable needed for slider values
    {
      value: 0,
    label: 'Slowest'
    },
    {
      value: 1000,
      label: 'Fastest'
    }
  ]

  function handleSliderChange(e, newValue){ //Function handles the user adjustible slider
    timeRef.current = 1000-newValue;
  }

  function handleGridRowChange(e, newGridRowSize){
    console.log("value changed")
    setGridRows(newGridRowSize);
    setGrid(initialState)
  }

  
  
  const playGame = useCallback(() => {
    if (!runningRef.current) { //Checks to see if game is running
      return;
    }
    setGrid((g) => {
      let newGen = false;
      newGen = false;
      return produce(g, (gridCopy) => { //Using immer for double buffering
        for (let i = 0; i < gridRows; i++) { //These for loops iterate through each cell of the grid
          for (let k = 0; k < gridColumns; k++) {
            let neighbors = 0;
            possibleNeighbors.forEach(([x, y]) => { //Checking for status of neighbors for each cell, board wraps around edges
              const newI = (i + x +gridRows) % gridRows; 
              const newK = (k + y + gridColumns) % gridColumns;
              if (newI >= 0 && newI < gridRows && newK >= 0 && newK < gridColumns) {
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
        setPopulation(
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
      <Typography variant="h4"><div className="rules-title">The Game of Life</div></Typography>
      <div className = 'cell-info'>
          <p> Generation: {generation}</p>
          <p> Cell Population: {population}</p>
        </div>
      <div className = 'grid'
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${gridColumns},20px)`,
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, k) => (
            <div 
              className = "grid-cells"
              key={`${i}-${k}`}
              onClick={() => {  //Allows users to click grid squares and set them as on or off
                const newGrid = produce(grid, (gridCopy) => {
                  gridCopy[i][k] = grid[i][k] ? 0 : 1; //Ternary setting on or off at coordinates
                });
                setGrid(newGrid);
              }}
              style={{ 
                width: 19,
                height: 20,
                backgroundColor:
                grid[i][k] && population > 100
                  ? '#021859'
                  : grid[i][k] && population >= 0
                  ? '#F25CA2'
                  : undefined,
                border: 'solid 1px black',
              }}
            />
          ))
        )}
      </div>
      <div className = 'buttons'>
      <Button
        color = "primary"
        variant="contained"
        onClick={() => {
          setRunning(!running);
          if (!running) {
            runningRef.current = true;
            playGame();
          }
        }}
      >
        {!runningRef.current ? 'Start' : 'Stop'}
      </Button>
      <Button
        color = "secondary"
        variant="outlined"
        onClick={() => {
          const rows = [];
          for (let i = 0; i < gridRows; i++) {
            rows.push(
              Array.from(Array(gridColumns), () => (Math.random() > 0.75 ? 1 : 0))
            );
          }
          setGrid(rows);
          setPopulation(
            grid.flat().reduce((total, cell) => { //Adding up the cell populations
              return total + cell
            })
          )
        }}
      >
        Random
      </Button>
      <Button
        color= {population===0 ? "disabled" : "secondary"}
        variant = "contained"
        onClick={() => {
          setGrid(initialState);
          setGeneration(0);
          setPopulation(0);
          if(running){
            setRunning(!running)
          }
          
        }}
      >
        Reset
      </Button>
      </div>
      <div className = 'slider'>
        Simulation Speed
        <Slider
        defaultValue={500}
        onChange = {handleSliderChange}
        aria-labelledby="discrete-slider-small-steps"
        min={1}
        max={1000}
        marks={marks}
        valueLabelDisplay="auto"
        />
      </div>
    </div>
  );
}
export default Grid;