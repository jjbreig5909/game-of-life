import React, {useCallback, useState, useEffect, useRef} from "react";
import produce from 'immer';

function Grid(){
    // Setting initial Grid Size
    startingSize = {
        rows: 25,
        columns: 25,
    }

    const operations = [
        [0, 1],
        [0, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
        [-1, -1],
        [1, 0],
        [-1, 0],
      ];
    
    // Declaring variables
    const [gridSize, setGridSize] = useState(startingSize);
    const [running, setRunning] = useState(false);
    const runningRef = useRef(running);
    runningRef.current = running
    const [generation, setGeneration] = useState(0);
    const [sum, setSum] = useState(0);
    const timeRef=useRef(300);
    const [grid, setGrid] = useState(startingSize)
    const gridRows = 25;
    const gridColumns = 25;
    

    function initialState() {
        const rows = [];
        for( let i=0; i < gridRows; i++) {
            rows.push(Array.from(Array(numCols), () => 0));
        }
        return rows;
    }

    const playGame = useCallback(() => {
        if (!runningRef.current) {
            return;
        }
        setGrid((g) => {
            let validGrid = false;
            validGrid = false;
            return produce(g, (gridCopy) =>{
                for(let i = 0; i<gridRows; i++) {
                    for(let j=0; j<gridColumns; i++) {
                        let neighbors = 0;
                        operations.forEach(([x,y]) => {
                            const newI = i+x;
                            const newJ = j+y;
                            if(newI >= 0 && newI < gridRows && newJ >= 0 && newJ < numCols) {
                                neighbors += g[newI][newJ];
                            }
                        });
                        if(neighbors<2 || neighbors > 3) {
                            gridCopy[i][j] = 0;
                        } else if (g[i][j] === 0 && neighbors === 3) {
                            validGrid = true;
                            gridCopy[i][j] = 1;
                        }
                    }
                }
                if(validGrid){
                    setGeneration((num)=>(num+1));
                }
                setSum(
                    gridCopy.flat().reduce((acc,cv) =>{
                        return acc + cv
                    })
                )
            })
        })
        setTimeout(playGame, timeRef.current);

    }, [timeRef.current]);
    
    return(
        <div>
            Hello World
        </div>
    )
}

export default Grid;
