import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import React from 'react'
import { Movie } from '../types/typings'

interface Props{
  title: string,
  movies: Movie[]
}

const Row = ({title, movies}: Props) => {
  return (
    <div>
      <h2>{title}</h2>
      <div>
        <ChevronLeftIcon/>
        <ChevronRightIcon/>
      </div>
    </div>
  )
}

export default Row