import React from "react";
import Typography from '@material-ui/core/Typography';
import './Bio.css';

function Bio() {
    return(
        <div className="bio-container">
            <Typography variant="h4"><div className="bio-title">John Conway</div></Typography>
            <img className="bio-image" src="https://d2r55xnwy6nx47.cloudfront.net/uploads/2020/04/MarianaCook_JohnConway_1160Lede.jpg"/>
            <Typography variant="body1"><div className="bio-text">John Conway was an English mathematician who most notably invented the Game of Life, a cellular automation that is the feature content of this website. A prolific professor at both the University of Cambridge and Princeton University, Conway recently passed away on April 11th, 2020. </div></Typography>
        </div>
    )
}

export default Bio