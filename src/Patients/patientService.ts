import { BaseService } from "../Framework/baseService"
import { CreatePatientDto, PatientDto, PatientSearchDto, UpdatePatientDto } from "./patientDto";
import { PatientRepository } from "./patientRepository";

export class PatientService extends BaseService {
    
    /**
     * Perform a "search" to list patients
     * @param {PatientSearchDto} params 
     * @returns {Promise<PatientDto[]>}
     */
     listPatients = async (params: PatientSearchDto) : Promise<PatientDto[]> => {
        try {       
            const result = await this.getRepository<PatientRepository>('patient').search(params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Get a single patient record
     * @param {number} id 
     * @returns {Promise<PatientDto[]>}
     */
    getPatient = async (id: number) : Promise<PatientDto[]> => {
        try {
            const params = {
                id
            } as PatientSearchDto;
        
            const result = await this.getRepository<PatientRepository>('patient').search(params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Create a patient
     * @param {CreatePatientDto} params 
     * @returns 
     */
    createPatient = async (params: CreatePatientDto) => {
        try {
            const result = await this.getRepository<PatientRepository>('patient').create(params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Update a patient record
     * @param {number} id 
     * @param {UpdatePatientDto} params 
     * @returns {Promise<number>}
     */
    updatePatient = async (id: number, params: UpdatePatientDto) : Promise<number> => {
        try {
            const result = await this.getRepository<PatientRepository>('patient').update(id, params);
            return result;
        } catch (err) {
            throw err;
        }
    }

    /**
     * Delete a patient record
     * @param {number} id 
     * @returns Promise<number>
     */
    deletePatient = async (id: number) : Promise<number> => {
        try {
            const result = await this.getRepository<PatientRepository>('patient').delete(id);
            return result;
        } catch (err) {
            throw err;
        }
    }
}