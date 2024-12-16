const {
    generateCharList,
    generateOptionsList,
    getRomaji
} = require( '../src/chars' );

test( `Test getRomaji only accepts string arguments.`, () => {
    expect( () => getRomaji( `a`, 0 ) ).toThrow( TypeError );
    expect( () => getRomaji( 0, `a` ) ).toThrow( TypeError );
    expect( () => getRomaji( 0, 0 ) ).toThrow( TypeError );
    expect( () => getRomaji( `a`, () => console.log( `AHHH!` ) ) ).toThrow( TypeError );
    expect( () => getRomaji( `a`, { key: `value` } ) ).toThrow( TypeError );
    expect( () => getRomaji( `a`, [ `a`, `b` ] ) ).toThrow( TypeError );
    expect( () => getRomaji( `a`, `a` ) ).not.toThrow();
});

test( `getRomaji returns the expected romaji for a given consonant & vowel`, () => {
    expect( getRomaji( `∅`, `a` ) ).toBe( `a` );
    expect( getRomaji( `∅`, `i` ) ).toBe( `i` );
    expect( getRomaji( `∅`, `e` ) ).toBe( `e` );
    expect( getRomaji( `∅`, `o` ) ).toBe( `o` );
    expect( getRomaji( `∅`, `u` ) ).toBe( `u` );
    expect( getRomaji( `k`, `a` ) ).toBe( `ka` );
    expect( getRomaji( `k`, `i` ) ).toBe( `ki` );
    expect( getRomaji( `k`, `e` ) ).toBe( `ke` );
    expect( getRomaji( `k`, `o` ) ).toBe( `ko` );
    expect( getRomaji( `k`, `u` ) ).toBe( `ku` );
    expect( getRomaji( `n`, `∅` ) ).toBe( `n` );
    expect( getRomaji( `s`, `i` ) ).toBe( `shi` );
    expect( getRomaji( `t`, `i` ) ).toBe( `chi` );
    expect( getRomaji( `t`, `u` ) ).toBe( `tsu` );
    expect( getRomaji( `h`, `u` ) ).toBe( `fu` );
} );

test( `generateOptionsList only accepts correct types for arguments.`, () => {
    expect( () => generateOptionsList( 0, `a`, 1 ) ).toThrow( TypeError );
    expect( () => generateOptionsList( `a`, 0, 1 ) ).toThrow( TypeError );
    expect( () => generateOptionsList( 0, 0, `1` ) ).toThrow( TypeError );
    //expect( () => generateOptionsList( `a`, `a`, 1 ) ).not.toThrow( TypeError );
    expect( () => generateOptionsList( `a`, `a`, 0 ) ).toThrow( TypeError );
    expect( () => generateOptionsList( `a`, `a`, -1 ) ).toThrow( TypeError );
    expect( () => generateOptionsList( `a`, `a`, 6 ) ).toThrow( TypeError );
});

