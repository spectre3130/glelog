export declare interface User {
    email: string
    username: string
    name?: string
    avatar?: string
    description?: string
    instagram?: string
    facebook?: string
    github?: string
};

export declare interface Tag {
    name: string
    value?: string
    count?: number
};

export declare interface Post {
    _id?: string
    seq?: number
    title: string
    body: string
    thumb?: string
    posted?: boolean
    open?: boolean
    description?: string
    tags: Array<string>
    created_at?: Date
    published_at?: Date
    updated_at?: Date
    user: User
}

export declare interface PopularPost {
    seq?: Number
    title: string
    thumb?: string
    created_at?: Date
    updated_at?: Date
    user: User
}

export declare interface Confirm {
    name: string
    message: string
}

export declare interface UploadImage {
    _id: string
    markdown: string
}

export declare interface TabsRoute {
    path: string
    label: string
}