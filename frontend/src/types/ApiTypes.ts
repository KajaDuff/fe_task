export type Label = {
    id: string;
    name: string;
};

export type Attribute = {
    createdAt: string;
    deleted: boolean;
    id: string; // ISO8601
    labelIds: Array<string>;
    name: string;
};

export type SortBy = 'name' | 'createdAt';
export type SortDir = 'asc' | 'desc'

export type AttributesQueryParams = {
    limit?: number;
    offset?: number;
    searchText?: string;
    sortBy?: SortBy;
    sortDir?: SortDir;
};


export type AttributesResponse = {
    data: Array<Attribute>;
    meta: {
        hasNextPage: boolean;
        limit: number;
        offset: number;
        searchText: string;
        sortBy: SortBy;
        sortDir: SortDir;
    };
};

export type AttributeByIdResponse = {
    data: Attribute
}

export type LabelsQueryParams = {
    limit?: number;
    offset?: number;
}

export type LabelsResponse = {
    data: Array<Label>;
    meta: {
        hasNextPage: boolean;
        limit: number;
        offset: number;
    };

}