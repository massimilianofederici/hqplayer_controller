import './Library.css';
import React from 'react';
import {Button, Card, Col, Container, Row, Table} from "react-bootstrap";
import {ILibraryAlbum, ILibraryFile} from "../../api/src/models/library";
import {useToasts} from 'react-toast-notifications';
import axios from "axios";


function AlbumView(albumViewProps: AlbumViewProps) {

    const {album} = albumViewProps

    const {addToast} = useToasts();

    const formattedDuration = (track: ILibraryFile) => {
        return new Date(track.Duration * 1000).toISOString().substr(14, 5)
    }

    const tracks = album.tracks.map((track) => {
        return <tr key={`track-${track.Key}`}>
            <th scope={"row"}>{track['Track #']}</th>
            <td>{track.Name}</td>
            <td>{formattedDuration(track)}</td>
        </tr>
    })

    const play = async () => {
        try {
            await axios.post(`http://192.168.0.169:9000/api/commands/queue?path=${album.path}`)
            addToast('Queued successfully', {appearance: 'info'})
        } catch (e: any) {
            addToast('Cold not queue playlist: ' + e.response.data.message, {appearance: 'error'})
        }
    }

    return (
        <Container className={"mt-2"}>
            <Row>
                <Col className={"col-sm-12"}>
                    <Card className={"h-100"}>
                        <Card.Body className={"row"}>
                            <Col className={"col-sm-6"}>
                                <p className="card-text">{album.Artist}</p>
                                <Card.Title>{album.Album}</Card.Title>
                                <p className="card-text">{album.Composer}</p>
                            </Col>
                            <img className={"col-sm-6"} src={album.imageUrl} alt={album.Album}/>
                            <Table striped={true}>
                                <thead>
                                <tr>
                                    <th scope={"col"}>#</th>
                                    <th scope={"col"}>Title</th>
                                    <th scope={"col"}>Duration</th>
                                </tr>
                                </thead>
                                <tbody>
                                {tracks}
                                </tbody>
                            </Table>
                            <Button className={"card-link"} onClick={play}>Play</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export interface AlbumViewProps {
    album: ILibraryAlbum
}

export default AlbumView;