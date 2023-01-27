import { useState, useEffect } from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState); 
  const [movie, setMovie] = useRecoilState(movieState)
  const [currentMovie, setCurrentMovie] = useState({})

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      ).then((response) => response.json());  
      setCurrentMovie(data)
    }

    fetchMovie();
  }, [movie]);

  console.log('cm',currentMovie)

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <MuiModal open={showModal} onClose={handleClose}>
      <>
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 bg-[#181818] "
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div></div>
      </>
    </MuiModal>
  );
};

export default Modal;
