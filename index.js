const axios = require('axios');
const fs = require('fs');
const util = require('util');
const appendFile = util.promisify(fs.appendFile);

let pairs = ['Water', 'Fire', 'Wind', 'Earth'];
let results = new Set(pairs);
let queue = [...pairs];
let processedPairs = new Set();

const getPair = async (first, second) => {
    const pairKey = first < second ? `${first}-${second}` : `${second}-${first}`;

    if (processedPairs.has(pairKey)) {
        return;
    }

    processedPairs.add(pairKey);

    const response = await axios.get(`https://neal.fun/api/infinite-craft/pair?first=${first}&second=${second}`, {
        headers: {
            'Accept': '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            'Accept-Language': 'fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7',
            'Dnt': '1',
            'Referer': 'https://neal.fun/infinite-craft/',
            'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Opera GX";v="106"',
            'Sec-Ch-Ua-Mobile': '?0',
            'Sec-Ch-Ua-Platform': '"Windows"',
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0'
        }
    });

    if (!results.has(response.data.result)) {
        results.add(response.data.result);
        queue.push(response.data.result);
        const pairData = {
            firstParent: first,
            secondParent: second,
            result: response.data
        };
        console.log(pairData)
        await appendFile('pairs.json', JSON.stringify(pairData, null, 2) + ',\n');
    }
};

const getAllPairs = async () => {
    while (queue.length > 0) {
        const current = queue.shift();
        const promises = pairs.map(pair => getPair(current, pair));
        await Promise.all(promises);
    }
};

getAllPairs();