export interface Video {
    hentai_video: {
        description?: string;
        is_visible?: boolean;
        is_hard_subtitled: boolean;
        created_at_unix: number;
        released_at_unix: number;
        is_banned_in?: string;
        titles: {
            lang: string;
            kind: 'official' | 'main' | 'syn';
            title: string;
        }[];
        id: number;
        name: string;
        slug: string;
        views: number;
        interests: number;
        poster_url: string;
        cover_url: string;
        brand: string;
        brand_id: number;
        duration_in_ms: number;
        is_censored: boolean;
        rating: number;
        likes: number;
        dislikes: number;
        downloads: number;
        monthly_rank: number;
        created_at: number;
        released_at: number;
    };
    hentai_tags: {
        id: number;
        text: string;
        count: number;
        description: string;
        wide_image_url: string;
        tall_image_url: string;
    }[];
    hentai_franchise: {
        id: number;
        name: string;
        slug: string;
        title: string;
    };
    hentai_franchise_hentai_videos: unknown[];
    brand: {
        id: number;
        title: string;
        slug: string;
        count: number;
    };
    videos_manifest: {
        servers: {
            streams: {
                height: number;
                id: number;
            }[];
        }[];
    };
}

export interface PartialPlaylist {
    count: number;
    created_at: string;
    id: number;
    hentai_video_slug: string;
    poster_url: string;
    slug: string;
    title: string;
    updated_at: string;
    user_id: number;
    views: number;
}

export interface PartialUser {
    id: number;
    effective_avatar_url: string;
    name: string;
    slug: string;
}

export interface PartialVideo {
    id: number;
    name: string;
    titles: string[];
    slug: string;
    description: string;
    views: number;
    interests: number;
    poster_url: string;
    cover_url: string;
    brand: string;
    brand_id: number;
    duration_in_ms: number;
    is_censored: boolean;
    rating: number;
    likes: number;
    dislikes: number;
    downloads: number;
    monthly_rank: number;
    tags: string[];
    created_at: number;
    released_at: number;
}

export interface Playlist {
    fapi: {
        data: { id: number; }[];
        meta: { total: number; };
    };
    playlist: {
        title: string;
        created_at: string;
        updated_at: string;
        poster_url: string;
        views: number;
        count: number;
        hentai_video_slug: string;
    };
    playlist_owner: Record<'name' | 'slug' | 'effective_avatar_url', string>;
}

export interface User {
    user_channel_user: Record<
        | 'created_at'
        | 'updated_at'
        | 'name'
        | 'slug'
        | 'discord_user_id'
        | 'discord_username'
        | 'effective_avatar_url',
        string
    > & { video_views: number; };
    user_channel_user_achievements: Record<'title' | 'created_at', string>[];
    user_channel: {
        views: number;
        banner_url: string;
    };
    user_channel_playlists: {
        title: string;
        slug: string;
        created_at: string;
        count: number;
        poster_url: string;
        views: number;
    }[];
}