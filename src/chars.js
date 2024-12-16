const { createTypecheckFunction } = require( './typecheck.js' );
const { shuffleList } = require( './rand.js' );

const chars = Object.freeze({
    hiragana: {
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
        },
        extended: {
            g: {
                a: 'が',
                i: 'ぎ',
                u: 'ぐ',
                e: 'げ',
                o: 'ご',
            },
            z: {
                a: 'ざ',
                i: 'じ',
                u: 'ず',
                e: 'ぜ',
                o: 'ぞ',
            },
            d: {
                a: 'だ',
                i: 'ぢ',
                u: 'づ',
                e: 'で',
                o: 'ど',
            },
            b: {
                a: 'ば',
                i: 'び',
                u: 'ぶ',
                e: 'べ',
                o: 'ぼ',
            },
            p: {
                a: 'ぱ',
                i: 'ぴ',
                u: 'ぷ',
                e: 'ぺ',
                o: 'ぽ',
            },
        },
        compound: {
            k: {
                ya: 'きゃ',
                yu: 'きゅ',
                yo: 'きょ',
            },
            s: {
                ya: 'しゃ',
                yu: 'しゅ',
                yo: 'しょ',
            },
            t: {
                ya: 'ちゃ',
                yu: 'ちゅ',
                yo: 'ちょ',
            },
            n: {
                ya: 'にゃ',
                yu: 'にゅ',
                yo: 'にょ',
            },
            h: {
                ya: 'ひゃ',
                yu: 'ひゅ',
                yo: 'ひょ',
            },
            m: {
                ya: 'みゃ',
                yu: 'みゅ',
                yo: 'みょ',
            },
            r: {
                ya: 'りゃ',
                yu: 'りゅ',
                yo: 'りょ',
            },
            g: {
                ya: 'ぎゃ',
                yu: 'ぎゅ',
                yo: 'ぎょ',
            },
            z: {
                ya: 'じゃ',
                yu: 'じゅ',
                yo: 'じょ',
            },
            d: {
                ya: 'ぢゃ',
                yu: 'ぢゅ',
                yo: 'ぢょ',
            },
            b: {
                ya: 'びゃ',
                yu: 'びゅ',
                yo: 'びょ',
            },
            p: {
                ya: 'ぴゃ',
                yu: 'ぴゅ',
                yo: 'ぴょ',
            },
        }
    },
    katakana: {
        main: {
            "∅": {
                a: 'ア',
                i: 'イ',
                u: 'ウ',
                e: 'エ',
                o: 'オ',
            },
            k: {
                a: 'カ',
                i: 'キ',
                u: 'ク',
                e: 'ケ',
                o: 'コ',
            },
            s: {
                a: 'サ',
                i: 'シ',
                u: 'ス',
                e: 'セ',
                o: 'ソ',
            },
            t: {
                a: 'タ',
                i: 'チ',
                u: 'ツ',
                e: 'テ',
                o: 'ト',
            },
            n: {
                a: 'ナ',
                i: 'ニ',
                u: 'ヌ',
                e: 'ネ',
                o: 'ノ',
                "∅": 'ン',
            },
            h: {
                a: 'ハ',
                i: 'ヒ',
                u: 'フ',
                e: 'ヘ',
                o: 'ホ',
            },
            m: {
                a: 'マ',
                i: 'ミ',
                u: 'ム',
                e: 'メ',
                o: 'モ',
            },
            y: {
                a: 'ヤ',
                u: 'ユ',
                o: 'ヨ',
            },
            r: {
                a: 'ラ',
                i: 'リ',
                u: 'ル',
                e: 'レ',
                o: 'ロ',
            },
            w: {
                a: 'ワ',
                o: 'ヲ',
            },
        },
        extended: {
            g: {
                a: 'ガ',
                i: 'ギ',
                u: 'グ',
                e: 'ゲ',
                o: 'ゴ',
            },
            z: {
                a: 'ザ',
                i: 'ジ',
                u: 'ズ',
                e: 'ゼ',
                o: 'ゾ',
            },
            d: {
                a: 'ダ',
                i: 'ヂ',
                u: 'ヅ',
                e: 'デ',
                o: 'ド',
            },
            b: {
                a: 'バ',
                i: 'ビ',
                u: 'ブ',
                e: 'ベ',
                o: 'ボ',
            },
            p: {
                a: 'パ',
                i: 'ピ',
                u: 'プ',
                e: 'ペ',
                o: 'ポ',
            },
        },
        compound: {
            k: {
                ya: 'キャ',
                yu: 'キュ',
                yo: 'キョ',
            },
            s: {
                ya: 'シャ',
                yu: 'シュ',
                yo: 'ショ',
            },
            t: {
                ya: 'チャ',
                yu: 'チュ',
                yo: 'チョ',
            },
            n: {
                ya: 'ニャ',
                yu: 'ニュ',
                yo: 'ニョ',
            },
            h: {
                ya: 'ヒャ',
                yu: 'ヒュ',
                yo: 'ヒョ',
            },
            m: {
                ya: 'ミャ',
                yu: 'ミュ',
                yo: 'ミョ',
            },
            r: {
                ya: 'リャ',
                yu: 'リュ',
                yo: 'リョ',
            },
            g: {
                ya: 'ギャ',
                yu: 'ギュ',
                yo: 'ギョ',
            },
            z: {
                ya: 'ジャ',
                yu: 'ジュ',
                yo: 'ジョ',
            },
            d: {
                ya: 'ヂャ',
                yu: 'ヂュ',
                yo: 'ヂョ',
            },
            b: {
                ya: 'ビャ',
                yu: 'ビュ',
                yo: 'ビョ',
            },
            p: {
                ya: 'ピャ',
                yu: 'ピュ',
                yo: 'ピョ',
            },
        }
    },
    kanji: {
        main: {
            "一": {
                kanji: '一',
                on: 'いち',
                kun: 'ひと',
                meaning: 'one',
            },
            "二": {
                kanji: '二',
                on: 'に',
                kun: 'ふた',
                meaning: 'two',
            },
            "三": {
                kanji: '三',
                on: 'さん',
                kun: 'み',
                meaning: 'three',
            },
            "四": {
                kanji: '四',
                on: 'し',
                kun: 'よん',
                meaning: 'four',
            },
            "五": {
                kanji: '五',
                on: 'ご',
                kun: 'いつ',
                meaning: 'five',
            },
            "六": {
                kanji: '六',
                on: 'ろく',
                kun: 'む',
                meaning: 'six',
            },
            "七": {
                kanji: '七',
                on: 'しち',
                kun: 'なな',
                meaning: 'seven',
            },
            "八": {
                kanji: '八',
                on: 'はち',
                kun: 'や',
                meaning: 'eight',
            },
            "九": {
                kanji: '九',
                on: 'きゅう',
                kun: 'ここの',
                meaning: 'nine',
            },
            "十": {
                kanji: '十',
                on: 'じゅう',
                kun: 'とお',
                meaning: 'ten',
            },
        }
    }
});

