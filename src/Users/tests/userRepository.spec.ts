import { MockUserRepository } from '../mockUserRepository';

test('Mock repository is valid', () => {
    const repo = new MockUserRepository();
    expect(repo).toBeDefined();
});

test('Mock repository search returns 2 records', async () => {
    const repo = new MockUserRepository();
    const results = await repo.search({});

    expect(results.length).toBe(2);
});