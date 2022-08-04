import React, {useEffect, useState, useRef} from "react";
import { useSelector} from 'react-redux';
import { Particles } from "react-tsparticles";
import { loadFull } from "tsparticles";

import star_filled from "../../../../star_filled.png";
import cardBackground from "../../../../card-bg.jpg";
import cardBackground2 from "../../../../card-bg2.jpg";
import cardBackground3 from "../../../../card-bg3.jpg";

import "./customerhome.css";

import EventSlider from "../../../../components/event/slider/EventSlider";
import TopEventCarousel from "../../../../components/event/topcarousel/TopEventCarousel";
import { loadEvents } from "../../../../services/event/eventService";
import {useNavigate} from "react-router-dom";

function CustomerHome() {

    const [events, setEvents] = useState([]);
    const user = useSelector((state) => state.auth.user);
    const fullDiv = useRef(null);
    const container = useRef(null);
    const navigate = useNavigate();

    const particlesInit = async (main) => {
        console.log(main);
        await loadFull(main);
      };
    
    const particlesLoaded = (container) => {
        console.log(container);
    };
    
    const [r] = useState(<Particles id="tsparticles" container={container} init={particlesInit} loaded={particlesLoaded} options={{
        fpsLimit: 60,
        fullScreen: {
          "enable": true
        },
        interactivity: {
            events: {
                onClick: {
                enable: true,
                mode: "emitter"
                },
            },
            modes: {
                emitters: {
                direction: "none",
                spawnColor: {
                    value: "#ff0000",
                    animation: {
                    h: {
                        enable: true,
                        offset: {
                        min: -1.4,
                        max: 1.4
                        },
                        speed: 0.1,
                        sync: true
                    },
                    l: {
                        enable: true,
                        offset: {
                        min: 20,
                        max: 80
                        },
                        speed: 2,
                        sync: true
                    }
                    }
                },
                life: {
                    count: 1,
                    duration: 0.1,
                    delay: 0.1
                },
                rate: {
                    delay: 0.1,
                    quantity: 100
                },
                size: {
                    width: 0,
                    height: 0
                }
                }
            }
            },
            particles: {
            number: {
                value: 0
            },
            color: {
                value: "#f00"
            },
            shape: {
                type: 'images',
                image: [
                    {
                    src: star_filled,
                    height: 25,
                    width: 25,
                    }
                ]
                },
            opacity: {
            value: 1,
            random: false,
                animation: {
                enable: true,
                speed: 2,
                minimumValue: 0,
                startValue: "max",
                destroy: "min",
                sync: true
                }
            },
            size: {
                value: { min: 3, max: 7 }
            },
            life: {
                duration: {
                sync: true,
                value: 1
                },
                count: 1
            },
            move: {
                enable: true,
                gravity: {
                enable: true
                },
                drift: {
                min: -2,
                max: 2
                },
                speed: { min: 10, max: 30 },
                decay: 0.1,
                direction: "none",
                random: false,
                straight: false,
                outModes: {
                default: "destroy",
                top: "none"
                }
            }
            },
            detectRetina: true
        }
    } />);

    useEffect( () => {/*
        if(user && user.userType === "Organizer"){
            navigate("/organizer/main")
        }*/
        const fetchEvents = async() => {
            const events = await loadEvents();
            setEvents(() => (events));
        }
        fetchEvents().catch(console.error);
    }, []);

    useEffect(() => {
        function handler(e) {
            if (fullDiv.current && !fullDiv.current.contains(e.target)) {
                container.current.plugins.get("emitters").array[0].pause()
            }
        }
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        }
    }, [fullDiv])

    return (
        <div ref={fullDiv} className="container-fluid w-100 h-100" onClick={(e) => {container.current.plugins.get("emitters").array[0].pause()}}>
            <TopEventCarousel
                events={events}
            />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Explore Toronto</h2>
            <EventSlider ref={container} events={events} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Under $100</h2>
            <EventSlider ref={container} events={events} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Closest to you</h2>
            <EventSlider ref={container} events={events} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            {r}
        </div>
    )
}

export default CustomerHome