import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";

import AppNavbar from "../partials/AppNavbar";
import Container from "react-bootstrap/Container";
import peopleService from "../services/peopleService";
import {Col, Row, Table} from "react-bootstrap";

export default function Person() {
    const params = useParams();
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    useEffect(() => {
        peopleService.get(params.id).then(res => {
            console.log(res.message);
            if(res.success){
                setData(res.data);
                setLoading(false);
            }
        });
    },[]);
    return (
        <div>
            <header>
                <AppNavbar/>
            </header>
            <main>
                <div>
                    <Container>
                        <Row>
                            <Col>
                                <h1>Person from Star Wars</h1>
                            </Col>
                        </Row>
                        <hr/>
                        <Row>
                            <Col>
                                {isLoading && "Loading..."}
                            </Col>
                        </Row>
                        <Row>
                            <Col md="8" className="mx-auto">
                                {data &&
                                <div>
                                    <h4>Personal Details</h4>
                                    <Table striped bordered className="bg-white">
                                        <tbody>
                                        <tr>
                                            <th>Name</th>
                                            <td>{data.name}</td>
                                        </tr>
                                        <tr>
                                            <th>Height</th>
                                            <td>{data.height}</td>
                                        </tr>
                                        <tr>
                                            <th>Mass</th>
                                            <td>{data.mass}</td>
                                        </tr>
                                        <tr>
                                            <th>Hair Color</th>
                                            <td>{data.hair_color}</td>
                                        </tr>
                                        <tr>
                                            <th>Skin Color</th>
                                            <td>{data.skin_color}</td>
                                        </tr>
                                        <tr>
                                            <th>Gender</th>
                                            <td>{data.gender}</td>
                                        </tr>
                                        <tr>
                                            <th>Birth year</th>
                                            <td>{data.birth_year}</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                    <h4>Species</h4>
                                    <Table striped bordered className="bg-white">
                                        <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Average Lifespan</th>
                                            <th>Classification</th>
                                            <th>Language</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.species && data.species.map(function(s){
                                            return(
                                                <tr>
                                                    <td>{s.name}</td>
                                                    <td>{s.average_lifespan}</td>
                                                    <td>{s.classification}</td>
                                                    <td>{s.language}</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </Table>
                                    <h4>Films</h4>
                                    <Table striped bordered className="bg-white">
                                        <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Director</th>
                                            <th>Producers</th>
                                            <th>Release Date</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.films.length && data.films.map(function(f){
                                            return(
                                                <tr>
                                                    <td>{f.title}</td>
                                                    <td>{f.director}</td>
                                                    <td>{f.producer}</td>
                                                    <td>{f.release_date}</td>
                                                </tr>
                                            )
                                        })}
                                        </tbody>
                                    </Table>
                                    <h4>Home Planet</h4>
                                    <Table striped bordered className="bg-white">
                                        <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Terrain</th>
                                            <th>Population</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {data.homeworld &&
                                            <tr>
                                                <td>{data.homeworld.name}</td>
                                                <td>{data.homeworld.terrain}</td>
                                                <td>{data.homeworld.population}</td>
                                            </tr>
                                        }
                                        </tbody>
                                    </Table>
                                </div>
                                }
                            </Col>
                        </Row>
                    </Container>
                </div>
            </main>
        </div>
    )
}