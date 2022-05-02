import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import "./ContentModal.css"
import { useEffect } from 'react';
import { useState } from 'react';
import { unavailable, img_500, unavailableLandscape } from '../config/config';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Carousel from "../Carousel/Carousel";

const style = {
    // position: 'absolute',
    // top: '50%',
    // left: '50%',
    // transform: 'translate(-50%, -50%)',
    // bgcolor: 'background.paper',
    border: '1px solid #39445a',
    color: "white",
    boxShadow: 24,
    p: 4,
    width: "90%",
    height: "80%",
    backgroundColor: "#39445a",
    borderRadius: 10,

};

export default function TransitionsModal({ children, media_type, id }) {
    const [open, setOpen] = React.useState(false);
    const [modalContent, setModalContent] = useState();
    const [video, setVideo] = useState()
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchModalData = () => {

        fetch(`https://api.themoviedb.org/3/${media_type}/${id}?api_key=55d3986357276fb32520164149dcabe4&language=en-US`)
            .then(res => res.json())
            .then(json => setModalContent(json));
        { console.log(media_type) }
    }

    const fetchVideoData = () => {
        fetch(`https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=55d3986357276fb32520164149dcabe4&language=en-US`)
            .then(res => res.json())
            .then(json => setVideo(json.results[0]?.key))

    }

    useEffect(() => {

        fetchModalData()
        fetchVideoData()
    }, [])

    return (
        <div>
            <div className="box" onClick={handleOpen}>{children}</div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >

                <Fade in={open}>
                    {modalContent && (
                        <Box sx={style}>

                            <div className="ContentModal">
                                <img
                                    src={
                                        modalContent.poster_path
                                            ? `${img_500}/${modalContent.poster_path}`
                                            : unavailable
                                    }
                                    alt={modalContent.name || modalContent.title}
                                    className="ContentModal__portrait"
                                />
                                <img
                                    src={
                                        modalContent.backdrop_path
                                            ? `${img_500}/${modalContent.backdrop_path}`
                                            : unavailableLandscape
                                    }
                                    alt={modalContent.name || modalContent.title}
                                    className="ContentModal__landscape"
                                />
                                <div className="ContentModal__about">
                                    <span className="ContentModal__title">
                                        {modalContent.name || modalContent.title} (
                                        {(
                                            modalContent.first_air_date ||
                                            modalContent.release_date ||
                                            "-----"
                                        ).substring(0, 4)}
                                        )
                                    </span>
                                    {modalContent.tagline && (
                                        <i className="tagline">{modalContent.tagline}</i>
                                        // console.log({modalContent.tagline)
                                    )}

                                    <span className="ContentModal__description">
                                        {modalContent.overview}
                                    </span>

                                    <div>
                                        <Carousel id={id} media_type={media_type} />
                                    </div>

                                    <Button
                                        variant="contained"
                                        startIcon={<YouTubeIcon />}
                                        color="secondary"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                        Watch the Trailer
                                    </Button>
                                </div>
                            </div>

                        </Box>
                    )}
                </Fade>
            </Modal>
        </div >
    )
}
