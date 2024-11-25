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

// GET LIST ARTIST RAP FRANCAIS
export async function getListArtists() {
  const token = await getAccessToken();

  const response = await fetch(
    'https://api.spotify.com/v1/search?q=genre:"rap francais"&type=artist&limit=20',
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch artist data");
  }

  const listArtists = await response.json();
  return listArtists;
}

// GET LIST TRACKS RAP FRANCAIS
export async function getListTracks() {
  const token = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/playlists/298rv22FYrjBdEuZBB0upz?si=d0786ac0855b42f2/tracks",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch artist data");
  }

  const listTracks = await response.json();
  console.log("---------------------------------------");

  console.log(listTracks);

  return listTracks;
}

export async function getAlbum() {
  const token = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/albums/4beTtJKeg3ITJsiVuxkiV0?si=QH-K3auUTxqgInUQkYP8Mg",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch artist data");
  }

  const getalbum = await response.json();
  return getalbum;
}

export async function getTrack() {
  const token = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/tracks/6b5P51m8xx2XA6U7sdNZ5E?si=077a210306854305?market=FR",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch artist data");
  }

  const track = await response.json();

  return track;
}

export async function testSpotifyApi() {
  const token = await getAccessToken();

  try {
    const response = await fetch(
      'https://api.spotify.com/v1/search?q=genre:"rap français" 0R genre:&type=track&limit=50',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch test API data");
    }

    const resTestSpotifyApi = await response.json();
    return resTestSpotifyApi;
  } catch (error) {
    console.error(error);
    return null;
  }
}
