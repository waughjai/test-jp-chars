const create = list => {
    const enums = (() => {
        const enums = {};
        for ( const key of list ) {
            enums[ key ] = {
                eq: function( v ) {
                    return this.val() === v.val();
                },
                val: () => key,
            };
        }
        return enums;
    })();
    return {
        get: key => {
            if ( !( key in enums ) ) {
                throw new Error( `Invalid enum key: ${ key }` );
            }
            return enums[ key ];
        },
    };
};

module.exports = { create };