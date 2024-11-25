import {
  getAlbum,
  getTrack,
  getListArtists,
  getListTracks,
  testSpotifyApi,
} from "@/lib/spotify";
import Image from "next/image";
import React from "react";

interface Artist {
  id: string;
  name: string;
  followers: {
    total: number;
  };
  genres: string[];
  popularity: number;
  images: {
    url: string;
  }[];
}

export default async function ListArtists() {
  //   const getAlbumData = await getAlbum();
  //   const trackData = await getTrack();
  const listTracksData = await getListTracks();

  return (
    <div>
      <iframe
        src="https://open.spotify.com/embed/track/3n3Ppam7vgaVa1iaRUc9Lp?theme=0"
        width="full"
        height="full"
        allow="encrypted-media"
      />
      <p>{
        listTracksData.tracks.items.filter((track: any) => {
          const isPopular = track.track.popularity >= 60;
          const trackDate = new Date(track.track.album.release_date);
          const today = new Date();
          const twoMonthsAgo = new Date();
          twoMonthsAgo.setMonth(today.getMonth() - 2);
          return isPopular && trackDate >= twoMonthsAgo && trackDate <= today;
        }).length
      }</p>
      {listTracksData.tracks.items
        .filter((track: any) => {
          // Filtre pour popularité >= 80
          const isPopular = track.track.popularity >= 60;
          
          // Filtre pour les 2 derniers mois
          const trackDate = new Date(track.track.album.release_date);
          const today = new Date();
          
          const twoMonthsAgo = new Date();
          console.log(twoMonthsAgo);
          twoMonthsAgo.setMonth(today.getMonth() - 2);
          
          const isRecent = trackDate >= twoMonthsAgo && trackDate <= today;
          
          return isPopular && isRecent;
        })
        .map((track: any) => (
          <div
            key={track.track.id}
            className="flex items-center gap-4 p-4 mb-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
          >
            <Image
              src={track.track.album.images[0].url}
              alt={track.track.name}
              width={400}
              height={400}
              className="rounded-md object-cover"
            />
            <div className="flex-1">
              <h1 className="text-lg font-semibold truncate">
                {track.track.name || "Titre inconnu"}
              </h1>
              <p className="text-sm text-gray-500">
                Artiste :{" "}
                {track.track.artists && track.track.artists[0]
                  ? track.track.artists[0].name
                  : "Artiste inconnu"}
              </p>
              <p>Popularité : {track.track.popularity}</p>
              <p className="text-sm text-gray-500">
                Date de sortie : {new Date(track.track.album.release_date).toLocaleDateString('fr-FR')}
              </p>
            </div>
            <div className="flex flex-col items-end">
              {track.track.preview_url ? (
                <audio
                  className="w-32"
                  controls
                  controlsList="nodownload"
                  preload="none"
                >
                  <source src={track.track.preview_url} type="audio/mpeg" />
                  Audio non disponible
                </audio>
              ) : (
                <p className="text-sm text-red-500">Aperçu non dispo</p>
              )}
            </div>
          </div>
        ))}
    </div>
  );
}
