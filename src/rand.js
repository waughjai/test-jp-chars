const createTypecheckFunction = ( fun, types ) => ( ...args ) => {
    if ( args.length !== types.length ) {
        throw new TypeError( `Expected ${ types.length } arguments, got ${ args.length }` );
    }

    for ( let i = 0; i < args.length; i++ )
    {
        switch ( types[ i ] ) {
            case ( 'integer' ):
                if ( !Number.isInteger( args[ i ] ) )
                {
                    throw new TypeError( `Argument ${ i + 1 } is not an integer` );
                }
            break;
            case 'array':
                if ( !Array.isArray( args[ i ] ) )
                {
                    throw new TypeError( `Argument ${ i + 1 } is not an array` );
                }
            break;
            default:
                if ( typeof args[ i ] !== types[ i ] )
                {
                    throw new TypeError( `Argument ${ i + 1 } is not of type ${ types[ i ] }` );
                }
            break;
        }
    }
    return fun( ...args );
};

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
