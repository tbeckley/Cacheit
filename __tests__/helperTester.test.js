import addUniqueByProp from 'C:\\Users\\Thomas\\source\\repos\\Cacheit\\src\\util\\reducerHelpers.js';

const before = [
    {
        name: 'personalFinance',
        comments: true,
    },
    {
        name: 'legaladvice',
        comments: true,
    },
    {
        name: 'sysadmin',
        comments: true,
    }
];

const toAdd=[{
    name: 'personalFinance',
    comments: false,
}]

const result = [
    {
        name: 'legaladvice',
        comments: true,
    },
    {
        name: 'sysadmin',
        comments: true,
    },
    {
        name: 'personalFinance',
        comments: false,
    }
];

test('Reducer helper does not duplicate entry', () => {
    expect(addUniqueByProp('name'), before, toAdd).toBe(result);
});