test( `generateCharList returns expected list for given options`, () => {
    expect( generateCharList( [ `hiragana` ], 1 ).map( v => v.jp ) ).toEqual([
        `あ`, `い`, `う`, `え`, `お`,
        `か`, `き`, `く`, `け`, `こ`,
        `さ`, `し`, `す`, `せ`, `そ`,
        `た`, `ち`, `つ`, `て`, `と`,
        `な`, `に`, `ぬ`, `ね`, `の`,
        `ん`,
        `は`, `ひ`, `ふ`, `へ`, `ほ`,
        `ま`, `み`, `む`, `め`, `も`,
        `や`, `ゆ`, `よ`,
        `ら`, `り`, `る`, `れ`, `ろ`,
        `わ`, `を`,
    ]);
    expect( generateCharList( [ `hiragana` ], 2 ).map( v => v.jp ) ).toEqual([
        `あ`, `い`, `う`, `え`, `お`,
        `か`, `き`, `く`, `け`, `こ`,
        `さ`, `し`, `す`, `せ`, `そ`,
        `た`, `ち`, `つ`, `て`, `と`,
        `な`, `に`, `ぬ`, `ね`, `の`,
        `ん`,
        `は`, `ひ`, `ふ`, `へ`, `ほ`,
        `ま`, `み`, `む`, `め`, `も`,
        `や`, `ゆ`, `よ`,
        `ら`, `り`, `る`, `れ`, `ろ`,
        `わ`, `を`,
        `が`, `ぎ`, `ぐ`, `げ`, `ご`,
        `ざ`, `じ`, `ず`, `ぜ`, `ぞ`,
        `だ`, `ぢ`, `づ`, `で`, `ど`,
        `ば`, `び`, `ぶ`, `べ`, `ぼ`,
        `ぱ`, `ぴ`, `ぷ`, `ぺ`, `ぽ`,
    ]);
    expect( generateCharList( [ `hiragana` ], 3 ).map( v => v.jp ) ).toEqual([
        `あ`, `い`, `う`, `え`, `お`,
        `か`, `き`, `く`, `け`, `こ`,
        `さ`, `し`, `す`, `せ`, `そ`,
        `た`, `ち`, `つ`, `て`, `と`,
        `な`, `に`, `ぬ`, `ね`, `の`,
        `ん`,
        `は`, `ひ`, `ふ`, `へ`, `ほ`,
        `ま`, `み`, `む`, `め`, `も`,
        `や`, `ゆ`, `よ`,
        `ら`, `り`, `る`, `れ`, `ろ`,
        `わ`, `を`,
        `が`, `ぎ`, `ぐ`, `げ`, `ご`,
        `ざ`, `じ`, `ず`, `ぜ`, `ぞ`,
        `だ`, `ぢ`, `づ`, `で`, `ど`,
        `ば`, `び`, `ぶ`, `べ`, `ぼ`,
        `ぱ`, `ぴ`, `ぷ`, `ぺ`, `ぽ`,
        `きゃ`, `きゅ`, `きょ`,
        `しゃ`, `しゅ`, `しょ`,
        `ちゃ`, `ちゅ`, `ちょ`,
        `にゃ`, `にゅ`, `にょ`,
        `ひゃ`, `ひゅ`, `ひょ`,
        `みゃ`, `みゅ`, `みょ`,
        `りゃ`, `りゅ`, `りょ`,
        `ぎゃ`, `ぎゅ`, `ぎょ`,
        `じゃ`, `じゅ`, `じょ`,
        `ぢゃ`, `ぢゅ`, `ぢょ`,
        `びゃ`, `びゅ`, `びょ`,
        `ぴゃ`, `ぴゅ`, `ぴょ`,
    ]);
    expect( generateCharList( [ `katakana` ], 1 ).map( v => v.jp ) ).toEqual([
        `ア`, `イ`, `ウ`, `エ`, `オ`,
        `カ`, `キ`, `ク`, `ケ`, `コ`,
        `サ`, `シ`, `ス`, `セ`, `ソ`,
        `タ`, `チ`, `ツ`, `テ`, `ト`,
        `ナ`, `ニ`, `ヌ`, `ネ`, `ノ`,
        `ン`,
        `ハ`, `ヒ`, `フ`, `ヘ`, `ホ`,
        `マ`, `ミ`, `ム`, `メ`, `モ`,
        `ヤ`, `ユ`, `ヨ`,
        `ラ`, `リ`, `ル`, `レ`, `ロ`,
        `ワ`, `ヲ`,
    ]);
    expect( generateCharList( [ `katakana` ], 2 ).map( v => v.jp ) ).toEqual([
        `ア`, `イ`, `ウ`, `エ`, `オ`,
        `カ`, `キ`, `ク`, `ケ`, `コ`,
        `サ`, `シ`, `ス`, `セ`, `ソ`,
        `タ`, `チ`, `ツ`, `テ`, `ト`,
        `ナ`, `ニ`, `ヌ`, `ネ`, `ノ`,
        `ン`,
        `ハ`, `ヒ`, `フ`, `ヘ`, `ホ`,
        `マ`, `ミ`, `ム`, `メ`, `モ`,
        `ヤ`, `ユ`, `ヨ`,
        `ラ`, `リ`, `ル`, `レ`, `ロ`,
        `ワ`, `ヲ`,
        `ガ`, `ギ`, `グ`, `ゲ`, `ゴ`,
        `ザ`, `ジ`, `ズ`, `ゼ`, `ゾ`,
        `ダ`, `ヂ`, `ヅ`, `デ`, `ド`,
        `バ`, `ビ`, `ブ`, `ベ`, `ボ`,
        `パ`, `ピ`, `プ`, `ペ`, `ポ`,
    ]);
    expect( generateCharList( [ `katakana` ], 3 ).map( v => v.jp ) ).toEqual([
        `ア`, `イ`, `ウ`, `エ`, `オ`,
        `カ`, `キ`, `ク`, `ケ`, `コ`,
        `サ`, `シ`, `ス`, `セ`, `ソ`,
        `タ`, `チ`, `ツ`, `テ`, `ト`,
        `ナ`, `ニ`, `ヌ`, `ネ`, `ノ`,
        `ン`,
        `ハ`, `ヒ`, `フ`, `ヘ`, `ホ`,
        `マ`, `ミ`, `ム`, `メ`, `モ`,
        `ヤ`, `ユ`, `ヨ`,
        `ラ`, `リ`, `ル`, `レ`, `ロ`,
        `ワ`, `ヲ`,
        `ガ`, `ギ`, `グ`, `ゲ`, `ゴ`,
        `ザ`, `ジ`, `ズ`, `ゼ`, `ゾ`,
        `ダ`, `ヂ`, `ヅ`, `デ`, `ド`,
        `バ`, `ビ`, `ブ`, `ベ`, `ボ`,
        `パ`, `ピ`, `プ`, `ペ`, `ポ`,
        `キャ`, `キュ`, `キョ`,
        `シャ`, `シュ`, `ショ`,
        `チャ`, `チュ`, `チョ`,
        `ニャ`, `ニュ`, `ニョ`,
        `ヒャ`, `ヒュ`, `ヒョ`,
        `ミャ`, `ミュ`, `ミョ`,
        `リャ`, `リュ`, `リョ`,
        `ギャ`, `ギュ`, `ギョ`,
        `ジャ`, `ジュ`, `ジョ`,
        `ヂャ`, `ヂュ`, `ヂョ`,
        `ビャ`, `ビュ`, `ビョ`,
        `ピャ`, `ピュ`, `ピョ`,
    ]);
    expect( generateCharList( [ `kanji` ], 1 ).map( v => v.jp ) ).toEqual([
        `一`,
        `二`,
        `三`,
        `四`,
        `五`,
        `六`,
        `七`,
        `八`,
        `九`,
        `十`,
    ]);
    expect( generateCharList( [ `hiragana`, `katakana` ], 1 ).map( v => v.jp ) ).toEqual([
        `あ`, `い`, `う`, `え`, `お`,
        `か`, `き`, `く`, `け`, `こ`,
        `さ`, `し`, `す`, `せ`, `そ`,
        `た`, `ち`, `つ`, `て`, `と`,
        `な`, `に`, `ぬ`, `ね`, `の`,
        `ん`,
        `は`, `ひ`, `ふ`, `へ`, `ほ`,
        `ま`, `み`, `む`, `め`, `も`,
        `や`, `ゆ`, `よ`,
        `ら`, `り`, `る`, `れ`, `ろ`,
        `わ`, `を`,
        `ア`, `イ`, `ウ`, `エ`, `オ`,
        `カ`, `キ`, `ク`, `ケ`, `コ`,
        `サ`, `シ`, `ス`, `セ`, `ソ`,
        `タ`, `チ`, `ツ`, `テ`, `ト`,
        `ナ`, `ニ`, `ヌ`, `ネ`, `ノ`,
        `ン`,
        `ハ`, `ヒ`, `フ`, `ヘ`, `ホ`,
        `マ`, `ミ`, `ム`, `メ`, `モ`,
        `ヤ`, `ユ`, `ヨ`,
        `ラ`, `リ`, `ル`, `レ`, `ロ`,
        `ワ`, `ヲ`,
    ]);
    expect( generateCharList( [ `hiragana`, `katakana`, `kanji` ], 1 ).map( v => v.jp ) ).toEqual([
        `あ`, `い`, `う`, `え`, `お`,
        `か`, `き`, `く`, `け`, `こ`,
        `さ`, `し`, `す`, `せ`, `そ`,
        `た`, `ち`, `つ`, `て`, `と`,
        `な`, `に`, `ぬ`, `ね`, `の`,
        `ん`,
        `は`, `ひ`, `ふ`, `へ`, `ほ`,
        `ま`, `み`, `む`, `め`, `も`,
        `や`, `ゆ`, `よ`,
        `ら`, `り`, `る`, `れ`, `ろ`,
        `わ`, `を`,
        `ア`, `イ`, `ウ`, `エ`, `オ`,
        `カ`, `キ`, `ク`, `ケ`, `コ`,
        `サ`, `シ`, `ス`, `セ`, `ソ`,
        `タ`, `チ`, `ツ`, `テ`, `ト`,
        `ナ`, `ニ`, `ヌ`, `ネ`, `ノ`,
        `ン`,
        `ハ`, `ヒ`, `フ`, `ヘ`, `ホ`,
        `マ`, `ミ`, `ム`, `メ`, `モ`,
        `ヤ`, `ユ`, `ヨ`,
        `ラ`, `リ`, `ル`, `レ`, `ロ`,
        `ワ`, `ヲ`,
        `一`,
        `二`,
        `三`,
        `四`,
        `五`,
        `六`,
        `七`,
        `八`,
        `九`,
        `十`,
    ]);
});

