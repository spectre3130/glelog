export interface User {
    email: string
    username: string
    name?: string
    avatar?: string
    description?: string
    instagram?: string
    facebook?: string
    github?: string
};

export interface Tag {
    name: string
    value?: string
    count?: number
};

export interface Post {
    _id?: string
    seq?: number
    title: string
    body: string
    thumb?: string
    posted?: boolean
    open?: boolean
    description?: string
    tags: string[]
    slug?: string
    created_at?: Date
    updated_at?: Date
    user: User
    changed?: boolean
}

export interface Content {
    title?: string;
    body?: string;
}

export interface PopularPost {
    seq?: Number
    title: string
    thumb?: string
    slug?: string
    created_at?: Date
    updated_at?: Date
    user: User
}

export interface Confirm {
    name: string
    message: string
}

export interface UploadImage {
    _id: string
    markdown: string
}

export interface TabsItem {
    path: string
    name: string
}