const getRomaji = createTypecheckFunction(
    ( consonant, vowel ) => {
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
                case ( `zi` ):
                    return `ji`;
                case ( `di` ):
                    return `ji`;
                case ( `du` ):
                    return `zu`;
                case ( `sya` ):
                    return `sha`;
                case ( `syu` ):
                    return `shu`;
                case ( `syo` ):
                    return `sho`;
                case ( `tya` ):
                    return `cha`;
                case ( `tyu` ):
                    return `chu`;
                case ( `tyo` ):
                    return `cho`;
                case ( `zya` ):
                    return `ja`;
                case ( `zyu` ):
                    return `ju`;
                case ( `zyo` ):
                    return `jo`;
                case ( `dya` ):
                    return `ja`;
                case ( `dyu` ):
                    return `ju`;
                case ( `dyo` ):
                    return `jo`;
                default:
                    return combined;
            }
        }
    },
    [ `string`, `string` ]
);

const generateGenericOptionsList = ( charType, difficultyType, getter ) => Object.freeze(
    Object.entries( chars[ charType ][ difficultyType ] ).map(
        ( [ consonant, group ] ) => Object.entries( group ).map(
            ( [ vowel, item ] ) => getter( item, consonant, vowel )
        )
    ).flat( 1 )
);

const generateGenericENOptionsList = ( charType, difficultyType ) => generateGenericOptionsList(
    charType,
    difficultyType,
    ( item, consonant, vowel ) => getRomaji( consonant, vowel )
).reduce(( list, item ) => list.includes( item ) ? list : [ ...list, item ], []);

const generateGenericJPOptionsList = ( charType, difficultyType ) => generateGenericOptionsList( charType, difficultyType, item => item );

const mainRomajiOptionsList = generateGenericENOptionsList( `hiragana`, `main` );
const extendedRomajiOptionsList = [ ...mainRomajiOptionsList, ...generateGenericENOptionsList( `hiragana`, `extended` ) ];
const compoundRomajiOptionsList = [ ...extendedRomajiOptionsList, ...generateGenericENOptionsList( `hiragana`, `compound` ) ];

const mainHiraganaOptionsList = generateGenericJPOptionsList( `hiragana`, `main` );
const extendedHiraganaOptionsList = [ ...mainHiraganaOptionsList, ...generateGenericJPOptionsList( `hiragana`, `extended` ) ];
const compoundHiraganaOptionsList = [ ...extendedHiraganaOptionsList, ...generateGenericJPOptionsList( `hiragana`, `compound` ) ];
const mainKatakanaOptionsList = generateGenericJPOptionsList( `katakana`, `main` );
const extendedKatakanaOptionsList = [ ...mainKatakanaOptionsList, ...generateGenericJPOptionsList( `katakana`, `extended` ) ];
const compoundKatakanaOptionsList = [ ...extendedKatakanaOptionsList, ...generateGenericJPOptionsList( `katakana`, `compound` ) ];

