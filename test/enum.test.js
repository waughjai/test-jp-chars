const Enum = require( '../src/enum' );

test( `Test enum works as expected`, () => {
    const dir = Enum.create([ `north`, `south`, `east`, `west` ]);
    expect( () => dir.get( `north`) ).not.toThrow();
    expect( () => dir.get( `south` ) ).not.toThrow();
    expect( () => dir.get( `east` ) ).not.toThrow();
    expect( () => dir.get( `west` ) ).not.toThrow();
    expect( () => dir.get( `cheese` ) ).toThrow();
    expect( dir.get( `north` ).eq( dir.get( `north` ) ) ).toBe( true );
});