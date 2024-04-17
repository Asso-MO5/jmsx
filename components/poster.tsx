'use client'
import { texts } from '@/utils'
import { useState } from 'react'

const siteCreatorLink = 'https://www.pixelart.fr/',
  siteCreatorName = 'Olivier "Kobipixel" Huard',
  imageCreatorLink = '/kobipixel.webp'

/**
 * @description ICI, on affiche l'image avec les infos de son créateur
 */
export function Poster() {
  const [seeFace, setSeeFace] = useState(false)
  return (
    <div>
      <img
        src="/poster.webp"
        alt="Affiche J'MSX 24"
        className="w-full h-full object-cover"
        title="By Kobipixel"
      />
      <div
        className="text-right p-1 relative"
        onMouseEnter={() => setSeeFace(true)}
        onMouseLeave={() => setSeeFace(false)}
      >
        {seeFace && (
          <img
            src={imageCreatorLink}
            alt={siteCreatorName}
            title={siteCreatorName}
            width={64}
            height={64}
            className="rounded-full pointer-events-none absolute right-10 bottom-10"
          />
        )}
        <a href={siteCreatorLink} target="_blank">
          {texts.poster_created_by}
          {siteCreatorName}
        </a>
      </div>
    </div>
  )
}
