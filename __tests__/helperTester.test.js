import { addUniqueByProp } from '../src/util/reducerHelper.js';
import { getTimeAgo } from '../src/util/timeHelper';

test('Time ago function returns proper strings', () => {
    const now = Date.now();
    expect(getTimeAgo(null)).toBe('Never');
    expect(getTimeAgo(undefined)).toBe('Never');
    expect(getTimeAgo(now - 30000)).toBe('Less than a minute ago'); // 30 Seconds ago
    expect(getTimeAgo(now - 2.1e+6)).toBe('35 minutes ago'); // 35 minutes ago
    expect(getTimeAgo(now - 4.32e+6)).toBe('1 hour ago'); // 1.2 Hours ago
    expect(getTimeAgo(now - 864001000)).toBe('10 days ago'); // Just over 10 days ago
    expect(getTimeAgo(now - 3.456e+9)).toBe('1 month ago'); // 40 days ago
    expect(getTimeAgo(now - 9.461e+10)).toBe('3 years ago'); // 400 days ago
});

test('Reducer helper functions properly', () => {
    const before = [
        { name: 'personalfinance', comments: true },
        { name: 'legaladvice', comments: true },
        { name: 'sysadmin', comments: true }
    ];

    const preFunc = addUniqueByProp('name', before);
    expect(typeof preFunc).toBe('function'); // Ensure function is curried

    const result1 = [
        { name: 'personalFinance', comments: false },
        { name: 'legaladvice', comments: true },
        { name: 'sysadmin', comments: true },
    ];

    const result2 = [
        { name: 'ooer', comments: true },
        { name: 'personalfinance', comments: true },
        { name: 'legaladvice', comments: true },
        { name: 'sysadmin', comments: true }
    ];

    expect(preFunc([{ name: 'personalFinance', comments: false }])).toEqual(result1);
    expect(preFunc([{ name: 'ooer', comments: true }])).toEqual(result2);
});
