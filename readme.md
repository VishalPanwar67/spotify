# $\color{#2ecc71}{\text{ Project: }}$ 01auth

## $\color{#f8bbe6}{\text{ End-point: }}$ Register User

### $\color{#d3e667}{\text{ Method: POST}}$

> ```
> http://127.0.0.1:3000/api/auth/register
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  {
    "key": "firstName",
    "value": "NewUser15",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "lastName",
    "value": "AfterSocial",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "username",
    "value": "NewUserAfterSocial15",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "email",
    "value": "NewUserAfterSocial15@gmail.com",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "password",
    "value": "NewUserAfterSocial15",
    "description": "",
    "type": "text",
    "enabled": true
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Login User

### $\color{#d3e667}{\text{ Method: POST}}$

> ```
> http://127.0.0.1:3000/api/auth/login
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  {
    "key": "username",
    "value": "NewUserAfterSocial7",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "password",
    "value": "NewUserAfterSocial7",
    "description": "",
    "type": "text",
    "enabled": true
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Get User me

### $\color{#d3e667}{\text{ Method: GET}}$

> ```
> http://127.0.0.1:3000/api/auth/me
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Subscribe Artist

### $\color{#d3e667}{\text{ Method: GET}}$

> ```
> http://127.0.0.1:3000/api/auth/subscribe/66d0b521ff281e007ca3b847
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Like Song

### $\color{#d3e667}{\text{ Method:  GET}}$

> ```
> http://127.0.0.1:3000/api/auth/like/66d0cb309ba851238c185d8c
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Get User Profile

### $\color{#d3e667}{\text{ Method: GET}}$

> ```
> http://127.0.0.1:3000/api/auth/profile/66756ec79e61bc5b5c977f10
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Update User Profile

### $\color{#d3e667}{\text{ Method: PUT}}$

> ```
> http://127.0.0.1:3000/api/auth/profile/66c0e7d5a34d284b2078aaea
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  {
    "key": "username",
    "value": "vishal17AugChanged",
    "type": "text",
    "enabled": true
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Logout User

### $\color{#d3e667}{\text{ Method: POST}}$

> ```
> http://127.0.0.1:3000/api/auth/logout
> ```

---

---

# $\color{#2ecc71}{\text{ Project: }}$ 02Artist

## $\color{#f8bbe6}{\text{ End-point: }}$ Resister Artist from User

### $\color{#d3e667}{\text{ Method:}}$ POST

> ```
> http://127.0.0.1:3000/api/artist/register
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  {
    "key": "firstName",
    "value": "NewUserAfterSocial7",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "lastName",
    "value": "NewUserAfterSocial7",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "stageName",
    "value": "NewUserAfterSocial7",
    "description": "",
    "type": "text",
    "enabled": true
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Artist Login

### $\color{#d3e667}{\text{ Method:}}$ POST

> ```
> http://127.0.0.1:3000/api/artist/login
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  {
    "key": "stageName",
    "value": "NewUserAfterSocial7",
    "type": "text",
    "enabled": true
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Resister Artist Info

### $\color{#d3e667}{\text{ Method:}}$ POST

> ```
> http://127.0.0.1:3000/api/Artist/artistinfo
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  {
    "key": "bio",
    "value": "this is vishalOnes bio",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "socialLinks",
    "value": "vishalOnesInsta",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "profilePicture",
    "value": "https://imgs.search.brave.com",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "coverPicture",
    "value": "",
    "description": "",
    "type": "text",
    "enabled": false
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Update Artist Profile

### $\color{#d3e667}{\text{ Method:}}$ PUT

> ```
> http://127.0.0.1:3000/api/Artist/updateArtist
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  {
    "key": "firstName",
    "value": "VishalArtist4Update",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "lastName",
    "value": "lastNameUpdate",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "stageName",
    "value": "stageNameUpdate",
    "description": "",
    "type": "text",
    "enabled": true
  },
  { "key": "bio", "value": "Bio Update", "type": "text", "enabled": true },
  {
    "key": "socialLinks",
    "value": "socialLinkUpdate",
    "type": "text",
    "enabled": true
  },
  {
    "key": "profilePicture",
    "value": "https://imgs.search.brave.com",
    "type": "text",
    "enabled": true
  },
  {
    "key": "coverPicture",
    "value": "https://imgs.search.brave.com",
    "type": "text",
    "enabled": true
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Get Current Artist

### $\color{#d3e667}{\text{ Method:}}$ GET

> ```
> http://127.0.0.1:3000/api/Artist/getArtist
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Delete Artist

### $\color{#d3e667}{\text{ Method:}}$ DELETE

> ```
> http://127.0.0.1:3000/api/Artist/artist
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Get All Artists

### $\color{#d3e667}{\text{ Method:}}$ GET

> ```
> http://127.0.0.1:3000/api/Artist/artists
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Get a Artist

### $\color{#d3e667}{\text{ Method:}}$ GET

> ```
> http://127.0.0.1:3000/api/Artist/artistprofile/66d0b521ff281e007ca3b847
> ```

---

---

# $\color{#2ecc71}{\text{ Project: }}$ 03song

## $\color{#f8bbe6}{\text{ End-point: }}$ Create Song

### $\color{#d3e667}{\text{ Method:}}$ PUT

> ```
> http://127.0.0.1:3000/api/song/createSong
> ```

### Body formdata

| Param    | value                                                   | Type |
| -------- | ------------------------------------------------------- | ---- |
| title    | addToAlbum17                                            | text |
| duration | 2                                                       | text |
| album    | 66d0268fea95979a0955e44e                                | text |
| fileUrl  | /C:/Users/visha/Downloads/Music/krushna-flute-63499.mp3 | file |

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Update Song

### $\color{#d3e667}{\text{ Method:}}$ PUT

> ```
> http://127.0.0.1:3000/api/song/66cdd3ffb7c6be46d8c2fe9f
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

| Param    | value                                                   | Type |
| -------- | ------------------------------------------------------- | ---- |
| title    | addToAlbum17                                            | text |
| duration | 2                                                       | text |
| album    | 66d0268fea95979a0955e44e                                | text |
| fileUrl  | /C:/Users/visha/Downloads/Music/krushna-flute-63499.mp3 | file |

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Delete Song

### $\color{#d3e667}{\text{ Method:}}$ DELETE

> ```
> http://127.0.0.1:3000/api/song/66ce2059d77b257376fa2718
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Get All songs

### $\color{#d3e667}{\text{ Method:}}$ GET

> ```
> http://127.0.0.1:3000/api/song/songs
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Get a Song

### $\color{#d3e667}{\text{ Method:}}$ GET

> ```
> http://127.0.0.1:3000/api/song/66cdd3ffb7c6be46d8c2fe9f
> ```

---

# $\color{#2ecc71}{\text{ Project: }}$ 04Album

## $\color{#f8bbe6}{\text{ End-point: }}$ Create Album

### $\color{#d3e667}{\text{ Method:}}$ PUT

> ```
> http://127.0.0.1:3000/api/album/createAlbum
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  {
    "key": "title",
    "value": "ArtistToAlbum1",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "releaseDate",
    "value": "27/08/2020",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "coverImage",
    "value": "https://imgs.search.brave.com",
    "description": "",
    "type": "text",
    "enabled": false
  },
  {
    "key": "songs",
    "value": "66cd94c15dad835e48e16668",
    "description": "",
    "type": "text",
    "enabled": false
  },
  {
    "key": "artist",
    "value": "66cd94c15dad835e48e16668",
    "description": "",
    "type": "text",
    "enabled": false
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Update Album

### $\color{#d3e667}{\text{ Method:}}$ PUT

> ```
> http://127.0.0.1:3000/api/album/updateAlbum/66cd95742efdc0c0f1995264
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  { "key": "title", "value": "albumOwner", "type": "text", "enabled": true },
  { "key": "releaseDate", "value": "Update", "type": "text", "enabled": false },
  {
    "key": "coverImage",
    "value": "https://imgs.search.brave.com",
    "type": "text",
    "enabled": false
  },
  {
    "key": "songs",
    "value": "66cd95742efdc0c0f1995264",
    "type": "text",
    "enabled": false
  },
  {
    "key": "artist",
    "value": "66cd94c15dad835e48e16668",
    "type": "text",
    "enabled": false
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Delete Album

### $\color{#d3e667}{\text{ Method:}}$ DELETE

> ```
> http://127.0.0.1:3000/api/album/album/66ce20f1d77b257376fa2734
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Get All Albums

### $\color{#d3e667}{\text{ Method:}}$ GET

> ```
> http://127.0.0.1:3000/api/album/albums
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Get a Album

### $\color{#d3e667}{\text{ Method:}}$ GET

> ```
> http://127.0.0.1:3000/api/album/album/66d0268fea95979a0955e44e
> ```

---

# $\color{#2ecc71}{\text{ Project: }}$ 05Playlist

## $\color{#f8bbe6}{\text{ End-point: }}$ Create Playlist

### $\color{#d3e667}{\text{ Method:}}$ PUT

> ```
> http://127.0.0.1:3000/api/playlist/playlists
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  {
    "key": "name",
    "value": "playlist2",
    "description": "",
    "type": "text",
    "enabled": true
  },
  {
    "key": "description",
    "value": "this is playlist two",
    "description": "",
    "type": "text",
    "enabled": true
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Update Playlist

### $\color{#d3e667}{\text{ Method:}}$ PUT

> ```
> http://127.0.0.1:3000/api/playlist/playlist/66ce3422ae3ec14e11b11196
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  {
    "key": "name",
    "value": "playlist2Update",
    "type": "text",
    "enabled": false
  },
  {
    "key": "description",
    "value": "this is playlist two Update",
    "type": "text",
    "enabled": true
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Delete Playlist

### $\color{#d3e667}{\text{ Method:}}$ DELETE

> ```
> http://127.0.0.1:3000/api/playlist/playlist/66ce3422ae3ec14e11b11196
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Add song to playlist

### $\color{#d3e667}{\text{ Method:}}$ PUT

> ```
> http://127.0.0.1:3000/api/playlist/addSongFromPlaylist/66d213fdbf33375ee89134f4
> ```

#### $\color{#0add08}{\text{ Body (raw)}}$

```json
[
  {
    "key": "songs",
    "value": "66d03e763cbbf5ac29d38b49",
    "type": "text",
    "enabled": true
  }
]
```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Remove song form Playlist

### $\color{#d3e667}{\text{ Method:}}$ PUT

> ```
> http://127.0.0.1:3000/api/playlist/removeSongFromPlaylist/66ce35770d8c85caa96d58e6/song/66870ad6169dcedcb841add7
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Get All Playlists

### $\color{#d3e667}{\text{ Method:}}$ GET

> ```
> http://127.0.0.1:3000/api/playlist/playlists
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Get a Playlist

### $\color{#d3e667}{\text{ Method:}}$ GET

> ```
> http://127.0.0.1:3000/api/playlist/playlist/66ce35770d8c85caa96d58e6
> ```

---

---

# $\color{#2ecc71}{\text{ Project: }}$ 06notifications

## $\color{#f8bbe6}{\text{ End-point: }}$ Get All Notification

### $\color{#d3e667}{\text{ Method:}}$ GET

> ```
> http://127.0.0.1:3000/api/notification
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$ Delete a notification

### $\color{#d3e667}{\text{ Method:}}$ DELETE

> ```
> http://127.0.0.1:3000/api/notification/66d208998d96f14449dc330a
> ```

---

---

# $\color{#2ecc71}{\text{ Project: }}$ 07recommendations

## $\color{#f8bbe6}{\text{ End-point: }}$Recommendations of the song by Mutual User liked Songs

### $\color{#d3e667}{\text{ Method:}}$ Get

> ```
>  http://127.0.0.1:3000/api/recomds/song
> ```

---

# $\color{#2ecc71}{\text{ Project: }}$ 08Other

## $\color{#f8bbe6}{\text{ End-point: }}$Search

### $\color{#d3e667}{\text{ Method:}}$ Get

> ```
>   http://127.0.0.1:3000/api/search/search?query=song1
> ```

---

## $\color{#f8bbe6}{\text{ End-point: }}$stream_ID

### $\color{#d3e667}{\text{ Method:}}$ Get

> ```
>   http://127.0.0.1:3000/api/stream/66d03e763cbbf5ac29d38b49
> ```

---
