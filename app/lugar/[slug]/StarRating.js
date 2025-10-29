"use client";

import { useState } from 'react';
import { StarIcon as StarSolid } from '@heroicons/react/24/solid';
import { StarIcon as StarOutline } from '@heroicons/react/24/outline';
// 1. IMPORTAR EL CSS MODULE
import styles from './ComentariosLocal.module.css';

export default function StarRating({ rating, setRating }) {
  const [hover, setHover] = useState(0);
  const totalStars = 5;
  const isReadOnly = !setRating;

  return (
    // 2. APLICAR CLASE DEL CSS MODULE
    <div className={styles.starWrapper}> 
      {[...Array(totalStars)].map((_, index) => {
        const ratingValue = index + 1;
        const isFilled = ratingValue <= (hover || rating);

        return (
          <label key={index} style={isReadOnly ? { cursor: 'default' } : {}}>
            {!isReadOnly && (
              <input
                type="radio"
                name="rating"
                value={ratingValue}
                onClick={() => setRating(ratingValue)}
                style={{ display: 'none' }} // Ocultamos el radio
              />
            )}
            
            {/* 3. APLICAR CLASES DEL CSS MODULE */}
            {isFilled ? (
              <StarSolid 
                className={styles.starIconFilled} 
                onMouseEnter={() => !isReadOnly && setHover(ratingValue)}
                onMouseLeave={() => !isReadOnly && setHover(0)}
              />
            ) : (
              <StarOutline 
                className={styles.starIcon} 
                onMouseEnter={() => !isReadOnly && setHover(ratingValue)}
                onMouseLeave={() => !isReadOnly && setHover(0)}
              />
            )}
          </label>
        );
      })}
    </div>
  );
}