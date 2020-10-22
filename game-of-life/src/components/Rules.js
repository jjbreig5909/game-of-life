import React from "react";
import Typography from '@material-ui/core/Typography';
import './Rules.css';

function Rules() {
    return(
        <div className="rules-container">
            <Typography variant="h4"><div className="rules-title">About the Game</div></Typography>
            <Typography variant="body1"><div className="rules-text">This "game" is called the Game of Life. It is an infinite, two-dimensional grid of "cells". Each cell can either be alive or dead and has eight neighbors (horizontaly, vertically, and diagonally). At each "generation" the game evaluates the below rules for each cell.</div></Typography>
            <Typography variant="h4"><div className="rules-title">Rules of the Game</div></Typography>
            <Typography className="rules-text" variant="body1">
                <ol>
                    <li>Any live cell with two or three live neighbours survives.</li>
                    <li>Any dead cell with three live neighbours becomes a live cell.</li>
                    <li>All other live cells die in the next generation. Similarly, all other dead cells stay dead.</li>
                </ol>
            </Typography>
        </div>
    )
}

export default Rules