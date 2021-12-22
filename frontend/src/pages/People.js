import React, { useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import {Container, Card, Row, Col, ButtonGroup, Button} from "react-bootstrap";


import AppNavbar from "../partials/AppNavbar";
import peopleService from '../services/peopleService'

export default function People() {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const page = urlParams.get('page');
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState(null);
    useEffect(() => {
        peopleService.list({page: page}).then(res => {
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
                    <Container className="py-3">
                        <Row>
                            <Col>
                                <h1>People form Star Wars</h1>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {isLoading && "Loading..."}
                            </Col>
                        </Row>
                        <Row>
                            {data && data.results.map(function(result,index){
                                return(
                                    <Col md={3}>
                                        <Card className="mb-3">
                                            <Card.Body>
                                                <Card.Title>{result.name}</Card.Title>
                                                <Card.Link href={result.url}>View More</Card.Link>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                );
                            })}
                        </Row>
                        <Row className="justify-content-center">
                            {data &&
                            <ButtonGroup>
                                <Button  variant="outline-primary" href={data.previous} disabled={!data.previous}>Prev</Button>
                                <Button variant="outline-primary" href={data.next} disabled={!data.next}>Next</Button>
                            </ButtonGroup>
                            }
                        </Row>
                    </Container>
                </div>
            </main>
        </div>
    )
}