const generateGenericKanjiOptionsList = ( difficultyType, charType ) => Object.freeze(
    Object.entries( chars.kanji[ difficultyType] ).map(
        ( [ kanji, item ] ) => item[ charType ]
    )
);

const mainKanjiOptionsList = generateGenericKanjiOptionsList( `main`, `kanji` );
const mainKanjiDefinitionList = generateGenericKanjiOptionsList( `main`, `meaning` );

const romajiOptionsList = Object.freeze([
    mainRomajiOptionsList,
    extendedRomajiOptionsList,
    compoundRomajiOptionsList,
    compoundRomajiOptionsList,
    compoundRomajiOptionsList,
]);

const jpOptionsList = Object.freeze({
    hiragana: [
        mainHiraganaOptionsList,
        extendedHiraganaOptionsList,
        compoundHiraganaOptionsList,
        compoundHiraganaOptionsList,
        compoundHiraganaOptionsList,
    ],
    katakana: [
        mainKatakanaOptionsList,
        extendedKatakanaOptionsList,
        compoundKatakanaOptionsList,
        compoundKatakanaOptionsList,
        compoundKatakanaOptionsList,
    ],
});

const kanjiOptionsList = Object.freeze({
    jp: [
        mainKanjiOptionsList,
        mainKanjiOptionsList,
        mainKanjiOptionsList,
        mainKanjiOptionsList,
        mainKanjiOptionsList,
    ],
    en: [
        mainKanjiDefinitionList,
        mainKanjiDefinitionList,
        mainKanjiDefinitionList,
        mainKanjiDefinitionList,
        mainKanjiDefinitionList,
    ]
});

const generateGenericCharList = ( charType, difficultyType ) => Object.freeze(
    Object.entries( chars[ charType ][ difficultyType ] ).map(
        ( [ consonant, group ] ) => Object.entries( group ).map(
            ( [ vowel, item ] ) => ({ jp: item, en: getRomaji( consonant, vowel ), type: charType })
        )
    ).flat( 1 )
);

const generateKanjiCharList = ( difficultyType ) => Object.freeze(
    Object.entries( chars.kanji[ difficultyType ] ).map(
        ( [ jp, group ] ) => ({ jp, en: group.meaning, type: `kanji` })
    )
);

const mainHiraganaCharList = generateGenericCharList( `hiragana`, `main` );
const extendedHiraganaCharList = [ ...mainHiraganaCharList, ...generateGenericCharList( `hiragana`, `extended` ) ];
const compoundHiraganaCharList = [ ...extendedHiraganaCharList, ...generateGenericCharList( `hiragana`, `compound` ) ];
const mainKatakanaCharList = generateGenericCharList( `katakana`, `main` );
const extendedKatakanaCharList = [ ...mainKatakanaCharList, ...generateGenericCharList( `katakana`, `extended` ) ];
const compoundKatakanaCharList = [ ...extendedKatakanaCharList, ...generateGenericCharList( `katakana`, `compound` ) ];
const mainKanjiCharList = generateKanjiCharList( `main` );

const charLists = Object.freeze({
    hiragana: [
        mainHiraganaCharList,
        extendedHiraganaCharList,
        compoundHiraganaCharList,
        compoundHiraganaCharList,
        compoundHiraganaCharList,
    ],
    katakana: [
        mainKatakanaCharList,
        extendedKatakanaCharList,
        compoundKatakanaCharList,
        compoundKatakanaCharList,
        compoundKatakanaCharList,
    ],
    kanji: [
        mainKanjiCharList,
        mainKanjiCharList,
        mainKanjiCharList,
        mainKanjiCharList,
        mainKanjiCharList,
    ],
});

const generateOptionsList = createTypecheckFunction(
    ( selectorType, term, difficulty ) => {
        if ( difficulty < 1 || difficulty > 5 ) {
            throw new TypeError( `Difficulty must be between 1 and 5.` );
        }

        if ( term.type === 'kanji' ) {
            return shuffleList( [
                ...shuffleList( [ ...kanjiOptionsList[ selectorType ][ difficulty - 1 ] ].filter( v => v !== term[ selectorType ] ) ).slice( 0, 7 ),
                term[ selectorType ],
            ] );
        } else {
            if ( selectorType === `en` ) {
                return romajiOptionsList[ difficulty - 1 ];
            } else {
                return shuffleList( jpOptionsList[ term.type ][ difficulty - 1 ] );
            }
        }
    },
    [ `string`, `object`, `integer` ]
);

const generateCharList = ( includedCharTypes, difficulty ) => {
    if ( difficulty < 1 || difficulty > 5 ) {
        throw new TypeError( `Difficulty must be between 1 and 5.` );
    }
    return includedCharTypes.map( charType => charLists[ charType ][ difficulty - 1 ] ).flat( 1 );
};

module.exports = {
    generateOptionsList,
    generateCharList,
    getRomaji
};
