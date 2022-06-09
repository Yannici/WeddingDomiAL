import React, { useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Head from 'next/head'

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    require('../static/fullpage.parallax.min.js');
};

const Hooks = () => {
    const
        onLeave = (origin, destination, direction) => {
            console.log("onLeave", { origin, destination, direction });
            // arguments are mapped in order of fullpage.js callback arguments do something
            // with the event
        };

    return (
        <div className="App">
            <Head>
                <title>Dominik & Anna-Lena - Unsere Hochzeitseinladung</title>
                <link rel="icon" href="/static/icon.ico" type="image/x-icon" />
                <link href="/static/styles.css" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
                <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
            </Head>
            <ReactFullpage
                navigation
                navi
                pluginWrapper={pluginWrapper}
                onLeave={onLeave}
                parallax
                css3
                render={() =>
                    console.log("render prop change") || (
                        <ReactFullpage.Wrapper>
                            <div key="section1" id="section1" className="section">
                                <div className="fp-bg"></div>
                                <h1>Hochzeit</h1>
                                <h2>Dominik & Anna-Lena</h2>
                            </div>
                            <div key="section2" id="section2" className="section">
                                <div className="fp-bg"></div>
                                <h1>Domi & AL 2</h1>
                            </div>
                            <div key="section3" id="section3" className="section">
                                <div className="fp-bg"></div>
                                <h1>Domi & AL 3</h1>
                            </div>
                        </ReactFullpage.Wrapper>
                    )
                }
            />
        </div>
    );
}

export default Hooks;