test( `generateOptionsList returns the expected options list for given options`, () => {
    const hiragana = { jp: `あ`, en: `a`, type: `hiragana` };
    const katakana = { jp: `ア`, en: `a`, type: `katakana` };
    expect( generateOptionsList( `en`, hiragana, 1 ) ).toEqual([
        `a`, `i`, `u`, `e`, `o`,
        `ka`, `ki`, `ku`, `ke`, `ko`,
        `sa`, `shi`, `su`, `se`, `so`,
        `ta`, `chi`, `tsu`, `te`, `to`,
        `na`, `ni`, `nu`, `ne`, `no`,
        `n`,
        `ha`, `hi`, `fu`, `he`, `ho`,
        `ma`, `mi`, `mu`, `me`, `mo`,
        `ya`, `yu`, `yo`,
        `ra`, `ri`, `ru`, `re`, `ro`,
        `wa`, `wo`,
    ]);
    expect( generateOptionsList( `en`, katakana, 1 ) ).toEqual([
        `a`, `i`, `u`, `e`, `o`,
        `ka`, `ki`, `ku`, `ke`, `ko`,
        `sa`, `shi`, `su`, `se`, `so`,
        `ta`, `chi`, `tsu`, `te`, `to`,
        `na`, `ni`, `nu`, `ne`, `no`,
        `n`,
        `ha`, `hi`, `fu`, `he`, `ho`,
        `ma`, `mi`, `mu`, `me`, `mo`,
        `ya`, `yu`, `yo`,
        `ra`, `ri`, `ru`, `re`, `ro`,
        `wa`, `wo`,
    ]);
    expect( generateOptionsList( `en`, hiragana, 2 ) ).toEqual([
        `a`, `i`, `u`, `e`, `o`,
        `ka`, `ki`, `ku`, `ke`, `ko`,
        `sa`, `shi`, `su`, `se`, `so`,
        `ta`, `chi`, `tsu`, `te`, `to`,
        `na`, `ni`, `nu`, `ne`, `no`,
        `n`,
        `ha`, `hi`, `fu`, `he`, `ho`,
        `ma`, `mi`, `mu`, `me`, `mo`,
        `ya`, `yu`, `yo`,
        `ra`, `ri`, `ru`, `re`, `ro`,
        `wa`, `wo`,
        `ga`, `gi`, `gu`, `ge`, `go`,
        `za`, `ji`, `zu`, `ze`, `zo`,
        `da`, `de`, `do`,
        `ba`, `bi`, `bu`, `be`, `bo`,
        `pa`, `pi`, `pu`, `pe`, `po`,
    ]);
    expect( generateOptionsList( `en`, katakana, 2 ) ).toEqual([
        `a`, `i`, `u`, `e`, `o`,
        `ka`, `ki`, `ku`, `ke`, `ko`,
        `sa`, `shi`, `su`, `se`, `so`,
        `ta`, `chi`, `tsu`, `te`, `to`,
        `na`, `ni`, `nu`, `ne`, `no`,
        `n`,
        `ha`, `hi`, `fu`, `he`, `ho`,
        `ma`, `mi`, `mu`, `me`, `mo`,
        `ya`, `yu`, `yo`,
        `ra`, `ri`, `ru`, `re`, `ro`,
        `wa`, `wo`,
        `ga`, `gi`, `gu`, `ge`, `go`,
        `za`, `ji`, `zu`, `ze`, `zo`,
        `da`, `de`, `do`,
        `ba`, `bi`, `bu`, `be`, `bo`,
        `pa`, `pi`, `pu`, `pe`, `po`,
    ]);
    expect( generateOptionsList( `en`, hiragana, 3 ) ).toEqual([
        `a`, `i`, `u`, `e`, `o`,
        `ka`, `ki`, `ku`, `ke`, `ko`,
        `sa`, `shi`, `su`, `se`, `so`,
        `ta`, `chi`, `tsu`, `te`, `to`,
        `na`, `ni`, `nu`, `ne`, `no`,
        `n`,
        `ha`, `hi`, `fu`, `he`, `ho`,
        `ma`, `mi`, `mu`, `me`, `mo`,
        `ya`, `yu`, `yo`,
        `ra`, `ri`, `ru`, `re`, `ro`,
        `wa`, `wo`,
        `ga`, `gi`, `gu`, `ge`, `go`,
        `za`, `ji`, `zu`, `ze`, `zo`,
        `da`, `de`, `do`,
        `ba`, `bi`, `bu`, `be`, `bo`,
        `pa`, `pi`, `pu`, `pe`, `po`,
        `kya`, `kyu`, `kyo`,
        `sha`, `shu`, `sho`,
        `cha`, `chu`, `cho`,
        `nya`, `nyu`, `nyo`,
        `hya`, `hyu`, `hyo`,
        `mya`, `myu`, `myo`,
        `rya`, `ryu`, `ryo`,
        `gya`, `gyu`, `gyo`,
        `ja`, `ju`, `jo`,
        `bya`, `byu`, `byo`,
        `pya`, `pyu`, `pyo`,
    ]);
    expect( generateOptionsList( `en`, katakana, 3 ) ).toEqual([
        `a`, `i`, `u`, `e`, `o`,
        `ka`, `ki`, `ku`, `ke`, `ko`,
        `sa`, `shi`, `su`, `se`, `so`,
        `ta`, `chi`, `tsu`, `te`, `to`,
        `na`, `ni`, `nu`, `ne`, `no`,
        `n`,
        `ha`, `hi`, `fu`, `he`, `ho`,
        `ma`, `mi`, `mu`, `me`, `mo`,
        `ya`, `yu`, `yo`,
        `ra`, `ri`, `ru`, `re`, `ro`,
        `wa`, `wo`,
        `ga`, `gi`, `gu`, `ge`, `go`,
        `za`, `ji`, `zu`, `ze`, `zo`,
        `da`, `de`, `do`,
        `ba`, `bi`, `bu`, `be`, `bo`,
        `pa`, `pi`, `pu`, `pe`, `po`,
        `kya`, `kyu`, `kyo`,
        `sha`, `shu`, `sho`,
        `cha`, `chu`, `cho`,
        `nya`, `nyu`, `nyo`,
        `hya`, `hyu`, `hyo`,
        `mya`, `myu`, `myo`,
        `rya`, `ryu`, `ryo`,
        `gya`, `gyu`, `gyo`,
        `ja`, `ju`, `jo`,
        `bya`, `byu`, `byo`,
        `pya`, `pyu`, `pyo`,
    ]);
    expect( generateOptionsList( `jp`, hiragana, 1 ) ).toEqual(
        expect.arrayContaining( [
            `あ`, `い`, `う`, `え`, `お`,
            `か`, `き`, `く`, `け`, `こ`,
            `さ`, `し`, `す`, `せ`, `そ`,
            `た`, `ち`, `つ`, `て`, `と`,
            `な`, `に`, `ぬ`, `ね`, `の`,
            `ん`,
            `は`, `ひ`, `ふ`, `へ`, `ほ`,
            `ま`, `み`, `む`, `め`, `も`,
            `や`, `ゆ`, `よ`,
            `ら`, `り`, `る`, `れ`, `ろ`,
            `わ`, `を`,
        ] )
    );
    expect( generateOptionsList( `jp`, hiragana, 2 ) ).toEqual(
        expect.arrayContaining( [
            `あ`, `い`, `う`, `え`, `お`,
            `か`, `き`, `く`, `け`, `こ`,
            `さ`, `し`, `す`, `せ`, `そ`,
            `た`, `ち`, `つ`, `て`, `と`,
            `な`, `に`, `ぬ`, `ね`, `の`,
            `ん`,
            `は`, `ひ`, `ふ`, `へ`, `ほ`,
            `ま`, `み`, `む`, `め`, `も`,
            `や`, `ゆ`, `よ`,
            `ら`, `り`, `る`, `れ`, `ろ`,
            `わ`, `を`,
            `が`, `ぎ`, `ぐ`, `げ`, `ご`,
            `ざ`, `じ`, `ず`, `ぜ`, `ぞ`,
            `だ`, `ぢ`, `づ`, `で`, `ど`,
            `ば`, `び`, `ぶ`, `べ`, `ぼ`,
            `ぱ`, `ぴ`, `ぷ`, `ぺ`, `ぽ`,
        ] )
    );
    expect( generateOptionsList( `jp`, hiragana, 3 ) ).toEqual(
        expect.arrayContaining( [
            `あ`, `い`, `う`, `え`, `お`,
            `か`, `き`, `く`, `け`, `こ`,
            `さ`, `し`, `す`, `せ`, `そ`,
            `た`, `ち`, `つ`, `て`, `と`,
            `な`, `に`, `ぬ`, `ね`, `の`,
            `ん`,
            `は`, `ひ`, `ふ`, `へ`, `ほ`,
            `ま`, `み`, `む`, `め`, `も`,
            `や`, `ゆ`, `よ`,
            `ら`, `り`, `る`, `れ`, `ろ`,
            `わ`, `を`,
            `が`, `ぎ`, `ぐ`, `げ`, `ご`,
            `ざ`, `じ`, `ず`, `ぜ`, `ぞ`,
            `だ`, `ぢ`, `づ`, `で`, `ど`,
            `ば`, `び`, `ぶ`, `べ`, `ぼ`,
            `ぱ`, `ぴ`, `ぷ`, `ぺ`, `ぽ`,
            `きゃ`, `きゅ`, `きょ`,
            `しゃ`, `しゅ`, `しょ`,
            `ちゃ`, `ちゅ`, `ちょ`,
            `にゃ`, `にゅ`, `にょ`,
            `ひゃ`, `ひゅ`, `ひょ`,
            `みゃ`, `みゅ`, `みょ`,
            `りゃ`, `りゅ`, `りょ`,
            `ぎゃ`, `ぎゅ`, `ぎょ`,
            `じゃ`, `じゅ`, `じょ`,
            `ぢゃ`, `ぢゅ`, `ぢょ`,
            `びゃ`, `びゅ`, `びょ`,
            `ぴゃ`, `ぴゅ`, `ぴょ`,
        ] )
    );
    expect( generateOptionsList( `jp`, katakana, 1 ) ).toEqual(
        expect.arrayContaining( [
            `ア`, `イ`, `ウ`, `エ`, `オ`,
            `カ`, `キ`, `ク`, `ケ`, `コ`,
            `サ`, `シ`, `ス`, `セ`, `ソ`,
            `タ`, `チ`, `ツ`, `テ`, `ト`,
            `ナ`, `ニ`, `ヌ`, `ネ`, `ノ`,
            `ン`,
            `ハ`, `ヒ`, `フ`, `ヘ`, `ホ`,
            `マ`, `ミ`, `ム`, `メ`, `モ`,
            `ヤ`, `ユ`, `ヨ`,
            `ラ`, `リ`, `ル`, `レ`, `ロ`,
            `ワ`, `ヲ`,
        ] )
    );
    expect( generateOptionsList( `jp`, katakana, 2 ) ).toEqual(
        expect.arrayContaining( [
            `ア`, `イ`, `ウ`, `エ`, `オ`,
            `カ`, `キ`, `ク`, `ケ`, `コ`,
            `サ`, `シ`, `ス`, `セ`, `ソ`,
            `タ`, `チ`, `ツ`, `テ`, `ト`,
            `ナ`, `ニ`, `ヌ`, `ネ`, `ノ`,
            `ン`,
            `ハ`, `ヒ`, `フ`, `ヘ`, `ホ`,
            `マ`, `ミ`, `ム`, `メ`, `モ`,
            `ヤ`, `ユ`, `ヨ`,
            `ラ`, `リ`, `ル`, `レ`, `ロ`,
            `ワ`, `ヲ`,
            `ガ`, `ギ`, `グ`, `ゲ`, `ゴ`,
            `ザ`, `ジ`, `ズ`, `ゼ`, `ゾ`,
            `ダ`, `ヂ`, `ヅ`, `デ`, `ド`,
            `バ`, `ビ`, `ブ`, `ベ`, `ボ`,
            `パ`, `ピ`, `プ`, `ペ`, `ポ`,
        ] )
    );
    expect( generateOptionsList( `jp`, katakana, 3 ) ).toEqual(
        expect.arrayContaining( [
            `ア`, `イ`, `ウ`, `エ`, `オ`,
            `カ`, `キ`, `ク`, `ケ`, `コ`,
            `サ`, `シ`, `ス`, `セ`, `ソ`,
            `タ`, `チ`, `ツ`, `テ`, `ト`,
            `ナ`, `ニ`, `ヌ`, `ネ`, `ノ`,
            `ン`,
            `ハ`, `ヒ`, `フ`, `ヘ`, `ホ`,
            `マ`, `ミ`, `ム`, `メ`, `モ`,
            `ヤ`, `ユ`, `ヨ`,
            `ラ`, `リ`, `ル`, `レ`, `ロ`,
            `ワ`, `ヲ`,
            `ガ`, `ギ`, `グ`, `ゲ`, `ゴ`,
            `ザ`, `ジ`, `ズ`, `ゼ`, `ゾ`,
            `ダ`, `ヂ`, `ヅ`, `デ`, `ド`,
            `バ`, `ビ`, `ブ`, `ベ`, `ボ`,
            `パ`, `ピ`, `プ`, `ペ`, `ポ`,
            `キャ`, `キュ`, `キョ`,
            `シャ`, `シュ`, `ショ`,
            `チャ`, `チュ`, `チョ`,
            `ニャ`, `ニュ`, `ニョ`,
            `ヒャ`, `ヒュ`, `ヒョ`,
            `ミャ`, `ミュ`, `ミョ`,
            `リャ`, `リュ`, `リョ`,
            `ギャ`, `ギュ`, `ギョ`,
            `ジャ`, `ジュ`, `ジョ`,
            `ヂャ`, `ヂュ`, `ヂョ`,
            `ビャ`, `ビュ`, `ビョ`,
            `ピャ`, `ピュ`, `ピョ`,
        ] )
    );

    const v = {
        jp: `一`,
        en: `one`,
        type: `kanji`,
    };
    const kanjiOne = generateOptionsList( `jp`, v, 1 );
    expect( kanjiOne ).toEqual(expect.arrayContaining([ `一` ]));
    expect( kanjiOne.length ).toEqual( 8 );
    const kanjiOneEn = generateOptionsList( `en`, v, 1 );
    expect( kanjiOneEn ).toEqual(expect.arrayContaining([ `one` ]));
    expect( kanjiOneEn.length ).toEqual( 8 );
} );