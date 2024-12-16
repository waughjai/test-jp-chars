const { createTypecheckFunction } = require( './typecheck.js' );

const randInt = createTypecheckFunction(
    ( max, min ) => Math.floor( ( Math.random() * ( max + 1 - min ) ) + min ),
    [ 'integer', 'integer' ]
);

const randListIndex = createTypecheckFunction(
    list => randInt( list.length - 1, 0 ),
    [ 'array' ]
);

const randListEntry = createTypecheckFunction(
    list => list[ randListIndex( list ) ],
    [ 'array' ]
);

const shuffleList = createTypecheckFunction(
    list => {
        const shuffled = [ ...list ];
        for ( let i = list.length - 1; i > 0; i-- )
        {
            const j = randInt( i, 0 );
            [ shuffled[ i ], shuffled[ j ] ] = [ shuffled[ j ], shuffled[ i ] ];
        }
        return shuffled;
    },
    [ 'array' ]
);

module.exports = { randInt, randListEntry, randListIndex, shuffleList };
