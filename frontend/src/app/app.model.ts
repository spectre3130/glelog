export declare interface User {
    email: string,
    username: string,
    name?: string,
    avatar?: string,
    description?: string,
    instagram?: string,
    facebook?: string,
    github?: string,
};

export declare interface Tag {
    name: string;
    value?: string;
    count?: number;
};

export declare interface Post {
    seq?: number,
    title: string
    body: string,
    thumbnail?: string,
    tags: Array<string>,
    count?: number,
    created_at?: Date
    updated_at?: Date
    user: User
}

export declare interface Confirm {
    name: string,
    message: string,
}