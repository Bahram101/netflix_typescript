import { useState, useEffect } from "react";
import {
  CheckBadgeIcon,
  CheckIcon,
  XMarkIcon,
  PauseIcon,
} from "@heroicons/react/24/solid";

import {
  HiPlus,
  HiPlay,
  HiSpeakerWave,
  HiSpeakerXMark,
  HiHandThumbUp,
} from "react-icons/hi2";
import MuiModal from "@mui/material/Modal";
import { useRecoilState } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import { Element, Genre, Movie } from "../types/typings";
import ReactPlayer from "react-player";
import toast, { Toaster } from "react-hot-toast";
import { deleteDoc, doc, DocumentData, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";

const Modal = () => {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [movie, setMovie] = useRecoilState(movieState);
  const [trailer, setTrailer] = useState("");
  const [genres, setGenres] = useState<Genre[]>([]);
  const [muted, setMuted] = useState(false);
  const [addedToList, setAddedToList] = useState(false);
  const { user } = useAuth();
  const [movies, setMovies] = useState<DocumentData[] | Movie[]>([]);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!movie) return;

    async function fetchMovie() {
      const data = await fetch(
        `https://api.themoviedb.org/3/${
          movie?.media_type === "tv" ? "tv" : "movie"
        }/${movie?.id}?api_key=${
          process.env.NEXT_PUBLIC_API_KEY
        }&language=en-US&append_to_response=videos`
      );
      const jsonData = await data.json();
      console.log("jsonData", jsonData);

      if (jsonData?.videos) {
        const index = jsonData.videos.results.findIndex(
          (item: Element) => item.type === "Trailer"
        );
        setTrailer(jsonData.videos?.results[index]?.key);
      }
      if (jsonData?.genres) {
        setGenres(jsonData.genres);
      }
    }
    fetchMovie();
  }, [movie]);

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(
    () =>
      setAddedToList(
        movies.findIndex((result) => result.data().id === movie?.id) !== -1
      ),
    [movies]
  );

  const handleList = async () => {
    if (addedToList) {
      await deleteDoc(
        doc(db, "customer", user!.uid, "myList", movie?.id.toString()!)
      );
      toast(`${movie?.title} has been removed`);
    } else {
      await setDoc(
        doc(db, "customer", user!.uid, "myList", movie?.id.toString()!),
        { ...movie }
      );
    }
  };

  console.log("pl", playing);

  return (
    <MuiModal
      open={showModal}
      onClose={handleClose}
      className="fixed !top-10 z-50 mx-auto max-w-4xl scrollbar-hide overflow-y-scroll"
    >
      <>
        <Toaster position="top-center" />
        <button
          onClick={handleClose}
          className="modalButton absolute right-5 top-5 !z-40  bg-[#181818]"
        >
          <XMarkIcon className="w-4 h-4 lg:w-5 lg:h-5" />
        </button>
        <div className="relative pt-[50%]">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${trailer}`}
            width="100%"
            height="100%"
            style={{ position: "absolute", top: "0", left: "0" }}
            playing={!playing}
            muted={muted}
          />
          <div className="absolute bottom-10 flex w-full items-center justify-between px-6">
            <div className="flex space-x-2">
              <button
                className="flex items-center rounded bg-white px-8 text-black  transition hover:bg-[#e6e6e6] font-bold"
                onClick={()=>setPlaying(!playing)}
              >
                {playing ? (
                  <HiPlay className="w-8 h-8 " />
                ) : (
                  <PauseIcon className="w-8 h-8 " />
                )}
              </button>
              <button className="modalButton" onClick={handleList}>
                {addedToList ? (
                  <CheckIcon className="w-5 h-5" />
                ) : (
                  <HiPlus className="w-5 h-5 " />
                )}
              </button>
              <button className="modalButton">
                <HiHandThumbUp className="w-5 h-5 " />
              </button>
            </div>
            <button className="modalButton" onClick={() => setMuted(!muted)}>
              {muted ? (
                <HiSpeakerXMark className="w-5 h-5" />
              ) : (
                <HiSpeakerWave className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
        <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
          <div className="space-y-6 text-lg">
            <div className="flex items-center space-x-2 text-sm">
              <p className="font-semibold text-green-400">
                {movie!.vote_average * 10}% Match
              </p>
              <p className="font-light">
                {movie?.release_date || movie?.first_air_date}
              </p>
              <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                HD
              </div>
            </div>
            <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
              <p className="w-5/6">{movie?.overview}</p>
              <div className="flex flex-col space-y-3 text-sm">
                <div>
                  <span className="text-[gray]">Genres:</span>{" "}
                  {genres.map((genre) => genre.name).join(", ")}
                </div>

                <div>
                  <span className="text-[gray]">Original language:</span>{" "}
                  {movie?.original_language}
                </div>

                <div>
                  <span className="text-[gray]">Total votes:</span>{" "}
                  {movie?.vote_count}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </MuiModal>
  );
};

export default Modal;
