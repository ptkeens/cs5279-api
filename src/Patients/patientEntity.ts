import { ValidationError } from "../Validation/ValidationError";
import { Validator } from "../Validation/Validator";

export class PatientEntity {

    static GenderValues = [ 'male', 'female' ];
    static MutationValues = [ '20/25', '20/26', '20/27', '20/28-33', 'NPARM' ];
    static VentilatorySupportValues = [ 'PPV/T', 'NIPPV', 'DP', 'PPV/T+DP' ];
    static SupportHourValues = [ '0-8', '8-20', '20+' ];
    static YesNoValues = [ 'yes', 'no' ];
    
    static validateId = (id: number) : number => {
        return Validator.validatePositiveInteger(id);
    }

    static validateGender = (value: string) => {
        return Validator.validateValueInList(
            PatientEntity.GenderValues, 
            value
        );
    }

    static validateDob = (value: string|Date) => {
        if (typeof value === 'string') {
            return Validator.validateDateString(value);
        } else {
            if (!isNaN(value.getDate())) {
                return value;
            }
        }

        throw new ValidationError(`Unable to validate date`);
    }

    static validateMutation = (value: string) => {
        return Validator.validateValueInList(
            PatientEntity.MutationValues, 
            value
        );
    }

    static validateVentilatorySupport = (value: string) => {
        return Validator.validateValueInList(
            PatientEntity.VentilatorySupportValues, 
            value
        );
    }

    static validateSupportHours = (value: string) => {
        return Validator.validateValueInList(
            PatientEntity.SupportHourValues,
            value
        );
    }

    static validateAgeOfDiagnosis = (value: number) => {
        return Validator.validatePositiveInteger(value);
    }

    static validateYesNo = (value: string) => {
        return Validator.validateValueInList(
            PatientEntity.YesNoValues,
            value
        );
    }
}