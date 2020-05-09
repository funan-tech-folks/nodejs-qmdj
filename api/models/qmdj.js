// const ds = require('../../lib/connect-to-arangodb');

const model = {};

model.getJiaZhiSymbols = (params) => {

    // Method to generate and return the 60 possible
    // JiaZhi Symbols basing on
    // 10 TianGan symbols and 12 DiZhi symbols.
    //
    // This is the basic symbol table used for 
    // determining the NianZhu (year) symbol of
    // a specific year in the Chinese Calendaring system.

    return new Promise((resolve, reject) => {

        const arrayTianGan = ['甲', '乙', '丙', '丁', '戊','己','庚','辛','壬','癸'];
        const arrayDiZhi = ['子','丑','寅','卯','晨','巳','午','未','申','酉','戌','亥'];

        const _input = {};
        _input.rowsDiZhi = generatePossibleRowsCombiDiZhi(arrayDiZhi);
        _input.rowTianGan = [...arrayTianGan];

        const _symbols = generateSymbols(_input);

        return resolve(_symbols);

    })
}

module.exports = model;

// private functions

const generatePossibleRowsCombiDiZhi = (params) => {

    // initialize
    const symbolsDiZhi = [...params];
    const numberOfElements = symbolsDiZhi.count;
    let startElementFirst = '';
    let startElementSecond = '';

    const rows = [];
    let notTheEnd = true;

    // do while
    while ( notTheEnd ){

        if( startElementFirst.trim() === '' && startElementSecond.trim() === ''){

            // first loop.
            startElementFirst = params[0];
            startElementSecond = params[1];

        }
        
        // get the last 2 element in the DiZhi symbols
        const endElementFirst = symbolsDiZhi.pop();
        const endElementSecond = symbolsDiZhi.pop();

        const rowContent = {};
        rowContent.elements = [...symbolsDiZhi];
        rowContent.kongMang = `${endElementFirst}${endElementSecond}`;
        rows.push(rowContent);

        // insert the last 2 elements of the DiZhi symbols into the front
        symbolsDiZhi.unshift(endElementSecond, endElementFirst);

        if( endElementSecond.trim() === startElementFirst && endElementFirst.trim() === startElementSecond.trim()){
            
            // looped through all the possible DiZhi symbols combination (in group of 10 element)
            notTheEnd = false;
        }
    }

    return rows;
    
}

const generateSymbols = (params) => {

    // generate the 60 possible sysmbols
    const _rowTianGan = [...params.rowTianGan];
    const _rowsDiZhi = [...params.rowsDiZhi];

    const _symbols = _rowsDiZhi.map((item, index) => {

        const _elements = item.elements;

        const _row = _elements.map((entry, index) => {
            return `${_rowTianGan[index]}${entry}`;
        })

        return _row;
    })

    return _symbols;

}