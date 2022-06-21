import { UserDto } from "../userDto";
import { UserEntity } from "../userEntity";

test('User entity can be populated from EntityDto', () => {
    const record = {
        id: 2,
        firstName: 'Thomas',
        lastName: 'Keens',
        email: 'tkeens@chla.usc.edu',
        password: '$2b$10$KRByMlMmMIjnT7KyUFWJ7egMCfiHEPR49f8Em2O7am6MrsMpXerm.'
      } as UserDto;

      const testUser = new UserEntity();
      testUser.setUser(record);

      expect(testUser.id).toEqual(2);
      expect(testUser.firstName).toEqual('Thomas');
      expect(testUser.lastName).toEqual('Keens');
      expect(testUser.email).toEqual('tkeens@chla.usc.edu');
      expect(testUser.password).toEqual('$2b$10$KRByMlMmMIjnT7KyUFWJ7egMCfiHEPR49f8Em2O7am6MrsMpXerm.');
});

test('Validation of an invalid ID fails', () => {
    expect(() => {
        const invalidId = 'henry';
        UserEntity.validateId(invalidId)
    }).toThrow();

    expect(() => {
        const invalidId = -5;
        UserEntity.validateId(invalidId);
    }).toThrow();
});

test('Validation of a valid ID passes', () => {
    const validId = 10;
    const result = UserEntity.validateId(validId);
    expect(result).toEqual(validId);
});

test('Validation of an invalid first name fails', () => {
    expect(() => {
        const invalidName = '';
        const result = UserEntity.validateFirstName(invalidName);
    }).toThrow();

    expect(() => {
        const invalidName = 'This is a very long first name that would not exist in the real world, however we need to make sure our validation works correctly!';
        const result = UserEntity.validateFirstName(invalidName);
    }).toThrow();
});

test('Validation of a valid first name passes', () => {
    const validName = 'Peter';
    const result = UserEntity.validateFirstName(validName);

    expect(result).toEqual(validName);
});

test('Validation of an invalid last name fails', () => {
    expect(() => {
        const invalidName = '';
        const result = UserEntity.validateLastName(invalidName);
    }).toThrow();

    expect(() => {
        const invalidName = 'This is a very long last name that would not exist in the real world, however we need to make sure our validation works correctly!';
        const result = UserEntity.validateLastName(invalidName);
    }).toThrow();
});

test('Validation of a valid last name passes', () => {
    const validName = 'Keens';
    const result = UserEntity.validateLastName(validName);

    expect(result).toEqual(validName);
});

test('Validation of an invalid email fails', () => {
    expect(() => {
        const invalidEmail = '';
        const result = UserEntity.validateLastName(invalidEmail);
    }).toThrow();

    expect(() => {
        const invalidEmail = 'This is a very long email that would not exist in the real world, however we need to make sure our validation works correctly!';
        const result = UserEntity.validateLastName(invalidEmail);
    }).toThrow();
});

test('Validation of a valid email passes', () => {
    const validEmail = 'tkeens@chla.usc.edu';
    const result = UserEntity.validateLastName(validEmail);

    expect(result).toEqual(validEmail);
});

test('2 password hashes of the same string should match', async () => {
    const passString = 'emPtY4aMD';

    const hashedPass = await UserEntity.hashPassword(passString);

    const record = {
        id: 2,
        firstName: 'Thomas',
        lastName: 'Keens',
        email: 'tkeens@chla.usc.edu',
        password: hashedPass
      } as UserDto;

    const testUser = new UserEntity();
    testUser.setUser(record);

    const result = await testUser.doesPasswordMatchHash(passString);

    expect(result).toBe(true);
});

test('2 password hashes of different strings should not match', async () => {
    const passString1 = 'emPtY4aMD';
    const passString2 = 'j30asd7sdjf';

    const hashedPass = await UserEntity.hashPassword(passString1);

    const record = {
        id: 2,
        firstName: 'Thomas',
        lastName: 'Keens',
        email: 'tkeens@chla.usc.edu',
        password: hashedPass
      } as UserDto;

    const testUser = new UserEntity();
    testUser.setUser(record);

    const result = await testUser.doesPasswordMatchHash(passString2);

    expect(result).toBe(false);
});

test('Password hashing algorithm should produce a 60 character string', async () => {
    const passString = 'emPtY4aMD';

    const hashedPass = await UserEntity.hashPassword(passString);

    expect(hashedPass.length).toEqual(60);
});