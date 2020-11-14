import { fetchData } from '../utils/fetchData';

describe('test fetching data from backend', () => {
  it('fetchData result is correct', async () => {
    await expect(
      fetchData('key', { city: 'melbourne' })
    ).resolves.toContainKeys(['request', 'location', 'current']);
  });
});
