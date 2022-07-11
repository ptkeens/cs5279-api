import { BaseService } from '../Framework/baseService';
import { StudiesDto, CreateStudiesDto, StudiesSearchDto, UpdateStudiesDto } from './studiesDto';
import { StudiesRepository } from './studiesRepository';

export class StudiesService extends BaseService {

    /**
     * Perform a "search" to list studies
     * @param {StudiesSearchDto} params 
     * @returns Promise<Array<StudiesDto>>
     */
     listStudies = async (params: StudiesSearchDto) : Promise<Array<StudiesDto>> => {
        try {       
            const result = await this.getRepository<StudiesRepository>('studies').search(params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get a single study record
     * @param {number} id 
     * @returns Promise<Array<UserDto>>
     */
    getStudy = async (id: number) : Promise<Array<StudiesDto>> => {
        try {
            const params = {
                id
            } as StudiesSearchDto;
        
            const result = await this.getRepository<StudiesRepository>('studies').search(params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Create a study
     * @param {CreateUserDto} params 
     * @returns 
     */
    createStudy = async (params: CreateStudiesDto) => {
        try {
            const result = await this.getRepository<StudiesRepository>('studies').create(params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Update a study record
     * @param {number} id 
     * @param {UpdateUserDto} params 
     * @returns Promise<number>
     */
    updateStudy = async (id: number, params: UpdateStudiesDto) : Promise<number> => {
        try {
            const result = await this.getRepository<StudiesRepository>('studies').update(id, params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Delete a study record
     * @param {number} id 
     * @returns Promise<number>
     */
    deleteStudy = async (id: number) : Promise<number> => {
        try {
            const result = await this.getRepository<StudiesRepository>('studies').delete(id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}