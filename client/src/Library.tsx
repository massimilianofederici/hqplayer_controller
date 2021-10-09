import './Library.css';
import React from 'react';
import {ILibraryAlbum, ILibraryFolder, ILibraryItem} from "../../api/src/models/library";
import AlbumView from "./AlbumView";
import FolderView from "./FolderView";
import {loadView} from './client/library';
import {Container} from "react-bootstrap";
import PlayerView from "./PlayerView";

export class Library extends React.Component<LibraryProps, LibraryState> {

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.state.libraryItem) {
            if (this.state.libraryItem.hasOwnProperty('folders')) {
                return <Container fluid={true} id="libraryView">
                    <FolderView folder={this.state.libraryItem as ILibraryFolder}/>
                    <PlayerView></PlayerView>
                </Container>
            }
            return <Container>
                <AlbumView album={this.state.libraryItem as ILibraryAlbum}/>

            </Container>
        }
        return <></>
    }

    componentDidMount() {
        loadView(this.props.match.params.viewId)
            .then(data => {
                this.setState({libraryItem: data})
            })
    }

    componentDidUpdate(prevProps: Readonly<LibraryProps>,
                       prevState: Readonly<LibraryState>,
                       snapshot?: any) {
        const prevViewId = prevProps.match.params.viewId
        if (prevViewId !== this.props.match.params.viewId) {
            loadView(this.props.match.params.viewId)
                .then(data => {
                    this.setState({libraryItem: data})
                })
        }
    }
}

export interface LibraryState {
    libraryItem?: ILibraryItem
}

export interface LibraryProps {
    match: {
        params: {
            viewId: string
        }
    }
}