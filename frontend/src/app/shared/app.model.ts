export declare interface User {
    email: string,
    username: string,
    name: string,
    avatar: string,
};

export declare interface Tag {
    name: string;
};

export declare interface Post {
    seq?: number,
    title: string
    body: string,
    thumbnail?: string,
    tags: Array<string>,
    created_at?: Date
    updated_at?: Date
    user: User
}