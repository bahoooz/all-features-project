// app/artist/[artistId]/page.tsx
import { getArtistData, Artist } from "@/lib/spotify";
import Image from "next/image";

interface ArtistPageProps {
  params: { artistId: string };
}

export default async function ArtistPage({ params }: ArtistPageProps) {
  const { artistId } = params;
  const artist: Artist = await getArtistData(artistId);

  return (
    <div className="text-center flex flex-col items-center justify-center m-36">
      <h1>{artist.name}</h1>
      <p>Followers: {artist.followers.total}</p>
      <p>Genres: {artist.genres.join(", ")}</p>
      <p>Popularity: {artist.popularity}</p>
      <Image
        src={artist.images[0].url}
        alt={artist.name}
        width={200}
        height={200}
        className="object-cover"
      />
    </div>
  );
}