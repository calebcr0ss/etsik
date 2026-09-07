CREATE TABLE users (
    user_id UUID PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    user_albums JSONB NOT NULL DEFAULT '{}',
    user_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_favorite JSONB NOT NULL DEFAULT '{}'
);

CREATE TABLE media (
    photo_uuid UUID PRIMARY KEY,
    original_name VARCHAR(255) NOT NULL,
    extension VARCHAR(30) NOT NULL,
    metadata JSONB NOT NULL DEFAULT '{}',
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE albums (
    album_id UUID PRIMARY KEY,
    album_name VARCHAR(255) NOT NULL,
    album_description VARCHAR(255),
    album_created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    album_permitted JSONB NOT NULL
);