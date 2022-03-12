const fs = require('fs')

function init() {
    const lastNumbers = [];
    const finalScores = getFinalScoresOnly();
    
    finalScores.forEach( (score) => {
        const singleScores = score.split('–');
        console.log(singleScores);
        singleScores.forEach( (score) => {
            console.log(score.trim().slice(-1));
            if(isNaN(score.trim().slice(-1))) {
                // console.log('found a non-number', score.trim().slice(-1));
            } else {
                lastNumbers.push(score.trim().slice(-1));
            }
        });
    });
    console.log(lastNumbers);

    const occurrences = lastNumbers.reduce(function (acc, curr) {
        return acc[curr] ? ++acc[curr] : acc[curr] = 1, acc
    }, {});

    console.log(occurrences);
}

function getFinalScoresOnly() {
    try {
        const data = fs.readFileSync('./finalScores', 'utf8');
        const dataArr = data.split('\t');
        const filterTeamStats = dataArr.filter( (elem) => {
            if(elem.includes('\n')) return false;
            return elem;
        });
        const scoresOnly = filterTeamStats.filter( (elem) => {
            if(elem.includes('–')) return elem;
            return false;
        });
        return scoresOnly;
    } catch (err) {
        console.error('problem parsing file', err);
    }
}

init();