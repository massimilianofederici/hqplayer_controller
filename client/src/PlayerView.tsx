import {Container} from "react-bootstrap";
import './PlayerView.css'
import {Play, SkipBackward, SkipForward} from 'react-bootstrap-icons';


function PlayerView(props: PlayerViewProps) {

    return (
        <Container className="fixed-bottom"
                   fluid={true}
                   id={"player"}>
            <div className={"container-fluid player__content"}>
                <div style={{alignItems: 'center', marginTop: '5px'}} className={"row"}>
                    <div className={"col-md-auto"}>
                        <img
                            className="player__thumbnail"
                            src={"http://192.168.0.207:52199/MCWS/v1/Browse/Image?ID=1013&UseStackedImages=0&Square=1"}/>
                    </div>
                    <div className={"col"}>
                        <div>
                            <div>III. Introduzione. Allegro vivace</div>
                            <div style={{fontSize: 'smaller', color: 'var(--bs-light)'}}>Alexander String Quartet -
                                Bartók &
                                Kodály: The Complete String Quartets
                            </div>
                        </div>
                    </div>
                    <div className={"col col-md-2"} style={{textAlign: 'right'}}>
                        <SkipBackward className={"player__icon"}></SkipBackward>
                        <Play className={"player__icon"}></Play>
                        <SkipForward className={"player__icon"}></SkipForward>
                    </div>
                </div>
            </div>
        </Container>
    );
}

export interface PlayerViewProps {

}

export default PlayerView;