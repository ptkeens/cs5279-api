export interface StudiesDto {
    id: number,
    title: string;
    studyParameters?: any;
}

export interface CreateStudiesDto {
    id: number,
    title: string;
}

export interface UpdateStudiesDto {
    title?: string;
}

export interface StudiesSearchDto {
    id?: number;
    title?: string;
    sort?: string;
    limit?: number;
    offset?: number;
}