import React, { useEffect, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Head from 'next/head'

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    //require('../static/fullpage.parallax.min.js');
};

const Hooks = () => {
    const [init, setInit] = useState(false);

    const
        onLeave = (origin, destination, direction) => {
            let bg = destination.item.querySelector('.fp-bg');
            bg.style.transform = 'translateX(0px) translateY(0px)';
            bg.classList.remove('fp-notransition');

            if (!origin.isFirst && direction === 'up') {
                let translateY = window.innerHeight*0.65*-1;
                let bgOrigin = origin.item.querySelector('.fp-bg');
                bgOrigin.style.transform = 'translateX(0px) translateY(' + translateY.toFixed(0) + 'px)';
            }
        };

    useEffect(() => {
        if (!init) {
            var sections = document.querySelectorAll('.section');
        
            for (let i = 0; i <= sections.length-1; i++) {
                let bg = sections[i].querySelector('.fp-bg');
                
                if (i > 0) {
                    let translateY = window.innerHeight*0.65*-1;
                    bg.style.transform = 'translateX(0px) translateY(' + translateY.toFixed(0) + 'px)';
                    bg.classList.add('fp-notransition');
                }
            }

            setInit(true);
        }
    }, [init, setInit])

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
                css3
                render={() =>
                    (
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