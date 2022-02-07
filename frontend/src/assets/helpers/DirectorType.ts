export interface Director {
    id: number;
    name?: string;
    age?: number;
}

export function isDirector(data: any): data is Director {
    return "age" in data;
}
