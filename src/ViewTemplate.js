import React from 'react'
import {AppBar, Button, Toolbar, Typography} from "@material-ui/core";
import {Link} from "react-router-dom";

const ViewTemplate =()=>{
    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{flexGrow: 1}}>
                        Upload Portfolio Template
                    </Typography>
                    <Link to={"/"}>Upload</Link>
                    <Link to={"/view/all"}>View All</Link>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default ViewTemplate;