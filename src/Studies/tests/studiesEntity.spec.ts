import { StudiesEntity } from "../studiesEntity";

test('Validation of an invalid ID fails', () => {
    expect(() => {
        const invalidId = 'henry';
        StudiesEntity.validateId(invalidId)
    }).toThrow();

    expect(() => {
        const invalidId = -5;
        StudiesEntity.validateId(invalidId);
    }).toThrow();
});

test('Validation of a valid ID passes', () => {
    const validId = 10;
    const result = StudiesEntity.validateId(validId);
    expect(result).toEqual(validId);
});

test('Validation of an invalid title fails', () => {
    expect(() => {
        const invalidName = '';
        const result = StudiesEntity.validateTitle(invalidName);
    }).toThrow();

    expect(() => {
        const invalidName = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;
        const result = StudiesEntity.validateTitle(invalidName);
    }).toThrow();
});

test('Validation of a valid title passes', () => {
    const validName = 'Functional abnormalities in brain areas that mediate autonomic nervous system control in advanced heart failure';
    const result = StudiesEntity.validateTitle(validName);

    expect(result).toEqual(validName);
});