import './index.scss';
import React, { useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';

import {
    generateOptionsList,
    generateCharList,
} from './chars.js';
import { randListEntry } from './rand.js';

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

const numberOfTries = 40;

const jpCharOptions = [
    `Hiragana`,
    `Katakana`,
    `Kanji`,
];

const Game = props => {
    const { difficulty, targetType, selectorType, charList, reset } = props;

    const [ correct, setCorrect ] = useState( 0 );
    const [ total, setTotal ] = useState( 0 );
    const [ entry, setEntry ] = useState( randListEntry( charList ) );
    const [ guess, setGuess ] = useState( null );
    const [ optionsList, setOptionsList ] = useState( generateOptionsList( selectorType, entry, difficulty ) );
    const inputRef = useRef( null );

    const next = () => {
        const newEntry = randListEntry( charList );
        setEntry( newEntry );
        setOptionsList( generateOptionsList( selectorType, newEntry, difficulty ) );
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
        { total < numberOfTries && <div>
            <div>Score: { correct } / { total }</div>
            <div className="target">{ entry[ targetType ] }</div>
            { guess !== null && guess === entry[ selectorType ] && <div>Correct!</div> }
            { guess !== null && guess !== entry[ selectorType ] && <div>
                <div>Wrong!</div>
                <div>Correct answer: { entry[ selectorType ] }</div>
            </div> }
            <div>
                { optionsList.map( item => {
                    const className = guess === null
                        ? `btn btn-outline-primary rounded-pill`
                        : (
                            entry[ selectorType ] === item
                                ? `btn btn-success rounded-pill`
                                : (
                                    guess === item
                                        ? `btn btn-danger rounded-pill`
                                        : `btn btn-outline-primary rounded-pill`
                                )
                        );
                    return <button
                        className={ className }
                        disabled={ guess !== null }
                        onClick={ () => tryGuess( item ) }
                    >
                        { item }
                    </button>;
                } ) }
            </div>
            { selectorType === `en` && <div>
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
};

const Canvas = () => {
    const [ difficulty, setDifficulty ] = useState( 1 );
    const [ selectorType, setSelectorType ] = useState( `en` );
    const [ targetType, setTargetType ] = useState( `jp` );
    const [ charList, setCharList ] = useState( [] );
    const [ charOptionsSelected, setCharOptionsSelected ] = useState( [ true, false, false ] );

    const createCheckboxUpdater = index => e => {
        const newCharOptionsSelected = charOptionsSelected.map( ( v, i ) => i === index ? !v : v );
        setCharOptionsSelected( newCharOptionsSelected );
    };

    const play = () => {
        const includedCharTypes = charOptionsSelected.map( ( v, i ) => v ? jpCharOptions[ i ].toLowerCase() : null ).filter( v => v !== null );
        if ( includedCharTypes.length === 0 ) {
            window.alert( `Please select at least one character type.` );
            return;
        }
        setCharList( generateCharList( includedCharTypes, difficulty ) );
    };

    const reset = () => {
        if ( window.confirm( `Are you sure you want to reset the game?` ) ) {
            setCharList( [] );
        }
    };

    return <div>
        { charList.length === 0 && <div>
            <div>
                <h3>Game type:</h3>
                <radiogroup>
                    <div>
                        <label className="form-radio">
                            <input
                                type="radio"
                                checked={ targetType === `jp` }
                                onClick={ () => {
                                    setTargetType( `jp` );
                                    setSelectorType( `en` );
                                } } />
                            JP to EN
                        </label>
                    </div>
                    <div>
                        <label className="form-radio">
                            <input
                                type="radio"
                                checked={ targetType === `en` }
                                onClick={ () => {
                                    setTargetType( `en` );
                                    setSelectorType( `jp` );
                                } } />
                            EN to JP
                        </label>
                    </div>
                </radiogroup>
            </div>
            <div>
                <h3>JP Chars</h3>
                <div>
                    { jpCharOptions.map( ( name, index ) => <label className="form-checkbox">
                        <input type="checkbox" name="selectorType" checked={ charOptionsSelected[ index ] } onClick={ createCheckboxUpdater( index ) } />
                        { name }
                    </label> ) }
                </div>
            </div>
            <div>
                <h3>Difficulty:</h3>
                <radiogroup>
                    { [ ...Array(5).keys() ].map( i => <div>
                        <label className="form-radio">
                            <input
                                type="radio"
                                checked={ difficulty === i + 1 }
                                onClick={ () => setDifficulty( i + 1 ) }
                            />
                            { i + 1 }
                        </label>
                    </div> ) }
                </radiogroup>
            </div>
            <button className="btn btn-primary" onClick={ play }>Play</button>
        </div> }
        { charList.length > 0 && <Game
            difficulty={ difficulty }
            reset={ reset }
            targetType={ targetType }
            selectorType={ selectorType }
            charList={ charList }
        /> }
    </div>;
};

const canvas = document.getElementById( `canvas` );
const root = createRoot( canvas );
root.render( <Canvas /> );
