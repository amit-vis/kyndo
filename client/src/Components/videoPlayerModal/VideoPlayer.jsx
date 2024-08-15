import { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import ReactPlayer from "react-player";

export const VideoModal = ({show,onHide, sourceVideo,userId})=>{
    const localStorageKey = `video-progress-${userId}-${sourceVideo?._id}`;
    const handleProgress = (progress)=>{
        const percentage = progress.played*100;
        localStorage.setItem(localStorageKey, percentage.toString())
    }
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
                    onProgress={handleProgress}
                />
            </Modal.Body>
        </Modal>
    )
}