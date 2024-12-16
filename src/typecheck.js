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

module.exports = { createTypecheckFunction };
