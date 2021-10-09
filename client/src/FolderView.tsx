import './Library.css';
import React from 'react';
import {Card, Col, Container, Row} from "react-bootstrap";
import {ILibraryFolder} from "../../api/src/models/library";
import {Link} from "react-router-dom";

function FolderView(props: FolderViewProps) {

    const cards = props.folder.folders?.map((folder) => {
        return <Col key={`card-${folder.Key}`} md={2} className={"mb-2"}>
            <Card border={"0"}  className={"h-100"}>
                <Card.Img variant="top" src={folder.imageUrl}/>
                <Card.Body>
                    <Card.Title>{folder.Name}</Card.Title>
                </Card.Body>
                <Link to={`/library/${folder.Key}`} className={"stretched-link"}/>
            </Card>
        </Col>
    })
    return (
        <Container className={"mt-2"} fluid={true}>
            <Row>
                {cards}
            </Row>
        </Container>
    );
}

export interface FolderViewProps {
    folder: ILibraryFolder
}

export default FolderView;
