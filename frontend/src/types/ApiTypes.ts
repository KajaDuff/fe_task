type Label = {
    id: string;
    name: string;
};

type Attribute = {
    id: string;
    name: string;
    createdAt: string; // ISO8601
    labelIds: Array<string>;
    deleted: boolean;
};

type AttributesQueryParams = {
    offset?: number;
    limit?: number;
    searchText?: string;
    sortBy?: "name" | "createdAt";
    sortDir?: "asc" | "desc";
};


type AttributesResponse = {
    data: Array<Attribute>;
    meta: {
        offset: number;
        limit: number;
        searchText: string;
        sortBy: "name" | "createdAt";
        sortDir: "asc" | "desc";
        hasNextPage: boolean;
    };
};

type AttributeByIdResponse = {
    data: Attribute
}

type LabelsQueryParams = {
    offset?: number;
    limit?: number;
}

type LabelsResponse = {
    data: Array<Label>;
    meta: {
        offset: number;
        limit: number;
        hasNextPage: boolean;
    };

}