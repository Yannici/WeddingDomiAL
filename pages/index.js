import React, { useEffect, useState } from "react";
import ReactFullpage from "@fullpage/react-fullpage";
import Head from 'next/head'
import axios from "axios";
import { Row, Col, Form, FormGroup, Label, Input, Button, Alert } from "reactstrap";

// NOTE: if using fullpage extensions/plugins put them here and pass it as props.
const pluginWrapper = () => {
    //require('../static/fullpage.parallax.min.js');
};

const Hooks = () => {
    const [init, setInit] = useState(false);
    const [formData, setFormData] = useState({ name: '', attend: "1" });
    const [alert, setAlert] = useState({ color: 'primary', visible: false, message: '' });

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

    const onSendAttend = (e) => {
        e.preventDefault();

        axios.post("https://domialapi.waproks.de/savereg", formData)
        .then(res => {
            let color = (res.data.success) ? 'success' : 'danger';
            setAlert({ color, visible: true, message: res.data.message });

            if (res.data.success) {
                setFormData({ name: '', attend: '1' });
            }
        }).catch(err => {
            setAlert({ color: 'danger', visible: true, message: 'Es ist ein Fehler aufgetreten: ' + err });
        });
    }

    const handleChange = (e) => {
        let newData = structuredClone(formData);
        newData[e.target.name] = e.target.value;
        setFormData(newData);
    }

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
                <meta name="robots" content="noindex"></meta>
                <link rel="icon" href="/static/icon.ico" type="image/x-icon" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
                <link href="/static/styles.css" rel="stylesheet" />
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Allison&family=Poppins&display=swap" rel="stylesheet" />
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
                                <h1>Wir heiraten!</h1>
                                <h2>Anna-Lena & Dominik</h2>
                                <h2>06. August 2022</h2>
                            </div>
                            <div key="section2" id="section2" className="section">
                                <div className="fp-bg"></div>
                                <h1>Unser Tag</h1>
                                <ul>
                                    <li>14:00 Uhr</li>
                                    <li><img className="tt-icon" style={{verticalAlign: "middle"}} src="/static/images/wedding-rings.png" /> <span style={{verticalAlign: "middle"}}>Trauung</span></li>
                                    <li><img className="tt-icon" style={{verticalAlign: "middle"}} src="/static/images/champagne-glass.png" /> <span style={{verticalAlign: "middle"}}>Sektempfang & Fingerfood</span></li>
                                    <li><img className="tt-icon" style={{verticalAlign: "middle"}} src="/static/images/camera.png" /> <span style={{verticalAlign: "middle"}}>Fotos</span></li>
                                </ul>
                                <ul>
                                    <li>17:00 Uhr</li>
                                    <li><img className="tt-icon" style={{verticalAlign: "middle"}} src="/static/images/grill.png" /> <span style={{verticalAlign: "middle"}}>Grillen & Dessert</span></li>
                                </ul>
                                <ul>
                                    <li>anschließend</li>
                                    <li><img className="tt-icon" style={{verticalAlign: "middle"}} src="/static/images/pig.png" /> <span style={{verticalAlign: "middle"}}>Die Sau raus lassen!</span></li>
                                </ul>
                            </div>
                            <div key="section3" id="section3" className="section">
                                <div className="fp-bg"></div>
                                <h1>Infos</h1>
                                <Row className="justify-content-xs-center">
                                    <Col style={{textAlign: 'right'}}>
                                        <p><strong>Location</strong></p>
                                    </Col>
                                    <Col style={{textAlign: 'left'}}>
                                        <p>Rappenecker Hütte</p>
                                        <p>Rappeneck 1</p>
                                        <p>79254 Oberried</p>
                                    </Col>
                                </Row>
                                <Row className="justify-content-xs-center">
                                    <Col style={{textAlign: 'right'}}>
                                        <p><strong>Übernachtung</strong></p>
                                    </Col>
                                    <Col style={{textAlign: 'left'}}>
                                        <p>Möglich mit eigenem Camper oder Zelt</p>
                                    </Col>
                                </Row>
                                <Row className="justify-content-xs-center">
                                    <Col style={{textAlign: 'right'}}>
                                        <p><strong>Dresscode</strong></p>
                                    </Col>
                                    <Col style={{textAlign: 'left'}}>
                                        <p>Wir überlegen uns noch was.</p>
                                    </Col>
                                </Row>
                                <Row className="justify-content-xs-center">
                                    <Col style={{textAlign: 'right'}}>
                                        <p><strong>Trauzeugen</strong></p>
                                    </Col>
                                    <Col style={{textAlign: 'left'}}>
                                        <p>Lisa Riesterer (Nummer...)</p>
                                        <p>Pirmin Mayer (Nummer...)</p>
                                    </Col>
                                </Row>
                                <Row className="justify-content-xs-center">
                                    <Col style={{textAlign: 'right'}}>
                                        <p><strong>Tipps für Geschenksuchende</strong></p>
                                    </Col>
                                    <Col style={{textAlign: 'left'}}>
                                        <p>Liebe, Gesundheit, Glück und Geld</p>
                                    </Col>
                                </Row>
                            </div>
                            <div key="section4" id="section4" className="section">
                                <div className="fp-bg"></div>
                                <h1>Anmeldung</h1>
                                <Row className="justify-content-xs-center">
                                    <Col sm="12" md={{size: 6, offset: 3}}>
                                        <Form onSubmit={onSendAttend}>
                                            <Input
                                                bsSize="lg"
                                                className="mb-3"
                                                placeholder="Name"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                required
                                            />
                                            <FormGroup check>
                                                <Input
                                                id="radioYes"
                                                name="attend"
                                                value="1"
                                                type="radio"
                                                checked={formData.attend === "1"}
                                                onChange={handleChange}
                                                style={{marginLeft: '-0.75em', marginRight: '0.5em'}}
                                                />
                                                {' '}
                                                <Label check for="radioYes">
                                                    Ich nehme teil
                                                </Label>
                                            </FormGroup>
                                            <FormGroup check className="mb-3">
                                                <Input
                                                id="radioNo"
                                                name="attend"
                                                value="0"
                                                type="radio"
                                                checked={formData.attend === "0"}
                                                onChange={handleChange}
                                                style={{marginLeft: '-0.75em', marginRight: '0.5em'}}
                                                />
                                                {' '}
                                                <Label check for="radioNo">
                                                    Ich nehme <b>nicht</b> teil.
                                                </Label>
                                            </FormGroup>
                                            <Button size="lg" color="light" style={{width: '100%'}}>
                                                Abschicken &raquo;
                                            </Button>
                                            {alert.visible && (
                                                <Alert className="mt-3" color={alert.color}>
                                                    {alert.message}
                                                </Alert>
                                            )}
                                        </Form>
                                    </Col>
                                </Row>
                            </div>
                        </ReactFullpage.Wrapper>
                    )
                }
            />
        </div>
    );
}

export default Hooks;