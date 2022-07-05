export interface StudiesDto {
    id: number,
    studyTitle: string;
    studyParameters?: any;
}

export interface CreateStudiesDto {
    id: number,
    studyTitle: string;
}

export interface UpdateStudiesDto {
    studyTitle?: string;
}

export interface StudiesSearchDto {
    id?: number;
    title?: string;
    sort?: string;
    limit?: number;
    offset?: number;
}