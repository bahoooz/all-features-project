// GET SPOTIFY ACCESS TOKEN

export async function getAccessToken(): Promise<string> {
  const client_id = process.env.SPOTIFY_CLIENT_ID as string;
  const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
  const authString = Buffer.from(`${client_id}:${client_secret}`).toString(
    "base64"
  );

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${authString}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  if (!data.access_token) throw new Error("Failed to get access token");
  return data.access_token;
}

// lib/spotify.ts
export interface Artist {
  name: string;
  followers: { total: number };
  genres: string[];
  images: { url: string }[];
  popularity: number;
}

// GET ARTIST DATA

export async function getArtistData(artistId: string): Promise<Artist> {
  const token = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch artist data");
  }

  const artist = await response.json();
  return artist;
}
