import './index.scss';
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import { randListEntry, shuffleList } from './rand.js';

const hiragana = {
    main: {
        "∅": {
            a: 'あ',
            i: 'い',
            u: 'う',
            e: 'え',
            o: 'お',
        },
        k: {
            a: 'か',
            i: 'き',
            u: 'く',
            e: 'け',
            o: 'こ',
        },
        s: {
            a: 'さ',
            i: 'し',
            u: 'す',
            e: 'せ',
            o: 'そ',
        },
        t: {
            a: 'た',
            i: 'ち',
            u: 'つ',
            e: 'て',
            o: 'と',
        },
        n: {
            a: 'な',
            i: 'に',
            u: 'ぬ',
            e: 'ね',
            o: 'の',
            "∅": 'ん',
        },
        h: {
            a: 'は',
            i: 'ひ',
            u: 'ふ',
            e: 'へ',
            o: 'ほ',
        },
        m: {
            a: 'ま',
            i: 'み',
            u: 'む',
            e: 'め',
            o: 'も',
        },
        y: {
            a: 'や',
            u: 'ゆ',
            o: 'よ',
        },
        r: {
            a: 'ら',
            i: 'り',
            u: 'る',
            e: 'れ',
            o: 'ろ',
        },
        w: {
            a: 'わ',
            o: 'を',
        },
    }
};

const getRomaji = ( consonant, vowel ) => {
    if ( consonant === "∅" ) {
        return vowel;
    } else {
        const combined = `${ consonant }${ vowel }`;
        switch ( combined ) {
            case ( `si` ):
                return `shi`;
            case ( `ti` ):
                return `chi`;
            case ( `tu` ):
                return `tsu`;
            case ( `hu` ):
                return `fu`;
            case ( `n∅`):
                return `n`;
            default:
                return combined;
        }
    }
}

const generateHiraganaList = selectorType => {
    const list = [];
    for ( const [ consonant, group ] of Object.entries( hiragana.main ) ) {
        for ( const [ vowel, item ] of Object.entries( group ) ) {
            list.push( { hiragana: item, romaji: getRomaji( consonant, vowel ) } );
        }
    }
    return selectorType === `romaji` ? list : shuffleList( list );
};

const getGradeLetter = percentage => {
    if ( percentage >= 0.9 ) {
        return `A`;
    } else if ( percentage >= 0.8 ) {
        return `B`;
    } else if ( percentage >= 0.7 ) {
        return `C`;
    } else if ( percentage >= 0.6 ) {
        return `D`;
    } else {
        return `F`;
    }
};

const getGradeSign = percentage => {
    const remain = percentage - Math.floor( percentage );
    if ( percentage === 1.0 || remain >= 0.7 ) {
        return `+`;
    } else if ( remain <= 0.2 ) {
        return `-`;
    }
    return ``;
};

const getGrade = ( correct, total ) => {
    const percentage = correct / total;
    return `${ getGradeLetter( percentage ) }${ getGradeSign( percentage ) }`;
};

const FinalScore = ( { correct, total } ) => <div>
    <div>Final Score: { correct } / { total } — { Math.round( correct / total * 100 ) }%</div>
    <div>Grade: { getGrade( correct, total ) }</div>
</div>;

const numberOfTries = 3;

const Game = props => {
    const { targetType, selectorType, hiraganaList, reset } = props;

    const [ correct, setCorrect ] = useState( 0 );
    const [ total, setTotal ] = useState( 0 );
    const [ entry, setEntry ] = useState( randListEntry( hiraganaList ) );
    const [ guess, setGuess ] = useState( null );
    const inputRef = useRef( null );

    const next = () => {
        setEntry( randListEntry( hiraganaList ) );
        setGuess( null );
        if ( inputRef?.current ) {
            inputRef.current.value = ``;
        }
    };

    const tryGuess = guess => {
        setGuess( guess );
        if ( guess === entry[ selectorType ] ) {
            setCorrect( prevCorrect => prevCorrect + 1 );
        }
        setTotal( prevTotal => prevTotal + 1 );
    };

    return <div>
        <h2>Testing Hiragana</h2>
        { total < numberOfTries && <div>
            <div>Score: { correct } / { total }</div>
            <div className="target">{ entry[ targetType ] }</div>
            { guess !== null && guess === entry[ selectorType ] && <div>Correct!</div> }
            { guess !== null && guess !== entry[ selectorType ] && <div>
                <div>Wrong!</div>
                <div>Correct answer: { entry[ selectorType ] }</div>
            </div> }
            <div>
                { hiraganaList.map( item => {
                    const className = guess === null
                        ? `btn btn-outline-primary rounded-pill`
                        : (
                            entry[ selectorType ] === item[ selectorType ]
                                ? `btn btn-success rounded-pill`
                                : (
                                    guess === item[ selectorType ]
                                        ? `btn btn-danger rounded-pill`
                                        : `btn btn-outline-primary rounded-pill`
                                )
                        );
                    return <button
                        className={ className }
                        disabled={ guess !== null }
                        onClick={ () => tryGuess( item[ selectorType ] ) }
                    >
                        { item[ selectorType ] }
                    </button>;
                } ) }
            </div>
            { selectorType === `romaji` && <div>
                <input
                    ref={ inputRef }
                    disabled={ guess !== null }
                    type="text"
                    onKeyDown={ e => {
                        if ( e.key === `Enter` ) {
                            tryGuess( e.target.value );
                        }
                    }}
                />
            </div> }
            <div>{ guess !== null && <button className="btn btn-primary" onClick={ next }>Next</button> }</div>
        </div> }
        { total >= numberOfTries && <FinalScore correct={ correct } total={ total } /> }
        <div><button className="btn btn-danger" onClick={ reset }>Reset</button></div>
    </div>;
}

const Canvas = () => {
    const [ targetType, setTargetType ] = useState( null );
    const [ selectorType, setSelectorType ] = useState( `hiragana` );
    const [ hiraganaList, setHiraganaList ] = useState( [] );

    const targetHiragana = () => {
        setTargetType( `hiragana` );
        setSelectorType( `romaji` );
        setHiraganaList( generateHiraganaList( `romaji` ) );
    };

    const targetRomaji = () => {
        setTargetType( `romaji` );
        setSelectorType( `hiragana` );
        setHiraganaList( generateHiraganaList( `hiragana` ) );
    };

    const reset = () => {
        if ( window.confirm( `Are you sure you want to reset the game?` ) ) {
            setTargetType( null );
            setSelectorType( `hiragana` );
            setHiraganaList( [] );
        }
    };

    return <div>
        { targetType === null && <div>
            <h2>Testing Hiragana</h2>
            <h3>Choose a target type:</h3>
            <button className="btn btn-primary" onClick={ targetHiragana }>Hiragana</button>
            <button className="btn btn-primary" onClick={ targetRomaji }>Romaji</button>
        </div> }
        { targetType !== null && <Game
            reset={ reset }
            targetType={ targetType }
            selectorType={ selectorType }
            hiraganaList={ hiraganaList }
        /> }
    </div>;
};

const canvas = document.getElementById( `canvas` );
const root = createRoot( canvas );
root.render( <Canvas /> );
