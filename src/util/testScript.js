const R = require('ramda');


ls = obj => {
    console.log(JSON.stringify(obj));
}

addLatest = (param, toAdd, existing) => R.sortBy(R.prop(param), (R.uniqBy(R.prop(param), R.concat(toAdd, existing))));

const toAdd = [{ name: 'personalfinance', comments: true }]
const existing = [
    {
        name: 'legaladvice',
        comments: false,
    },
    {
        name: 'topmindsofreddit',
        comments: false,
    },
    { name: 'personalfinance', comments: false }
];

const temp = [{ name: 'personalfinance', comments: false }];

let newObj = addLatest('name', toAdd, existing);
console.log(JSON.stringify(newObj));

