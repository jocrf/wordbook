import { convertFileName, get } from './index';

function mockFetch (data) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve({
      ok: true,
      json: () => data
    })
  );
}

it('converts input to file name', () => {
  expect(convertFileName('placement')).toBe('/placementdata.json');
});

it('returns a response', async () => {
  fetch = mockFetch('placement'); // eslint-disable-line
  const data = await get('placement');
  expect(data).toEqual('placement');
  expect(fetch).toHaveBeenCalledTimes(1);
});
