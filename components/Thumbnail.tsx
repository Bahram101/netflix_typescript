import Image from "next/image";
import React from "react";
import { Movie } from "../types/typings";

interface Props {
  movie: Movie;
}

const Thumbnail = ({ movie }: Props) => { 

  return (
    <div className="relative h-20 md:h-28 min-w-[150px] md:min-w-[210px] hover:scale-105 transition cursor-pointer">
      <Image
        alt="film_ivatar"
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="  object-cover rounded md:rounded"
        layout="fill"
      />
    </div>
  );
};

export default Thumbnail;
