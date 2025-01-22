import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './SpotifyCarousel.module.css';

const SpotifyCarousel = () => {
  const songs = [
    {
      name: 'Song 1',
      artist: 'Artist 1',
      albumArt: '/path/to/albumArt1.jpg',
    },
    {
      name: 'Song 2',
      artist: 'Artist 2',
      albumArt: '/path/to/albumArt2.jpg',
    },
    {
      name: 'Song 3',
      artist: 'Artist 3',
      albumArt: '/path/to/albumArt3.jpg',
    },
  ];

  return (
    <div className={styles.carouselContainer}>
      <Carousel showThumbs={false} showStatus={false} infiniteLoop={true} autoPlay={true}>
        {songs.map((song, index) => (
          <div key={index}>
            <img src={song.albumArt} alt={song.name} />
            <p className={styles.legend}>{song.name} - {song.artist}</p>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default SpotifyCarousel;
