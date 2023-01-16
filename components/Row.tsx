import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import React, { useRef, useState } from "react";
import { Movie } from "../types/typings";
import Thumbnail from "./Thumbnail";

interface Props {
  title: string;
  movies: Movie[];
}

const Row = ({ title, movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const [isMoved, setIsMoved] = useState(false); 
 
  const handleClick = (direction: string) => {
    setIsMoved(true);
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrolled =
        direction === "left"
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth;
      rowRef.current.scrollTo({ left: scrolled, behavior: "smooth" }); 
      
    }
 

  };

  console.log("rrr",rowRef.current?.scrollLeft);

  return (
    <div className="h-40 space-y-0.5 md:space-y-2 mb-5">
      <h2 className="inline text-sm font-semibold cursor-pointer text-[#e5e5e5] transition hover:text-white md:text-2xl">
        {title}
      </h2>
      <div className="group h-30 relative md:-ml-2">
        <ChevronLeftIcon
          onClick={() => handleClick("left")}
          className={`rowArrow left-2 ${!isMoved && "hidden"}`} 
        />
        <div
          ref={rowRef}
          className="flex items-center space-x-2  scrollbar-hide overflow-x-scroll  md:space-x-2.5 md:p-2"
        >
          {movies.map((movie) => (
            <Thumbnail key={movie.id} movie={movie} />
          ))}
        </div>
        <ChevronRightIcon
          onClick={() => handleClick("right")}
          className="rowArrow right-2"
        />
      </div>
    </div>
  );
};

export default Row;
