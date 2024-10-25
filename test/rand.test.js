const { randInt, randListEntry, randListIndex, shuffleList } = require( `../src/rand.js` );

test( `Test results are always within expected interval.`, () => {
    for ( let max = -33; max < 33; max++ ) {
        for ( let min = -33; min < max; min++ ) {
            for ( let i = 0; i < 10; i++ ) {
                const result = randInt( max, min );
                expect( result ).toBeGreaterThanOrEqual( min );
                expect( result ).toBeLessThanOrEqual( max );
            }
        }
    }
});

test( `Test randInt only accepts integer arguments.`, () => {
    expect( () => randInt( 'a', 0 ) ).toThrow( TypeError );
    expect( () => randInt( 0, 'a' ) ).toThrow( TypeError );
    expect( () => randInt( 'a', 'a' ) ).toThrow( TypeError );
    expect( () => randInt( 1.5, 0 ) ).toThrow( TypeError );
    expect( () => randInt( 0, 0 ) ).not.toThrow();
});

test( `Test randListIndex returns index from 0 to length o’ list.`, () => {
    const list = Array.from( { length: 10 }, ( _, i ) => i );
    for ( let i = 0; i < 10; i++ ) {
        const result = randListIndex( list );
        expect( result ).toBeGreaterThanOrEqual( 0 );
        expect( result ).toBeLessThanOrEqual( list.length - 1 );
    }
});

test( `Test randListIndex only accepts array argument.`, () => {
    expect( () => randListIndex( 'a' ) ).toThrow( TypeError );
    expect( () => randListIndex( 0 ) ).toThrow( TypeError );
    expect( () => randListIndex( {} ) ).toThrow( TypeError );
    expect( () => randListIndex( [] ) ).not.toThrow();
});

test( `Test randListEntry returns entry from list.`, () => {
    const list = Array.from( { length: 10 }, ( _, i ) => i );
    for ( let i = 0; i < 10; i++ ) {
        const result = randListEntry( list );
        expect( list ).toContain( result );
    }
});

test( `Test randListEntry only accepts array argument.`, () => {
    expect( () => randListEntry( 'a' ) ).toThrow( TypeError );
    expect( () => randListEntry( 0 ) ).toThrow( TypeError );
    expect( () => randListEntry( {} ) ).toThrow( TypeError );
    expect( () => randListEntry( [] ) ).not.toThrow();
});

test( `Test shuffleList returns list o’ same items.`, () => {
    const originalList = Array.from( { length: 10 }, ( _, i ) => i );
    const list = shuffleList( originalList );
    for ( let i = 0; i < 10; i++ ) {
        expect( list ).toContain( originalList[ i ] );
    }
});

test( `Test shuffleList only accepts array argument.`, () => {
    expect( () => shuffleList( 'a' ) ).toThrow( TypeError );
    expect( () => shuffleList( 0 ) ).toThrow( TypeError );
    expect( () => shuffleList( {} ) ).toThrow( TypeError );
    expect( () => shuffleList( [] ) ).not.toThrow();
});