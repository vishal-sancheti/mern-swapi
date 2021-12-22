import React from 'react';
import AppNavbar from "../partials/AppNavbar";
import {Container} from "react-bootstrap";

export default function Home(){
    return (
        <div>
            <header>
                <AppNavbar/>
            </header>
            <main>
                <div className="jumbotron">
                    <Container>
                        <h1 className="display-4">STARWARS!</h1>
                        <p className="lead">This is a directory of StarWars characters.</p>
                        <hr className="my-4"/>
                        <a className="btn btn-primary btn-lg" href="people" role="button">Get Started</a>
                    </Container>
                </div>
            </main>
        </div>
    )
}