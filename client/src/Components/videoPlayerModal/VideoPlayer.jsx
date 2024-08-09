import { Button, Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

export const VideoModal = ({show,onHide, sourceVideo})=>{
    return(
        <Modal show={show} fullscreen={true} onHide={onHide}>
            <Modal.Header closeButton>
                <h1 className="text-danger">{sourceVideo?.title}</h1>
            </Modal.Header>
            <Modal.Body>
                <ReactPlayer
                    url={sourceVideo?.videoUrl}
                    playing={true}
                    controls={true}
                    light={<img src={sourceVideo?.courseThumbnail} alt={sourceVideo?.title}/>}
                    width="100%"
                    height="100%"
                    volume={null}
                />
            </Modal.Body>
        </Modal>
    )
}