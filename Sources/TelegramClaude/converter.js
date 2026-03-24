var document={createElement:function(_){var h="";return{set innerHTML(v){h=v;},get textContent(){return h.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&#(\d+);/g,function(_,n){return String.fromCharCode(Number(n));}).replace(/&[a-z]+;/g,"");}};}};
(() => {
  var __create = Object.create;
  var __getProtoOf = Object.getPrototypeOf;
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  function __accessProp(key) {
    return this[key];
  }
  var __toESMCache_node;
  var __toESMCache_esm;
  var __toESM = (mod, isNodeMode, target) => {
    var canCache = mod != null && typeof mod === "object";
    if (canCache) {
      var cache = isNodeMode ? __toESMCache_node ??= new WeakMap : __toESMCache_esm ??= new WeakMap;
      var cached = cache.get(mod);
      if (cached)
        return cached;
    }
    target = mod != null ? __create(__getProtoOf(mod)) : {};
    const to = isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target;
    for (let key of __getOwnPropNames(mod))
      if (!__hasOwnProp.call(to, key))
        __defProp(to, key, {
          get: __accessProp.bind(mod, key),
          enumerable: true
        });
    if (canCache)
      cache.set(mod, to);
    return to;
  };
  var __toCommonJS = (from) => {
    var entry = (__moduleCache ??= new WeakMap).get(from), desc;
    if (entry)
      return entry;
    entry = __defProp({}, "__esModule", { value: true });
    if (from && typeof from === "object" || typeof from === "function") {
      for (var key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(entry, key))
          __defProp(entry, key, {
            get: __accessProp.bind(from, key),
            enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
          });
    }
    __moduleCache.set(from, entry);
    return entry;
  };
  var __moduleCache;
  var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);
  var __returnValue = (v) => v;
  function __exportSetter(name, newValue) {
    this[name] = __returnValue.bind(null, newValue);
  }
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, {
        get: all[name],
        enumerable: true,
        configurable: true,
        set: __exportSetter.bind(all, name)
      });
  };
  var __esm = (fn, res) => () => (fn && (res = fn(fn = 0)), res);

  // node_modules/dequal/dist/index.mjs
  var init_dist = () => {};

  // node_modules/devlop/lib/development.js
  function ok(value, message) {
    assert(Boolean(value), false, true, "ok", "Expected value to be truthy", message);
  }
  function assert(bool, actual, expected, operator, defaultMessage, userMessage) {
    if (!bool) {
      throw userMessage instanceof Error ? userMessage : new AssertionError(userMessage || defaultMessage, actual, expected, operator, !userMessage);
    }
  }
  var codesWarned, AssertionError;
  var init_development = __esm(() => {
    init_dist();
    codesWarned = new Set;
    AssertionError = class AssertionError extends Error {
      name = "Assertion";
      code = "ERR_ASSERTION";
      constructor(message, actual, expected, operator, generated) {
        super(message);
        if (Error.captureStackTrace) {
          Error.captureStackTrace(this, this.constructor);
        }
        this.actual = actual;
        this.expected = expected;
        this.generated = generated;
        this.operator = operator;
      }
    };
  });

  // node_modules/mdast-util-to-string/lib/index.js
  function toString(value, options) {
    const settings = options || emptyOptions;
    const includeImageAlt = typeof settings.includeImageAlt === "boolean" ? settings.includeImageAlt : true;
    const includeHtml = typeof settings.includeHtml === "boolean" ? settings.includeHtml : true;
    return one(value, includeImageAlt, includeHtml);
  }
  function one(value, includeImageAlt, includeHtml) {
    if (node(value)) {
      if ("value" in value) {
        return value.type === "html" && !includeHtml ? "" : value.value;
      }
      if (includeImageAlt && "alt" in value && value.alt) {
        return value.alt;
      }
      if ("children" in value) {
        return all(value.children, includeImageAlt, includeHtml);
      }
    }
    if (Array.isArray(value)) {
      return all(value, includeImageAlt, includeHtml);
    }
    return "";
  }
  function all(values, includeImageAlt, includeHtml) {
    const result = [];
    let index = -1;
    while (++index < values.length) {
      result[index] = one(values[index], includeImageAlt, includeHtml);
    }
    return result.join("");
  }
  function node(value) {
    return Boolean(value && typeof value === "object");
  }
  var emptyOptions;
  var init_lib = __esm(() => {
    emptyOptions = {};
  });

  // node_modules/mdast-util-to-string/index.js
  var exports_mdast_util_to_string = {};
  __export(exports_mdast_util_to_string, {
    toString: () => toString
  });
  var init_mdast_util_to_string = __esm(() => {
    init_lib();
  });

  // node_modules/decode-named-character-reference/index.dom.js
  function decodeNamedCharacterReference(value) {
    const characterReference = "&" + value + ";";
    element.innerHTML = characterReference;
    const character = element.textContent;
    if (character.charCodeAt(character.length - 1) === 59 && value !== "semi") {
      return false;
    }
    return character === characterReference ? false : character;
  }
  var element;
  var init_index_dom = __esm(() => {
    element = document.createElement("i");
  });

  // node_modules/micromark-util-symbol/lib/codes.js
  var codes;
  var init_codes = __esm(() => {
    codes = {
      carriageReturn: -5,
      lineFeed: -4,
      carriageReturnLineFeed: -3,
      horizontalTab: -2,
      virtualSpace: -1,
      eof: null,
      nul: 0,
      soh: 1,
      stx: 2,
      etx: 3,
      eot: 4,
      enq: 5,
      ack: 6,
      bel: 7,
      bs: 8,
      ht: 9,
      lf: 10,
      vt: 11,
      ff: 12,
      cr: 13,
      so: 14,
      si: 15,
      dle: 16,
      dc1: 17,
      dc2: 18,
      dc3: 19,
      dc4: 20,
      nak: 21,
      syn: 22,
      etb: 23,
      can: 24,
      em: 25,
      sub: 26,
      esc: 27,
      fs: 28,
      gs: 29,
      rs: 30,
      us: 31,
      space: 32,
      exclamationMark: 33,
      quotationMark: 34,
      numberSign: 35,
      dollarSign: 36,
      percentSign: 37,
      ampersand: 38,
      apostrophe: 39,
      leftParenthesis: 40,
      rightParenthesis: 41,
      asterisk: 42,
      plusSign: 43,
      comma: 44,
      dash: 45,
      dot: 46,
      slash: 47,
      digit0: 48,
      digit1: 49,
      digit2: 50,
      digit3: 51,
      digit4: 52,
      digit5: 53,
      digit6: 54,
      digit7: 55,
      digit8: 56,
      digit9: 57,
      colon: 58,
      semicolon: 59,
      lessThan: 60,
      equalsTo: 61,
      greaterThan: 62,
      questionMark: 63,
      atSign: 64,
      uppercaseA: 65,
      uppercaseB: 66,
      uppercaseC: 67,
      uppercaseD: 68,
      uppercaseE: 69,
      uppercaseF: 70,
      uppercaseG: 71,
      uppercaseH: 72,
      uppercaseI: 73,
      uppercaseJ: 74,
      uppercaseK: 75,
      uppercaseL: 76,
      uppercaseM: 77,
      uppercaseN: 78,
      uppercaseO: 79,
      uppercaseP: 80,
      uppercaseQ: 81,
      uppercaseR: 82,
      uppercaseS: 83,
      uppercaseT: 84,
      uppercaseU: 85,
      uppercaseV: 86,
      uppercaseW: 87,
      uppercaseX: 88,
      uppercaseY: 89,
      uppercaseZ: 90,
      leftSquareBracket: 91,
      backslash: 92,
      rightSquareBracket: 93,
      caret: 94,
      underscore: 95,
      graveAccent: 96,
      lowercaseA: 97,
      lowercaseB: 98,
      lowercaseC: 99,
      lowercaseD: 100,
      lowercaseE: 101,
      lowercaseF: 102,
      lowercaseG: 103,
      lowercaseH: 104,
      lowercaseI: 105,
      lowercaseJ: 106,
      lowercaseK: 107,
      lowercaseL: 108,
      lowercaseM: 109,
      lowercaseN: 110,
      lowercaseO: 111,
      lowercaseP: 112,
      lowercaseQ: 113,
      lowercaseR: 114,
      lowercaseS: 115,
      lowercaseT: 116,
      lowercaseU: 117,
      lowercaseV: 118,
      lowercaseW: 119,
      lowercaseX: 120,
      lowercaseY: 121,
      lowercaseZ: 122,
      leftCurlyBrace: 123,
      verticalBar: 124,
      rightCurlyBrace: 125,
      tilde: 126,
      del: 127,
      byteOrderMarker: 65279,
      replacementCharacter: 65533
    };
  });

  // node_modules/micromark-util-symbol/lib/constants.js
  var constants;
  var init_constants = __esm(() => {
    constants = {
      attentionSideAfter: 2,
      attentionSideBefore: 1,
      atxHeadingOpeningFenceSizeMax: 6,
      autolinkDomainSizeMax: 63,
      autolinkSchemeSizeMax: 32,
      cdataOpeningString: "CDATA[",
      characterGroupPunctuation: 2,
      characterGroupWhitespace: 1,
      characterReferenceDecimalSizeMax: 7,
      characterReferenceHexadecimalSizeMax: 6,
      characterReferenceNamedSizeMax: 31,
      codeFencedSequenceSizeMin: 3,
      contentTypeContent: "content",
      contentTypeDocument: "document",
      contentTypeFlow: "flow",
      contentTypeString: "string",
      contentTypeText: "text",
      hardBreakPrefixSizeMin: 2,
      htmlBasic: 6,
      htmlCdata: 5,
      htmlComment: 2,
      htmlComplete: 7,
      htmlDeclaration: 4,
      htmlInstruction: 3,
      htmlRawSizeMax: 8,
      htmlRaw: 1,
      linkResourceDestinationBalanceMax: 32,
      linkReferenceSizeMax: 999,
      listItemValueSizeMax: 10,
      numericBaseDecimal: 10,
      numericBaseHexadecimal: 16,
      tabSize: 4,
      thematicBreakMarkerCountMin: 3,
      v8MaxSafeChunkSize: 1e4
    };
  });

  // node_modules/micromark-util-symbol/lib/types.js
  var types;
  var init_types = __esm(() => {
    types = {
      data: "data",
      whitespace: "whitespace",
      lineEnding: "lineEnding",
      lineEndingBlank: "lineEndingBlank",
      linePrefix: "linePrefix",
      lineSuffix: "lineSuffix",
      atxHeading: "atxHeading",
      atxHeadingSequence: "atxHeadingSequence",
      atxHeadingText: "atxHeadingText",
      autolink: "autolink",
      autolinkEmail: "autolinkEmail",
      autolinkMarker: "autolinkMarker",
      autolinkProtocol: "autolinkProtocol",
      characterEscape: "characterEscape",
      characterEscapeValue: "characterEscapeValue",
      characterReference: "characterReference",
      characterReferenceMarker: "characterReferenceMarker",
      characterReferenceMarkerNumeric: "characterReferenceMarkerNumeric",
      characterReferenceMarkerHexadecimal: "characterReferenceMarkerHexadecimal",
      characterReferenceValue: "characterReferenceValue",
      codeFenced: "codeFenced",
      codeFencedFence: "codeFencedFence",
      codeFencedFenceSequence: "codeFencedFenceSequence",
      codeFencedFenceInfo: "codeFencedFenceInfo",
      codeFencedFenceMeta: "codeFencedFenceMeta",
      codeFlowValue: "codeFlowValue",
      codeIndented: "codeIndented",
      codeText: "codeText",
      codeTextData: "codeTextData",
      codeTextPadding: "codeTextPadding",
      codeTextSequence: "codeTextSequence",
      content: "content",
      definition: "definition",
      definitionDestination: "definitionDestination",
      definitionDestinationLiteral: "definitionDestinationLiteral",
      definitionDestinationLiteralMarker: "definitionDestinationLiteralMarker",
      definitionDestinationRaw: "definitionDestinationRaw",
      definitionDestinationString: "definitionDestinationString",
      definitionLabel: "definitionLabel",
      definitionLabelMarker: "definitionLabelMarker",
      definitionLabelString: "definitionLabelString",
      definitionMarker: "definitionMarker",
      definitionTitle: "definitionTitle",
      definitionTitleMarker: "definitionTitleMarker",
      definitionTitleString: "definitionTitleString",
      emphasis: "emphasis",
      emphasisSequence: "emphasisSequence",
      emphasisText: "emphasisText",
      escapeMarker: "escapeMarker",
      hardBreakEscape: "hardBreakEscape",
      hardBreakTrailing: "hardBreakTrailing",
      htmlFlow: "htmlFlow",
      htmlFlowData: "htmlFlowData",
      htmlText: "htmlText",
      htmlTextData: "htmlTextData",
      image: "image",
      label: "label",
      labelText: "labelText",
      labelLink: "labelLink",
      labelImage: "labelImage",
      labelMarker: "labelMarker",
      labelImageMarker: "labelImageMarker",
      labelEnd: "labelEnd",
      link: "link",
      paragraph: "paragraph",
      reference: "reference",
      referenceMarker: "referenceMarker",
      referenceString: "referenceString",
      resource: "resource",
      resourceDestination: "resourceDestination",
      resourceDestinationLiteral: "resourceDestinationLiteral",
      resourceDestinationLiteralMarker: "resourceDestinationLiteralMarker",
      resourceDestinationRaw: "resourceDestinationRaw",
      resourceDestinationString: "resourceDestinationString",
      resourceMarker: "resourceMarker",
      resourceTitle: "resourceTitle",
      resourceTitleMarker: "resourceTitleMarker",
      resourceTitleString: "resourceTitleString",
      setextHeading: "setextHeading",
      setextHeadingText: "setextHeadingText",
      setextHeadingLine: "setextHeadingLine",
      setextHeadingLineSequence: "setextHeadingLineSequence",
      strong: "strong",
      strongSequence: "strongSequence",
      strongText: "strongText",
      thematicBreak: "thematicBreak",
      thematicBreakSequence: "thematicBreakSequence",
      blockQuote: "blockQuote",
      blockQuotePrefix: "blockQuotePrefix",
      blockQuoteMarker: "blockQuoteMarker",
      blockQuotePrefixWhitespace: "blockQuotePrefixWhitespace",
      listOrdered: "listOrdered",
      listUnordered: "listUnordered",
      listItemIndent: "listItemIndent",
      listItemMarker: "listItemMarker",
      listItemPrefix: "listItemPrefix",
      listItemPrefixWhitespace: "listItemPrefixWhitespace",
      listItemValue: "listItemValue",
      chunkDocument: "chunkDocument",
      chunkContent: "chunkContent",
      chunkFlow: "chunkFlow",
      chunkText: "chunkText",
      chunkString: "chunkString"
    };
  });

  // node_modules/micromark-util-symbol/lib/values.js
  var values;
  var init_values = __esm(() => {
    values = {
      ht: "\t",
      lf: `
`,
      cr: "\r",
      space: " ",
      exclamationMark: "!",
      quotationMark: '"',
      numberSign: "#",
      dollarSign: "$",
      percentSign: "%",
      ampersand: "&",
      apostrophe: "'",
      leftParenthesis: "(",
      rightParenthesis: ")",
      asterisk: "*",
      plusSign: "+",
      comma: ",",
      dash: "-",
      dot: ".",
      slash: "/",
      digit0: "0",
      digit1: "1",
      digit2: "2",
      digit3: "3",
      digit4: "4",
      digit5: "5",
      digit6: "6",
      digit7: "7",
      digit8: "8",
      digit9: "9",
      colon: ":",
      semicolon: ";",
      lessThan: "<",
      equalsTo: "=",
      greaterThan: ">",
      questionMark: "?",
      atSign: "@",
      uppercaseA: "A",
      uppercaseB: "B",
      uppercaseC: "C",
      uppercaseD: "D",
      uppercaseE: "E",
      uppercaseF: "F",
      uppercaseG: "G",
      uppercaseH: "H",
      uppercaseI: "I",
      uppercaseJ: "J",
      uppercaseK: "K",
      uppercaseL: "L",
      uppercaseM: "M",
      uppercaseN: "N",
      uppercaseO: "O",
      uppercaseP: "P",
      uppercaseQ: "Q",
      uppercaseR: "R",
      uppercaseS: "S",
      uppercaseT: "T",
      uppercaseU: "U",
      uppercaseV: "V",
      uppercaseW: "W",
      uppercaseX: "X",
      uppercaseY: "Y",
      uppercaseZ: "Z",
      leftSquareBracket: "[",
      backslash: "\\",
      rightSquareBracket: "]",
      caret: "^",
      underscore: "_",
      graveAccent: "`",
      lowercaseA: "a",
      lowercaseB: "b",
      lowercaseC: "c",
      lowercaseD: "d",
      lowercaseE: "e",
      lowercaseF: "f",
      lowercaseG: "g",
      lowercaseH: "h",
      lowercaseI: "i",
      lowercaseJ: "j",
      lowercaseK: "k",
      lowercaseL: "l",
      lowercaseM: "m",
      lowercaseN: "n",
      lowercaseO: "o",
      lowercaseP: "p",
      lowercaseQ: "q",
      lowercaseR: "r",
      lowercaseS: "s",
      lowercaseT: "t",
      lowercaseU: "u",
      lowercaseV: "v",
      lowercaseW: "w",
      lowercaseX: "x",
      lowercaseY: "y",
      lowercaseZ: "z",
      leftCurlyBrace: "{",
      verticalBar: "|",
      rightCurlyBrace: "}",
      tilde: "~",
      replacementCharacter: "�"
    };
  });

  // node_modules/micromark-util-symbol/lib/default.js
  var init_default = __esm(() => {
    init_codes();
    init_constants();
    init_types();
    init_values();
  });

  // node_modules/micromark-util-chunked/dev/index.js
  function splice(list, start, remove, items) {
    const end = list.length;
    let chunkStart = 0;
    let parameters;
    if (start < 0) {
      start = -start > end ? 0 : end + start;
    } else {
      start = start > end ? end : start;
    }
    remove = remove > 0 ? remove : 0;
    if (items.length < constants.v8MaxSafeChunkSize) {
      parameters = Array.from(items);
      parameters.unshift(start, remove);
      list.splice(...parameters);
    } else {
      if (remove)
        list.splice(start, remove);
      while (chunkStart < items.length) {
        parameters = items.slice(chunkStart, chunkStart + constants.v8MaxSafeChunkSize);
        parameters.unshift(start, 0);
        list.splice(...parameters);
        chunkStart += constants.v8MaxSafeChunkSize;
        start += constants.v8MaxSafeChunkSize;
      }
    }
  }
  function push(list, items) {
    if (list.length > 0) {
      splice(list, list.length, 0, items);
      return list;
    }
    return items;
  }
  var init_dev = __esm(() => {
    init_default();
  });

  // node_modules/micromark-util-combine-extensions/index.js
  function combineExtensions(extensions) {
    const all2 = {};
    let index = -1;
    while (++index < extensions.length) {
      syntaxExtension(all2, extensions[index]);
    }
    return all2;
  }
  function syntaxExtension(all2, extension) {
    let hook;
    for (hook in extension) {
      const maybe = hasOwnProperty.call(all2, hook) ? all2[hook] : undefined;
      const left = maybe || (all2[hook] = {});
      const right = extension[hook];
      let code;
      if (right) {
        for (code in right) {
          if (!hasOwnProperty.call(left, code))
            left[code] = [];
          const value = right[code];
          constructs(left[code], Array.isArray(value) ? value : value ? [value] : []);
        }
      }
    }
  }
  function constructs(existing, list) {
    let index = -1;
    const before = [];
    while (++index < list.length) {
      (list[index].add === "after" ? existing : before).push(list[index]);
    }
    splice(existing, 0, 0, before);
  }
  var hasOwnProperty;
  var init_micromark_util_combine_extensions = __esm(() => {
    init_dev();
    hasOwnProperty = {}.hasOwnProperty;
  });

  // node_modules/micromark-util-decode-numeric-character-reference/dev/index.js
  function decodeNumericCharacterReference(value, base) {
    const code = Number.parseInt(value, base);
    if (code < codes.ht || code === codes.vt || code > codes.cr && code < codes.space || code > codes.tilde && code < 160 || code > 55295 && code < 57344 || code > 64975 && code < 65008 || (code & 65535) === 65535 || (code & 65535) === 65534 || code > 1114111) {
      return values.replacementCharacter;
    }
    return String.fromCodePoint(code);
  }
  var init_dev2 = __esm(() => {
    init_default();
  });

  // node_modules/micromark-util-normalize-identifier/dev/index.js
  function normalizeIdentifier(value) {
    return value.replace(/[\t\n\r ]+/g, values.space).replace(/^ | $/g, "").toLowerCase().toUpperCase();
  }
  var init_dev3 = __esm(() => {
    init_default();
  });

  // node_modules/micromark-util-character/dev/index.js
  function asciiControl(code) {
    return code !== null && (code < codes.space || code === codes.del);
  }
  function markdownLineEnding(code) {
    return code !== null && code < codes.horizontalTab;
  }
  function markdownLineEndingOrSpace(code) {
    return code !== null && (code < codes.nul || code === codes.space);
  }
  function markdownSpace(code) {
    return code === codes.horizontalTab || code === codes.virtualSpace || code === codes.space;
  }
  function regexCheck(regex) {
    return check;
    function check(code) {
      return code !== null && code > -1 && regex.test(String.fromCharCode(code));
    }
  }
  var asciiAlpha, asciiAlphanumeric, asciiAtext, asciiDigit, asciiHexDigit, asciiPunctuation, unicodePunctuation, unicodeWhitespace;
  var init_dev4 = __esm(() => {
    init_default();
    asciiAlpha = regexCheck(/[A-Za-z]/);
    asciiAlphanumeric = regexCheck(/[\dA-Za-z]/);
    asciiAtext = regexCheck(/[#-'*+\--9=?A-Z^-~]/);
    asciiDigit = regexCheck(/\d/);
    asciiHexDigit = regexCheck(/[\dA-Fa-f]/);
    asciiPunctuation = regexCheck(/[!-/:-@[-`{-~]/);
    unicodePunctuation = regexCheck(/\p{P}|\p{S}/u);
    unicodeWhitespace = regexCheck(/\s/);
  });

  // node_modules/micromark-factory-space/dev/index.js
  function factorySpace(effects, ok2, type, max) {
    const limit = max ? max - 1 : Number.POSITIVE_INFINITY;
    let size = 0;
    return start;
    function start(code) {
      if (markdownSpace(code)) {
        effects.enter(type);
        return prefix(code);
      }
      return ok2(code);
    }
    function prefix(code) {
      if (markdownSpace(code) && size++ < limit) {
        effects.consume(code);
        return prefix;
      }
      effects.exit(type);
      return ok2(code);
    }
  }
  var init_dev5 = __esm(() => {
    init_dev4();
  });

  // node_modules/micromark/dev/lib/initialize/content.js
  function initializeContent(effects) {
    const contentStart = effects.attempt(this.parser.constructs.contentInitial, afterContentStartConstruct, paragraphInitial);
    let previous;
    return contentStart;
    function afterContentStartConstruct(code) {
      ok(code === codes.eof || markdownLineEnding(code), "expected eol or eof");
      if (code === codes.eof) {
        effects.consume(code);
        return;
      }
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      return factorySpace(effects, contentStart, types.linePrefix);
    }
    function paragraphInitial(code) {
      ok(code !== codes.eof && !markdownLineEnding(code), "expected anything other than a line ending or EOF");
      effects.enter(types.paragraph);
      return lineStart(code);
    }
    function lineStart(code) {
      const token = effects.enter(types.chunkText, {
        contentType: constants.contentTypeText,
        previous
      });
      if (previous) {
        previous.next = token;
      }
      previous = token;
      return data(code);
    }
    function data(code) {
      if (code === codes.eof) {
        effects.exit(types.chunkText);
        effects.exit(types.paragraph);
        effects.consume(code);
        return;
      }
      if (markdownLineEnding(code)) {
        effects.consume(code);
        effects.exit(types.chunkText);
        return lineStart;
      }
      effects.consume(code);
      return data;
    }
  }
  var content;
  var init_content = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_default();
    content = { tokenize: initializeContent };
  });

  // node_modules/micromark/dev/lib/initialize/document.js
  function initializeDocument(effects) {
    const self = this;
    const stack = [];
    let continued = 0;
    let childFlow;
    let childToken;
    let lineStartOffset;
    return start;
    function start(code) {
      if (continued < stack.length) {
        const item = stack[continued];
        self.containerState = item[1];
        ok(item[0].continuation, "expected `continuation` to be defined on container construct");
        return effects.attempt(item[0].continuation, documentContinue, checkNewContainers)(code);
      }
      return checkNewContainers(code);
    }
    function documentContinue(code) {
      ok(self.containerState, "expected `containerState` to be defined after continuation");
      continued++;
      if (self.containerState._closeFlow) {
        self.containerState._closeFlow = undefined;
        if (childFlow) {
          closeFlow();
        }
        const indexBeforeExits = self.events.length;
        let indexBeforeFlow = indexBeforeExits;
        let point;
        while (indexBeforeFlow--) {
          if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === types.chunkFlow) {
            point = self.events[indexBeforeFlow][1].end;
            break;
          }
        }
        ok(point, "could not find previous flow chunk");
        exitContainers(continued);
        let index = indexBeforeExits;
        while (index < self.events.length) {
          self.events[index][1].end = { ...point };
          index++;
        }
        splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
        self.events.length = index;
        return checkNewContainers(code);
      }
      return start(code);
    }
    function checkNewContainers(code) {
      if (continued === stack.length) {
        if (!childFlow) {
          return documentContinued(code);
        }
        if (childFlow.currentConstruct && childFlow.currentConstruct.concrete) {
          return flowStart(code);
        }
        self.interrupt = Boolean(childFlow.currentConstruct && !childFlow._gfmTableDynamicInterruptHack);
      }
      self.containerState = {};
      return effects.check(containerConstruct, thereIsANewContainer, thereIsNoNewContainer)(code);
    }
    function thereIsANewContainer(code) {
      if (childFlow)
        closeFlow();
      exitContainers(continued);
      return documentContinued(code);
    }
    function thereIsNoNewContainer(code) {
      self.parser.lazy[self.now().line] = continued !== stack.length;
      lineStartOffset = self.now().offset;
      return flowStart(code);
    }
    function documentContinued(code) {
      self.containerState = {};
      return effects.attempt(containerConstruct, containerContinue, flowStart)(code);
    }
    function containerContinue(code) {
      ok(self.currentConstruct, "expected `currentConstruct` to be defined on tokenizer");
      ok(self.containerState, "expected `containerState` to be defined on tokenizer");
      continued++;
      stack.push([self.currentConstruct, self.containerState]);
      return documentContinued(code);
    }
    function flowStart(code) {
      if (code === codes.eof) {
        if (childFlow)
          closeFlow();
        exitContainers(0);
        effects.consume(code);
        return;
      }
      childFlow = childFlow || self.parser.flow(self.now());
      effects.enter(types.chunkFlow, {
        _tokenizer: childFlow,
        contentType: constants.contentTypeFlow,
        previous: childToken
      });
      return flowContinue(code);
    }
    function flowContinue(code) {
      if (code === codes.eof) {
        writeToChild(effects.exit(types.chunkFlow), true);
        exitContainers(0);
        effects.consume(code);
        return;
      }
      if (markdownLineEnding(code)) {
        effects.consume(code);
        writeToChild(effects.exit(types.chunkFlow));
        continued = 0;
        self.interrupt = undefined;
        return start;
      }
      effects.consume(code);
      return flowContinue;
    }
    function writeToChild(token, endOfFile) {
      ok(childFlow, "expected `childFlow` to be defined when continuing");
      const stream = self.sliceStream(token);
      if (endOfFile)
        stream.push(null);
      token.previous = childToken;
      if (childToken)
        childToken.next = token;
      childToken = token;
      childFlow.defineSkip(token.start);
      childFlow.write(stream);
      if (self.parser.lazy[token.start.line]) {
        let index = childFlow.events.length;
        while (index--) {
          if (childFlow.events[index][1].start.offset < lineStartOffset && (!childFlow.events[index][1].end || childFlow.events[index][1].end.offset > lineStartOffset)) {
            return;
          }
        }
        const indexBeforeExits = self.events.length;
        let indexBeforeFlow = indexBeforeExits;
        let seen;
        let point;
        while (indexBeforeFlow--) {
          if (self.events[indexBeforeFlow][0] === "exit" && self.events[indexBeforeFlow][1].type === types.chunkFlow) {
            if (seen) {
              point = self.events[indexBeforeFlow][1].end;
              break;
            }
            seen = true;
          }
        }
        ok(point, "could not find previous flow chunk");
        exitContainers(continued);
        index = indexBeforeExits;
        while (index < self.events.length) {
          self.events[index][1].end = { ...point };
          index++;
        }
        splice(self.events, indexBeforeFlow + 1, 0, self.events.slice(indexBeforeExits));
        self.events.length = index;
      }
    }
    function exitContainers(size) {
      let index = stack.length;
      while (index-- > size) {
        const entry = stack[index];
        self.containerState = entry[1];
        ok(entry[0].exit, "expected `exit` to be defined on container construct");
        entry[0].exit.call(self, effects);
      }
      stack.length = size;
    }
    function closeFlow() {
      ok(self.containerState, "expected `containerState` to be defined when closing flow");
      ok(childFlow, "expected `childFlow` to be defined when closing it");
      childFlow.write([codes.eof]);
      childToken = undefined;
      childFlow = undefined;
      self.containerState._closeFlow = undefined;
    }
  }
  function tokenizeContainer(effects, ok2, nok) {
    ok(this.parser.constructs.disable.null, "expected `disable.null` to be populated");
    return factorySpace(effects, effects.attempt(this.parser.constructs.document, ok2, nok), types.linePrefix, this.parser.constructs.disable.null.includes("codeIndented") ? undefined : constants.tabSize);
  }
  var document2, containerConstruct;
  var init_document = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_dev();
    init_default();
    document2 = { tokenize: initializeDocument };
    containerConstruct = { tokenize: tokenizeContainer };
  });

  // node_modules/micromark-util-classify-character/dev/index.js
  function classifyCharacter(code) {
    if (code === codes.eof || markdownLineEndingOrSpace(code) || unicodeWhitespace(code)) {
      return constants.characterGroupWhitespace;
    }
    if (unicodePunctuation(code)) {
      return constants.characterGroupPunctuation;
    }
  }
  var init_dev6 = __esm(() => {
    init_dev4();
    init_default();
  });

  // node_modules/micromark-util-resolve-all/index.js
  function resolveAll(constructs2, events, context) {
    const called = [];
    let index = -1;
    while (++index < constructs2.length) {
      const resolve = constructs2[index].resolveAll;
      if (resolve && !called.includes(resolve)) {
        events = resolve(events, context);
        called.push(resolve);
      }
    }
    return events;
  }

  // node_modules/micromark-core-commonmark/dev/lib/attention.js
  function resolveAllAttention(events, context) {
    let index = -1;
    let open;
    let group;
    let text;
    let openingSequence;
    let closingSequence;
    let use;
    let nextEvents;
    let offset;
    while (++index < events.length) {
      if (events[index][0] === "enter" && events[index][1].type === "attentionSequence" && events[index][1]._close) {
        open = index;
        while (open--) {
          if (events[open][0] === "exit" && events[open][1].type === "attentionSequence" && events[open][1]._open && context.sliceSerialize(events[open][1]).charCodeAt(0) === context.sliceSerialize(events[index][1]).charCodeAt(0)) {
            if ((events[open][1]._close || events[index][1]._open) && (events[index][1].end.offset - events[index][1].start.offset) % 3 && !((events[open][1].end.offset - events[open][1].start.offset + events[index][1].end.offset - events[index][1].start.offset) % 3)) {
              continue;
            }
            use = events[open][1].end.offset - events[open][1].start.offset > 1 && events[index][1].end.offset - events[index][1].start.offset > 1 ? 2 : 1;
            const start = { ...events[open][1].end };
            const end = { ...events[index][1].start };
            movePoint(start, -use);
            movePoint(end, use);
            openingSequence = {
              type: use > 1 ? types.strongSequence : types.emphasisSequence,
              start,
              end: { ...events[open][1].end }
            };
            closingSequence = {
              type: use > 1 ? types.strongSequence : types.emphasisSequence,
              start: { ...events[index][1].start },
              end
            };
            text = {
              type: use > 1 ? types.strongText : types.emphasisText,
              start: { ...events[open][1].end },
              end: { ...events[index][1].start }
            };
            group = {
              type: use > 1 ? types.strong : types.emphasis,
              start: { ...openingSequence.start },
              end: { ...closingSequence.end }
            };
            events[open][1].end = { ...openingSequence.start };
            events[index][1].start = { ...closingSequence.end };
            nextEvents = [];
            if (events[open][1].end.offset - events[open][1].start.offset) {
              nextEvents = push(nextEvents, [
                ["enter", events[open][1], context],
                ["exit", events[open][1], context]
              ]);
            }
            nextEvents = push(nextEvents, [
              ["enter", group, context],
              ["enter", openingSequence, context],
              ["exit", openingSequence, context],
              ["enter", text, context]
            ]);
            ok(context.parser.constructs.insideSpan.null, "expected `insideSpan` to be populated");
            nextEvents = push(nextEvents, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + 1, index), context));
            nextEvents = push(nextEvents, [
              ["exit", text, context],
              ["enter", closingSequence, context],
              ["exit", closingSequence, context],
              ["exit", group, context]
            ]);
            if (events[index][1].end.offset - events[index][1].start.offset) {
              offset = 2;
              nextEvents = push(nextEvents, [
                ["enter", events[index][1], context],
                ["exit", events[index][1], context]
              ]);
            } else {
              offset = 0;
            }
            splice(events, open - 1, index - open + 3, nextEvents);
            index = open + nextEvents.length - offset - 2;
            break;
          }
        }
      }
    }
    index = -1;
    while (++index < events.length) {
      if (events[index][1].type === "attentionSequence") {
        events[index][1].type = "data";
      }
    }
    return events;
  }
  function tokenizeAttention(effects, ok2) {
    const attentionMarkers = this.parser.constructs.attentionMarkers.null;
    const previous = this.previous;
    const before = classifyCharacter(previous);
    let marker;
    return start;
    function start(code) {
      ok(code === codes.asterisk || code === codes.underscore, "expected asterisk or underscore");
      marker = code;
      effects.enter("attentionSequence");
      return inside(code);
    }
    function inside(code) {
      if (code === marker) {
        effects.consume(code);
        return inside;
      }
      const token = effects.exit("attentionSequence");
      const after = classifyCharacter(code);
      ok(attentionMarkers, "expected `attentionMarkers` to be populated");
      const open = !after || after === constants.characterGroupPunctuation && before || attentionMarkers.includes(code);
      const close = !before || before === constants.characterGroupPunctuation && after || attentionMarkers.includes(previous);
      token._open = Boolean(marker === codes.asterisk ? open : open && (before || !close));
      token._close = Boolean(marker === codes.asterisk ? close : close && (after || !open));
      return ok2(code);
    }
  }
  function movePoint(point, offset) {
    point.column += offset;
    point.offset += offset;
    point._bufferIndex += offset;
  }
  var attention;
  var init_attention = __esm(() => {
    init_development();
    init_dev();
    init_dev6();
    init_default();
    attention = {
      name: "attention",
      resolveAll: resolveAllAttention,
      tokenize: tokenizeAttention
    };
  });

  // node_modules/micromark-core-commonmark/dev/lib/autolink.js
  function tokenizeAutolink(effects, ok2, nok) {
    let size = 0;
    return start;
    function start(code) {
      ok(code === codes.lessThan, "expected `<`");
      effects.enter(types.autolink);
      effects.enter(types.autolinkMarker);
      effects.consume(code);
      effects.exit(types.autolinkMarker);
      effects.enter(types.autolinkProtocol);
      return open;
    }
    function open(code) {
      if (asciiAlpha(code)) {
        effects.consume(code);
        return schemeOrEmailAtext;
      }
      if (code === codes.atSign) {
        return nok(code);
      }
      return emailAtext(code);
    }
    function schemeOrEmailAtext(code) {
      if (code === codes.plusSign || code === codes.dash || code === codes.dot || asciiAlphanumeric(code)) {
        size = 1;
        return schemeInsideOrEmailAtext(code);
      }
      return emailAtext(code);
    }
    function schemeInsideOrEmailAtext(code) {
      if (code === codes.colon) {
        effects.consume(code);
        size = 0;
        return urlInside;
      }
      if ((code === codes.plusSign || code === codes.dash || code === codes.dot || asciiAlphanumeric(code)) && size++ < constants.autolinkSchemeSizeMax) {
        effects.consume(code);
        return schemeInsideOrEmailAtext;
      }
      size = 0;
      return emailAtext(code);
    }
    function urlInside(code) {
      if (code === codes.greaterThan) {
        effects.exit(types.autolinkProtocol);
        effects.enter(types.autolinkMarker);
        effects.consume(code);
        effects.exit(types.autolinkMarker);
        effects.exit(types.autolink);
        return ok2;
      }
      if (code === codes.eof || code === codes.space || code === codes.lessThan || asciiControl(code)) {
        return nok(code);
      }
      effects.consume(code);
      return urlInside;
    }
    function emailAtext(code) {
      if (code === codes.atSign) {
        effects.consume(code);
        return emailAtSignOrDot;
      }
      if (asciiAtext(code)) {
        effects.consume(code);
        return emailAtext;
      }
      return nok(code);
    }
    function emailAtSignOrDot(code) {
      return asciiAlphanumeric(code) ? emailLabel(code) : nok(code);
    }
    function emailLabel(code) {
      if (code === codes.dot) {
        effects.consume(code);
        size = 0;
        return emailAtSignOrDot;
      }
      if (code === codes.greaterThan) {
        effects.exit(types.autolinkProtocol).type = types.autolinkEmail;
        effects.enter(types.autolinkMarker);
        effects.consume(code);
        effects.exit(types.autolinkMarker);
        effects.exit(types.autolink);
        return ok2;
      }
      return emailValue(code);
    }
    function emailValue(code) {
      if ((code === codes.dash || asciiAlphanumeric(code)) && size++ < constants.autolinkDomainSizeMax) {
        const next = code === codes.dash ? emailValue : emailLabel;
        effects.consume(code);
        return next;
      }
      return nok(code);
    }
  }
  var autolink;
  var init_autolink = __esm(() => {
    init_development();
    init_dev4();
    init_default();
    autolink = { name: "autolink", tokenize: tokenizeAutolink };
  });

  // node_modules/micromark-core-commonmark/dev/lib/blank-line.js
  function tokenizeBlankLine(effects, ok2, nok) {
    return start;
    function start(code) {
      return markdownSpace(code) ? factorySpace(effects, after, types.linePrefix)(code) : after(code);
    }
    function after(code) {
      return code === codes.eof || markdownLineEnding(code) ? ok2(code) : nok(code);
    }
  }
  var blankLine;
  var init_blank_line = __esm(() => {
    init_dev5();
    init_dev4();
    init_default();
    blankLine = { partial: true, tokenize: tokenizeBlankLine };
  });

  // node_modules/micromark-core-commonmark/dev/lib/block-quote.js
  function tokenizeBlockQuoteStart(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code) {
      if (code === codes.greaterThan) {
        const state = self.containerState;
        ok(state, "expected `containerState` to be defined in container");
        if (!state.open) {
          effects.enter(types.blockQuote, { _container: true });
          state.open = true;
        }
        effects.enter(types.blockQuotePrefix);
        effects.enter(types.blockQuoteMarker);
        effects.consume(code);
        effects.exit(types.blockQuoteMarker);
        return after;
      }
      return nok(code);
    }
    function after(code) {
      if (markdownSpace(code)) {
        effects.enter(types.blockQuotePrefixWhitespace);
        effects.consume(code);
        effects.exit(types.blockQuotePrefixWhitespace);
        effects.exit(types.blockQuotePrefix);
        return ok2;
      }
      effects.exit(types.blockQuotePrefix);
      return ok2(code);
    }
  }
  function tokenizeBlockQuoteContinuation(effects, ok2, nok) {
    const self = this;
    return contStart;
    function contStart(code) {
      if (markdownSpace(code)) {
        ok(self.parser.constructs.disable.null, "expected `disable.null` to be populated");
        return factorySpace(effects, contBefore, types.linePrefix, self.parser.constructs.disable.null.includes("codeIndented") ? undefined : constants.tabSize)(code);
      }
      return contBefore(code);
    }
    function contBefore(code) {
      return effects.attempt(blockQuote, ok2, nok)(code);
    }
  }
  function exit(effects) {
    effects.exit(types.blockQuote);
  }
  var blockQuote;
  var init_block_quote = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_default();
    blockQuote = {
      continuation: { tokenize: tokenizeBlockQuoteContinuation },
      exit,
      name: "blockQuote",
      tokenize: tokenizeBlockQuoteStart
    };
  });

  // node_modules/micromark-core-commonmark/dev/lib/character-escape.js
  function tokenizeCharacterEscape(effects, ok2, nok) {
    return start;
    function start(code) {
      ok(code === codes.backslash, "expected `\\`");
      effects.enter(types.characterEscape);
      effects.enter(types.escapeMarker);
      effects.consume(code);
      effects.exit(types.escapeMarker);
      return inside;
    }
    function inside(code) {
      if (asciiPunctuation(code)) {
        effects.enter(types.characterEscapeValue);
        effects.consume(code);
        effects.exit(types.characterEscapeValue);
        effects.exit(types.characterEscape);
        return ok2;
      }
      return nok(code);
    }
  }
  var characterEscape;
  var init_character_escape = __esm(() => {
    init_development();
    init_dev4();
    init_default();
    characterEscape = {
      name: "characterEscape",
      tokenize: tokenizeCharacterEscape
    };
  });

  // node_modules/micromark-core-commonmark/dev/lib/character-reference.js
  function tokenizeCharacterReference(effects, ok2, nok) {
    const self = this;
    let size = 0;
    let max;
    let test;
    return start;
    function start(code) {
      ok(code === codes.ampersand, "expected `&`");
      effects.enter(types.characterReference);
      effects.enter(types.characterReferenceMarker);
      effects.consume(code);
      effects.exit(types.characterReferenceMarker);
      return open;
    }
    function open(code) {
      if (code === codes.numberSign) {
        effects.enter(types.characterReferenceMarkerNumeric);
        effects.consume(code);
        effects.exit(types.characterReferenceMarkerNumeric);
        return numeric;
      }
      effects.enter(types.characterReferenceValue);
      max = constants.characterReferenceNamedSizeMax;
      test = asciiAlphanumeric;
      return value(code);
    }
    function numeric(code) {
      if (code === codes.uppercaseX || code === codes.lowercaseX) {
        effects.enter(types.characterReferenceMarkerHexadecimal);
        effects.consume(code);
        effects.exit(types.characterReferenceMarkerHexadecimal);
        effects.enter(types.characterReferenceValue);
        max = constants.characterReferenceHexadecimalSizeMax;
        test = asciiHexDigit;
        return value;
      }
      effects.enter(types.characterReferenceValue);
      max = constants.characterReferenceDecimalSizeMax;
      test = asciiDigit;
      return value(code);
    }
    function value(code) {
      if (code === codes.semicolon && size) {
        const token = effects.exit(types.characterReferenceValue);
        if (test === asciiAlphanumeric && !decodeNamedCharacterReference(self.sliceSerialize(token))) {
          return nok(code);
        }
        effects.enter(types.characterReferenceMarker);
        effects.consume(code);
        effects.exit(types.characterReferenceMarker);
        effects.exit(types.characterReference);
        return ok2;
      }
      if (test(code) && size++ < max) {
        effects.consume(code);
        return value;
      }
      return nok(code);
    }
  }
  var characterReference;
  var init_character_reference = __esm(() => {
    init_development();
    init_index_dom();
    init_dev4();
    init_default();
    characterReference = {
      name: "characterReference",
      tokenize: tokenizeCharacterReference
    };
  });

  // node_modules/micromark-core-commonmark/dev/lib/code-fenced.js
  function tokenizeCodeFenced(effects, ok2, nok) {
    const self = this;
    const closeStart = { partial: true, tokenize: tokenizeCloseStart };
    let initialPrefix = 0;
    let sizeOpen = 0;
    let marker;
    return start;
    function start(code) {
      return beforeSequenceOpen(code);
    }
    function beforeSequenceOpen(code) {
      ok(code === codes.graveAccent || code === codes.tilde, "expected `` ` `` or `~`");
      const tail = self.events[self.events.length - 1];
      initialPrefix = tail && tail[1].type === types.linePrefix ? tail[2].sliceSerialize(tail[1], true).length : 0;
      marker = code;
      effects.enter(types.codeFenced);
      effects.enter(types.codeFencedFence);
      effects.enter(types.codeFencedFenceSequence);
      return sequenceOpen(code);
    }
    function sequenceOpen(code) {
      if (code === marker) {
        sizeOpen++;
        effects.consume(code);
        return sequenceOpen;
      }
      if (sizeOpen < constants.codeFencedSequenceSizeMin) {
        return nok(code);
      }
      effects.exit(types.codeFencedFenceSequence);
      return markdownSpace(code) ? factorySpace(effects, infoBefore, types.whitespace)(code) : infoBefore(code);
    }
    function infoBefore(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        effects.exit(types.codeFencedFence);
        return self.interrupt ? ok2(code) : effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
      }
      effects.enter(types.codeFencedFenceInfo);
      effects.enter(types.chunkString, { contentType: constants.contentTypeString });
      return info(code);
    }
    function info(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        effects.exit(types.chunkString);
        effects.exit(types.codeFencedFenceInfo);
        return infoBefore(code);
      }
      if (markdownSpace(code)) {
        effects.exit(types.chunkString);
        effects.exit(types.codeFencedFenceInfo);
        return factorySpace(effects, metaBefore, types.whitespace)(code);
      }
      if (code === codes.graveAccent && code === marker) {
        return nok(code);
      }
      effects.consume(code);
      return info;
    }
    function metaBefore(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        return infoBefore(code);
      }
      effects.enter(types.codeFencedFenceMeta);
      effects.enter(types.chunkString, { contentType: constants.contentTypeString });
      return meta(code);
    }
    function meta(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        effects.exit(types.chunkString);
        effects.exit(types.codeFencedFenceMeta);
        return infoBefore(code);
      }
      if (code === codes.graveAccent && code === marker) {
        return nok(code);
      }
      effects.consume(code);
      return meta;
    }
    function atNonLazyBreak(code) {
      ok(markdownLineEnding(code), "expected eol");
      return effects.attempt(closeStart, after, contentBefore)(code);
    }
    function contentBefore(code) {
      ok(markdownLineEnding(code), "expected eol");
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      return contentStart;
    }
    function contentStart(code) {
      return initialPrefix > 0 && markdownSpace(code) ? factorySpace(effects, beforeContentChunk, types.linePrefix, initialPrefix + 1)(code) : beforeContentChunk(code);
    }
    function beforeContentChunk(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        return effects.check(nonLazyContinuation, atNonLazyBreak, after)(code);
      }
      effects.enter(types.codeFlowValue);
      return contentChunk(code);
    }
    function contentChunk(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        effects.exit(types.codeFlowValue);
        return beforeContentChunk(code);
      }
      effects.consume(code);
      return contentChunk;
    }
    function after(code) {
      effects.exit(types.codeFenced);
      return ok2(code);
    }
    function tokenizeCloseStart(effects2, ok3, nok2) {
      let size = 0;
      return startBefore;
      function startBefore(code) {
        ok(markdownLineEnding(code), "expected eol");
        effects2.enter(types.lineEnding);
        effects2.consume(code);
        effects2.exit(types.lineEnding);
        return start2;
      }
      function start2(code) {
        ok(self.parser.constructs.disable.null, "expected `disable.null` to be populated");
        effects2.enter(types.codeFencedFence);
        return markdownSpace(code) ? factorySpace(effects2, beforeSequenceClose, types.linePrefix, self.parser.constructs.disable.null.includes("codeIndented") ? undefined : constants.tabSize)(code) : beforeSequenceClose(code);
      }
      function beforeSequenceClose(code) {
        if (code === marker) {
          effects2.enter(types.codeFencedFenceSequence);
          return sequenceClose(code);
        }
        return nok2(code);
      }
      function sequenceClose(code) {
        if (code === marker) {
          size++;
          effects2.consume(code);
          return sequenceClose;
        }
        if (size >= sizeOpen) {
          effects2.exit(types.codeFencedFenceSequence);
          return markdownSpace(code) ? factorySpace(effects2, sequenceCloseAfter, types.whitespace)(code) : sequenceCloseAfter(code);
        }
        return nok2(code);
      }
      function sequenceCloseAfter(code) {
        if (code === codes.eof || markdownLineEnding(code)) {
          effects2.exit(types.codeFencedFence);
          return ok3(code);
        }
        return nok2(code);
      }
    }
  }
  function tokenizeNonLazyContinuation(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code) {
      if (code === codes.eof) {
        return nok(code);
      }
      ok(markdownLineEnding(code), "expected eol");
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      return lineStart;
    }
    function lineStart(code) {
      return self.parser.lazy[self.now().line] ? nok(code) : ok2(code);
    }
  }
  var nonLazyContinuation, codeFenced;
  var init_code_fenced = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_default();
    nonLazyContinuation = {
      partial: true,
      tokenize: tokenizeNonLazyContinuation
    };
    codeFenced = {
      concrete: true,
      name: "codeFenced",
      tokenize: tokenizeCodeFenced
    };
  });

  // node_modules/micromark-core-commonmark/dev/lib/code-indented.js
  function tokenizeCodeIndented(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code) {
      ok(markdownSpace(code));
      effects.enter(types.codeIndented);
      return factorySpace(effects, afterPrefix, types.linePrefix, constants.tabSize + 1)(code);
    }
    function afterPrefix(code) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === types.linePrefix && tail[2].sliceSerialize(tail[1], true).length >= constants.tabSize ? atBreak(code) : nok(code);
    }
    function atBreak(code) {
      if (code === codes.eof) {
        return after(code);
      }
      if (markdownLineEnding(code)) {
        return effects.attempt(furtherStart, atBreak, after)(code);
      }
      effects.enter(types.codeFlowValue);
      return inside(code);
    }
    function inside(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        effects.exit(types.codeFlowValue);
        return atBreak(code);
      }
      effects.consume(code);
      return inside;
    }
    function after(code) {
      effects.exit(types.codeIndented);
      return ok2(code);
    }
  }
  function tokenizeFurtherStart(effects, ok2, nok) {
    const self = this;
    return furtherStart2;
    function furtherStart2(code) {
      if (self.parser.lazy[self.now().line]) {
        return nok(code);
      }
      if (markdownLineEnding(code)) {
        effects.enter(types.lineEnding);
        effects.consume(code);
        effects.exit(types.lineEnding);
        return furtherStart2;
      }
      return factorySpace(effects, afterPrefix, types.linePrefix, constants.tabSize + 1)(code);
    }
    function afterPrefix(code) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === types.linePrefix && tail[2].sliceSerialize(tail[1], true).length >= constants.tabSize ? ok2(code) : markdownLineEnding(code) ? furtherStart2(code) : nok(code);
    }
  }
  var codeIndented, furtherStart;
  var init_code_indented = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_default();
    codeIndented = {
      name: "codeIndented",
      tokenize: tokenizeCodeIndented
    };
    furtherStart = { partial: true, tokenize: tokenizeFurtherStart };
  });

  // node_modules/micromark-core-commonmark/dev/lib/code-text.js
  function resolveCodeText(events) {
    let tailExitIndex = events.length - 4;
    let headEnterIndex = 3;
    let index;
    let enter;
    if ((events[headEnterIndex][1].type === types.lineEnding || events[headEnterIndex][1].type === "space") && (events[tailExitIndex][1].type === types.lineEnding || events[tailExitIndex][1].type === "space")) {
      index = headEnterIndex;
      while (++index < tailExitIndex) {
        if (events[index][1].type === types.codeTextData) {
          events[headEnterIndex][1].type = types.codeTextPadding;
          events[tailExitIndex][1].type = types.codeTextPadding;
          headEnterIndex += 2;
          tailExitIndex -= 2;
          break;
        }
      }
    }
    index = headEnterIndex - 1;
    tailExitIndex++;
    while (++index <= tailExitIndex) {
      if (enter === undefined) {
        if (index !== tailExitIndex && events[index][1].type !== types.lineEnding) {
          enter = index;
        }
      } else if (index === tailExitIndex || events[index][1].type === types.lineEnding) {
        events[enter][1].type = types.codeTextData;
        if (index !== enter + 2) {
          events[enter][1].end = events[index - 1][1].end;
          events.splice(enter + 2, index - enter - 2);
          tailExitIndex -= index - enter - 2;
          index = enter + 2;
        }
        enter = undefined;
      }
    }
    return events;
  }
  function previous(code) {
    return code !== codes.graveAccent || this.events[this.events.length - 1][1].type === types.characterEscape;
  }
  function tokenizeCodeText(effects, ok2, nok) {
    const self = this;
    let sizeOpen = 0;
    let size;
    let token;
    return start;
    function start(code) {
      ok(code === codes.graveAccent, "expected `` ` ``");
      ok(previous.call(self, self.previous), "expected correct previous");
      effects.enter(types.codeText);
      effects.enter(types.codeTextSequence);
      return sequenceOpen(code);
    }
    function sequenceOpen(code) {
      if (code === codes.graveAccent) {
        effects.consume(code);
        sizeOpen++;
        return sequenceOpen;
      }
      effects.exit(types.codeTextSequence);
      return between(code);
    }
    function between(code) {
      if (code === codes.eof) {
        return nok(code);
      }
      if (code === codes.space) {
        effects.enter("space");
        effects.consume(code);
        effects.exit("space");
        return between;
      }
      if (code === codes.graveAccent) {
        token = effects.enter(types.codeTextSequence);
        size = 0;
        return sequenceClose(code);
      }
      if (markdownLineEnding(code)) {
        effects.enter(types.lineEnding);
        effects.consume(code);
        effects.exit(types.lineEnding);
        return between;
      }
      effects.enter(types.codeTextData);
      return data(code);
    }
    function data(code) {
      if (code === codes.eof || code === codes.space || code === codes.graveAccent || markdownLineEnding(code)) {
        effects.exit(types.codeTextData);
        return between(code);
      }
      effects.consume(code);
      return data;
    }
    function sequenceClose(code) {
      if (code === codes.graveAccent) {
        effects.consume(code);
        size++;
        return sequenceClose;
      }
      if (size === sizeOpen) {
        effects.exit(types.codeTextSequence);
        effects.exit(types.codeText);
        return ok2(code);
      }
      token.type = types.codeTextData;
      return data(code);
    }
  }
  var codeText;
  var init_code_text = __esm(() => {
    init_development();
    init_dev4();
    init_default();
    codeText = {
      name: "codeText",
      previous,
      resolve: resolveCodeText,
      tokenize: tokenizeCodeText
    };
  });

  // node_modules/micromark-util-subtokenize/dev/lib/splice-buffer.js
  class SpliceBuffer {
    constructor(initial) {
      this.left = initial ? [...initial] : [];
      this.right = [];
    }
    get(index) {
      if (index < 0 || index >= this.left.length + this.right.length) {
        throw new RangeError("Cannot access index `" + index + "` in a splice buffer of size `" + (this.left.length + this.right.length) + "`");
      }
      if (index < this.left.length)
        return this.left[index];
      return this.right[this.right.length - index + this.left.length - 1];
    }
    get length() {
      return this.left.length + this.right.length;
    }
    shift() {
      this.setCursor(0);
      return this.right.pop();
    }
    slice(start, end) {
      const stop = end === null || end === undefined ? Number.POSITIVE_INFINITY : end;
      if (stop < this.left.length) {
        return this.left.slice(start, stop);
      }
      if (start > this.left.length) {
        return this.right.slice(this.right.length - stop + this.left.length, this.right.length - start + this.left.length).reverse();
      }
      return this.left.slice(start).concat(this.right.slice(this.right.length - stop + this.left.length).reverse());
    }
    splice(start, deleteCount, items) {
      const count = deleteCount || 0;
      this.setCursor(Math.trunc(start));
      const removed = this.right.splice(this.right.length - count, Number.POSITIVE_INFINITY);
      if (items)
        chunkedPush(this.left, items);
      return removed.reverse();
    }
    pop() {
      this.setCursor(Number.POSITIVE_INFINITY);
      return this.left.pop();
    }
    push(item) {
      this.setCursor(Number.POSITIVE_INFINITY);
      this.left.push(item);
    }
    pushMany(items) {
      this.setCursor(Number.POSITIVE_INFINITY);
      chunkedPush(this.left, items);
    }
    unshift(item) {
      this.setCursor(0);
      this.right.push(item);
    }
    unshiftMany(items) {
      this.setCursor(0);
      chunkedPush(this.right, items.reverse());
    }
    setCursor(n) {
      if (n === this.left.length || n > this.left.length && this.right.length === 0 || n < 0 && this.left.length === 0)
        return;
      if (n < this.left.length) {
        const removed = this.left.splice(n, Number.POSITIVE_INFINITY);
        chunkedPush(this.right, removed.reverse());
      } else {
        const removed = this.right.splice(this.left.length + this.right.length - n, Number.POSITIVE_INFINITY);
        chunkedPush(this.left, removed.reverse());
      }
    }
  }
  function chunkedPush(list, right) {
    let chunkStart = 0;
    if (right.length < constants.v8MaxSafeChunkSize) {
      list.push(...right);
    } else {
      while (chunkStart < right.length) {
        list.push(...right.slice(chunkStart, chunkStart + constants.v8MaxSafeChunkSize));
        chunkStart += constants.v8MaxSafeChunkSize;
      }
    }
  }
  var init_splice_buffer = __esm(() => {
    init_default();
  });

  // node_modules/micromark-util-subtokenize/dev/index.js
  function subtokenize(eventsArray) {
    const jumps = {};
    let index = -1;
    let event;
    let lineIndex;
    let otherIndex;
    let otherEvent;
    let parameters;
    let subevents;
    let more;
    const events = new SpliceBuffer(eventsArray);
    while (++index < events.length) {
      while (index in jumps) {
        index = jumps[index];
      }
      event = events.get(index);
      if (index && event[1].type === types.chunkFlow && events.get(index - 1)[1].type === types.listItemPrefix) {
        ok(event[1]._tokenizer, "expected `_tokenizer` on subtokens");
        subevents = event[1]._tokenizer.events;
        otherIndex = 0;
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === types.lineEndingBlank) {
          otherIndex += 2;
        }
        if (otherIndex < subevents.length && subevents[otherIndex][1].type === types.content) {
          while (++otherIndex < subevents.length) {
            if (subevents[otherIndex][1].type === types.content) {
              break;
            }
            if (subevents[otherIndex][1].type === types.chunkText) {
              subevents[otherIndex][1]._isInFirstContentOfListItem = true;
              otherIndex++;
            }
          }
        }
      }
      if (event[0] === "enter") {
        if (event[1].contentType) {
          Object.assign(jumps, subcontent(events, index));
          index = jumps[index];
          more = true;
        }
      } else if (event[1]._container) {
        otherIndex = index;
        lineIndex = undefined;
        while (otherIndex--) {
          otherEvent = events.get(otherIndex);
          if (otherEvent[1].type === types.lineEnding || otherEvent[1].type === types.lineEndingBlank) {
            if (otherEvent[0] === "enter") {
              if (lineIndex) {
                events.get(lineIndex)[1].type = types.lineEndingBlank;
              }
              otherEvent[1].type = types.lineEnding;
              lineIndex = otherIndex;
            }
          } else if (otherEvent[1].type === types.linePrefix || otherEvent[1].type === types.listItemIndent) {} else {
            break;
          }
        }
        if (lineIndex) {
          event[1].end = { ...events.get(lineIndex)[1].start };
          parameters = events.slice(lineIndex, index);
          parameters.unshift(event);
          events.splice(lineIndex, index - lineIndex + 1, parameters);
        }
      }
    }
    splice(eventsArray, 0, Number.POSITIVE_INFINITY, events.slice(0));
    return !more;
  }
  function subcontent(events, eventIndex) {
    const token = events.get(eventIndex)[1];
    const context = events.get(eventIndex)[2];
    let startPosition = eventIndex - 1;
    const startPositions = [];
    ok(token.contentType, "expected `contentType` on subtokens");
    let tokenizer = token._tokenizer;
    if (!tokenizer) {
      tokenizer = context.parser[token.contentType](token.start);
      if (token._contentTypeTextTrailing) {
        tokenizer._contentTypeTextTrailing = true;
      }
    }
    const childEvents = tokenizer.events;
    const jumps = [];
    const gaps = {};
    let stream;
    let previous2;
    let index = -1;
    let current = token;
    let adjust = 0;
    let start = 0;
    const breaks = [start];
    while (current) {
      while (events.get(++startPosition)[1] !== current) {}
      ok(!previous2 || current.previous === previous2, "expected previous to match");
      ok(!previous2 || previous2.next === current, "expected next to match");
      startPositions.push(startPosition);
      if (!current._tokenizer) {
        stream = context.sliceStream(current);
        if (!current.next) {
          stream.push(codes.eof);
        }
        if (previous2) {
          tokenizer.defineSkip(current.start);
        }
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = true;
        }
        tokenizer.write(stream);
        if (current._isInFirstContentOfListItem) {
          tokenizer._gfmTasklistFirstContentOfListItem = undefined;
        }
      }
      previous2 = current;
      current = current.next;
    }
    current = token;
    while (++index < childEvents.length) {
      if (childEvents[index][0] === "exit" && childEvents[index - 1][0] === "enter" && childEvents[index][1].type === childEvents[index - 1][1].type && childEvents[index][1].start.line !== childEvents[index][1].end.line) {
        ok(current, "expected a current token");
        start = index + 1;
        breaks.push(start);
        current._tokenizer = undefined;
        current.previous = undefined;
        current = current.next;
      }
    }
    tokenizer.events = [];
    if (current) {
      current._tokenizer = undefined;
      current.previous = undefined;
      ok(!current.next, "expected no next token");
    } else {
      breaks.pop();
    }
    index = breaks.length;
    while (index--) {
      const slice = childEvents.slice(breaks[index], breaks[index + 1]);
      const start2 = startPositions.pop();
      ok(start2 !== undefined, "expected a start position when splicing");
      jumps.push([start2, start2 + slice.length - 1]);
      events.splice(start2, 2, slice);
    }
    jumps.reverse();
    index = -1;
    while (++index < jumps.length) {
      gaps[adjust + jumps[index][0]] = adjust + jumps[index][1];
      adjust += jumps[index][1] - jumps[index][0] - 1;
    }
    return gaps;
  }
  var init_dev7 = __esm(() => {
    init_development();
    init_dev();
    init_default();
    init_splice_buffer();
  });

  // node_modules/micromark-core-commonmark/dev/lib/content.js
  function resolveContent(events) {
    subtokenize(events);
    return events;
  }
  function tokenizeContent(effects, ok2) {
    let previous2;
    return chunkStart;
    function chunkStart(code) {
      ok(code !== codes.eof && !markdownLineEnding(code), "expected no eof or eol");
      effects.enter(types.content);
      previous2 = effects.enter(types.chunkContent, {
        contentType: constants.contentTypeContent
      });
      return chunkInside(code);
    }
    function chunkInside(code) {
      if (code === codes.eof) {
        return contentEnd(code);
      }
      if (markdownLineEnding(code)) {
        return effects.check(continuationConstruct, contentContinue, contentEnd)(code);
      }
      effects.consume(code);
      return chunkInside;
    }
    function contentEnd(code) {
      effects.exit(types.chunkContent);
      effects.exit(types.content);
      return ok2(code);
    }
    function contentContinue(code) {
      ok(markdownLineEnding(code), "expected eol");
      effects.consume(code);
      effects.exit(types.chunkContent);
      ok(previous2, "expected previous token");
      previous2.next = effects.enter(types.chunkContent, {
        contentType: constants.contentTypeContent,
        previous: previous2
      });
      previous2 = previous2.next;
      return chunkInside;
    }
  }
  function tokenizeContinuation(effects, ok2, nok) {
    const self = this;
    return startLookahead;
    function startLookahead(code) {
      ok(markdownLineEnding(code), "expected a line ending");
      effects.exit(types.chunkContent);
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      return factorySpace(effects, prefixed, types.linePrefix);
    }
    function prefixed(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        return nok(code);
      }
      ok(self.parser.constructs.disable.null, "expected `disable.null` to be populated");
      const tail = self.events[self.events.length - 1];
      if (!self.parser.constructs.disable.null.includes("codeIndented") && tail && tail[1].type === types.linePrefix && tail[2].sliceSerialize(tail[1], true).length >= constants.tabSize) {
        return ok2(code);
      }
      return effects.interrupt(self.parser.constructs.flow, nok, ok2)(code);
    }
  }
  var content2, continuationConstruct;
  var init_content2 = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_dev7();
    init_default();
    content2 = { resolve: resolveContent, tokenize: tokenizeContent };
    continuationConstruct = { partial: true, tokenize: tokenizeContinuation };
  });

  // node_modules/micromark-factory-destination/dev/index.js
  function factoryDestination(effects, ok2, nok, type, literalType, literalMarkerType, rawType, stringType, max) {
    const limit = max || Number.POSITIVE_INFINITY;
    let balance = 0;
    return start;
    function start(code) {
      if (code === codes.lessThan) {
        effects.enter(type);
        effects.enter(literalType);
        effects.enter(literalMarkerType);
        effects.consume(code);
        effects.exit(literalMarkerType);
        return enclosedBefore;
      }
      if (code === codes.eof || code === codes.space || code === codes.rightParenthesis || asciiControl(code)) {
        return nok(code);
      }
      effects.enter(type);
      effects.enter(rawType);
      effects.enter(stringType);
      effects.enter(types.chunkString, { contentType: constants.contentTypeString });
      return raw(code);
    }
    function enclosedBefore(code) {
      if (code === codes.greaterThan) {
        effects.enter(literalMarkerType);
        effects.consume(code);
        effects.exit(literalMarkerType);
        effects.exit(literalType);
        effects.exit(type);
        return ok2;
      }
      effects.enter(stringType);
      effects.enter(types.chunkString, { contentType: constants.contentTypeString });
      return enclosed(code);
    }
    function enclosed(code) {
      if (code === codes.greaterThan) {
        effects.exit(types.chunkString);
        effects.exit(stringType);
        return enclosedBefore(code);
      }
      if (code === codes.eof || code === codes.lessThan || markdownLineEnding(code)) {
        return nok(code);
      }
      effects.consume(code);
      return code === codes.backslash ? enclosedEscape : enclosed;
    }
    function enclosedEscape(code) {
      if (code === codes.lessThan || code === codes.greaterThan || code === codes.backslash) {
        effects.consume(code);
        return enclosed;
      }
      return enclosed(code);
    }
    function raw(code) {
      if (!balance && (code === codes.eof || code === codes.rightParenthesis || markdownLineEndingOrSpace(code))) {
        effects.exit(types.chunkString);
        effects.exit(stringType);
        effects.exit(rawType);
        effects.exit(type);
        return ok2(code);
      }
      if (balance < limit && code === codes.leftParenthesis) {
        effects.consume(code);
        balance++;
        return raw;
      }
      if (code === codes.rightParenthesis) {
        effects.consume(code);
        balance--;
        return raw;
      }
      if (code === codes.eof || code === codes.space || code === codes.leftParenthesis || asciiControl(code)) {
        return nok(code);
      }
      effects.consume(code);
      return code === codes.backslash ? rawEscape : raw;
    }
    function rawEscape(code) {
      if (code === codes.leftParenthesis || code === codes.rightParenthesis || code === codes.backslash) {
        effects.consume(code);
        return raw;
      }
      return raw(code);
    }
  }
  var init_dev8 = __esm(() => {
    init_dev4();
    init_default();
  });

  // node_modules/micromark-factory-label/dev/index.js
  function factoryLabel(effects, ok2, nok, type, markerType, stringType) {
    const self = this;
    let size = 0;
    let seen;
    return start;
    function start(code) {
      ok(code === codes.leftSquareBracket, "expected `[`");
      effects.enter(type);
      effects.enter(markerType);
      effects.consume(code);
      effects.exit(markerType);
      effects.enter(stringType);
      return atBreak;
    }
    function atBreak(code) {
      if (size > constants.linkReferenceSizeMax || code === codes.eof || code === codes.leftSquareBracket || code === codes.rightSquareBracket && !seen || code === codes.caret && !size && "_hiddenFootnoteSupport" in self.parser.constructs) {
        return nok(code);
      }
      if (code === codes.rightSquareBracket) {
        effects.exit(stringType);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        effects.exit(type);
        return ok2;
      }
      if (markdownLineEnding(code)) {
        effects.enter(types.lineEnding);
        effects.consume(code);
        effects.exit(types.lineEnding);
        return atBreak;
      }
      effects.enter(types.chunkString, { contentType: constants.contentTypeString });
      return labelInside(code);
    }
    function labelInside(code) {
      if (code === codes.eof || code === codes.leftSquareBracket || code === codes.rightSquareBracket || markdownLineEnding(code) || size++ > constants.linkReferenceSizeMax) {
        effects.exit(types.chunkString);
        return atBreak(code);
      }
      effects.consume(code);
      if (!seen)
        seen = !markdownSpace(code);
      return code === codes.backslash ? labelEscape : labelInside;
    }
    function labelEscape(code) {
      if (code === codes.leftSquareBracket || code === codes.backslash || code === codes.rightSquareBracket) {
        effects.consume(code);
        size++;
        return labelInside;
      }
      return labelInside(code);
    }
  }
  var init_dev9 = __esm(() => {
    init_development();
    init_dev4();
    init_default();
  });

  // node_modules/micromark-factory-title/dev/index.js
  function factoryTitle(effects, ok2, nok, type, markerType, stringType) {
    let marker;
    return start;
    function start(code) {
      if (code === codes.quotationMark || code === codes.apostrophe || code === codes.leftParenthesis) {
        effects.enter(type);
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        marker = code === codes.leftParenthesis ? codes.rightParenthesis : code;
        return begin;
      }
      return nok(code);
    }
    function begin(code) {
      if (code === marker) {
        effects.enter(markerType);
        effects.consume(code);
        effects.exit(markerType);
        effects.exit(type);
        return ok2;
      }
      effects.enter(stringType);
      return atBreak(code);
    }
    function atBreak(code) {
      if (code === marker) {
        effects.exit(stringType);
        return begin(marker);
      }
      if (code === codes.eof) {
        return nok(code);
      }
      if (markdownLineEnding(code)) {
        effects.enter(types.lineEnding);
        effects.consume(code);
        effects.exit(types.lineEnding);
        return factorySpace(effects, atBreak, types.linePrefix);
      }
      effects.enter(types.chunkString, { contentType: constants.contentTypeString });
      return inside(code);
    }
    function inside(code) {
      if (code === marker || code === codes.eof || markdownLineEnding(code)) {
        effects.exit(types.chunkString);
        return atBreak(code);
      }
      effects.consume(code);
      return code === codes.backslash ? escape : inside;
    }
    function escape(code) {
      if (code === marker || code === codes.backslash) {
        effects.consume(code);
        return inside;
      }
      return inside(code);
    }
  }
  var init_dev10 = __esm(() => {
    init_dev5();
    init_dev4();
    init_default();
  });

  // node_modules/micromark-factory-whitespace/dev/index.js
  function factoryWhitespace(effects, ok2) {
    let seen;
    return start;
    function start(code) {
      if (markdownLineEnding(code)) {
        effects.enter(types.lineEnding);
        effects.consume(code);
        effects.exit(types.lineEnding);
        seen = true;
        return start;
      }
      if (markdownSpace(code)) {
        return factorySpace(effects, start, seen ? types.linePrefix : types.lineSuffix)(code);
      }
      return ok2(code);
    }
  }
  var init_dev11 = __esm(() => {
    init_dev5();
    init_dev4();
    init_default();
  });

  // node_modules/micromark-core-commonmark/dev/lib/definition.js
  function tokenizeDefinition(effects, ok2, nok) {
    const self = this;
    let identifier;
    return start;
    function start(code) {
      effects.enter(types.definition);
      return before(code);
    }
    function before(code) {
      ok(code === codes.leftSquareBracket, "expected `[`");
      return factoryLabel.call(self, effects, labelAfter, nok, types.definitionLabel, types.definitionLabelMarker, types.definitionLabelString)(code);
    }
    function labelAfter(code) {
      identifier = normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1));
      if (code === codes.colon) {
        effects.enter(types.definitionMarker);
        effects.consume(code);
        effects.exit(types.definitionMarker);
        return markerAfter;
      }
      return nok(code);
    }
    function markerAfter(code) {
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, destinationBefore)(code) : destinationBefore(code);
    }
    function destinationBefore(code) {
      return factoryDestination(effects, destinationAfter, nok, types.definitionDestination, types.definitionDestinationLiteral, types.definitionDestinationLiteralMarker, types.definitionDestinationRaw, types.definitionDestinationString)(code);
    }
    function destinationAfter(code) {
      return effects.attempt(titleBefore, after, after)(code);
    }
    function after(code) {
      return markdownSpace(code) ? factorySpace(effects, afterWhitespace, types.whitespace)(code) : afterWhitespace(code);
    }
    function afterWhitespace(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        effects.exit(types.definition);
        self.parser.defined.push(identifier);
        return ok2(code);
      }
      return nok(code);
    }
  }
  function tokenizeTitleBefore(effects, ok2, nok) {
    return titleBefore2;
    function titleBefore2(code) {
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, beforeMarker)(code) : nok(code);
    }
    function beforeMarker(code) {
      return factoryTitle(effects, titleAfter, nok, types.definitionTitle, types.definitionTitleMarker, types.definitionTitleString)(code);
    }
    function titleAfter(code) {
      return markdownSpace(code) ? factorySpace(effects, titleAfterOptionalWhitespace, types.whitespace)(code) : titleAfterOptionalWhitespace(code);
    }
    function titleAfterOptionalWhitespace(code) {
      return code === codes.eof || markdownLineEnding(code) ? ok2(code) : nok(code);
    }
  }
  var definition, titleBefore;
  var init_definition = __esm(() => {
    init_development();
    init_dev8();
    init_dev9();
    init_dev5();
    init_dev10();
    init_dev11();
    init_dev4();
    init_dev3();
    init_default();
    definition = { name: "definition", tokenize: tokenizeDefinition };
    titleBefore = { partial: true, tokenize: tokenizeTitleBefore };
  });

  // node_modules/micromark-core-commonmark/dev/lib/hard-break-escape.js
  function tokenizeHardBreakEscape(effects, ok2, nok) {
    return start;
    function start(code) {
      ok(code === codes.backslash, "expected `\\`");
      effects.enter(types.hardBreakEscape);
      effects.consume(code);
      return after;
    }
    function after(code) {
      if (markdownLineEnding(code)) {
        effects.exit(types.hardBreakEscape);
        return ok2(code);
      }
      return nok(code);
    }
  }
  var hardBreakEscape;
  var init_hard_break_escape = __esm(() => {
    init_development();
    init_dev4();
    init_default();
    hardBreakEscape = {
      name: "hardBreakEscape",
      tokenize: tokenizeHardBreakEscape
    };
  });

  // node_modules/micromark-core-commonmark/dev/lib/heading-atx.js
  function resolveHeadingAtx(events, context) {
    let contentEnd = events.length - 2;
    let contentStart = 3;
    let content3;
    let text;
    if (events[contentStart][1].type === types.whitespace) {
      contentStart += 2;
    }
    if (contentEnd - 2 > contentStart && events[contentEnd][1].type === types.whitespace) {
      contentEnd -= 2;
    }
    if (events[contentEnd][1].type === types.atxHeadingSequence && (contentStart === contentEnd - 1 || contentEnd - 4 > contentStart && events[contentEnd - 2][1].type === types.whitespace)) {
      contentEnd -= contentStart + 1 === contentEnd ? 2 : 4;
    }
    if (contentEnd > contentStart) {
      content3 = {
        type: types.atxHeadingText,
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end
      };
      text = {
        type: types.chunkText,
        start: events[contentStart][1].start,
        end: events[contentEnd][1].end,
        contentType: constants.contentTypeText
      };
      splice(events, contentStart, contentEnd - contentStart + 1, [
        ["enter", content3, context],
        ["enter", text, context],
        ["exit", text, context],
        ["exit", content3, context]
      ]);
    }
    return events;
  }
  function tokenizeHeadingAtx(effects, ok2, nok) {
    let size = 0;
    return start;
    function start(code) {
      effects.enter(types.atxHeading);
      return before(code);
    }
    function before(code) {
      ok(code === codes.numberSign, "expected `#`");
      effects.enter(types.atxHeadingSequence);
      return sequenceOpen(code);
    }
    function sequenceOpen(code) {
      if (code === codes.numberSign && size++ < constants.atxHeadingOpeningFenceSizeMax) {
        effects.consume(code);
        return sequenceOpen;
      }
      if (code === codes.eof || markdownLineEndingOrSpace(code)) {
        effects.exit(types.atxHeadingSequence);
        return atBreak(code);
      }
      return nok(code);
    }
    function atBreak(code) {
      if (code === codes.numberSign) {
        effects.enter(types.atxHeadingSequence);
        return sequenceFurther(code);
      }
      if (code === codes.eof || markdownLineEnding(code)) {
        effects.exit(types.atxHeading);
        return ok2(code);
      }
      if (markdownSpace(code)) {
        return factorySpace(effects, atBreak, types.whitespace)(code);
      }
      effects.enter(types.atxHeadingText);
      return data(code);
    }
    function sequenceFurther(code) {
      if (code === codes.numberSign) {
        effects.consume(code);
        return sequenceFurther;
      }
      effects.exit(types.atxHeadingSequence);
      return atBreak(code);
    }
    function data(code) {
      if (code === codes.eof || code === codes.numberSign || markdownLineEndingOrSpace(code)) {
        effects.exit(types.atxHeadingText);
        return atBreak(code);
      }
      effects.consume(code);
      return data;
    }
  }
  var headingAtx;
  var init_heading_atx = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_dev();
    init_default();
    headingAtx = {
      name: "headingAtx",
      resolve: resolveHeadingAtx,
      tokenize: tokenizeHeadingAtx
    };
  });

  // node_modules/micromark-util-html-tag-name/index.js
  var htmlBlockNames, htmlRawNames;
  var init_micromark_util_html_tag_name = __esm(() => {
    htmlBlockNames = [
      "address",
      "article",
      "aside",
      "base",
      "basefont",
      "blockquote",
      "body",
      "caption",
      "center",
      "col",
      "colgroup",
      "dd",
      "details",
      "dialog",
      "dir",
      "div",
      "dl",
      "dt",
      "fieldset",
      "figcaption",
      "figure",
      "footer",
      "form",
      "frame",
      "frameset",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hr",
      "html",
      "iframe",
      "legend",
      "li",
      "link",
      "main",
      "menu",
      "menuitem",
      "nav",
      "noframes",
      "ol",
      "optgroup",
      "option",
      "p",
      "param",
      "search",
      "section",
      "summary",
      "table",
      "tbody",
      "td",
      "tfoot",
      "th",
      "thead",
      "title",
      "tr",
      "track",
      "ul"
    ];
    htmlRawNames = ["pre", "script", "style", "textarea"];
  });

  // node_modules/micromark-core-commonmark/dev/lib/html-flow.js
  function resolveToHtmlFlow(events) {
    let index = events.length;
    while (index--) {
      if (events[index][0] === "enter" && events[index][1].type === types.htmlFlow) {
        break;
      }
    }
    if (index > 1 && events[index - 2][1].type === types.linePrefix) {
      events[index][1].start = events[index - 2][1].start;
      events[index + 1][1].start = events[index - 2][1].start;
      events.splice(index - 2, 2);
    }
    return events;
  }
  function tokenizeHtmlFlow(effects, ok2, nok) {
    const self = this;
    let marker;
    let closingTag;
    let buffer;
    let index;
    let markerB;
    return start;
    function start(code) {
      return before(code);
    }
    function before(code) {
      ok(code === codes.lessThan, "expected `<`");
      effects.enter(types.htmlFlow);
      effects.enter(types.htmlFlowData);
      effects.consume(code);
      return open;
    }
    function open(code) {
      if (code === codes.exclamationMark) {
        effects.consume(code);
        return declarationOpen;
      }
      if (code === codes.slash) {
        effects.consume(code);
        closingTag = true;
        return tagCloseStart;
      }
      if (code === codes.questionMark) {
        effects.consume(code);
        marker = constants.htmlInstruction;
        return self.interrupt ? ok2 : continuationDeclarationInside;
      }
      if (asciiAlpha(code)) {
        ok(code !== null);
        effects.consume(code);
        buffer = String.fromCharCode(code);
        return tagName;
      }
      return nok(code);
    }
    function declarationOpen(code) {
      if (code === codes.dash) {
        effects.consume(code);
        marker = constants.htmlComment;
        return commentOpenInside;
      }
      if (code === codes.leftSquareBracket) {
        effects.consume(code);
        marker = constants.htmlCdata;
        index = 0;
        return cdataOpenInside;
      }
      if (asciiAlpha(code)) {
        effects.consume(code);
        marker = constants.htmlDeclaration;
        return self.interrupt ? ok2 : continuationDeclarationInside;
      }
      return nok(code);
    }
    function commentOpenInside(code) {
      if (code === codes.dash) {
        effects.consume(code);
        return self.interrupt ? ok2 : continuationDeclarationInside;
      }
      return nok(code);
    }
    function cdataOpenInside(code) {
      const value = constants.cdataOpeningString;
      if (code === value.charCodeAt(index++)) {
        effects.consume(code);
        if (index === value.length) {
          return self.interrupt ? ok2 : continuation;
        }
        return cdataOpenInside;
      }
      return nok(code);
    }
    function tagCloseStart(code) {
      if (asciiAlpha(code)) {
        ok(code !== null);
        effects.consume(code);
        buffer = String.fromCharCode(code);
        return tagName;
      }
      return nok(code);
    }
    function tagName(code) {
      if (code === codes.eof || code === codes.slash || code === codes.greaterThan || markdownLineEndingOrSpace(code)) {
        const slash = code === codes.slash;
        const name = buffer.toLowerCase();
        if (!slash && !closingTag && htmlRawNames.includes(name)) {
          marker = constants.htmlRaw;
          return self.interrupt ? ok2(code) : continuation(code);
        }
        if (htmlBlockNames.includes(buffer.toLowerCase())) {
          marker = constants.htmlBasic;
          if (slash) {
            effects.consume(code);
            return basicSelfClosing;
          }
          return self.interrupt ? ok2(code) : continuation(code);
        }
        marker = constants.htmlComplete;
        return self.interrupt && !self.parser.lazy[self.now().line] ? nok(code) : closingTag ? completeClosingTagAfter(code) : completeAttributeNameBefore(code);
      }
      if (code === codes.dash || asciiAlphanumeric(code)) {
        effects.consume(code);
        buffer += String.fromCharCode(code);
        return tagName;
      }
      return nok(code);
    }
    function basicSelfClosing(code) {
      if (code === codes.greaterThan) {
        effects.consume(code);
        return self.interrupt ? ok2 : continuation;
      }
      return nok(code);
    }
    function completeClosingTagAfter(code) {
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeClosingTagAfter;
      }
      return completeEnd(code);
    }
    function completeAttributeNameBefore(code) {
      if (code === codes.slash) {
        effects.consume(code);
        return completeEnd;
      }
      if (code === codes.colon || code === codes.underscore || asciiAlpha(code)) {
        effects.consume(code);
        return completeAttributeName;
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAttributeNameBefore;
      }
      return completeEnd(code);
    }
    function completeAttributeName(code) {
      if (code === codes.dash || code === codes.dot || code === codes.colon || code === codes.underscore || asciiAlphanumeric(code)) {
        effects.consume(code);
        return completeAttributeName;
      }
      return completeAttributeNameAfter(code);
    }
    function completeAttributeNameAfter(code) {
      if (code === codes.equalsTo) {
        effects.consume(code);
        return completeAttributeValueBefore;
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAttributeNameAfter;
      }
      return completeAttributeNameBefore(code);
    }
    function completeAttributeValueBefore(code) {
      if (code === codes.eof || code === codes.lessThan || code === codes.equalsTo || code === codes.greaterThan || code === codes.graveAccent) {
        return nok(code);
      }
      if (code === codes.quotationMark || code === codes.apostrophe) {
        effects.consume(code);
        markerB = code;
        return completeAttributeValueQuoted;
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAttributeValueBefore;
      }
      return completeAttributeValueUnquoted(code);
    }
    function completeAttributeValueQuoted(code) {
      if (code === markerB) {
        effects.consume(code);
        markerB = null;
        return completeAttributeValueQuotedAfter;
      }
      if (code === codes.eof || markdownLineEnding(code)) {
        return nok(code);
      }
      effects.consume(code);
      return completeAttributeValueQuoted;
    }
    function completeAttributeValueUnquoted(code) {
      if (code === codes.eof || code === codes.quotationMark || code === codes.apostrophe || code === codes.slash || code === codes.lessThan || code === codes.equalsTo || code === codes.greaterThan || code === codes.graveAccent || markdownLineEndingOrSpace(code)) {
        return completeAttributeNameAfter(code);
      }
      effects.consume(code);
      return completeAttributeValueUnquoted;
    }
    function completeAttributeValueQuotedAfter(code) {
      if (code === codes.slash || code === codes.greaterThan || markdownSpace(code)) {
        return completeAttributeNameBefore(code);
      }
      return nok(code);
    }
    function completeEnd(code) {
      if (code === codes.greaterThan) {
        effects.consume(code);
        return completeAfter;
      }
      return nok(code);
    }
    function completeAfter(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        return continuation(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return completeAfter;
      }
      return nok(code);
    }
    function continuation(code) {
      if (code === codes.dash && marker === constants.htmlComment) {
        effects.consume(code);
        return continuationCommentInside;
      }
      if (code === codes.lessThan && marker === constants.htmlRaw) {
        effects.consume(code);
        return continuationRawTagOpen;
      }
      if (code === codes.greaterThan && marker === constants.htmlDeclaration) {
        effects.consume(code);
        return continuationClose;
      }
      if (code === codes.questionMark && marker === constants.htmlInstruction) {
        effects.consume(code);
        return continuationDeclarationInside;
      }
      if (code === codes.rightSquareBracket && marker === constants.htmlCdata) {
        effects.consume(code);
        return continuationCdataInside;
      }
      if (markdownLineEnding(code) && (marker === constants.htmlBasic || marker === constants.htmlComplete)) {
        effects.exit(types.htmlFlowData);
        return effects.check(blankLineBefore, continuationAfter, continuationStart)(code);
      }
      if (code === codes.eof || markdownLineEnding(code)) {
        effects.exit(types.htmlFlowData);
        return continuationStart(code);
      }
      effects.consume(code);
      return continuation;
    }
    function continuationStart(code) {
      return effects.check(nonLazyContinuationStart, continuationStartNonLazy, continuationAfter)(code);
    }
    function continuationStartNonLazy(code) {
      ok(markdownLineEnding(code));
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      return continuationBefore;
    }
    function continuationBefore(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        return continuationStart(code);
      }
      effects.enter(types.htmlFlowData);
      return continuation(code);
    }
    function continuationCommentInside(code) {
      if (code === codes.dash) {
        effects.consume(code);
        return continuationDeclarationInside;
      }
      return continuation(code);
    }
    function continuationRawTagOpen(code) {
      if (code === codes.slash) {
        effects.consume(code);
        buffer = "";
        return continuationRawEndTag;
      }
      return continuation(code);
    }
    function continuationRawEndTag(code) {
      if (code === codes.greaterThan) {
        const name = buffer.toLowerCase();
        if (htmlRawNames.includes(name)) {
          effects.consume(code);
          return continuationClose;
        }
        return continuation(code);
      }
      if (asciiAlpha(code) && buffer.length < constants.htmlRawSizeMax) {
        ok(code !== null);
        effects.consume(code);
        buffer += String.fromCharCode(code);
        return continuationRawEndTag;
      }
      return continuation(code);
    }
    function continuationCdataInside(code) {
      if (code === codes.rightSquareBracket) {
        effects.consume(code);
        return continuationDeclarationInside;
      }
      return continuation(code);
    }
    function continuationDeclarationInside(code) {
      if (code === codes.greaterThan) {
        effects.consume(code);
        return continuationClose;
      }
      if (code === codes.dash && marker === constants.htmlComment) {
        effects.consume(code);
        return continuationDeclarationInside;
      }
      return continuation(code);
    }
    function continuationClose(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        effects.exit(types.htmlFlowData);
        return continuationAfter(code);
      }
      effects.consume(code);
      return continuationClose;
    }
    function continuationAfter(code) {
      effects.exit(types.htmlFlow);
      return ok2(code);
    }
  }
  function tokenizeNonLazyContinuationStart(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code) {
      if (markdownLineEnding(code)) {
        effects.enter(types.lineEnding);
        effects.consume(code);
        effects.exit(types.lineEnding);
        return after;
      }
      return nok(code);
    }
    function after(code) {
      return self.parser.lazy[self.now().line] ? nok(code) : ok2(code);
    }
  }
  function tokenizeBlankLineBefore(effects, ok2, nok) {
    return start;
    function start(code) {
      ok(markdownLineEnding(code), "expected a line ending");
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      return effects.attempt(blankLine, ok2, nok);
    }
  }
  var htmlFlow, blankLineBefore, nonLazyContinuationStart;
  var init_html_flow = __esm(() => {
    init_development();
    init_dev4();
    init_micromark_util_html_tag_name();
    init_default();
    init_blank_line();
    htmlFlow = {
      concrete: true,
      name: "htmlFlow",
      resolveTo: resolveToHtmlFlow,
      tokenize: tokenizeHtmlFlow
    };
    blankLineBefore = { partial: true, tokenize: tokenizeBlankLineBefore };
    nonLazyContinuationStart = {
      partial: true,
      tokenize: tokenizeNonLazyContinuationStart
    };
  });

  // node_modules/micromark-core-commonmark/dev/lib/html-text.js
  function tokenizeHtmlText(effects, ok2, nok) {
    const self = this;
    let marker;
    let index;
    let returnState;
    return start;
    function start(code) {
      ok(code === codes.lessThan, "expected `<`");
      effects.enter(types.htmlText);
      effects.enter(types.htmlTextData);
      effects.consume(code);
      return open;
    }
    function open(code) {
      if (code === codes.exclamationMark) {
        effects.consume(code);
        return declarationOpen;
      }
      if (code === codes.slash) {
        effects.consume(code);
        return tagCloseStart;
      }
      if (code === codes.questionMark) {
        effects.consume(code);
        return instruction;
      }
      if (asciiAlpha(code)) {
        effects.consume(code);
        return tagOpen;
      }
      return nok(code);
    }
    function declarationOpen(code) {
      if (code === codes.dash) {
        effects.consume(code);
        return commentOpenInside;
      }
      if (code === codes.leftSquareBracket) {
        effects.consume(code);
        index = 0;
        return cdataOpenInside;
      }
      if (asciiAlpha(code)) {
        effects.consume(code);
        return declaration;
      }
      return nok(code);
    }
    function commentOpenInside(code) {
      if (code === codes.dash) {
        effects.consume(code);
        return commentEnd;
      }
      return nok(code);
    }
    function comment(code) {
      if (code === codes.eof) {
        return nok(code);
      }
      if (code === codes.dash) {
        effects.consume(code);
        return commentClose;
      }
      if (markdownLineEnding(code)) {
        returnState = comment;
        return lineEndingBefore(code);
      }
      effects.consume(code);
      return comment;
    }
    function commentClose(code) {
      if (code === codes.dash) {
        effects.consume(code);
        return commentEnd;
      }
      return comment(code);
    }
    function commentEnd(code) {
      return code === codes.greaterThan ? end(code) : code === codes.dash ? commentClose(code) : comment(code);
    }
    function cdataOpenInside(code) {
      const value = constants.cdataOpeningString;
      if (code === value.charCodeAt(index++)) {
        effects.consume(code);
        return index === value.length ? cdata : cdataOpenInside;
      }
      return nok(code);
    }
    function cdata(code) {
      if (code === codes.eof) {
        return nok(code);
      }
      if (code === codes.rightSquareBracket) {
        effects.consume(code);
        return cdataClose;
      }
      if (markdownLineEnding(code)) {
        returnState = cdata;
        return lineEndingBefore(code);
      }
      effects.consume(code);
      return cdata;
    }
    function cdataClose(code) {
      if (code === codes.rightSquareBracket) {
        effects.consume(code);
        return cdataEnd;
      }
      return cdata(code);
    }
    function cdataEnd(code) {
      if (code === codes.greaterThan) {
        return end(code);
      }
      if (code === codes.rightSquareBracket) {
        effects.consume(code);
        return cdataEnd;
      }
      return cdata(code);
    }
    function declaration(code) {
      if (code === codes.eof || code === codes.greaterThan) {
        return end(code);
      }
      if (markdownLineEnding(code)) {
        returnState = declaration;
        return lineEndingBefore(code);
      }
      effects.consume(code);
      return declaration;
    }
    function instruction(code) {
      if (code === codes.eof) {
        return nok(code);
      }
      if (code === codes.questionMark) {
        effects.consume(code);
        return instructionClose;
      }
      if (markdownLineEnding(code)) {
        returnState = instruction;
        return lineEndingBefore(code);
      }
      effects.consume(code);
      return instruction;
    }
    function instructionClose(code) {
      return code === codes.greaterThan ? end(code) : instruction(code);
    }
    function tagCloseStart(code) {
      if (asciiAlpha(code)) {
        effects.consume(code);
        return tagClose;
      }
      return nok(code);
    }
    function tagClose(code) {
      if (code === codes.dash || asciiAlphanumeric(code)) {
        effects.consume(code);
        return tagClose;
      }
      return tagCloseBetween(code);
    }
    function tagCloseBetween(code) {
      if (markdownLineEnding(code)) {
        returnState = tagCloseBetween;
        return lineEndingBefore(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagCloseBetween;
      }
      return end(code);
    }
    function tagOpen(code) {
      if (code === codes.dash || asciiAlphanumeric(code)) {
        effects.consume(code);
        return tagOpen;
      }
      if (code === codes.slash || code === codes.greaterThan || markdownLineEndingOrSpace(code)) {
        return tagOpenBetween(code);
      }
      return nok(code);
    }
    function tagOpenBetween(code) {
      if (code === codes.slash) {
        effects.consume(code);
        return end;
      }
      if (code === codes.colon || code === codes.underscore || asciiAlpha(code)) {
        effects.consume(code);
        return tagOpenAttributeName;
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenBetween;
        return lineEndingBefore(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagOpenBetween;
      }
      return end(code);
    }
    function tagOpenAttributeName(code) {
      if (code === codes.dash || code === codes.dot || code === codes.colon || code === codes.underscore || asciiAlphanumeric(code)) {
        effects.consume(code);
        return tagOpenAttributeName;
      }
      return tagOpenAttributeNameAfter(code);
    }
    function tagOpenAttributeNameAfter(code) {
      if (code === codes.equalsTo) {
        effects.consume(code);
        return tagOpenAttributeValueBefore;
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenAttributeNameAfter;
        return lineEndingBefore(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagOpenAttributeNameAfter;
      }
      return tagOpenBetween(code);
    }
    function tagOpenAttributeValueBefore(code) {
      if (code === codes.eof || code === codes.lessThan || code === codes.equalsTo || code === codes.greaterThan || code === codes.graveAccent) {
        return nok(code);
      }
      if (code === codes.quotationMark || code === codes.apostrophe) {
        effects.consume(code);
        marker = code;
        return tagOpenAttributeValueQuoted;
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenAttributeValueBefore;
        return lineEndingBefore(code);
      }
      if (markdownSpace(code)) {
        effects.consume(code);
        return tagOpenAttributeValueBefore;
      }
      effects.consume(code);
      return tagOpenAttributeValueUnquoted;
    }
    function tagOpenAttributeValueQuoted(code) {
      if (code === marker) {
        effects.consume(code);
        marker = undefined;
        return tagOpenAttributeValueQuotedAfter;
      }
      if (code === codes.eof) {
        return nok(code);
      }
      if (markdownLineEnding(code)) {
        returnState = tagOpenAttributeValueQuoted;
        return lineEndingBefore(code);
      }
      effects.consume(code);
      return tagOpenAttributeValueQuoted;
    }
    function tagOpenAttributeValueUnquoted(code) {
      if (code === codes.eof || code === codes.quotationMark || code === codes.apostrophe || code === codes.lessThan || code === codes.equalsTo || code === codes.graveAccent) {
        return nok(code);
      }
      if (code === codes.slash || code === codes.greaterThan || markdownLineEndingOrSpace(code)) {
        return tagOpenBetween(code);
      }
      effects.consume(code);
      return tagOpenAttributeValueUnquoted;
    }
    function tagOpenAttributeValueQuotedAfter(code) {
      if (code === codes.slash || code === codes.greaterThan || markdownLineEndingOrSpace(code)) {
        return tagOpenBetween(code);
      }
      return nok(code);
    }
    function end(code) {
      if (code === codes.greaterThan) {
        effects.consume(code);
        effects.exit(types.htmlTextData);
        effects.exit(types.htmlText);
        return ok2;
      }
      return nok(code);
    }
    function lineEndingBefore(code) {
      ok(returnState, "expected return state");
      ok(markdownLineEnding(code), "expected eol");
      effects.exit(types.htmlTextData);
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      return lineEndingAfter;
    }
    function lineEndingAfter(code) {
      ok(self.parser.constructs.disable.null, "expected `disable.null` to be populated");
      return markdownSpace(code) ? factorySpace(effects, lineEndingAfterPrefix, types.linePrefix, self.parser.constructs.disable.null.includes("codeIndented") ? undefined : constants.tabSize)(code) : lineEndingAfterPrefix(code);
    }
    function lineEndingAfterPrefix(code) {
      effects.enter(types.htmlTextData);
      return returnState(code);
    }
  }
  var htmlText;
  var init_html_text = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_default();
    htmlText = { name: "htmlText", tokenize: tokenizeHtmlText };
  });

  // node_modules/micromark-core-commonmark/dev/lib/label-end.js
  function resolveAllLabelEnd(events) {
    let index = -1;
    const newEvents = [];
    while (++index < events.length) {
      const token = events[index][1];
      newEvents.push(events[index]);
      if (token.type === types.labelImage || token.type === types.labelLink || token.type === types.labelEnd) {
        const offset = token.type === types.labelImage ? 4 : 2;
        token.type = types.data;
        index += offset;
      }
    }
    if (events.length !== newEvents.length) {
      splice(events, 0, events.length, newEvents);
    }
    return events;
  }
  function resolveToLabelEnd(events, context) {
    let index = events.length;
    let offset = 0;
    let token;
    let open;
    let close;
    let media;
    while (index--) {
      token = events[index][1];
      if (open) {
        if (token.type === types.link || token.type === types.labelLink && token._inactive) {
          break;
        }
        if (events[index][0] === "enter" && token.type === types.labelLink) {
          token._inactive = true;
        }
      } else if (close) {
        if (events[index][0] === "enter" && (token.type === types.labelImage || token.type === types.labelLink) && !token._balanced) {
          open = index;
          if (token.type !== types.labelLink) {
            offset = 2;
            break;
          }
        }
      } else if (token.type === types.labelEnd) {
        close = index;
      }
    }
    ok(open !== undefined, "`open` is supposed to be found");
    ok(close !== undefined, "`close` is supposed to be found");
    const group = {
      type: events[open][1].type === types.labelLink ? types.link : types.image,
      start: { ...events[open][1].start },
      end: { ...events[events.length - 1][1].end }
    };
    const label = {
      type: types.label,
      start: { ...events[open][1].start },
      end: { ...events[close][1].end }
    };
    const text = {
      type: types.labelText,
      start: { ...events[open + offset + 2][1].end },
      end: { ...events[close - 2][1].start }
    };
    media = [
      ["enter", group, context],
      ["enter", label, context]
    ];
    media = push(media, events.slice(open + 1, open + offset + 3));
    media = push(media, [["enter", text, context]]);
    ok(context.parser.constructs.insideSpan.null, "expected `insideSpan.null` to be populated");
    media = push(media, resolveAll(context.parser.constructs.insideSpan.null, events.slice(open + offset + 4, close - 3), context));
    media = push(media, [
      ["exit", text, context],
      events[close - 2],
      events[close - 1],
      ["exit", label, context]
    ]);
    media = push(media, events.slice(close + 1));
    media = push(media, [["exit", group, context]]);
    splice(events, open, events.length, media);
    return events;
  }
  function tokenizeLabelEnd(effects, ok2, nok) {
    const self = this;
    let index = self.events.length;
    let labelStart;
    let defined;
    while (index--) {
      if ((self.events[index][1].type === types.labelImage || self.events[index][1].type === types.labelLink) && !self.events[index][1]._balanced) {
        labelStart = self.events[index][1];
        break;
      }
    }
    return start;
    function start(code) {
      ok(code === codes.rightSquareBracket, "expected `]`");
      if (!labelStart) {
        return nok(code);
      }
      if (labelStart._inactive) {
        return labelEndNok(code);
      }
      defined = self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize({ start: labelStart.end, end: self.now() })));
      effects.enter(types.labelEnd);
      effects.enter(types.labelMarker);
      effects.consume(code);
      effects.exit(types.labelMarker);
      effects.exit(types.labelEnd);
      return after;
    }
    function after(code) {
      if (code === codes.leftParenthesis) {
        return effects.attempt(resourceConstruct, labelEndOk, defined ? labelEndOk : labelEndNok)(code);
      }
      if (code === codes.leftSquareBracket) {
        return effects.attempt(referenceFullConstruct, labelEndOk, defined ? referenceNotFull : labelEndNok)(code);
      }
      return defined ? labelEndOk(code) : labelEndNok(code);
    }
    function referenceNotFull(code) {
      return effects.attempt(referenceCollapsedConstruct, labelEndOk, labelEndNok)(code);
    }
    function labelEndOk(code) {
      return ok2(code);
    }
    function labelEndNok(code) {
      labelStart._balanced = true;
      return nok(code);
    }
  }
  function tokenizeResource(effects, ok2, nok) {
    return resourceStart;
    function resourceStart(code) {
      ok(code === codes.leftParenthesis, "expected left paren");
      effects.enter(types.resource);
      effects.enter(types.resourceMarker);
      effects.consume(code);
      effects.exit(types.resourceMarker);
      return resourceBefore;
    }
    function resourceBefore(code) {
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceOpen)(code) : resourceOpen(code);
    }
    function resourceOpen(code) {
      if (code === codes.rightParenthesis) {
        return resourceEnd(code);
      }
      return factoryDestination(effects, resourceDestinationAfter, resourceDestinationMissing, types.resourceDestination, types.resourceDestinationLiteral, types.resourceDestinationLiteralMarker, types.resourceDestinationRaw, types.resourceDestinationString, constants.linkResourceDestinationBalanceMax)(code);
    }
    function resourceDestinationAfter(code) {
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceBetween)(code) : resourceEnd(code);
    }
    function resourceDestinationMissing(code) {
      return nok(code);
    }
    function resourceBetween(code) {
      if (code === codes.quotationMark || code === codes.apostrophe || code === codes.leftParenthesis) {
        return factoryTitle(effects, resourceTitleAfter, nok, types.resourceTitle, types.resourceTitleMarker, types.resourceTitleString)(code);
      }
      return resourceEnd(code);
    }
    function resourceTitleAfter(code) {
      return markdownLineEndingOrSpace(code) ? factoryWhitespace(effects, resourceEnd)(code) : resourceEnd(code);
    }
    function resourceEnd(code) {
      if (code === codes.rightParenthesis) {
        effects.enter(types.resourceMarker);
        effects.consume(code);
        effects.exit(types.resourceMarker);
        effects.exit(types.resource);
        return ok2;
      }
      return nok(code);
    }
  }
  function tokenizeReferenceFull(effects, ok2, nok) {
    const self = this;
    return referenceFull;
    function referenceFull(code) {
      ok(code === codes.leftSquareBracket, "expected left bracket");
      return factoryLabel.call(self, effects, referenceFullAfter, referenceFullMissing, types.reference, types.referenceMarker, types.referenceString)(code);
    }
    function referenceFullAfter(code) {
      return self.parser.defined.includes(normalizeIdentifier(self.sliceSerialize(self.events[self.events.length - 1][1]).slice(1, -1))) ? ok2(code) : nok(code);
    }
    function referenceFullMissing(code) {
      return nok(code);
    }
  }
  function tokenizeReferenceCollapsed(effects, ok2, nok) {
    return referenceCollapsedStart;
    function referenceCollapsedStart(code) {
      ok(code === codes.leftSquareBracket, "expected left bracket");
      effects.enter(types.reference);
      effects.enter(types.referenceMarker);
      effects.consume(code);
      effects.exit(types.referenceMarker);
      return referenceCollapsedOpen;
    }
    function referenceCollapsedOpen(code) {
      if (code === codes.rightSquareBracket) {
        effects.enter(types.referenceMarker);
        effects.consume(code);
        effects.exit(types.referenceMarker);
        effects.exit(types.reference);
        return ok2;
      }
      return nok(code);
    }
  }
  var labelEnd, resourceConstruct, referenceFullConstruct, referenceCollapsedConstruct;
  var init_label_end = __esm(() => {
    init_development();
    init_dev8();
    init_dev9();
    init_dev10();
    init_dev11();
    init_dev4();
    init_dev();
    init_dev3();
    init_default();
    labelEnd = {
      name: "labelEnd",
      resolveAll: resolveAllLabelEnd,
      resolveTo: resolveToLabelEnd,
      tokenize: tokenizeLabelEnd
    };
    resourceConstruct = { tokenize: tokenizeResource };
    referenceFullConstruct = { tokenize: tokenizeReferenceFull };
    referenceCollapsedConstruct = { tokenize: tokenizeReferenceCollapsed };
  });

  // node_modules/micromark-core-commonmark/dev/lib/label-start-image.js
  function tokenizeLabelStartImage(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code) {
      ok(code === codes.exclamationMark, "expected `!`");
      effects.enter(types.labelImage);
      effects.enter(types.labelImageMarker);
      effects.consume(code);
      effects.exit(types.labelImageMarker);
      return open;
    }
    function open(code) {
      if (code === codes.leftSquareBracket) {
        effects.enter(types.labelMarker);
        effects.consume(code);
        effects.exit(types.labelMarker);
        effects.exit(types.labelImage);
        return after;
      }
      return nok(code);
    }
    function after(code) {
      return code === codes.caret && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok2(code);
    }
  }
  var labelStartImage;
  var init_label_start_image = __esm(() => {
    init_development();
    init_default();
    init_label_end();
    labelStartImage = {
      name: "labelStartImage",
      resolveAll: labelEnd.resolveAll,
      tokenize: tokenizeLabelStartImage
    };
  });

  // node_modules/micromark-core-commonmark/dev/lib/label-start-link.js
  function tokenizeLabelStartLink(effects, ok2, nok) {
    const self = this;
    return start;
    function start(code) {
      ok(code === codes.leftSquareBracket, "expected `[`");
      effects.enter(types.labelLink);
      effects.enter(types.labelMarker);
      effects.consume(code);
      effects.exit(types.labelMarker);
      effects.exit(types.labelLink);
      return after;
    }
    function after(code) {
      return code === codes.caret && "_hiddenFootnoteSupport" in self.parser.constructs ? nok(code) : ok2(code);
    }
  }
  var labelStartLink;
  var init_label_start_link = __esm(() => {
    init_development();
    init_default();
    init_label_end();
    labelStartLink = {
      name: "labelStartLink",
      resolveAll: labelEnd.resolveAll,
      tokenize: tokenizeLabelStartLink
    };
  });

  // node_modules/micromark-core-commonmark/dev/lib/line-ending.js
  function tokenizeLineEnding(effects, ok2) {
    return start;
    function start(code) {
      ok(markdownLineEnding(code), "expected eol");
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      return factorySpace(effects, ok2, types.linePrefix);
    }
  }
  var lineEnding;
  var init_line_ending = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_default();
    lineEnding = { name: "lineEnding", tokenize: tokenizeLineEnding };
  });

  // node_modules/micromark-core-commonmark/dev/lib/thematic-break.js
  function tokenizeThematicBreak(effects, ok2, nok) {
    let size = 0;
    let marker;
    return start;
    function start(code) {
      effects.enter(types.thematicBreak);
      return before(code);
    }
    function before(code) {
      ok(code === codes.asterisk || code === codes.dash || code === codes.underscore, "expected `*`, `-`, or `_`");
      marker = code;
      return atBreak(code);
    }
    function atBreak(code) {
      if (code === marker) {
        effects.enter(types.thematicBreakSequence);
        return sequence(code);
      }
      if (size >= constants.thematicBreakMarkerCountMin && (code === codes.eof || markdownLineEnding(code))) {
        effects.exit(types.thematicBreak);
        return ok2(code);
      }
      return nok(code);
    }
    function sequence(code) {
      if (code === marker) {
        effects.consume(code);
        size++;
        return sequence;
      }
      effects.exit(types.thematicBreakSequence);
      return markdownSpace(code) ? factorySpace(effects, atBreak, types.whitespace)(code) : atBreak(code);
    }
  }
  var thematicBreak;
  var init_thematic_break = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_default();
    thematicBreak = {
      name: "thematicBreak",
      tokenize: tokenizeThematicBreak
    };
  });

  // node_modules/micromark-core-commonmark/dev/lib/list.js
  function tokenizeListStart(effects, ok2, nok) {
    const self = this;
    const tail = self.events[self.events.length - 1];
    let initialSize = tail && tail[1].type === types.linePrefix ? tail[2].sliceSerialize(tail[1], true).length : 0;
    let size = 0;
    return start;
    function start(code) {
      ok(self.containerState, "expected state");
      const kind = self.containerState.type || (code === codes.asterisk || code === codes.plusSign || code === codes.dash ? types.listUnordered : types.listOrdered);
      if (kind === types.listUnordered ? !self.containerState.marker || code === self.containerState.marker : asciiDigit(code)) {
        if (!self.containerState.type) {
          self.containerState.type = kind;
          effects.enter(kind, { _container: true });
        }
        if (kind === types.listUnordered) {
          effects.enter(types.listItemPrefix);
          return code === codes.asterisk || code === codes.dash ? effects.check(thematicBreak, nok, atMarker)(code) : atMarker(code);
        }
        if (!self.interrupt || code === codes.digit1) {
          effects.enter(types.listItemPrefix);
          effects.enter(types.listItemValue);
          return inside(code);
        }
      }
      return nok(code);
    }
    function inside(code) {
      ok(self.containerState, "expected state");
      if (asciiDigit(code) && ++size < constants.listItemValueSizeMax) {
        effects.consume(code);
        return inside;
      }
      if ((!self.interrupt || size < 2) && (self.containerState.marker ? code === self.containerState.marker : code === codes.rightParenthesis || code === codes.dot)) {
        effects.exit(types.listItemValue);
        return atMarker(code);
      }
      return nok(code);
    }
    function atMarker(code) {
      ok(self.containerState, "expected state");
      ok(code !== codes.eof, "eof (`null`) is not a marker");
      effects.enter(types.listItemMarker);
      effects.consume(code);
      effects.exit(types.listItemMarker);
      self.containerState.marker = self.containerState.marker || code;
      return effects.check(blankLine, self.interrupt ? nok : onBlank, effects.attempt(listItemPrefixWhitespaceConstruct, endOfPrefix, otherPrefix));
    }
    function onBlank(code) {
      ok(self.containerState, "expected state");
      self.containerState.initialBlankLine = true;
      initialSize++;
      return endOfPrefix(code);
    }
    function otherPrefix(code) {
      if (markdownSpace(code)) {
        effects.enter(types.listItemPrefixWhitespace);
        effects.consume(code);
        effects.exit(types.listItemPrefixWhitespace);
        return endOfPrefix;
      }
      return nok(code);
    }
    function endOfPrefix(code) {
      ok(self.containerState, "expected state");
      self.containerState.size = initialSize + self.sliceSerialize(effects.exit(types.listItemPrefix), true).length;
      return ok2(code);
    }
  }
  function tokenizeListContinuation(effects, ok2, nok) {
    const self = this;
    ok(self.containerState, "expected state");
    self.containerState._closeFlow = undefined;
    return effects.check(blankLine, onBlank, notBlank);
    function onBlank(code) {
      ok(self.containerState, "expected state");
      ok(typeof self.containerState.size === "number", "expected size");
      self.containerState.furtherBlankLines = self.containerState.furtherBlankLines || self.containerState.initialBlankLine;
      return factorySpace(effects, ok2, types.listItemIndent, self.containerState.size + 1)(code);
    }
    function notBlank(code) {
      ok(self.containerState, "expected state");
      if (self.containerState.furtherBlankLines || !markdownSpace(code)) {
        self.containerState.furtherBlankLines = undefined;
        self.containerState.initialBlankLine = undefined;
        return notInCurrentItem(code);
      }
      self.containerState.furtherBlankLines = undefined;
      self.containerState.initialBlankLine = undefined;
      return effects.attempt(indentConstruct, ok2, notInCurrentItem)(code);
    }
    function notInCurrentItem(code) {
      ok(self.containerState, "expected state");
      self.containerState._closeFlow = true;
      self.interrupt = undefined;
      ok(self.parser.constructs.disable.null, "expected `disable.null` to be populated");
      return factorySpace(effects, effects.attempt(list, ok2, nok), types.linePrefix, self.parser.constructs.disable.null.includes("codeIndented") ? undefined : constants.tabSize)(code);
    }
  }
  function tokenizeIndent(effects, ok2, nok) {
    const self = this;
    ok(self.containerState, "expected state");
    ok(typeof self.containerState.size === "number", "expected size");
    return factorySpace(effects, afterPrefix, types.listItemIndent, self.containerState.size + 1);
    function afterPrefix(code) {
      ok(self.containerState, "expected state");
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === types.listItemIndent && tail[2].sliceSerialize(tail[1], true).length === self.containerState.size ? ok2(code) : nok(code);
    }
  }
  function tokenizeListEnd(effects) {
    ok(this.containerState, "expected state");
    ok(typeof this.containerState.type === "string", "expected type");
    effects.exit(this.containerState.type);
  }
  function tokenizeListItemPrefixWhitespace(effects, ok2, nok) {
    const self = this;
    ok(self.parser.constructs.disable.null, "expected `disable.null` to be populated");
    return factorySpace(effects, afterPrefix, types.listItemPrefixWhitespace, self.parser.constructs.disable.null.includes("codeIndented") ? undefined : constants.tabSize + 1);
    function afterPrefix(code) {
      const tail = self.events[self.events.length - 1];
      return !markdownSpace(code) && tail && tail[1].type === types.listItemPrefixWhitespace ? ok2(code) : nok(code);
    }
  }
  var list, listItemPrefixWhitespaceConstruct, indentConstruct;
  var init_list = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_default();
    init_blank_line();
    init_thematic_break();
    list = {
      continuation: { tokenize: tokenizeListContinuation },
      exit: tokenizeListEnd,
      name: "list",
      tokenize: tokenizeListStart
    };
    listItemPrefixWhitespaceConstruct = {
      partial: true,
      tokenize: tokenizeListItemPrefixWhitespace
    };
    indentConstruct = { partial: true, tokenize: tokenizeIndent };
  });

  // node_modules/micromark-core-commonmark/dev/lib/setext-underline.js
  function resolveToSetextUnderline(events, context) {
    let index = events.length;
    let content3;
    let text;
    let definition2;
    while (index--) {
      if (events[index][0] === "enter") {
        if (events[index][1].type === types.content) {
          content3 = index;
          break;
        }
        if (events[index][1].type === types.paragraph) {
          text = index;
        }
      } else {
        if (events[index][1].type === types.content) {
          events.splice(index, 1);
        }
        if (!definition2 && events[index][1].type === types.definition) {
          definition2 = index;
        }
      }
    }
    ok(text !== undefined, "expected a `text` index to be found");
    ok(content3 !== undefined, "expected a `text` index to be found");
    ok(events[content3][2] === context, "enter context should be same");
    ok(events[events.length - 1][2] === context, "enter context should be same");
    const heading = {
      type: types.setextHeading,
      start: { ...events[content3][1].start },
      end: { ...events[events.length - 1][1].end }
    };
    events[text][1].type = types.setextHeadingText;
    if (definition2) {
      events.splice(text, 0, ["enter", heading, context]);
      events.splice(definition2 + 1, 0, ["exit", events[content3][1], context]);
      events[content3][1].end = { ...events[definition2][1].end };
    } else {
      events[content3][1] = heading;
    }
    events.push(["exit", heading, context]);
    return events;
  }
  function tokenizeSetextUnderline(effects, ok2, nok) {
    const self = this;
    let marker;
    return start;
    function start(code) {
      let index = self.events.length;
      let paragraph;
      ok(code === codes.dash || code === codes.equalsTo, "expected `=` or `-`");
      while (index--) {
        if (self.events[index][1].type !== types.lineEnding && self.events[index][1].type !== types.linePrefix && self.events[index][1].type !== types.content) {
          paragraph = self.events[index][1].type === types.paragraph;
          break;
        }
      }
      if (!self.parser.lazy[self.now().line] && (self.interrupt || paragraph)) {
        effects.enter(types.setextHeadingLine);
        marker = code;
        return before(code);
      }
      return nok(code);
    }
    function before(code) {
      effects.enter(types.setextHeadingLineSequence);
      return inside(code);
    }
    function inside(code) {
      if (code === marker) {
        effects.consume(code);
        return inside;
      }
      effects.exit(types.setextHeadingLineSequence);
      return markdownSpace(code) ? factorySpace(effects, after, types.lineSuffix)(code) : after(code);
    }
    function after(code) {
      if (code === codes.eof || markdownLineEnding(code)) {
        effects.exit(types.setextHeadingLine);
        return ok2(code);
      }
      return nok(code);
    }
  }
  var setextUnderline;
  var init_setext_underline = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_default();
    setextUnderline = {
      name: "setextUnderline",
      resolveTo: resolveToSetextUnderline,
      tokenize: tokenizeSetextUnderline
    };
  });

  // node_modules/micromark-core-commonmark/dev/index.js
  var init_dev12 = __esm(() => {
    init_attention();
    init_autolink();
    init_blank_line();
    init_block_quote();
    init_character_escape();
    init_character_reference();
    init_code_fenced();
    init_code_indented();
    init_code_text();
    init_content2();
    init_definition();
    init_hard_break_escape();
    init_heading_atx();
    init_html_flow();
    init_html_text();
    init_label_end();
    init_label_start_image();
    init_label_start_link();
    init_line_ending();
    init_list();
    init_setext_underline();
    init_thematic_break();
  });

  // node_modules/micromark/dev/lib/initialize/flow.js
  function initializeFlow(effects) {
    const self = this;
    const initial = effects.attempt(blankLine, atBlankEnding, effects.attempt(this.parser.constructs.flowInitial, afterConstruct, factorySpace(effects, effects.attempt(this.parser.constructs.flow, afterConstruct, effects.attempt(content2, afterConstruct)), types.linePrefix)));
    return initial;
    function atBlankEnding(code) {
      ok(code === codes.eof || markdownLineEnding(code), "expected eol or eof");
      if (code === codes.eof) {
        effects.consume(code);
        return;
      }
      effects.enter(types.lineEndingBlank);
      effects.consume(code);
      effects.exit(types.lineEndingBlank);
      self.currentConstruct = undefined;
      return initial;
    }
    function afterConstruct(code) {
      ok(code === codes.eof || markdownLineEnding(code), "expected eol or eof");
      if (code === codes.eof) {
        effects.consume(code);
        return;
      }
      effects.enter(types.lineEnding);
      effects.consume(code);
      effects.exit(types.lineEnding);
      self.currentConstruct = undefined;
      return initial;
    }
  }
  var flow;
  var init_flow = __esm(() => {
    init_development();
    init_dev12();
    init_dev5();
    init_dev4();
    init_default();
    flow = { tokenize: initializeFlow };
  });

  // node_modules/micromark/dev/lib/initialize/text.js
  function initializeFactory(field) {
    return {
      resolveAll: createResolver(field === "text" ? resolveAllLineSuffixes : undefined),
      tokenize: initializeText
    };
    function initializeText(effects) {
      const self = this;
      const constructs2 = this.parser.constructs[field];
      const text2 = effects.attempt(constructs2, start, notText);
      return start;
      function start(code) {
        return atBreak(code) ? text2(code) : notText(code);
      }
      function notText(code) {
        if (code === codes.eof) {
          effects.consume(code);
          return;
        }
        effects.enter(types.data);
        effects.consume(code);
        return data;
      }
      function data(code) {
        if (atBreak(code)) {
          effects.exit(types.data);
          return text2(code);
        }
        effects.consume(code);
        return data;
      }
      function atBreak(code) {
        if (code === codes.eof) {
          return true;
        }
        const list2 = constructs2[code];
        let index = -1;
        if (list2) {
          ok(Array.isArray(list2), "expected `disable.null` to be populated");
          while (++index < list2.length) {
            const item = list2[index];
            if (!item.previous || item.previous.call(self, self.previous)) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }
  function createResolver(extraResolver) {
    return resolveAllText;
    function resolveAllText(events, context) {
      let index = -1;
      let enter;
      while (++index <= events.length) {
        if (enter === undefined) {
          if (events[index] && events[index][1].type === types.data) {
            enter = index;
            index++;
          }
        } else if (!events[index] || events[index][1].type !== types.data) {
          if (index !== enter + 2) {
            events[enter][1].end = events[index - 1][1].end;
            events.splice(enter + 2, index - enter - 2);
            index = enter + 2;
          }
          enter = undefined;
        }
      }
      return extraResolver ? extraResolver(events, context) : events;
    }
  }
  function resolveAllLineSuffixes(events, context) {
    let eventIndex = 0;
    while (++eventIndex <= events.length) {
      if ((eventIndex === events.length || events[eventIndex][1].type === types.lineEnding) && events[eventIndex - 1][1].type === types.data) {
        const data = events[eventIndex - 1][1];
        const chunks = context.sliceStream(data);
        let index = chunks.length;
        let bufferIndex = -1;
        let size = 0;
        let tabs;
        while (index--) {
          const chunk = chunks[index];
          if (typeof chunk === "string") {
            bufferIndex = chunk.length;
            while (chunk.charCodeAt(bufferIndex - 1) === codes.space) {
              size++;
              bufferIndex--;
            }
            if (bufferIndex)
              break;
            bufferIndex = -1;
          } else if (chunk === codes.horizontalTab) {
            tabs = true;
            size++;
          } else if (chunk === codes.virtualSpace) {} else {
            index++;
            break;
          }
        }
        if (context._contentTypeTextTrailing && eventIndex === events.length) {
          size = 0;
        }
        if (size) {
          const token = {
            type: eventIndex === events.length || tabs || size < constants.hardBreakPrefixSizeMin ? types.lineSuffix : types.hardBreakTrailing,
            start: {
              _bufferIndex: index ? bufferIndex : data.start._bufferIndex + bufferIndex,
              _index: data.start._index + index,
              line: data.end.line,
              column: data.end.column - size,
              offset: data.end.offset - size
            },
            end: { ...data.end }
          };
          data.end = { ...token.start };
          if (data.start.offset === data.end.offset) {
            Object.assign(data, token);
          } else {
            events.splice(eventIndex, 0, ["enter", token, context], ["exit", token, context]);
            eventIndex += 2;
          }
        }
        eventIndex++;
      }
    }
    return events;
  }
  var resolver, string, text;
  var init_text = __esm(() => {
    init_development();
    init_default();
    resolver = { resolveAll: createResolver() };
    string = initializeFactory("string");
    text = initializeFactory("text");
  });

  // node_modules/micromark/dev/lib/constructs.js
  var exports_constructs = {};
  __export(exports_constructs, {
    text: () => text2,
    string: () => string2,
    insideSpan: () => insideSpan,
    flowInitial: () => flowInitial,
    flow: () => flow2,
    document: () => document3,
    disable: () => disable,
    contentInitial: () => contentInitial,
    attentionMarkers: () => attentionMarkers
  });
  var document3, contentInitial, flowInitial, flow2, string2, text2, insideSpan, attentionMarkers, disable;
  var init_constructs = __esm(() => {
    init_dev12();
    init_default();
    init_text();
    document3 = {
      [codes.asterisk]: list,
      [codes.plusSign]: list,
      [codes.dash]: list,
      [codes.digit0]: list,
      [codes.digit1]: list,
      [codes.digit2]: list,
      [codes.digit3]: list,
      [codes.digit4]: list,
      [codes.digit5]: list,
      [codes.digit6]: list,
      [codes.digit7]: list,
      [codes.digit8]: list,
      [codes.digit9]: list,
      [codes.greaterThan]: blockQuote
    };
    contentInitial = {
      [codes.leftSquareBracket]: definition
    };
    flowInitial = {
      [codes.horizontalTab]: codeIndented,
      [codes.virtualSpace]: codeIndented,
      [codes.space]: codeIndented
    };
    flow2 = {
      [codes.numberSign]: headingAtx,
      [codes.asterisk]: thematicBreak,
      [codes.dash]: [setextUnderline, thematicBreak],
      [codes.lessThan]: htmlFlow,
      [codes.equalsTo]: setextUnderline,
      [codes.underscore]: thematicBreak,
      [codes.graveAccent]: codeFenced,
      [codes.tilde]: codeFenced
    };
    string2 = {
      [codes.ampersand]: characterReference,
      [codes.backslash]: characterEscape
    };
    text2 = {
      [codes.carriageReturn]: lineEnding,
      [codes.lineFeed]: lineEnding,
      [codes.carriageReturnLineFeed]: lineEnding,
      [codes.exclamationMark]: labelStartImage,
      [codes.ampersand]: characterReference,
      [codes.asterisk]: attention,
      [codes.lessThan]: [autolink, htmlText],
      [codes.leftSquareBracket]: labelStartLink,
      [codes.backslash]: [hardBreakEscape, characterEscape],
      [codes.rightSquareBracket]: labelEnd,
      [codes.underscore]: attention,
      [codes.graveAccent]: codeText
    };
    insideSpan = { null: [attention, resolver] };
    attentionMarkers = { null: [codes.asterisk, codes.underscore] };
    disable = { null: [] };
  });

  // node_modules/ms/index.js
  var require_ms = __commonJS((exports, module) => {
    var s = 1000;
    var m = s * 60;
    var h = m * 60;
    var d = h * 24;
    var w = d * 7;
    var y = d * 365.25;
    module.exports = function(val, options) {
      options = options || {};
      var type = typeof val;
      if (type === "string" && val.length > 0) {
        return parse(val);
      } else if (type === "number" && isFinite(val)) {
        return options.long ? fmtLong(val) : fmtShort(val);
      }
      throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
    };
    function parse(str) {
      str = String(str);
      if (str.length > 100) {
        return;
      }
      var match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(str);
      if (!match) {
        return;
      }
      var n = parseFloat(match[1]);
      var type = (match[2] || "ms").toLowerCase();
      switch (type) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return n * y;
        case "weeks":
        case "week":
        case "w":
          return n * w;
        case "days":
        case "day":
        case "d":
          return n * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return n * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return n * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return n * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return n;
        default:
          return;
      }
    }
    function fmtShort(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return Math.round(ms / d) + "d";
      }
      if (msAbs >= h) {
        return Math.round(ms / h) + "h";
      }
      if (msAbs >= m) {
        return Math.round(ms / m) + "m";
      }
      if (msAbs >= s) {
        return Math.round(ms / s) + "s";
      }
      return ms + "ms";
    }
    function fmtLong(ms) {
      var msAbs = Math.abs(ms);
      if (msAbs >= d) {
        return plural(ms, msAbs, d, "day");
      }
      if (msAbs >= h) {
        return plural(ms, msAbs, h, "hour");
      }
      if (msAbs >= m) {
        return plural(ms, msAbs, m, "minute");
      }
      if (msAbs >= s) {
        return plural(ms, msAbs, s, "second");
      }
      return ms + " ms";
    }
    function plural(ms, msAbs, n, name) {
      var isPlural = msAbs >= n * 1.5;
      return Math.round(ms / n) + " " + name + (isPlural ? "s" : "");
    }
  });

  // node_modules/debug/src/common.js
  var require_common = __commonJS((exports, module) => {
    function setup(env) {
      createDebug.debug = createDebug;
      createDebug.default = createDebug;
      createDebug.coerce = coerce;
      createDebug.disable = disable2;
      createDebug.enable = enable;
      createDebug.enabled = enabled;
      createDebug.humanize = require_ms();
      createDebug.destroy = destroy;
      Object.keys(env).forEach((key) => {
        createDebug[key] = env[key];
      });
      createDebug.names = [];
      createDebug.skips = [];
      createDebug.formatters = {};
      function selectColor(namespace) {
        let hash = 0;
        for (let i = 0;i < namespace.length; i++) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return createDebug.colors[Math.abs(hash) % createDebug.colors.length];
      }
      createDebug.selectColor = selectColor;
      function createDebug(namespace) {
        let prevTime;
        let enableOverride = null;
        let namespacesCache;
        let enabledCache;
        function debug(...args) {
          if (!debug.enabled) {
            return;
          }
          const self = debug;
          const curr = Number(new Date);
          const ms = curr - (prevTime || curr);
          self.diff = ms;
          self.prev = prevTime;
          self.curr = curr;
          prevTime = curr;
          args[0] = createDebug.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          let index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
            if (match === "%%") {
              return "%";
            }
            index++;
            const formatter = createDebug.formatters[format];
            if (typeof formatter === "function") {
              const val = args[index];
              match = formatter.call(self, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          createDebug.formatArgs.call(self, args);
          const logFn = self.log || createDebug.log;
          logFn.apply(self, args);
        }
        debug.namespace = namespace;
        debug.useColors = createDebug.useColors();
        debug.color = createDebug.selectColor(namespace);
        debug.extend = extend;
        debug.destroy = createDebug.destroy;
        Object.defineProperty(debug, "enabled", {
          enumerable: true,
          configurable: false,
          get: () => {
            if (enableOverride !== null) {
              return enableOverride;
            }
            if (namespacesCache !== createDebug.namespaces) {
              namespacesCache = createDebug.namespaces;
              enabledCache = createDebug.enabled(namespace);
            }
            return enabledCache;
          },
          set: (v) => {
            enableOverride = v;
          }
        });
        if (typeof createDebug.init === "function") {
          createDebug.init(debug);
        }
        return debug;
      }
      function extend(namespace, delimiter) {
        const newDebug = createDebug(this.namespace + (typeof delimiter === "undefined" ? ":" : delimiter) + namespace);
        newDebug.log = this.log;
        return newDebug;
      }
      function enable(namespaces) {
        createDebug.save(namespaces);
        createDebug.namespaces = namespaces;
        createDebug.names = [];
        createDebug.skips = [];
        const split = (typeof namespaces === "string" ? namespaces : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
        for (const ns of split) {
          if (ns[0] === "-") {
            createDebug.skips.push(ns.slice(1));
          } else {
            createDebug.names.push(ns);
          }
        }
      }
      function matchesTemplate(search, template) {
        let searchIndex = 0;
        let templateIndex = 0;
        let starIndex = -1;
        let matchIndex = 0;
        while (searchIndex < search.length) {
          if (templateIndex < template.length && (template[templateIndex] === search[searchIndex] || template[templateIndex] === "*")) {
            if (template[templateIndex] === "*") {
              starIndex = templateIndex;
              matchIndex = searchIndex;
              templateIndex++;
            } else {
              searchIndex++;
              templateIndex++;
            }
          } else if (starIndex !== -1) {
            templateIndex = starIndex + 1;
            matchIndex++;
            searchIndex = matchIndex;
          } else {
            return false;
          }
        }
        while (templateIndex < template.length && template[templateIndex] === "*") {
          templateIndex++;
        }
        return templateIndex === template.length;
      }
      function disable2() {
        const namespaces = [
          ...createDebug.names,
          ...createDebug.skips.map((namespace) => "-" + namespace)
        ].join(",");
        createDebug.enable("");
        return namespaces;
      }
      function enabled(name) {
        for (const skip of createDebug.skips) {
          if (matchesTemplate(name, skip)) {
            return false;
          }
        }
        for (const ns of createDebug.names) {
          if (matchesTemplate(name, ns)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error) {
          return val.stack || val.message;
        }
        return val;
      }
      function destroy() {
        console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
      }
      createDebug.enable(createDebug.load());
      return createDebug;
    }
    module.exports = setup;
  });

  // node_modules/debug/src/browser.js
  var require_browser = __commonJS((exports, module) => {
    exports.formatArgs = formatArgs;
    exports.save = save;
    exports.load = load;
    exports.useColors = useColors;
    exports.storage = localstorage();
    exports.destroy = (() => {
      let warned = false;
      return () => {
        if (!warned) {
          warned = true;
          console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
        }
      };
    })();
    exports.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) {
        return true;
      }
      if (typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
        return false;
      }
      let m;
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && (m = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(m[1], 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function formatArgs(args) {
      args[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + args[0] + (this.useColors ? "%c " : " ") + "+" + module.exports.humanize(this.diff);
      if (!this.useColors) {
        return;
      }
      const c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      let index = 0;
      let lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, (match) => {
        if (match === "%%") {
          return;
        }
        index++;
        if (match === "%c") {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    exports.log = console.debug || console.log || (() => {});
    function save(namespaces) {
      try {
        if (namespaces) {
          exports.storage.setItem("debug", namespaces);
        } else {
          exports.storage.removeItem("debug");
        }
      } catch (error) {}
    }
    function load() {
      let r;
      try {
        r = exports.storage.getItem("debug") || exports.storage.getItem("DEBUG");
      } catch (error) {}
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    function localstorage() {
      try {
        return localStorage;
      } catch (error) {}
    }
    module.exports = require_common()(exports);
    var { formatters } = module.exports;
    formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (error) {
        return "[UnexpectedJSONParseError]: " + error.message;
      }
    };
  });

  // node_modules/micromark/dev/lib/create-tokenizer.js
  function createTokenizer(parser, initialize, from) {
    let point = {
      _bufferIndex: -1,
      _index: 0,
      line: from && from.line || 1,
      column: from && from.column || 1,
      offset: from && from.offset || 0
    };
    const columnStart = {};
    const resolveAllConstructs = [];
    let chunks = [];
    let stack = [];
    let consumed = true;
    const effects = {
      attempt: constructFactory(onsuccessfulconstruct),
      check: constructFactory(onsuccessfulcheck),
      consume,
      enter,
      exit: exit2,
      interrupt: constructFactory(onsuccessfulcheck, { interrupt: true })
    };
    const context = {
      code: codes.eof,
      containerState: {},
      defineSkip,
      events: [],
      now,
      parser,
      previous: codes.eof,
      sliceSerialize,
      sliceStream,
      write
    };
    let state = initialize.tokenize.call(context, effects);
    let expectedCode;
    if (initialize.resolveAll) {
      resolveAllConstructs.push(initialize);
    }
    return context;
    function write(slice) {
      chunks = push(chunks, slice);
      main();
      if (chunks[chunks.length - 1] !== codes.eof) {
        return [];
      }
      addResult(initialize, 0);
      context.events = resolveAll(resolveAllConstructs, context.events, context);
      return context.events;
    }
    function sliceSerialize(token, expandTabs) {
      return serializeChunks(sliceStream(token), expandTabs);
    }
    function sliceStream(token) {
      return sliceChunks(chunks, token);
    }
    function now() {
      const { _bufferIndex, _index, line, column, offset } = point;
      return { _bufferIndex, _index, line, column, offset };
    }
    function defineSkip(value) {
      columnStart[value.line] = value.column;
      accountForPotentialSkip();
      debug("position: define skip: `%j`", point);
    }
    function main() {
      let chunkIndex;
      while (point._index < chunks.length) {
        const chunk = chunks[point._index];
        if (typeof chunk === "string") {
          chunkIndex = point._index;
          if (point._bufferIndex < 0) {
            point._bufferIndex = 0;
          }
          while (point._index === chunkIndex && point._bufferIndex < chunk.length) {
            go(chunk.charCodeAt(point._bufferIndex));
          }
        } else {
          go(chunk);
        }
      }
    }
    function go(code) {
      ok(consumed === true, "expected character to be consumed");
      consumed = undefined;
      debug("main: passing `%s` to %s", code, state && state.name);
      expectedCode = code;
      ok(typeof state === "function", "expected state");
      state = state(code);
    }
    function consume(code) {
      ok(code === expectedCode, "expected given code to equal expected code");
      debug("consume: `%s`", code);
      ok(consumed === undefined, "expected code to not have been consumed: this might be because `return x(code)` instead of `return x` was used");
      ok(code === null ? context.events.length === 0 || context.events[context.events.length - 1][0] === "exit" : context.events[context.events.length - 1][0] === "enter", "expected last token to be open");
      if (markdownLineEnding(code)) {
        point.line++;
        point.column = 1;
        point.offset += code === codes.carriageReturnLineFeed ? 2 : 1;
        accountForPotentialSkip();
        debug("position: after eol: `%j`", point);
      } else if (code !== codes.virtualSpace) {
        point.column++;
        point.offset++;
      }
      if (point._bufferIndex < 0) {
        point._index++;
      } else {
        point._bufferIndex++;
        if (point._bufferIndex === chunks[point._index].length) {
          point._bufferIndex = -1;
          point._index++;
        }
      }
      context.previous = code;
      consumed = true;
    }
    function enter(type, fields) {
      const token = fields || {};
      token.type = type;
      token.start = now();
      ok(typeof type === "string", "expected string type");
      ok(type.length > 0, "expected non-empty string");
      debug("enter: `%s`", type);
      context.events.push(["enter", token, context]);
      stack.push(token);
      return token;
    }
    function exit2(type) {
      ok(typeof type === "string", "expected string type");
      ok(type.length > 0, "expected non-empty string");
      const token = stack.pop();
      ok(token, "cannot close w/o open tokens");
      token.end = now();
      ok(type === token.type, "expected exit token to match current token");
      ok(!(token.start._index === token.end._index && token.start._bufferIndex === token.end._bufferIndex), "expected non-empty token (`" + type + "`)");
      debug("exit: `%s`", token.type);
      context.events.push(["exit", token, context]);
      return token;
    }
    function onsuccessfulconstruct(construct, info) {
      addResult(construct, info.from);
    }
    function onsuccessfulcheck(_, info) {
      info.restore();
    }
    function constructFactory(onreturn, fields) {
      return hook;
      function hook(constructs2, returnState, bogusState) {
        let listOfConstructs;
        let constructIndex;
        let currentConstruct;
        let info;
        return Array.isArray(constructs2) ? handleListOfConstructs(constructs2) : ("tokenize" in constructs2) ? handleListOfConstructs([constructs2]) : handleMapOfConstructs(constructs2);
        function handleMapOfConstructs(map) {
          return start;
          function start(code) {
            const left = code !== null && map[code];
            const all2 = code !== null && map.null;
            const list2 = [
              ...Array.isArray(left) ? left : left ? [left] : [],
              ...Array.isArray(all2) ? all2 : all2 ? [all2] : []
            ];
            return handleListOfConstructs(list2)(code);
          }
        }
        function handleListOfConstructs(list2) {
          listOfConstructs = list2;
          constructIndex = 0;
          if (list2.length === 0) {
            ok(bogusState, "expected `bogusState` to be given");
            return bogusState;
          }
          return handleConstruct(list2[constructIndex]);
        }
        function handleConstruct(construct) {
          return start;
          function start(code) {
            info = store();
            currentConstruct = construct;
            if (!construct.partial) {
              context.currentConstruct = construct;
            }
            ok(context.parser.constructs.disable.null, "expected `disable.null` to be populated");
            if (construct.name && context.parser.constructs.disable.null.includes(construct.name)) {
              return nok(code);
            }
            return construct.tokenize.call(fields ? Object.assign(Object.create(context), fields) : context, effects, ok2, nok)(code);
          }
        }
        function ok2(code) {
          ok(code === expectedCode, "expected code");
          consumed = true;
          onreturn(currentConstruct, info);
          return returnState;
        }
        function nok(code) {
          ok(code === expectedCode, "expected code");
          consumed = true;
          info.restore();
          if (++constructIndex < listOfConstructs.length) {
            return handleConstruct(listOfConstructs[constructIndex]);
          }
          return bogusState;
        }
      }
    }
    function addResult(construct, from2) {
      if (construct.resolveAll && !resolveAllConstructs.includes(construct)) {
        resolveAllConstructs.push(construct);
      }
      if (construct.resolve) {
        splice(context.events, from2, context.events.length - from2, construct.resolve(context.events.slice(from2), context));
      }
      if (construct.resolveTo) {
        context.events = construct.resolveTo(context.events, context);
      }
      ok(construct.partial || context.events.length === 0 || context.events[context.events.length - 1][0] === "exit", "expected last token to end");
    }
    function store() {
      const startPoint = now();
      const startPrevious = context.previous;
      const startCurrentConstruct = context.currentConstruct;
      const startEventsIndex = context.events.length;
      const startStack = Array.from(stack);
      return { from: startEventsIndex, restore };
      function restore() {
        point = startPoint;
        context.previous = startPrevious;
        context.currentConstruct = startCurrentConstruct;
        context.events.length = startEventsIndex;
        stack = startStack;
        accountForPotentialSkip();
        debug("position: restore: `%j`", point);
      }
    }
    function accountForPotentialSkip() {
      if (point.line in columnStart && point.column < 2) {
        point.column = columnStart[point.line];
        point.offset += columnStart[point.line] - 1;
      }
    }
  }
  function sliceChunks(chunks, token) {
    const startIndex = token.start._index;
    const startBufferIndex = token.start._bufferIndex;
    const endIndex = token.end._index;
    const endBufferIndex = token.end._bufferIndex;
    let view;
    if (startIndex === endIndex) {
      ok(endBufferIndex > -1, "expected non-negative end buffer index");
      ok(startBufferIndex > -1, "expected non-negative start buffer index");
      view = [chunks[startIndex].slice(startBufferIndex, endBufferIndex)];
    } else {
      view = chunks.slice(startIndex, endIndex);
      if (startBufferIndex > -1) {
        const head = view[0];
        if (typeof head === "string") {
          view[0] = head.slice(startBufferIndex);
        } else {
          ok(startBufferIndex === 0, "expected `startBufferIndex` to be `0`");
          view.shift();
        }
      }
      if (endBufferIndex > 0) {
        view.push(chunks[endIndex].slice(0, endBufferIndex));
      }
    }
    return view;
  }
  function serializeChunks(chunks, expandTabs) {
    let index = -1;
    const result = [];
    let atTab;
    while (++index < chunks.length) {
      const chunk = chunks[index];
      let value;
      if (typeof chunk === "string") {
        value = chunk;
      } else
        switch (chunk) {
          case codes.carriageReturn: {
            value = values.cr;
            break;
          }
          case codes.lineFeed: {
            value = values.lf;
            break;
          }
          case codes.carriageReturnLineFeed: {
            value = values.cr + values.lf;
            break;
          }
          case codes.horizontalTab: {
            value = expandTabs ? values.space : values.ht;
            break;
          }
          case codes.virtualSpace: {
            if (!expandTabs && atTab)
              continue;
            value = values.space;
            break;
          }
          default: {
            ok(typeof chunk === "number", "expected number");
            value = String.fromCharCode(chunk);
          }
        }
      atTab = chunk === codes.horizontalTab;
      result.push(value);
    }
    return result.join("");
  }
  var import_debug, debug;
  var init_create_tokenizer = __esm(() => {
    init_development();
    init_dev4();
    init_dev();
    init_default();
    import_debug = __toESM(require_browser(), 1);
    debug = import_debug.default("micromark");
  });

  // node_modules/micromark/dev/lib/parse.js
  function parse(options) {
    const settings = options || {};
    const constructs2 = combineExtensions([exports_constructs, ...settings.extensions || []]);
    const parser = {
      constructs: constructs2,
      content: create(content),
      defined: [],
      document: create(document2),
      flow: create(flow),
      lazy: {},
      string: create(string),
      text: create(text)
    };
    return parser;
    function create(initial) {
      return creator;
      function creator(from) {
        return createTokenizer(parser, initial, from);
      }
    }
  }
  var init_parse = __esm(() => {
    init_micromark_util_combine_extensions();
    init_content();
    init_document();
    init_flow();
    init_text();
    init_constructs();
    init_create_tokenizer();
  });

  // node_modules/micromark/dev/lib/postprocess.js
  function postprocess(events) {
    while (!subtokenize(events)) {}
    return events;
  }
  var init_postprocess = __esm(() => {
    init_dev7();
  });

  // node_modules/micromark/dev/lib/preprocess.js
  function preprocess() {
    let column = 1;
    let buffer = "";
    let start = true;
    let atCarriageReturn;
    return preprocessor;
    function preprocessor(value, encoding, end) {
      const chunks = [];
      let match;
      let next;
      let startPosition;
      let endPosition;
      let code;
      value = buffer + (typeof value === "string" ? value.toString() : new TextDecoder(encoding || undefined).decode(value));
      startPosition = 0;
      buffer = "";
      if (start) {
        if (value.charCodeAt(0) === codes.byteOrderMarker) {
          startPosition++;
        }
        start = undefined;
      }
      while (startPosition < value.length) {
        search.lastIndex = startPosition;
        match = search.exec(value);
        endPosition = match && match.index !== undefined ? match.index : value.length;
        code = value.charCodeAt(endPosition);
        if (!match) {
          buffer = value.slice(startPosition);
          break;
        }
        if (code === codes.lf && startPosition === endPosition && atCarriageReturn) {
          chunks.push(codes.carriageReturnLineFeed);
          atCarriageReturn = undefined;
        } else {
          if (atCarriageReturn) {
            chunks.push(codes.carriageReturn);
            atCarriageReturn = undefined;
          }
          if (startPosition < endPosition) {
            chunks.push(value.slice(startPosition, endPosition));
            column += endPosition - startPosition;
          }
          switch (code) {
            case codes.nul: {
              chunks.push(codes.replacementCharacter);
              column++;
              break;
            }
            case codes.ht: {
              next = Math.ceil(column / constants.tabSize) * constants.tabSize;
              chunks.push(codes.horizontalTab);
              while (column++ < next)
                chunks.push(codes.virtualSpace);
              break;
            }
            case codes.lf: {
              chunks.push(codes.lineFeed);
              column = 1;
              break;
            }
            default: {
              atCarriageReturn = true;
              column = 1;
            }
          }
        }
        startPosition = endPosition + 1;
      }
      if (end) {
        if (atCarriageReturn)
          chunks.push(codes.carriageReturn);
        if (buffer)
          chunks.push(buffer);
        chunks.push(codes.eof);
      }
      return chunks;
    }
  }
  var search;
  var init_preprocess = __esm(() => {
    init_default();
    search = /[\0\t\n\r]/g;
  });

  // node_modules/micromark/dev/index.js
  var init_dev13 = __esm(() => {
    init_parse();
    init_postprocess();
    init_preprocess();
  });

  // node_modules/micromark-util-decode-string/dev/index.js
  function decodeString(value) {
    return value.replace(characterEscapeOrReference, decode);
  }
  function decode($0, $1, $2) {
    if ($1) {
      return $1;
    }
    const head = $2.charCodeAt(0);
    if (head === codes.numberSign) {
      const head2 = $2.charCodeAt(1);
      const hex = head2 === codes.lowercaseX || head2 === codes.uppercaseX;
      return decodeNumericCharacterReference($2.slice(hex ? 2 : 1), hex ? constants.numericBaseHexadecimal : constants.numericBaseDecimal);
    }
    return decodeNamedCharacterReference($2) || $0;
  }
  var characterEscapeOrReference;
  var init_dev14 = __esm(() => {
    init_index_dom();
    init_dev2();
    init_default();
    characterEscapeOrReference = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
  });

  // node_modules/unist-util-stringify-position/lib/index.js
  function stringifyPosition(value) {
    if (!value || typeof value !== "object") {
      return "";
    }
    if ("position" in value || "type" in value) {
      return position(value.position);
    }
    if ("start" in value || "end" in value) {
      return position(value);
    }
    if ("line" in value || "column" in value) {
      return point(value);
    }
    return "";
  }
  function point(point2) {
    return index(point2 && point2.line) + ":" + index(point2 && point2.column);
  }
  function position(pos) {
    return point(pos && pos.start) + "-" + point(pos && pos.end);
  }
  function index(value) {
    return value && typeof value === "number" ? value : 1;
  }

  // node_modules/unist-util-stringify-position/index.js
  var init_unist_util_stringify_position = () => {};

  // node_modules/mdast-util-from-markdown/dev/lib/index.js
  function fromMarkdown(value, encoding, options) {
    if (encoding && typeof encoding === "object") {
      options = encoding;
      encoding = undefined;
    }
    return compiler(options)(postprocess(parse(options).document().write(preprocess()(value, encoding, true))));
  }
  function compiler(options) {
    const config = {
      transforms: [],
      canContainEols: ["emphasis", "fragment", "heading", "paragraph", "strong"],
      enter: {
        autolink: opener(link),
        autolinkProtocol: onenterdata,
        autolinkEmail: onenterdata,
        atxHeading: opener(heading),
        blockQuote: opener(blockQuote2),
        characterEscape: onenterdata,
        characterReference: onenterdata,
        codeFenced: opener(codeFlow),
        codeFencedFenceInfo: buffer,
        codeFencedFenceMeta: buffer,
        codeIndented: opener(codeFlow, buffer),
        codeText: opener(codeText2, buffer),
        codeTextData: onenterdata,
        data: onenterdata,
        codeFlowValue: onenterdata,
        definition: opener(definition2),
        definitionDestinationString: buffer,
        definitionLabelString: buffer,
        definitionTitleString: buffer,
        emphasis: opener(emphasis),
        hardBreakEscape: opener(hardBreak),
        hardBreakTrailing: opener(hardBreak),
        htmlFlow: opener(html, buffer),
        htmlFlowData: onenterdata,
        htmlText: opener(html, buffer),
        htmlTextData: onenterdata,
        image: opener(image),
        label: buffer,
        link: opener(link),
        listItem: opener(listItem),
        listItemValue: onenterlistitemvalue,
        listOrdered: opener(list2, onenterlistordered),
        listUnordered: opener(list2),
        paragraph: opener(paragraph),
        reference: onenterreference,
        referenceString: buffer,
        resourceDestinationString: buffer,
        resourceTitleString: buffer,
        setextHeading: opener(heading),
        strong: opener(strong),
        thematicBreak: opener(thematicBreak2)
      },
      exit: {
        atxHeading: closer(),
        atxHeadingSequence: onexitatxheadingsequence,
        autolink: closer(),
        autolinkEmail: onexitautolinkemail,
        autolinkProtocol: onexitautolinkprotocol,
        blockQuote: closer(),
        characterEscapeValue: onexitdata,
        characterReferenceMarkerHexadecimal: onexitcharacterreferencemarker,
        characterReferenceMarkerNumeric: onexitcharacterreferencemarker,
        characterReferenceValue: onexitcharacterreferencevalue,
        characterReference: onexitcharacterreference,
        codeFenced: closer(onexitcodefenced),
        codeFencedFence: onexitcodefencedfence,
        codeFencedFenceInfo: onexitcodefencedfenceinfo,
        codeFencedFenceMeta: onexitcodefencedfencemeta,
        codeFlowValue: onexitdata,
        codeIndented: closer(onexitcodeindented),
        codeText: closer(onexitcodetext),
        codeTextData: onexitdata,
        data: onexitdata,
        definition: closer(),
        definitionDestinationString: onexitdefinitiondestinationstring,
        definitionLabelString: onexitdefinitionlabelstring,
        definitionTitleString: onexitdefinitiontitlestring,
        emphasis: closer(),
        hardBreakEscape: closer(onexithardbreak),
        hardBreakTrailing: closer(onexithardbreak),
        htmlFlow: closer(onexithtmlflow),
        htmlFlowData: onexitdata,
        htmlText: closer(onexithtmltext),
        htmlTextData: onexitdata,
        image: closer(onexitimage),
        label: onexitlabel,
        labelText: onexitlabeltext,
        lineEnding: onexitlineending,
        link: closer(onexitlink),
        listItem: closer(),
        listOrdered: closer(),
        listUnordered: closer(),
        paragraph: closer(),
        referenceString: onexitreferencestring,
        resourceDestinationString: onexitresourcedestinationstring,
        resourceTitleString: onexitresourcetitlestring,
        resource: onexitresource,
        setextHeading: closer(onexitsetextheading),
        setextHeadingLineSequence: onexitsetextheadinglinesequence,
        setextHeadingText: onexitsetextheadingtext,
        strong: closer(),
        thematicBreak: closer()
      }
    };
    configure(config, (options || {}).mdastExtensions || []);
    const data = {};
    return compile;
    function compile(events) {
      let tree = { type: "root", children: [] };
      const context = {
        stack: [tree],
        tokenStack: [],
        config,
        enter,
        exit: exit2,
        buffer,
        resume,
        data
      };
      const listStack = [];
      let index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][1].type === types.listOrdered || events[index2][1].type === types.listUnordered) {
          if (events[index2][0] === "enter") {
            listStack.push(index2);
          } else {
            const tail = listStack.pop();
            ok(typeof tail === "number", "expected list to be open");
            index2 = prepareList(events, tail, index2);
          }
        }
      }
      index2 = -1;
      while (++index2 < events.length) {
        const handler = config[events[index2][0]];
        if (own.call(handler, events[index2][1].type)) {
          handler[events[index2][1].type].call(Object.assign({ sliceSerialize: events[index2][2].sliceSerialize }, context), events[index2][1]);
        }
      }
      if (context.tokenStack.length > 0) {
        const tail = context.tokenStack[context.tokenStack.length - 1];
        const handler = tail[1] || defaultOnError;
        handler.call(context, undefined, tail[0]);
      }
      tree.position = {
        start: point2(events.length > 0 ? events[0][1].start : { line: 1, column: 1, offset: 0 }),
        end: point2(events.length > 0 ? events[events.length - 2][1].end : { line: 1, column: 1, offset: 0 })
      };
      index2 = -1;
      while (++index2 < config.transforms.length) {
        tree = config.transforms[index2](tree) || tree;
      }
      return tree;
    }
    function prepareList(events, start, length) {
      let index2 = start - 1;
      let containerBalance = -1;
      let listSpread = false;
      let listItem2;
      let lineIndex;
      let firstBlankLineIndex;
      let atMarker;
      while (++index2 <= length) {
        const event = events[index2];
        switch (event[1].type) {
          case types.listUnordered:
          case types.listOrdered:
          case types.blockQuote: {
            if (event[0] === "enter") {
              containerBalance++;
            } else {
              containerBalance--;
            }
            atMarker = undefined;
            break;
          }
          case types.lineEndingBlank: {
            if (event[0] === "enter") {
              if (listItem2 && !atMarker && !containerBalance && !firstBlankLineIndex) {
                firstBlankLineIndex = index2;
              }
              atMarker = undefined;
            }
            break;
          }
          case types.linePrefix:
          case types.listItemValue:
          case types.listItemMarker:
          case types.listItemPrefix:
          case types.listItemPrefixWhitespace: {
            break;
          }
          default: {
            atMarker = undefined;
          }
        }
        if (!containerBalance && event[0] === "enter" && event[1].type === types.listItemPrefix || containerBalance === -1 && event[0] === "exit" && (event[1].type === types.listUnordered || event[1].type === types.listOrdered)) {
          if (listItem2) {
            let tailIndex = index2;
            lineIndex = undefined;
            while (tailIndex--) {
              const tailEvent = events[tailIndex];
              if (tailEvent[1].type === types.lineEnding || tailEvent[1].type === types.lineEndingBlank) {
                if (tailEvent[0] === "exit")
                  continue;
                if (lineIndex) {
                  events[lineIndex][1].type = types.lineEndingBlank;
                  listSpread = true;
                }
                tailEvent[1].type = types.lineEnding;
                lineIndex = tailIndex;
              } else if (tailEvent[1].type === types.linePrefix || tailEvent[1].type === types.blockQuotePrefix || tailEvent[1].type === types.blockQuotePrefixWhitespace || tailEvent[1].type === types.blockQuoteMarker || tailEvent[1].type === types.listItemIndent) {} else {
                break;
              }
            }
            if (firstBlankLineIndex && (!lineIndex || firstBlankLineIndex < lineIndex)) {
              listItem2._spread = true;
            }
            listItem2.end = Object.assign({}, lineIndex ? events[lineIndex][1].start : event[1].end);
            events.splice(lineIndex || index2, 0, ["exit", listItem2, event[2]]);
            index2++;
            length++;
          }
          if (event[1].type === types.listItemPrefix) {
            const item = {
              type: "listItem",
              _spread: false,
              start: Object.assign({}, event[1].start),
              end: undefined
            };
            listItem2 = item;
            events.splice(index2, 0, ["enter", item, event[2]]);
            index2++;
            length++;
            firstBlankLineIndex = undefined;
            atMarker = true;
          }
        }
      }
      events[start][1]._spread = listSpread;
      return length;
    }
    function opener(create, and) {
      return open;
      function open(token) {
        enter.call(this, create(token), token);
        if (and)
          and.call(this, token);
      }
    }
    function buffer() {
      this.stack.push({ type: "fragment", children: [] });
    }
    function enter(node2, token, errorHandler) {
      const parent = this.stack[this.stack.length - 1];
      ok(parent, "expected `parent`");
      ok("children" in parent, "expected `parent`");
      const siblings = parent.children;
      siblings.push(node2);
      this.stack.push(node2);
      this.tokenStack.push([token, errorHandler || undefined]);
      node2.position = {
        start: point2(token.start),
        end: undefined
      };
    }
    function closer(and) {
      return close;
      function close(token) {
        if (and)
          and.call(this, token);
        exit2.call(this, token);
      }
    }
    function exit2(token, onExitError) {
      const node2 = this.stack.pop();
      ok(node2, "expected `node`");
      const open = this.tokenStack.pop();
      if (!open) {
        throw new Error("Cannot close `" + token.type + "` (" + stringifyPosition({ start: token.start, end: token.end }) + "): it’s not open");
      } else if (open[0].type !== token.type) {
        if (onExitError) {
          onExitError.call(this, token, open[0]);
        } else {
          const handler = open[1] || defaultOnError;
          handler.call(this, token, open[0]);
        }
      }
      ok(node2.type !== "fragment", "unexpected fragment `exit`ed");
      ok(node2.position, "expected `position` to be defined");
      node2.position.end = point2(token.end);
    }
    function resume() {
      return toString(this.stack.pop());
    }
    function onenterlistordered() {
      this.data.expectingFirstListItemValue = true;
    }
    function onenterlistitemvalue(token) {
      if (this.data.expectingFirstListItemValue) {
        const ancestor = this.stack[this.stack.length - 2];
        ok(ancestor, "expected nodes on stack");
        ok(ancestor.type === "list", "expected list on stack");
        ancestor.start = Number.parseInt(this.sliceSerialize(token), constants.numericBaseDecimal);
        this.data.expectingFirstListItemValue = undefined;
      }
    }
    function onexitcodefencedfenceinfo() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "code", "expected code on stack");
      node2.lang = data2;
    }
    function onexitcodefencedfencemeta() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "code", "expected code on stack");
      node2.meta = data2;
    }
    function onexitcodefencedfence() {
      if (this.data.flowCodeInside)
        return;
      this.buffer();
      this.data.flowCodeInside = true;
    }
    function onexitcodefenced() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "code", "expected code on stack");
      node2.value = data2.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, "");
      this.data.flowCodeInside = undefined;
    }
    function onexitcodeindented() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "code", "expected code on stack");
      node2.value = data2.replace(/(\r?\n|\r)$/g, "");
    }
    function onexitdefinitionlabelstring(token) {
      const label = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "definition", "expected definition on stack");
      node2.label = label;
      node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    }
    function onexitdefinitiontitlestring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "definition", "expected definition on stack");
      node2.title = data2;
    }
    function onexitdefinitiondestinationstring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "definition", "expected definition on stack");
      node2.url = data2;
    }
    function onexitatxheadingsequence(token) {
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "heading", "expected heading on stack");
      if (!node2.depth) {
        const depth = this.sliceSerialize(token).length;
        ok(depth === 1 || depth === 2 || depth === 3 || depth === 4 || depth === 5 || depth === 6, "expected `depth` between `1` and `6`");
        node2.depth = depth;
      }
    }
    function onexitsetextheadingtext() {
      this.data.setextHeadingSlurpLineEnding = true;
    }
    function onexitsetextheadinglinesequence(token) {
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "heading", "expected heading on stack");
      node2.depth = this.sliceSerialize(token).codePointAt(0) === codes.equalsTo ? 1 : 2;
    }
    function onexitsetextheading() {
      this.data.setextHeadingSlurpLineEnding = undefined;
    }
    function onenterdata(token) {
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok("children" in node2, "expected parent on stack");
      const siblings = node2.children;
      let tail = siblings[siblings.length - 1];
      if (!tail || tail.type !== "text") {
        tail = text3();
        tail.position = {
          start: point2(token.start),
          end: undefined
        };
        siblings.push(tail);
      }
      this.stack.push(tail);
    }
    function onexitdata(token) {
      const tail = this.stack.pop();
      ok(tail, "expected a `node` to be on the stack");
      ok("value" in tail, "expected a `literal` to be on the stack");
      ok(tail.position, "expected `node` to have an open position");
      tail.value += this.sliceSerialize(token);
      tail.position.end = point2(token.end);
    }
    function onexitlineending(token) {
      const context = this.stack[this.stack.length - 1];
      ok(context, "expected `node`");
      if (this.data.atHardBreak) {
        ok("children" in context, "expected `parent`");
        const tail = context.children[context.children.length - 1];
        ok(tail.position, "expected tail to have a starting position");
        tail.position.end = point2(token.end);
        this.data.atHardBreak = undefined;
        return;
      }
      if (!this.data.setextHeadingSlurpLineEnding && config.canContainEols.includes(context.type)) {
        onenterdata.call(this, token);
        onexitdata.call(this, token);
      }
    }
    function onexithardbreak() {
      this.data.atHardBreak = true;
    }
    function onexithtmlflow() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "html", "expected html on stack");
      node2.value = data2;
    }
    function onexithtmltext() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "html", "expected html on stack");
      node2.value = data2;
    }
    function onexitcodetext() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "inlineCode", "expected inline code on stack");
      node2.value = data2;
    }
    function onexitlink() {
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "link", "expected link on stack");
      if (this.data.inReference) {
        const referenceType = this.data.referenceType || "shortcut";
        node2.type += "Reference";
        node2.referenceType = referenceType;
        delete node2.url;
        delete node2.title;
      } else {
        delete node2.identifier;
        delete node2.label;
      }
      this.data.referenceType = undefined;
    }
    function onexitimage() {
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "image", "expected image on stack");
      if (this.data.inReference) {
        const referenceType = this.data.referenceType || "shortcut";
        node2.type += "Reference";
        node2.referenceType = referenceType;
        delete node2.url;
        delete node2.title;
      } else {
        delete node2.identifier;
        delete node2.label;
      }
      this.data.referenceType = undefined;
    }
    function onexitlabeltext(token) {
      const string3 = this.sliceSerialize(token);
      const ancestor = this.stack[this.stack.length - 2];
      ok(ancestor, "expected ancestor on stack");
      ok(ancestor.type === "image" || ancestor.type === "link", "expected image or link on stack");
      ancestor.label = decodeString(string3);
      ancestor.identifier = normalizeIdentifier(string3).toLowerCase();
    }
    function onexitlabel() {
      const fragment = this.stack[this.stack.length - 1];
      ok(fragment, "expected node on stack");
      ok(fragment.type === "fragment", "expected fragment on stack");
      const value = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "image" || node2.type === "link", "expected image or link on stack");
      this.data.inReference = true;
      if (node2.type === "link") {
        const children = fragment.children;
        node2.children = children;
      } else {
        node2.alt = value;
      }
    }
    function onexitresourcedestinationstring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "image" || node2.type === "link", "expected image or link on stack");
      node2.url = data2;
    }
    function onexitresourcetitlestring() {
      const data2 = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "image" || node2.type === "link", "expected image or link on stack");
      node2.title = data2;
    }
    function onexitresource() {
      this.data.inReference = undefined;
    }
    function onenterreference() {
      this.data.referenceType = "collapsed";
    }
    function onexitreferencestring(token) {
      const label = this.resume();
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "image" || node2.type === "link", "expected image reference or link reference on stack");
      node2.label = label;
      node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
      this.data.referenceType = "full";
    }
    function onexitcharacterreferencemarker(token) {
      ok(token.type === "characterReferenceMarkerNumeric" || token.type === "characterReferenceMarkerHexadecimal");
      this.data.characterReferenceType = token.type;
    }
    function onexitcharacterreferencevalue(token) {
      const data2 = this.sliceSerialize(token);
      const type = this.data.characterReferenceType;
      let value;
      if (type) {
        value = decodeNumericCharacterReference(data2, type === types.characterReferenceMarkerNumeric ? constants.numericBaseDecimal : constants.numericBaseHexadecimal);
        this.data.characterReferenceType = undefined;
      } else {
        const result = decodeNamedCharacterReference(data2);
        ok(result !== false, "expected reference to decode");
        value = result;
      }
      const tail = this.stack[this.stack.length - 1];
      ok(tail, "expected `node`");
      ok("value" in tail, "expected `node.value`");
      tail.value += value;
    }
    function onexitcharacterreference(token) {
      const tail = this.stack.pop();
      ok(tail, "expected `node`");
      ok(tail.position, "expected `node.position`");
      tail.position.end = point2(token.end);
    }
    function onexitautolinkprotocol(token) {
      onexitdata.call(this, token);
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "link", "expected link on stack");
      node2.url = this.sliceSerialize(token);
    }
    function onexitautolinkemail(token) {
      onexitdata.call(this, token);
      const node2 = this.stack[this.stack.length - 1];
      ok(node2, "expected node on stack");
      ok(node2.type === "link", "expected link on stack");
      node2.url = "mailto:" + this.sliceSerialize(token);
    }
    function blockQuote2() {
      return { type: "blockquote", children: [] };
    }
    function codeFlow() {
      return { type: "code", lang: null, meta: null, value: "" };
    }
    function codeText2() {
      return { type: "inlineCode", value: "" };
    }
    function definition2() {
      return {
        type: "definition",
        identifier: "",
        label: null,
        title: null,
        url: ""
      };
    }
    function emphasis() {
      return { type: "emphasis", children: [] };
    }
    function heading() {
      return {
        type: "heading",
        depth: 0,
        children: []
      };
    }
    function hardBreak() {
      return { type: "break" };
    }
    function html() {
      return { type: "html", value: "" };
    }
    function image() {
      return { type: "image", title: null, url: "", alt: null };
    }
    function link() {
      return { type: "link", title: null, url: "", children: [] };
    }
    function list2(token) {
      return {
        type: "list",
        ordered: token.type === "listOrdered",
        start: null,
        spread: token._spread,
        children: []
      };
    }
    function listItem(token) {
      return {
        type: "listItem",
        spread: token._spread,
        checked: null,
        children: []
      };
    }
    function paragraph() {
      return { type: "paragraph", children: [] };
    }
    function strong() {
      return { type: "strong", children: [] };
    }
    function text3() {
      return { type: "text", value: "" };
    }
    function thematicBreak2() {
      return { type: "thematicBreak" };
    }
  }
  function point2(d) {
    return { line: d.line, column: d.column, offset: d.offset };
  }
  function configure(combined, extensions) {
    let index2 = -1;
    while (++index2 < extensions.length) {
      const value = extensions[index2];
      if (Array.isArray(value)) {
        configure(combined, value);
      } else {
        extension(combined, value);
      }
    }
  }
  function extension(combined, extension2) {
    let key;
    for (key in extension2) {
      if (own.call(extension2, key)) {
        switch (key) {
          case "canContainEols": {
            const right = extension2[key];
            if (right) {
              combined[key].push(...right);
            }
            break;
          }
          case "transforms": {
            const right = extension2[key];
            if (right) {
              combined[key].push(...right);
            }
            break;
          }
          case "enter":
          case "exit": {
            const right = extension2[key];
            if (right) {
              Object.assign(combined[key], right);
            }
            break;
          }
        }
      }
    }
  }
  function defaultOnError(left, right) {
    if (left) {
      throw new Error("Cannot close `" + left.type + "` (" + stringifyPosition({ start: left.start, end: left.end }) + "): a different token (`" + right.type + "`, " + stringifyPosition({ start: right.start, end: right.end }) + ") is open");
    } else {
      throw new Error("Cannot close document, a token (`" + right.type + "`, " + stringifyPosition({ start: right.start, end: right.end }) + ") is still open");
    }
  }
  var own;
  var init_lib2 = __esm(() => {
    init_development();
    init_mdast_util_to_string();
    init_dev13();
    init_dev2();
    init_dev14();
    init_dev3();
    init_default();
    init_index_dom();
    init_unist_util_stringify_position();
    own = {}.hasOwnProperty;
  });

  // node_modules/mdast-util-from-markdown/dev/index.js
  var init_dev15 = __esm(() => {
    init_lib2();
  });

  // node_modules/remark-parse/lib/index.js
  function remarkParse(options) {
    const self = this;
    self.parser = parser;
    function parser(doc) {
      return fromMarkdown(doc, {
        ...self.data("settings"),
        ...options,
        extensions: self.data("micromarkExtensions") || [],
        mdastExtensions: self.data("fromMarkdownExtensions") || []
      });
    }
  }
  var init_lib3 = __esm(() => {
    init_dev15();
  });

  // node_modules/remark-parse/index.js
  var init_remark_parse = __esm(() => {
    init_lib3();
  });

  // node_modules/zwitch/index.js
  function zwitch(key, options) {
    const settings = options || {};
    function one2(value, ...parameters) {
      let fn = one2.invalid;
      const handlers = one2.handlers;
      if (value && own2.call(value, key)) {
        const id = String(value[key]);
        fn = own2.call(handlers, id) ? handlers[id] : one2.unknown;
      }
      if (fn) {
        return fn.call(this, value, ...parameters);
      }
    }
    one2.handlers = settings.handlers || {};
    one2.invalid = settings.invalid;
    one2.unknown = settings.unknown;
    return one2;
  }
  var own2;
  var init_zwitch = __esm(() => {
    own2 = {}.hasOwnProperty;
  });

  // node_modules/mdast-util-to-markdown/lib/configure.js
  function configure2(base, extension2) {
    let index2 = -1;
    let key;
    if (extension2.extensions) {
      while (++index2 < extension2.extensions.length) {
        configure2(base, extension2.extensions[index2]);
      }
    }
    for (key in extension2) {
      if (own3.call(extension2, key)) {
        switch (key) {
          case "extensions": {
            break;
          }
          case "unsafe": {
            list2(base[key], extension2[key]);
            break;
          }
          case "join": {
            list2(base[key], extension2[key]);
            break;
          }
          case "handlers": {
            map(base[key], extension2[key]);
            break;
          }
          default: {
            base.options[key] = extension2[key];
          }
        }
      }
    }
    return base;
  }
  function list2(left, right) {
    if (right) {
      left.push(...right);
    }
  }
  function map(left, right) {
    if (right) {
      Object.assign(left, right);
    }
  }
  var own3;
  var init_configure = __esm(() => {
    own3 = {}.hasOwnProperty;
  });

  // node_modules/mdast-util-to-markdown/lib/handle/blockquote.js
  function blockquote(node2, _, state, info) {
    const exit2 = state.enter("blockquote");
    const tracker = state.createTracker(info);
    tracker.move("> ");
    tracker.shift(2);
    const value = state.indentLines(state.containerFlow(node2, tracker.current()), map2);
    exit2();
    return value;
  }
  function map2(line, _, blank) {
    return ">" + (blank ? "" : " ") + line;
  }

  // node_modules/mdast-util-to-markdown/lib/util/pattern-in-scope.js
  function patternInScope(stack, pattern) {
    return listInScope(stack, pattern.inConstruct, true) && !listInScope(stack, pattern.notInConstruct, false);
  }
  function listInScope(stack, list3, none) {
    if (typeof list3 === "string") {
      list3 = [list3];
    }
    if (!list3 || list3.length === 0) {
      return none;
    }
    let index2 = -1;
    while (++index2 < list3.length) {
      if (stack.includes(list3[index2])) {
        return true;
      }
    }
    return false;
  }

  // node_modules/mdast-util-to-markdown/lib/handle/break.js
  function hardBreak(_, _1, state, info) {
    let index2 = -1;
    while (++index2 < state.unsafe.length) {
      if (state.unsafe[index2].character === `
` && patternInScope(state.stack, state.unsafe[index2])) {
        return /[ \t]/.test(info.before) ? "" : " ";
      }
    }
    return "\\\n";
  }
  var init_break = () => {};

  // node_modules/longest-streak/index.js
  function longestStreak(value, substring) {
    const source = String(value);
    let index2 = source.indexOf(substring);
    let expected = index2;
    let count = 0;
    let max = 0;
    if (typeof substring !== "string") {
      throw new TypeError("Expected substring");
    }
    while (index2 !== -1) {
      if (index2 === expected) {
        if (++count > max) {
          max = count;
        }
      } else {
        count = 1;
      }
      expected = index2 + substring.length;
      index2 = source.indexOf(substring, expected);
    }
    return max;
  }

  // node_modules/mdast-util-to-markdown/lib/util/format-code-as-indented.js
  function formatCodeAsIndented(node2, state) {
    return Boolean(state.options.fences === false && node2.value && !node2.lang && /[^ \r\n]/.test(node2.value) && !/^[\t ]*(?:[\r\n]|$)|(?:^|[\r\n])[\t ]*$/.test(node2.value));
  }

  // node_modules/mdast-util-to-markdown/lib/util/check-fence.js
  function checkFence(state) {
    const marker = state.options.fence || "`";
    if (marker !== "`" && marker !== "~") {
      throw new Error("Cannot serialize code with `" + marker + "` for `options.fence`, expected `` ` `` or `~`");
    }
    return marker;
  }

  // node_modules/mdast-util-to-markdown/lib/handle/code.js
  function code(node2, _, state, info) {
    const marker = checkFence(state);
    const raw = node2.value || "";
    const suffix = marker === "`" ? "GraveAccent" : "Tilde";
    if (formatCodeAsIndented(node2, state)) {
      const exit3 = state.enter("codeIndented");
      const value2 = state.indentLines(raw, map3);
      exit3();
      return value2;
    }
    const tracker = state.createTracker(info);
    const sequence = marker.repeat(Math.max(longestStreak(raw, marker) + 1, 3));
    const exit2 = state.enter("codeFenced");
    let value = tracker.move(sequence);
    if (node2.lang) {
      const subexit = state.enter(`codeFencedLang${suffix}`);
      value += tracker.move(state.safe(node2.lang, {
        before: value,
        after: " ",
        encode: ["`"],
        ...tracker.current()
      }));
      subexit();
    }
    if (node2.lang && node2.meta) {
      const subexit = state.enter(`codeFencedMeta${suffix}`);
      value += tracker.move(" ");
      value += tracker.move(state.safe(node2.meta, {
        before: value,
        after: `
`,
        encode: ["`"],
        ...tracker.current()
      }));
      subexit();
    }
    value += tracker.move(`
`);
    if (raw) {
      value += tracker.move(raw + `
`);
    }
    value += tracker.move(sequence);
    exit2();
    return value;
  }
  function map3(line, _, blank) {
    return (blank ? "" : "    ") + line;
  }
  var init_code = () => {};

  // node_modules/mdast-util-to-markdown/lib/util/check-quote.js
  function checkQuote(state) {
    const marker = state.options.quote || '"';
    if (marker !== '"' && marker !== "'") {
      throw new Error("Cannot serialize title with `" + marker + "` for `options.quote`, expected `\"`, or `'`");
    }
    return marker;
  }

  // node_modules/mdast-util-to-markdown/lib/handle/definition.js
  function definition2(node2, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const exit2 = state.enter("definition");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("[");
    value += tracker.move(state.safe(state.associationId(node2), {
      before: value,
      after: "]",
      ...tracker.current()
    }));
    value += tracker.move("]: ");
    subexit();
    if (!node2.url || /[\0- \u007F]/.test(node2.url)) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(state.safe(node2.url, { before: value, after: ">", ...tracker.current() }));
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(state.safe(node2.url, {
        before: value,
        after: node2.title ? " " : `
`,
        ...tracker.current()
      }));
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(state.safe(node2.title, {
        before: value,
        after: quote,
        ...tracker.current()
      }));
      value += tracker.move(quote);
      subexit();
    }
    exit2();
    return value;
  }
  var init_definition2 = () => {};

  // node_modules/mdast-util-to-markdown/lib/util/check-emphasis.js
  function checkEmphasis(state) {
    const marker = state.options.emphasis || "*";
    if (marker !== "*" && marker !== "_") {
      throw new Error("Cannot serialize emphasis with `" + marker + "` for `options.emphasis`, expected `*`, or `_`");
    }
    return marker;
  }

  // node_modules/mdast-util-to-markdown/lib/util/encode-character-reference.js
  function encodeCharacterReference(code2) {
    return "&#x" + code2.toString(16).toUpperCase() + ";";
  }

  // node_modules/mdast-util-to-markdown/lib/util/encode-info.js
  function encodeInfo(outside, inside, marker) {
    const outsideKind = classifyCharacter(outside);
    const insideKind = classifyCharacter(inside);
    if (outsideKind === undefined) {
      return insideKind === undefined ? marker === "_" ? { inside: true, outside: true } : { inside: false, outside: false } : insideKind === 1 ? { inside: true, outside: true } : { inside: false, outside: true };
    }
    if (outsideKind === 1) {
      return insideKind === undefined ? { inside: false, outside: false } : insideKind === 1 ? { inside: true, outside: true } : { inside: false, outside: false };
    }
    return insideKind === undefined ? { inside: false, outside: false } : insideKind === 1 ? { inside: true, outside: false } : { inside: false, outside: false };
  }
  var init_encode_info = __esm(() => {
    init_dev6();
  });

  // node_modules/mdast-util-to-markdown/lib/handle/emphasis.js
  function emphasis(node2, _, state, info) {
    const marker = checkEmphasis(state);
    const exit2 = state.enter("emphasis");
    const tracker = state.createTracker(info);
    const before = tracker.move(marker);
    let between = tracker.move(state.containerPhrasing(node2, {
      after: marker,
      before,
      ...tracker.current()
    }));
    const betweenHead = between.charCodeAt(0);
    const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
    if (open.inside) {
      between = encodeCharacterReference(betweenHead) + between.slice(1);
    }
    const betweenTail = between.charCodeAt(between.length - 1);
    const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
    if (close.inside) {
      between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
    }
    const after = tracker.move(marker);
    exit2();
    state.attentionEncodeSurroundingInfo = {
      after: close.outside,
      before: open.outside
    };
    return before + between + after;
  }
  function emphasisPeek(_, _1, state) {
    return state.options.emphasis || "*";
  }
  var init_emphasis = __esm(() => {
    init_encode_info();
    emphasis.peek = emphasisPeek;
  });

  // node_modules/unist-util-is/lib/index.js
  function anyFactory(tests) {
    const checks = [];
    let index2 = -1;
    while (++index2 < tests.length) {
      checks[index2] = convert(tests[index2]);
    }
    return castFactory(any);
    function any(...parameters) {
      let index3 = -1;
      while (++index3 < checks.length) {
        if (checks[index3].apply(this, parameters))
          return true;
      }
      return false;
    }
  }
  function propertiesFactory(check) {
    const checkAsRecord = check;
    return castFactory(all2);
    function all2(node2) {
      const nodeAsRecord = node2;
      let key;
      for (key in check) {
        if (nodeAsRecord[key] !== checkAsRecord[key])
          return false;
      }
      return true;
    }
  }
  function typeFactory(check) {
    return castFactory(type);
    function type(node2) {
      return node2 && node2.type === check;
    }
  }
  function castFactory(testFunction) {
    return check;
    function check(value, index2, parent) {
      return Boolean(looksLikeANode(value) && testFunction.call(this, value, typeof index2 === "number" ? index2 : undefined, parent || undefined));
    }
  }
  function ok2() {
    return true;
  }
  function looksLikeANode(value) {
    return value !== null && typeof value === "object" && "type" in value;
  }
  var convert = function(test) {
    if (test === null || test === undefined) {
      return ok2;
    }
    if (typeof test === "function") {
      return castFactory(test);
    }
    if (typeof test === "object") {
      return Array.isArray(test) ? anyFactory(test) : propertiesFactory(test);
    }
    if (typeof test === "string") {
      return typeFactory(test);
    }
    throw new Error("Expected function, string, or object as test");
  };

  // node_modules/unist-util-is/index.js
  var init_unist_util_is = () => {};

  // node_modules/unist-util-visit-parents/lib/color.js
  function color(d) {
    return d;
  }

  // node_modules/unist-util-visit-parents/lib/index.js
  function visitParents(tree, test, visitor, reverse) {
    let check;
    if (typeof test === "function" && typeof visitor !== "function") {
      reverse = visitor;
      visitor = test;
    } else {
      check = test;
    }
    const is2 = convert(check);
    const step = reverse ? -1 : 1;
    factory(tree, undefined, [])();
    function factory(node2, index2, parents) {
      const value = node2 && typeof node2 === "object" ? node2 : {};
      if (typeof value.type === "string") {
        const name = typeof value.tagName === "string" ? value.tagName : typeof value.name === "string" ? value.name : undefined;
        Object.defineProperty(visit, "name", {
          value: "node (" + color(node2.type + (name ? "<" + name + ">" : "")) + ")"
        });
      }
      return visit;
      function visit() {
        let result = empty;
        let subresult;
        let offset;
        let grandparents;
        if (!test || is2(node2, index2, parents[parents.length - 1] || undefined)) {
          result = toResult(visitor(node2, parents));
          if (result[0] === EXIT) {
            return result;
          }
        }
        if ("children" in node2 && node2.children) {
          const nodeAsParent = node2;
          if (nodeAsParent.children && result[0] !== SKIP) {
            offset = (reverse ? nodeAsParent.children.length : -1) + step;
            grandparents = parents.concat(nodeAsParent);
            while (offset > -1 && offset < nodeAsParent.children.length) {
              const child = nodeAsParent.children[offset];
              subresult = factory(child, offset, grandparents)();
              if (subresult[0] === EXIT) {
                return subresult;
              }
              offset = typeof subresult[1] === "number" ? subresult[1] : offset + step;
            }
          }
        }
        return result;
      }
    }
  }
  function toResult(value) {
    if (Array.isArray(value)) {
      return value;
    }
    if (typeof value === "number") {
      return [CONTINUE, value];
    }
    return value === null || value === undefined ? empty : [value];
  }
  var empty, CONTINUE = true, EXIT = false, SKIP = "skip";
  var init_lib4 = __esm(() => {
    init_unist_util_is();
    empty = [];
  });

  // node_modules/unist-util-visit-parents/index.js
  var init_unist_util_visit_parents = __esm(() => {
    init_lib4();
  });

  // node_modules/unist-util-visit/lib/index.js
  function visit(tree, testOrVisitor, visitorOrReverse, maybeReverse) {
    let reverse;
    let test;
    let visitor;
    if (typeof testOrVisitor === "function" && typeof visitorOrReverse !== "function") {
      test = undefined;
      visitor = testOrVisitor;
      reverse = visitorOrReverse;
    } else {
      test = testOrVisitor;
      visitor = visitorOrReverse;
      reverse = maybeReverse;
    }
    visitParents(tree, test, overload, reverse);
    function overload(node2, parents) {
      const parent = parents[parents.length - 1];
      const index2 = parent ? parent.children.indexOf(node2) : undefined;
      return visitor(node2, index2, parent);
    }
  }
  var init_lib5 = __esm(() => {
    init_unist_util_visit_parents();
    init_unist_util_visit_parents();
  });

  // node_modules/unist-util-visit/index.js
  var exports_unist_util_visit = {};
  __export(exports_unist_util_visit, {
    visit: () => visit,
    SKIP: () => SKIP,
    EXIT: () => EXIT,
    CONTINUE: () => CONTINUE
  });
  var init_unist_util_visit = __esm(() => {
    init_lib5();
  });

  // node_modules/mdast-util-to-markdown/lib/util/format-heading-as-setext.js
  function formatHeadingAsSetext(node2, state) {
    let literalWithBreak = false;
    visit(node2, function(node3) {
      if ("value" in node3 && /\r?\n|\r/.test(node3.value) || node3.type === "break") {
        literalWithBreak = true;
        return EXIT;
      }
    });
    return Boolean((!node2.depth || node2.depth < 3) && toString(node2) && (state.options.setext || literalWithBreak));
  }
  var init_format_heading_as_setext = __esm(() => {
    init_unist_util_visit();
    init_mdast_util_to_string();
  });

  // node_modules/mdast-util-to-markdown/lib/handle/heading.js
  function heading(node2, _, state, info) {
    const rank = Math.max(Math.min(6, node2.depth || 1), 1);
    const tracker = state.createTracker(info);
    if (formatHeadingAsSetext(node2, state)) {
      const exit3 = state.enter("headingSetext");
      const subexit2 = state.enter("phrasing");
      const value2 = state.containerPhrasing(node2, {
        ...tracker.current(),
        before: `
`,
        after: `
`
      });
      subexit2();
      exit3();
      return value2 + `
` + (rank === 1 ? "=" : "-").repeat(value2.length - (Math.max(value2.lastIndexOf("\r"), value2.lastIndexOf(`
`)) + 1));
    }
    const sequence = "#".repeat(rank);
    const exit2 = state.enter("headingAtx");
    const subexit = state.enter("phrasing");
    tracker.move(sequence + " ");
    let value = state.containerPhrasing(node2, {
      before: "# ",
      after: `
`,
      ...tracker.current()
    });
    if (/^[\t ]/.test(value)) {
      value = encodeCharacterReference(value.charCodeAt(0)) + value.slice(1);
    }
    value = value ? sequence + " " + value : sequence;
    if (state.options.closeAtx) {
      value += " " + sequence;
    }
    subexit();
    exit2();
    return value;
  }
  var init_heading = __esm(() => {
    init_format_heading_as_setext();
  });

  // node_modules/mdast-util-to-markdown/lib/handle/html.js
  function html(node2) {
    return node2.value || "";
  }
  function htmlPeek() {
    return "<";
  }
  var init_html = __esm(() => {
    html.peek = htmlPeek;
  });

  // node_modules/mdast-util-to-markdown/lib/handle/image.js
  function image(node2, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const exit2 = state.enter("image");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("![");
    value += tracker.move(state.safe(node2.alt, { before: value, after: "]", ...tracker.current() }));
    value += tracker.move("](");
    subexit();
    if (!node2.url && node2.title || /[\0- \u007F]/.test(node2.url)) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(state.safe(node2.url, { before: value, after: ">", ...tracker.current() }));
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(state.safe(node2.url, {
        before: value,
        after: node2.title ? " " : ")",
        ...tracker.current()
      }));
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(state.safe(node2.title, {
        before: value,
        after: quote,
        ...tracker.current()
      }));
      value += tracker.move(quote);
      subexit();
    }
    value += tracker.move(")");
    exit2();
    return value;
  }
  function imagePeek() {
    return "!";
  }
  var init_image = __esm(() => {
    image.peek = imagePeek;
  });

  // node_modules/mdast-util-to-markdown/lib/handle/image-reference.js
  function imageReference(node2, _, state, info) {
    const type = node2.referenceType;
    const exit2 = state.enter("imageReference");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("![");
    const alt = state.safe(node2.alt, {
      before: value,
      after: "]",
      ...tracker.current()
    });
    value += tracker.move(alt + "][");
    subexit();
    const stack = state.stack;
    state.stack = [];
    subexit = state.enter("reference");
    const reference = state.safe(state.associationId(node2), {
      before: value,
      after: "]",
      ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit2();
    if (type === "full" || !alt || alt !== reference) {
      value += tracker.move(reference + "]");
    } else if (type === "shortcut") {
      value = value.slice(0, -1);
    } else {
      value += tracker.move("]");
    }
    return value;
  }
  function imageReferencePeek() {
    return "!";
  }
  var init_image_reference = __esm(() => {
    imageReference.peek = imageReferencePeek;
  });

  // node_modules/mdast-util-to-markdown/lib/handle/inline-code.js
  function inlineCode(node2, _, state) {
    let value = node2.value || "";
    let sequence = "`";
    let index2 = -1;
    while (new RegExp("(^|[^`])" + sequence + "([^`]|$)").test(value)) {
      sequence += "`";
    }
    if (/[^ \r\n]/.test(value) && (/^[ \r\n]/.test(value) && /[ \r\n]$/.test(value) || /^`|`$/.test(value))) {
      value = " " + value + " ";
    }
    while (++index2 < state.unsafe.length) {
      const pattern = state.unsafe[index2];
      const expression = state.compilePattern(pattern);
      let match;
      if (!pattern.atBreak)
        continue;
      while (match = expression.exec(value)) {
        let position2 = match.index;
        if (value.charCodeAt(position2) === 10 && value.charCodeAt(position2 - 1) === 13) {
          position2--;
        }
        value = value.slice(0, position2) + " " + value.slice(match.index + 1);
      }
    }
    return sequence + value + sequence;
  }
  function inlineCodePeek() {
    return "`";
  }
  var init_inline_code = __esm(() => {
    inlineCode.peek = inlineCodePeek;
  });

  // node_modules/mdast-util-to-markdown/lib/util/format-link-as-autolink.js
  function formatLinkAsAutolink(node2, state) {
    const raw = toString(node2);
    return Boolean(!state.options.resourceLink && node2.url && !node2.title && node2.children && node2.children.length === 1 && node2.children[0].type === "text" && (raw === node2.url || "mailto:" + raw === node2.url) && /^[a-z][a-z+.-]+:/i.test(node2.url) && !/[\0- <>\u007F]/.test(node2.url));
  }
  var init_format_link_as_autolink = __esm(() => {
    init_mdast_util_to_string();
  });

  // node_modules/mdast-util-to-markdown/lib/handle/link.js
  function link(node2, _, state, info) {
    const quote = checkQuote(state);
    const suffix = quote === '"' ? "Quote" : "Apostrophe";
    const tracker = state.createTracker(info);
    let exit2;
    let subexit;
    if (formatLinkAsAutolink(node2, state)) {
      const stack = state.stack;
      state.stack = [];
      exit2 = state.enter("autolink");
      let value2 = tracker.move("<");
      value2 += tracker.move(state.containerPhrasing(node2, {
        before: value2,
        after: ">",
        ...tracker.current()
      }));
      value2 += tracker.move(">");
      exit2();
      state.stack = stack;
      return value2;
    }
    exit2 = state.enter("link");
    subexit = state.enter("label");
    let value = tracker.move("[");
    value += tracker.move(state.containerPhrasing(node2, {
      before: value,
      after: "](",
      ...tracker.current()
    }));
    value += tracker.move("](");
    subexit();
    if (!node2.url && node2.title || /[\0- \u007F]/.test(node2.url)) {
      subexit = state.enter("destinationLiteral");
      value += tracker.move("<");
      value += tracker.move(state.safe(node2.url, { before: value, after: ">", ...tracker.current() }));
      value += tracker.move(">");
    } else {
      subexit = state.enter("destinationRaw");
      value += tracker.move(state.safe(node2.url, {
        before: value,
        after: node2.title ? " " : ")",
        ...tracker.current()
      }));
    }
    subexit();
    if (node2.title) {
      subexit = state.enter(`title${suffix}`);
      value += tracker.move(" " + quote);
      value += tracker.move(state.safe(node2.title, {
        before: value,
        after: quote,
        ...tracker.current()
      }));
      value += tracker.move(quote);
      subexit();
    }
    value += tracker.move(")");
    exit2();
    return value;
  }
  function linkPeek(node2, _, state) {
    return formatLinkAsAutolink(node2, state) ? "<" : "[";
  }
  var init_link = __esm(() => {
    init_format_link_as_autolink();
    link.peek = linkPeek;
  });

  // node_modules/mdast-util-to-markdown/lib/handle/link-reference.js
  function linkReference(node2, _, state, info) {
    const type = node2.referenceType;
    const exit2 = state.enter("linkReference");
    let subexit = state.enter("label");
    const tracker = state.createTracker(info);
    let value = tracker.move("[");
    const text3 = state.containerPhrasing(node2, {
      before: value,
      after: "]",
      ...tracker.current()
    });
    value += tracker.move(text3 + "][");
    subexit();
    const stack = state.stack;
    state.stack = [];
    subexit = state.enter("reference");
    const reference = state.safe(state.associationId(node2), {
      before: value,
      after: "]",
      ...tracker.current()
    });
    subexit();
    state.stack = stack;
    exit2();
    if (type === "full" || !text3 || text3 !== reference) {
      value += tracker.move(reference + "]");
    } else if (type === "shortcut") {
      value = value.slice(0, -1);
    } else {
      value += tracker.move("]");
    }
    return value;
  }
  function linkReferencePeek() {
    return "[";
  }
  var init_link_reference = __esm(() => {
    linkReference.peek = linkReferencePeek;
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-bullet.js
  function checkBullet(state) {
    const marker = state.options.bullet || "*";
    if (marker !== "*" && marker !== "+" && marker !== "-") {
      throw new Error("Cannot serialize items with `" + marker + "` for `options.bullet`, expected `*`, `+`, or `-`");
    }
    return marker;
  }

  // node_modules/mdast-util-to-markdown/lib/util/check-bullet-other.js
  function checkBulletOther(state) {
    const bullet = checkBullet(state);
    const bulletOther = state.options.bulletOther;
    if (!bulletOther) {
      return bullet === "*" ? "-" : "*";
    }
    if (bulletOther !== "*" && bulletOther !== "+" && bulletOther !== "-") {
      throw new Error("Cannot serialize items with `" + bulletOther + "` for `options.bulletOther`, expected `*`, `+`, or `-`");
    }
    if (bulletOther === bullet) {
      throw new Error("Expected `bullet` (`" + bullet + "`) and `bulletOther` (`" + bulletOther + "`) to be different");
    }
    return bulletOther;
  }
  var init_check_bullet_other = () => {};

  // node_modules/mdast-util-to-markdown/lib/util/check-bullet-ordered.js
  function checkBulletOrdered(state) {
    const marker = state.options.bulletOrdered || ".";
    if (marker !== "." && marker !== ")") {
      throw new Error("Cannot serialize items with `" + marker + "` for `options.bulletOrdered`, expected `.` or `)`");
    }
    return marker;
  }

  // node_modules/mdast-util-to-markdown/lib/util/check-rule.js
  function checkRule(state) {
    const marker = state.options.rule || "*";
    if (marker !== "*" && marker !== "-" && marker !== "_") {
      throw new Error("Cannot serialize rules with `" + marker + "` for `options.rule`, expected `*`, `-`, or `_`");
    }
    return marker;
  }

  // node_modules/mdast-util-to-markdown/lib/handle/list.js
  function list3(node2, parent, state, info) {
    const exit2 = state.enter("list");
    const bulletCurrent = state.bulletCurrent;
    let bullet = node2.ordered ? checkBulletOrdered(state) : checkBullet(state);
    const bulletOther = node2.ordered ? bullet === "." ? ")" : "." : checkBulletOther(state);
    let useDifferentMarker = parent && state.bulletLastUsed ? bullet === state.bulletLastUsed : false;
    if (!node2.ordered) {
      const firstListItem = node2.children ? node2.children[0] : undefined;
      if ((bullet === "*" || bullet === "-") && firstListItem && (!firstListItem.children || !firstListItem.children[0]) && state.stack[state.stack.length - 1] === "list" && state.stack[state.stack.length - 2] === "listItem" && state.stack[state.stack.length - 3] === "list" && state.stack[state.stack.length - 4] === "listItem" && state.indexStack[state.indexStack.length - 1] === 0 && state.indexStack[state.indexStack.length - 2] === 0 && state.indexStack[state.indexStack.length - 3] === 0) {
        useDifferentMarker = true;
      }
      if (checkRule(state) === bullet && firstListItem) {
        let index2 = -1;
        while (++index2 < node2.children.length) {
          const item = node2.children[index2];
          if (item && item.type === "listItem" && item.children && item.children[0] && item.children[0].type === "thematicBreak") {
            useDifferentMarker = true;
            break;
          }
        }
      }
    }
    if (useDifferentMarker) {
      bullet = bulletOther;
    }
    state.bulletCurrent = bullet;
    const value = state.containerFlow(node2, info);
    state.bulletLastUsed = bullet;
    state.bulletCurrent = bulletCurrent;
    exit2();
    return value;
  }
  var init_list2 = __esm(() => {
    init_check_bullet_other();
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-list-item-indent.js
  function checkListItemIndent(state) {
    const style = state.options.listItemIndent || "one";
    if (style !== "tab" && style !== "one" && style !== "mixed") {
      throw new Error("Cannot serialize items with `" + style + "` for `options.listItemIndent`, expected `tab`, `one`, or `mixed`");
    }
    return style;
  }

  // node_modules/mdast-util-to-markdown/lib/handle/list-item.js
  function listItem(node2, parent, state, info) {
    const listItemIndent = checkListItemIndent(state);
    let bullet = state.bulletCurrent || checkBullet(state);
    if (parent && parent.type === "list" && parent.ordered) {
      bullet = (typeof parent.start === "number" && parent.start > -1 ? parent.start : 1) + (state.options.incrementListMarker === false ? 0 : parent.children.indexOf(node2)) + bullet;
    }
    let size = bullet.length + 1;
    if (listItemIndent === "tab" || listItemIndent === "mixed" && (parent && parent.type === "list" && parent.spread || node2.spread)) {
      size = Math.ceil(size / 4) * 4;
    }
    const tracker = state.createTracker(info);
    tracker.move(bullet + " ".repeat(size - bullet.length));
    tracker.shift(size);
    const exit2 = state.enter("listItem");
    const value = state.indentLines(state.containerFlow(node2, tracker.current()), map4);
    exit2();
    return value;
    function map4(line, index2, blank) {
      if (index2) {
        return (blank ? "" : " ".repeat(size)) + line;
      }
      return (blank ? bullet : bullet + " ".repeat(size - bullet.length)) + line;
    }
  }
  var init_list_item = () => {};

  // node_modules/mdast-util-to-markdown/lib/handle/paragraph.js
  function paragraph(node2, _, state, info) {
    const exit2 = state.enter("paragraph");
    const subexit = state.enter("phrasing");
    const value = state.containerPhrasing(node2, info);
    subexit();
    exit2();
    return value;
  }

  // node_modules/mdast-util-phrasing/lib/index.js
  var phrasing;
  var init_lib6 = __esm(() => {
    init_unist_util_is();
    phrasing = convert([
      "break",
      "delete",
      "emphasis",
      "footnote",
      "footnoteReference",
      "image",
      "imageReference",
      "inlineCode",
      "inlineMath",
      "link",
      "linkReference",
      "mdxJsxTextElement",
      "mdxTextExpression",
      "strong",
      "text",
      "textDirective"
    ]);
  });

  // node_modules/mdast-util-phrasing/index.js
  var init_mdast_util_phrasing = __esm(() => {
    init_lib6();
  });

  // node_modules/mdast-util-to-markdown/lib/handle/root.js
  function root(node2, _, state, info) {
    const hasPhrasing = node2.children.some(function(d) {
      return phrasing(d);
    });
    const container = hasPhrasing ? state.containerPhrasing : state.containerFlow;
    return container.call(state, node2, info);
  }
  var init_root = __esm(() => {
    init_mdast_util_phrasing();
  });

  // node_modules/mdast-util-to-markdown/lib/util/check-strong.js
  function checkStrong(state) {
    const marker = state.options.strong || "*";
    if (marker !== "*" && marker !== "_") {
      throw new Error("Cannot serialize strong with `" + marker + "` for `options.strong`, expected `*`, or `_`");
    }
    return marker;
  }

  // node_modules/mdast-util-to-markdown/lib/handle/strong.js
  function strong(node2, _, state, info) {
    const marker = checkStrong(state);
    const exit2 = state.enter("strong");
    const tracker = state.createTracker(info);
    const before = tracker.move(marker + marker);
    let between = tracker.move(state.containerPhrasing(node2, {
      after: marker,
      before,
      ...tracker.current()
    }));
    const betweenHead = between.charCodeAt(0);
    const open = encodeInfo(info.before.charCodeAt(info.before.length - 1), betweenHead, marker);
    if (open.inside) {
      between = encodeCharacterReference(betweenHead) + between.slice(1);
    }
    const betweenTail = between.charCodeAt(between.length - 1);
    const close = encodeInfo(info.after.charCodeAt(0), betweenTail, marker);
    if (close.inside) {
      between = between.slice(0, -1) + encodeCharacterReference(betweenTail);
    }
    const after = tracker.move(marker + marker);
    exit2();
    state.attentionEncodeSurroundingInfo = {
      after: close.outside,
      before: open.outside
    };
    return before + between + after;
  }
  function strongPeek(_, _1, state) {
    return state.options.strong || "*";
  }
  var init_strong = __esm(() => {
    init_encode_info();
    strong.peek = strongPeek;
  });

  // node_modules/mdast-util-to-markdown/lib/handle/text.js
  function text3(node2, _, state, info) {
    return state.safe(node2.value, info);
  }

  // node_modules/mdast-util-to-markdown/lib/util/check-rule-repetition.js
  function checkRuleRepetition(state) {
    const repetition = state.options.ruleRepetition || 3;
    if (repetition < 3) {
      throw new Error("Cannot serialize rules with repetition `" + repetition + "` for `options.ruleRepetition`, expected `3` or more");
    }
    return repetition;
  }

  // node_modules/mdast-util-to-markdown/lib/handle/thematic-break.js
  function thematicBreak2(_, _1, state) {
    const value = (checkRule(state) + (state.options.ruleSpaces ? " " : "")).repeat(checkRuleRepetition(state));
    return state.options.ruleSpaces ? value.slice(0, -1) : value;
  }
  var init_thematic_break2 = () => {};

  // node_modules/mdast-util-to-markdown/lib/handle/index.js
  var handle;
  var init_handle = __esm(() => {
    init_break();
    init_code();
    init_definition2();
    init_emphasis();
    init_heading();
    init_html();
    init_image();
    init_image_reference();
    init_inline_code();
    init_link();
    init_link_reference();
    init_list2();
    init_list_item();
    init_root();
    init_strong();
    init_thematic_break2();
    handle = {
      blockquote,
      break: hardBreak,
      code,
      definition: definition2,
      emphasis,
      hardBreak,
      heading,
      html,
      image,
      imageReference,
      inlineCode,
      link,
      linkReference,
      list: list3,
      listItem,
      paragraph,
      root,
      strong,
      text: text3,
      thematicBreak: thematicBreak2
    };
  });

  // node_modules/mdast-util-to-markdown/lib/join.js
  function joinDefaults(left, right, parent, state) {
    if (right.type === "code" && formatCodeAsIndented(right, state) && (left.type === "list" || left.type === right.type && formatCodeAsIndented(left, state))) {
      return false;
    }
    if ("spread" in parent && typeof parent.spread === "boolean") {
      if (left.type === "paragraph" && (left.type === right.type || right.type === "definition" || right.type === "heading" && formatHeadingAsSetext(right, state))) {
        return;
      }
      return parent.spread ? 1 : 0;
    }
  }
  var join;
  var init_join = __esm(() => {
    init_format_heading_as_setext();
    join = [joinDefaults];
  });

  // node_modules/mdast-util-to-markdown/lib/unsafe.js
  var fullPhrasingSpans, unsafe;
  var init_unsafe = __esm(() => {
    fullPhrasingSpans = [
      "autolink",
      "destinationLiteral",
      "destinationRaw",
      "reference",
      "titleQuote",
      "titleApostrophe"
    ];
    unsafe = [
      { character: "\t", after: "[\\r\\n]", inConstruct: "phrasing" },
      { character: "\t", before: "[\\r\\n]", inConstruct: "phrasing" },
      {
        character: "\t",
        inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
      },
      {
        character: "\r",
        inConstruct: [
          "codeFencedLangGraveAccent",
          "codeFencedLangTilde",
          "codeFencedMetaGraveAccent",
          "codeFencedMetaTilde",
          "destinationLiteral",
          "headingAtx"
        ]
      },
      {
        character: `
`,
        inConstruct: [
          "codeFencedLangGraveAccent",
          "codeFencedLangTilde",
          "codeFencedMetaGraveAccent",
          "codeFencedMetaTilde",
          "destinationLiteral",
          "headingAtx"
        ]
      },
      { character: " ", after: "[\\r\\n]", inConstruct: "phrasing" },
      { character: " ", before: "[\\r\\n]", inConstruct: "phrasing" },
      {
        character: " ",
        inConstruct: ["codeFencedLangGraveAccent", "codeFencedLangTilde"]
      },
      {
        character: "!",
        after: "\\[",
        inConstruct: "phrasing",
        notInConstruct: fullPhrasingSpans
      },
      { character: '"', inConstruct: "titleQuote" },
      { atBreak: true, character: "#" },
      { character: "#", inConstruct: "headingAtx", after: `(?:[\r
]|$)` },
      { character: "&", after: "[#A-Za-z]", inConstruct: "phrasing" },
      { character: "'", inConstruct: "titleApostrophe" },
      { character: "(", inConstruct: "destinationRaw" },
      {
        before: "\\]",
        character: "(",
        inConstruct: "phrasing",
        notInConstruct: fullPhrasingSpans
      },
      { atBreak: true, before: "\\d+", character: ")" },
      { character: ")", inConstruct: "destinationRaw" },
      { atBreak: true, character: "*", after: `(?:[ 	\r
*])` },
      { character: "*", inConstruct: "phrasing", notInConstruct: fullPhrasingSpans },
      { atBreak: true, character: "+", after: `(?:[ 	\r
])` },
      { atBreak: true, character: "-", after: `(?:[ 	\r
-])` },
      { atBreak: true, before: "\\d+", character: ".", after: `(?:[ 	\r
]|$)` },
      { atBreak: true, character: "<", after: "[!/?A-Za-z]" },
      {
        character: "<",
        after: "[!/?A-Za-z]",
        inConstruct: "phrasing",
        notInConstruct: fullPhrasingSpans
      },
      { character: "<", inConstruct: "destinationLiteral" },
      { atBreak: true, character: "=" },
      { atBreak: true, character: ">" },
      { character: ">", inConstruct: "destinationLiteral" },
      { atBreak: true, character: "[" },
      { character: "[", inConstruct: "phrasing", notInConstruct: fullPhrasingSpans },
      { character: "[", inConstruct: ["label", "reference"] },
      { character: "\\", after: "[\\r\\n]", inConstruct: "phrasing" },
      { character: "]", inConstruct: ["label", "reference"] },
      { atBreak: true, character: "_" },
      { character: "_", inConstruct: "phrasing", notInConstruct: fullPhrasingSpans },
      { atBreak: true, character: "`" },
      {
        character: "`",
        inConstruct: ["codeFencedLangGraveAccent", "codeFencedMetaGraveAccent"]
      },
      { character: "`", inConstruct: "phrasing", notInConstruct: fullPhrasingSpans },
      { atBreak: true, character: "~" }
    ];
  });

  // node_modules/mdast-util-to-markdown/lib/util/association.js
  function association(node2) {
    if (node2.label || !node2.identifier) {
      return node2.label || "";
    }
    return decodeString(node2.identifier);
  }
  var init_association = __esm(() => {
    init_dev14();
  });

  // node_modules/mdast-util-to-markdown/lib/util/compile-pattern.js
  function compilePattern(pattern) {
    if (!pattern._compiled) {
      const before = (pattern.atBreak ? "[\\r\\n][\\t ]*" : "") + (pattern.before ? "(?:" + pattern.before + ")" : "");
      pattern._compiled = new RegExp((before ? "(" + before + ")" : "") + (/[|\\{}()[\]^$+*?.-]/.test(pattern.character) ? "\\" : "") + pattern.character + (pattern.after ? "(?:" + pattern.after + ")" : ""), "g");
    }
    return pattern._compiled;
  }

  // node_modules/mdast-util-to-markdown/lib/util/container-phrasing.js
  function containerPhrasing(parent, state, info) {
    const indexStack = state.indexStack;
    const children = parent.children || [];
    const results = [];
    let index2 = -1;
    let before = info.before;
    let encodeAfter;
    indexStack.push(-1);
    let tracker = state.createTracker(info);
    while (++index2 < children.length) {
      const child = children[index2];
      let after;
      indexStack[indexStack.length - 1] = index2;
      if (index2 + 1 < children.length) {
        let handle2 = state.handle.handlers[children[index2 + 1].type];
        if (handle2 && handle2.peek)
          handle2 = handle2.peek;
        after = handle2 ? handle2(children[index2 + 1], parent, state, {
          before: "",
          after: "",
          ...tracker.current()
        }).charAt(0) : "";
      } else {
        after = info.after;
      }
      if (results.length > 0 && (before === "\r" || before === `
`) && child.type === "html") {
        results[results.length - 1] = results[results.length - 1].replace(/(\r?\n|\r)$/, " ");
        before = " ";
        tracker = state.createTracker(info);
        tracker.move(results.join(""));
      }
      let value = state.handle(child, parent, state, {
        ...tracker.current(),
        after,
        before
      });
      if (encodeAfter && encodeAfter === value.slice(0, 1)) {
        value = encodeCharacterReference(encodeAfter.charCodeAt(0)) + value.slice(1);
      }
      const encodingInfo = state.attentionEncodeSurroundingInfo;
      state.attentionEncodeSurroundingInfo = undefined;
      encodeAfter = undefined;
      if (encodingInfo) {
        if (results.length > 0 && encodingInfo.before && before === results[results.length - 1].slice(-1)) {
          results[results.length - 1] = results[results.length - 1].slice(0, -1) + encodeCharacterReference(before.charCodeAt(0));
        }
        if (encodingInfo.after)
          encodeAfter = after;
      }
      tracker.move(value);
      results.push(value);
      before = value.slice(-1);
    }
    indexStack.pop();
    return results.join("");
  }
  var init_container_phrasing = () => {};

  // node_modules/mdast-util-to-markdown/lib/util/container-flow.js
  function containerFlow(parent, state, info) {
    const indexStack = state.indexStack;
    const children = parent.children || [];
    const tracker = state.createTracker(info);
    const results = [];
    let index2 = -1;
    indexStack.push(-1);
    while (++index2 < children.length) {
      const child = children[index2];
      indexStack[indexStack.length - 1] = index2;
      results.push(tracker.move(state.handle(child, parent, state, {
        before: `
`,
        after: `
`,
        ...tracker.current()
      })));
      if (child.type !== "list") {
        state.bulletLastUsed = undefined;
      }
      if (index2 < children.length - 1) {
        results.push(tracker.move(between(child, children[index2 + 1], parent, state)));
      }
    }
    indexStack.pop();
    return results.join("");
  }
  function between(left, right, parent, state) {
    let index2 = state.join.length;
    while (index2--) {
      const result = state.join[index2](left, right, parent, state);
      if (result === true || result === 1) {
        break;
      }
      if (typeof result === "number") {
        return `
`.repeat(1 + result);
      }
      if (result === false) {
        return `

<!---->

`;
      }
    }
    return `

`;
  }

  // node_modules/mdast-util-to-markdown/lib/util/indent-lines.js
  function indentLines(value, map4) {
    const result = [];
    let start = 0;
    let line = 0;
    let match;
    while (match = eol.exec(value)) {
      one2(value.slice(start, match.index));
      result.push(match[0]);
      start = match.index + match[0].length;
      line++;
    }
    one2(value.slice(start));
    return result.join("");
    function one2(value2) {
      result.push(map4(value2, line, !value2));
    }
  }
  var eol;
  var init_indent_lines = __esm(() => {
    eol = /\r?\n|\r/g;
  });

  // node_modules/mdast-util-to-markdown/lib/util/safe.js
  function safe(state, input, config) {
    const value = (config.before || "") + (input || "") + (config.after || "");
    const positions = [];
    const result = [];
    const infos = {};
    let index2 = -1;
    while (++index2 < state.unsafe.length) {
      const pattern = state.unsafe[index2];
      if (!patternInScope(state.stack, pattern)) {
        continue;
      }
      const expression = state.compilePattern(pattern);
      let match;
      while (match = expression.exec(value)) {
        const before = "before" in pattern || Boolean(pattern.atBreak);
        const after = "after" in pattern;
        const position2 = match.index + (before ? match[1].length : 0);
        if (positions.includes(position2)) {
          if (infos[position2].before && !before) {
            infos[position2].before = false;
          }
          if (infos[position2].after && !after) {
            infos[position2].after = false;
          }
        } else {
          positions.push(position2);
          infos[position2] = { before, after };
        }
      }
    }
    positions.sort(numerical);
    let start = config.before ? config.before.length : 0;
    const end = value.length - (config.after ? config.after.length : 0);
    index2 = -1;
    while (++index2 < positions.length) {
      const position2 = positions[index2];
      if (position2 < start || position2 >= end) {
        continue;
      }
      if (position2 + 1 < end && positions[index2 + 1] === position2 + 1 && infos[position2].after && !infos[position2 + 1].before && !infos[position2 + 1].after || positions[index2 - 1] === position2 - 1 && infos[position2].before && !infos[position2 - 1].before && !infos[position2 - 1].after) {
        continue;
      }
      if (start !== position2) {
        result.push(escapeBackslashes(value.slice(start, position2), "\\"));
      }
      start = position2;
      if (/[!-/:-@[-`{-~]/.test(value.charAt(position2)) && (!config.encode || !config.encode.includes(value.charAt(position2)))) {
        result.push("\\");
      } else {
        result.push(encodeCharacterReference(value.charCodeAt(position2)));
        start++;
      }
    }
    result.push(escapeBackslashes(value.slice(start, end), config.after));
    return result.join("");
  }
  function numerical(a, b) {
    return a - b;
  }
  function escapeBackslashes(value, after) {
    const expression = /\\(?=[!-/:-@[-`{-~])/g;
    const positions = [];
    const results = [];
    const whole = value + after;
    let index2 = -1;
    let start = 0;
    let match;
    while (match = expression.exec(whole)) {
      positions.push(match.index);
    }
    while (++index2 < positions.length) {
      if (start !== positions[index2]) {
        results.push(value.slice(start, positions[index2]));
      }
      results.push("\\");
      start = positions[index2];
    }
    results.push(value.slice(start));
    return results.join("");
  }
  var init_safe = () => {};

  // node_modules/mdast-util-to-markdown/lib/util/track.js
  function track(config) {
    const options = config || {};
    const now = options.now || {};
    let lineShift = options.lineShift || 0;
    let line = now.line || 1;
    let column = now.column || 1;
    return { move, current, shift };
    function current() {
      return { now: { line, column }, lineShift };
    }
    function shift(value) {
      lineShift += value;
    }
    function move(input) {
      const value = input || "";
      const chunks = value.split(/\r?\n|\r/g);
      const tail = chunks[chunks.length - 1];
      line += chunks.length - 1;
      column = chunks.length === 1 ? column + tail.length : 1 + tail.length + lineShift;
      return value;
    }
  }

  // node_modules/mdast-util-to-markdown/lib/index.js
  function toMarkdown(tree, options) {
    const settings = options || {};
    const state = {
      associationId: association,
      containerPhrasing: containerPhrasingBound,
      containerFlow: containerFlowBound,
      createTracker: track,
      compilePattern,
      enter,
      handlers: { ...handle },
      handle: undefined,
      indentLines,
      indexStack: [],
      join: [...join],
      options: {},
      safe: safeBound,
      stack: [],
      unsafe: [...unsafe]
    };
    configure2(state, settings);
    if (state.options.tightDefinitions) {
      state.join.push(joinDefinition);
    }
    state.handle = zwitch("type", {
      invalid,
      unknown,
      handlers: state.handlers
    });
    let result = state.handle(tree, undefined, state, {
      before: `
`,
      after: `
`,
      now: { line: 1, column: 1 },
      lineShift: 0
    });
    if (result && result.charCodeAt(result.length - 1) !== 10 && result.charCodeAt(result.length - 1) !== 13) {
      result += `
`;
    }
    return result;
    function enter(name) {
      state.stack.push(name);
      return exit2;
      function exit2() {
        state.stack.pop();
      }
    }
  }
  function invalid(value) {
    throw new Error("Cannot handle value `" + value + "`, expected node");
  }
  function unknown(value) {
    const node2 = value;
    throw new Error("Cannot handle unknown node `" + node2.type + "`");
  }
  function joinDefinition(left, right) {
    if (left.type === "definition" && left.type === right.type) {
      return 0;
    }
  }
  function containerPhrasingBound(parent, info) {
    return containerPhrasing(parent, this, info);
  }
  function containerFlowBound(parent, info) {
    return containerFlow(parent, this, info);
  }
  function safeBound(value, config) {
    return safe(this, value, config);
  }
  var init_lib7 = __esm(() => {
    init_zwitch();
    init_configure();
    init_handle();
    init_join();
    init_unsafe();
    init_association();
    init_container_phrasing();
    init_indent_lines();
    init_safe();
  });

  // node_modules/mdast-util-to-markdown/index.js
  var exports_mdast_util_to_markdown = {};
  __export(exports_mdast_util_to_markdown, {
    toMarkdown: () => toMarkdown,
    defaultHandlers: () => handle
  });
  var init_mdast_util_to_markdown = __esm(() => {
    init_lib7();
    init_handle();
  });

  // node_modules/remark-stringify/lib/index.js
  function remarkStringify(options) {
    const self = this;
    self.compiler = compiler2;
    function compiler2(tree) {
      return toMarkdown(tree, {
        ...self.data("settings"),
        ...options,
        extensions: self.data("toMarkdownExtensions") || []
      });
    }
  }
  var init_lib8 = __esm(() => {
    init_mdast_util_to_markdown();
  });

  // node_modules/remark-stringify/index.js
  var exports_remark_stringify = {};
  __export(exports_remark_stringify, {
    default: () => remarkStringify
  });
  var init_remark_stringify = __esm(() => {
    init_lib8();
  });

  // node_modules/bail/index.js
  function bail(error) {
    if (error) {
      throw error;
    }
  }

  // node_modules/extend/index.js
  var require_extend = __commonJS((exports, module) => {
    var hasOwn = Object.prototype.hasOwnProperty;
    var toStr = Object.prototype.toString;
    var defineProperty = Object.defineProperty;
    var gOPD = Object.getOwnPropertyDescriptor;
    var isArray = function isArray2(arr) {
      if (typeof Array.isArray === "function") {
        return Array.isArray(arr);
      }
      return toStr.call(arr) === "[object Array]";
    };
    var isPlainObject = function isPlainObject2(obj) {
      if (!obj || toStr.call(obj) !== "[object Object]") {
        return false;
      }
      var hasOwnConstructor = hasOwn.call(obj, "constructor");
      var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
      if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
        return false;
      }
      var key;
      for (key in obj) {}
      return typeof key === "undefined" || hasOwn.call(obj, key);
    };
    var setProperty = function setProperty2(target, options) {
      if (defineProperty && options.name === "__proto__") {
        defineProperty(target, options.name, {
          enumerable: true,
          configurable: true,
          value: options.newValue,
          writable: true
        });
      } else {
        target[options.name] = options.newValue;
      }
    };
    var getProperty = function getProperty2(obj, name) {
      if (name === "__proto__") {
        if (!hasOwn.call(obj, name)) {
          return;
        } else if (gOPD) {
          return gOPD(obj, name).value;
        }
      }
      return obj[name];
    };
    module.exports = function extend() {
      var options, name, src, copy, copyIsArray, clone;
      var target = arguments[0];
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = arguments[1] || {};
        i = 2;
      }
      if (target == null || typeof target !== "object" && typeof target !== "function") {
        target = {};
      }
      for (;i < length; ++i) {
        options = arguments[i];
        if (options != null) {
          for (name in options) {
            src = getProperty(target, name);
            copy = getProperty(options, name);
            if (target !== copy) {
              if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                if (copyIsArray) {
                  copyIsArray = false;
                  clone = src && isArray(src) ? src : [];
                } else {
                  clone = src && isPlainObject(src) ? src : {};
                }
                setProperty(target, { name, newValue: extend(deep, clone, copy) });
              } else if (typeof copy !== "undefined") {
                setProperty(target, { name, newValue: copy });
              }
            }
          }
        }
      }
      return target;
    };
  });

  // node_modules/is-plain-obj/index.js
  function isPlainObject(value) {
    if (typeof value !== "object" || value === null) {
      return false;
    }
    const prototype = Object.getPrototypeOf(value);
    return (prototype === null || prototype === Object.prototype || Object.getPrototypeOf(prototype) === null) && !(Symbol.toStringTag in value) && !(Symbol.iterator in value);
  }

  // node_modules/trough/lib/index.js
  function trough() {
    const fns = [];
    const pipeline = { run, use };
    return pipeline;
    function run(...values2) {
      let middlewareIndex = -1;
      const callback = values2.pop();
      if (typeof callback !== "function") {
        throw new TypeError("Expected function as last argument, not " + callback);
      }
      next(null, ...values2);
      function next(error, ...output) {
        const fn = fns[++middlewareIndex];
        let index2 = -1;
        if (error) {
          callback(error);
          return;
        }
        while (++index2 < values2.length) {
          if (output[index2] === null || output[index2] === undefined) {
            output[index2] = values2[index2];
          }
        }
        values2 = output;
        if (fn) {
          wrap(fn, next)(...output);
        } else {
          callback(null, ...output);
        }
      }
    }
    function use(middelware) {
      if (typeof middelware !== "function") {
        throw new TypeError("Expected `middelware` to be a function, not " + middelware);
      }
      fns.push(middelware);
      return pipeline;
    }
  }
  function wrap(middleware, callback) {
    let called;
    return wrapped;
    function wrapped(...parameters) {
      const fnExpectsCallback = middleware.length > parameters.length;
      let result;
      if (fnExpectsCallback) {
        parameters.push(done);
      }
      try {
        result = middleware.apply(this, parameters);
      } catch (error) {
        const exception = error;
        if (fnExpectsCallback && called) {
          throw exception;
        }
        return done(exception);
      }
      if (!fnExpectsCallback) {
        if (result && result.then && typeof result.then === "function") {
          result.then(then, done);
        } else if (result instanceof Error) {
          done(result);
        } else {
          then(result);
        }
      }
    }
    function done(error, ...output) {
      if (!called) {
        called = true;
        callback(error, ...output);
      }
    }
    function then(value) {
      done(null, value);
    }
  }

  // node_modules/trough/index.js
  var init_trough = () => {};

  // node_modules/vfile-message/lib/index.js
  var VFileMessage;
  var init_lib9 = __esm(() => {
    init_unist_util_stringify_position();
    VFileMessage = class VFileMessage extends Error {
      constructor(causeOrReason, optionsOrParentOrPlace, origin) {
        super();
        if (typeof optionsOrParentOrPlace === "string") {
          origin = optionsOrParentOrPlace;
          optionsOrParentOrPlace = undefined;
        }
        let reason = "";
        let options = {};
        let legacyCause = false;
        if (optionsOrParentOrPlace) {
          if ("line" in optionsOrParentOrPlace && "column" in optionsOrParentOrPlace) {
            options = { place: optionsOrParentOrPlace };
          } else if ("start" in optionsOrParentOrPlace && "end" in optionsOrParentOrPlace) {
            options = { place: optionsOrParentOrPlace };
          } else if ("type" in optionsOrParentOrPlace) {
            options = {
              ancestors: [optionsOrParentOrPlace],
              place: optionsOrParentOrPlace.position
            };
          } else {
            options = { ...optionsOrParentOrPlace };
          }
        }
        if (typeof causeOrReason === "string") {
          reason = causeOrReason;
        } else if (!options.cause && causeOrReason) {
          legacyCause = true;
          reason = causeOrReason.message;
          options.cause = causeOrReason;
        }
        if (!options.ruleId && !options.source && typeof origin === "string") {
          const index2 = origin.indexOf(":");
          if (index2 === -1) {
            options.ruleId = origin;
          } else {
            options.source = origin.slice(0, index2);
            options.ruleId = origin.slice(index2 + 1);
          }
        }
        if (!options.place && options.ancestors && options.ancestors) {
          const parent = options.ancestors[options.ancestors.length - 1];
          if (parent) {
            options.place = parent.position;
          }
        }
        const start = options.place && "start" in options.place ? options.place.start : options.place;
        this.ancestors = options.ancestors || undefined;
        this.cause = options.cause || undefined;
        this.column = start ? start.column : undefined;
        this.fatal = undefined;
        this.file = "";
        this.message = reason;
        this.line = start ? start.line : undefined;
        this.name = stringifyPosition(options.place) || "1:1";
        this.place = options.place || undefined;
        this.reason = this.message;
        this.ruleId = options.ruleId || undefined;
        this.source = options.source || undefined;
        this.stack = legacyCause && options.cause && typeof options.cause.stack === "string" ? options.cause.stack : "";
        this.actual = undefined;
        this.expected = undefined;
        this.note = undefined;
        this.url = undefined;
      }
    };
    VFileMessage.prototype.file = "";
    VFileMessage.prototype.name = "";
    VFileMessage.prototype.reason = "";
    VFileMessage.prototype.message = "";
    VFileMessage.prototype.stack = "";
    VFileMessage.prototype.column = undefined;
    VFileMessage.prototype.line = undefined;
    VFileMessage.prototype.ancestors = undefined;
    VFileMessage.prototype.cause = undefined;
    VFileMessage.prototype.fatal = undefined;
    VFileMessage.prototype.place = undefined;
    VFileMessage.prototype.ruleId = undefined;
    VFileMessage.prototype.source = undefined;
  });

  // node_modules/vfile-message/index.js
  var init_vfile_message = __esm(() => {
    init_lib9();
  });

  // node_modules/vfile/lib/minpath.browser.js
  function basename(path, extname) {
    if (extname !== undefined && typeof extname !== "string") {
      throw new TypeError('"ext" argument must be a string');
    }
    assertPath(path);
    let start = 0;
    let end = -1;
    let index2 = path.length;
    let seenNonSlash;
    if (extname === undefined || extname.length === 0 || extname.length > path.length) {
      while (index2--) {
        if (path.codePointAt(index2) === 47) {
          if (seenNonSlash) {
            start = index2 + 1;
            break;
          }
        } else if (end < 0) {
          seenNonSlash = true;
          end = index2 + 1;
        }
      }
      return end < 0 ? "" : path.slice(start, end);
    }
    if (extname === path) {
      return "";
    }
    let firstNonSlashEnd = -1;
    let extnameIndex = extname.length - 1;
    while (index2--) {
      if (path.codePointAt(index2) === 47) {
        if (seenNonSlash) {
          start = index2 + 1;
          break;
        }
      } else {
        if (firstNonSlashEnd < 0) {
          seenNonSlash = true;
          firstNonSlashEnd = index2 + 1;
        }
        if (extnameIndex > -1) {
          if (path.codePointAt(index2) === extname.codePointAt(extnameIndex--)) {
            if (extnameIndex < 0) {
              end = index2;
            }
          } else {
            extnameIndex = -1;
            end = firstNonSlashEnd;
          }
        }
      }
    }
    if (start === end) {
      end = firstNonSlashEnd;
    } else if (end < 0) {
      end = path.length;
    }
    return path.slice(start, end);
  }
  function dirname(path) {
    assertPath(path);
    if (path.length === 0) {
      return ".";
    }
    let end = -1;
    let index2 = path.length;
    let unmatchedSlash;
    while (--index2) {
      if (path.codePointAt(index2) === 47) {
        if (unmatchedSlash) {
          end = index2;
          break;
        }
      } else if (!unmatchedSlash) {
        unmatchedSlash = true;
      }
    }
    return end < 0 ? path.codePointAt(0) === 47 ? "/" : "." : end === 1 && path.codePointAt(0) === 47 ? "//" : path.slice(0, end);
  }
  function extname(path) {
    assertPath(path);
    let index2 = path.length;
    let end = -1;
    let startPart = 0;
    let startDot = -1;
    let preDotState = 0;
    let unmatchedSlash;
    while (index2--) {
      const code2 = path.codePointAt(index2);
      if (code2 === 47) {
        if (unmatchedSlash) {
          startPart = index2 + 1;
          break;
        }
        continue;
      }
      if (end < 0) {
        unmatchedSlash = true;
        end = index2 + 1;
      }
      if (code2 === 46) {
        if (startDot < 0) {
          startDot = index2;
        } else if (preDotState !== 1) {
          preDotState = 1;
        }
      } else if (startDot > -1) {
        preDotState = -1;
      }
    }
    if (startDot < 0 || end < 0 || preDotState === 0 || preDotState === 1 && startDot === end - 1 && startDot === startPart + 1) {
      return "";
    }
    return path.slice(startDot, end);
  }
  function join2(...segments) {
    let index2 = -1;
    let joined;
    while (++index2 < segments.length) {
      assertPath(segments[index2]);
      if (segments[index2]) {
        joined = joined === undefined ? segments[index2] : joined + "/" + segments[index2];
      }
    }
    return joined === undefined ? "." : normalize(joined);
  }
  function normalize(path) {
    assertPath(path);
    const absolute = path.codePointAt(0) === 47;
    let value = normalizeString(path, !absolute);
    if (value.length === 0 && !absolute) {
      value = ".";
    }
    if (value.length > 0 && path.codePointAt(path.length - 1) === 47) {
      value += "/";
    }
    return absolute ? "/" + value : value;
  }
  function normalizeString(path, allowAboveRoot) {
    let result = "";
    let lastSegmentLength = 0;
    let lastSlash = -1;
    let dots = 0;
    let index2 = -1;
    let code2;
    let lastSlashIndex;
    while (++index2 <= path.length) {
      if (index2 < path.length) {
        code2 = path.codePointAt(index2);
      } else if (code2 === 47) {
        break;
      } else {
        code2 = 47;
      }
      if (code2 === 47) {
        if (lastSlash === index2 - 1 || dots === 1) {} else if (lastSlash !== index2 - 1 && dots === 2) {
          if (result.length < 2 || lastSegmentLength !== 2 || result.codePointAt(result.length - 1) !== 46 || result.codePointAt(result.length - 2) !== 46) {
            if (result.length > 2) {
              lastSlashIndex = result.lastIndexOf("/");
              if (lastSlashIndex !== result.length - 1) {
                if (lastSlashIndex < 0) {
                  result = "";
                  lastSegmentLength = 0;
                } else {
                  result = result.slice(0, lastSlashIndex);
                  lastSegmentLength = result.length - 1 - result.lastIndexOf("/");
                }
                lastSlash = index2;
                dots = 0;
                continue;
              }
            } else if (result.length > 0) {
              result = "";
              lastSegmentLength = 0;
              lastSlash = index2;
              dots = 0;
              continue;
            }
          }
          if (allowAboveRoot) {
            result = result.length > 0 ? result + "/.." : "..";
            lastSegmentLength = 2;
          }
        } else {
          if (result.length > 0) {
            result += "/" + path.slice(lastSlash + 1, index2);
          } else {
            result = path.slice(lastSlash + 1, index2);
          }
          lastSegmentLength = index2 - lastSlash - 1;
        }
        lastSlash = index2;
        dots = 0;
      } else if (code2 === 46 && dots > -1) {
        dots++;
      } else {
        dots = -1;
      }
    }
    return result;
  }
  function assertPath(path) {
    if (typeof path !== "string") {
      throw new TypeError("Path must be a string. Received " + JSON.stringify(path));
    }
  }
  var minpath;
  var init_minpath_browser = __esm(() => {
    minpath = { basename, dirname, extname, join: join2, sep: "/" };
  });

  // node_modules/vfile/lib/minproc.browser.js
  function cwd() {
    return "/";
  }
  var minproc;
  var init_minproc_browser = __esm(() => {
    minproc = { cwd };
  });

  // node_modules/vfile/lib/minurl.shared.js
  function isUrl(fileUrlOrPath) {
    return Boolean(fileUrlOrPath !== null && typeof fileUrlOrPath === "object" && "href" in fileUrlOrPath && fileUrlOrPath.href && "protocol" in fileUrlOrPath && fileUrlOrPath.protocol && fileUrlOrPath.auth === undefined);
  }

  // node_modules/vfile/lib/minurl.browser.js
  function urlToPath(path) {
    if (typeof path === "string") {
      path = new URL(path);
    } else if (!isUrl(path)) {
      const error = new TypeError('The "path" argument must be of type string or an instance of URL. Received `' + path + "`");
      error.code = "ERR_INVALID_ARG_TYPE";
      throw error;
    }
    if (path.protocol !== "file:") {
      const error = new TypeError("The URL must be of scheme file");
      error.code = "ERR_INVALID_URL_SCHEME";
      throw error;
    }
    return getPathFromURLPosix(path);
  }
  function getPathFromURLPosix(url) {
    if (url.hostname !== "") {
      const error = new TypeError('File URL host must be "localhost" or empty on darwin');
      error.code = "ERR_INVALID_FILE_URL_HOST";
      throw error;
    }
    const pathname = url.pathname;
    let index2 = -1;
    while (++index2 < pathname.length) {
      if (pathname.codePointAt(index2) === 37 && pathname.codePointAt(index2 + 1) === 50) {
        const third = pathname.codePointAt(index2 + 2);
        if (third === 70 || third === 102) {
          const error = new TypeError("File URL path must not include encoded / characters");
          error.code = "ERR_INVALID_FILE_URL_PATH";
          throw error;
        }
      }
    }
    return decodeURIComponent(pathname);
  }
  var init_minurl_browser = () => {};

  // node_modules/vfile/lib/index.js
  class VFile {
    constructor(value) {
      let options;
      if (!value) {
        options = {};
      } else if (isUrl(value)) {
        options = { path: value };
      } else if (typeof value === "string" || isUint8Array(value)) {
        options = { value };
      } else {
        options = value;
      }
      this.cwd = "cwd" in options ? "" : minproc.cwd();
      this.data = {};
      this.history = [];
      this.messages = [];
      this.value;
      this.map;
      this.result;
      this.stored;
      let index2 = -1;
      while (++index2 < order.length) {
        const field2 = order[index2];
        if (field2 in options && options[field2] !== undefined && options[field2] !== null) {
          this[field2] = field2 === "history" ? [...options[field2]] : options[field2];
        }
      }
      let field;
      for (field in options) {
        if (!order.includes(field)) {
          this[field] = options[field];
        }
      }
    }
    get basename() {
      return typeof this.path === "string" ? minpath.basename(this.path) : undefined;
    }
    set basename(basename2) {
      assertNonEmpty(basename2, "basename");
      assertPart(basename2, "basename");
      this.path = minpath.join(this.dirname || "", basename2);
    }
    get dirname() {
      return typeof this.path === "string" ? minpath.dirname(this.path) : undefined;
    }
    set dirname(dirname2) {
      assertPath2(this.basename, "dirname");
      this.path = minpath.join(dirname2 || "", this.basename);
    }
    get extname() {
      return typeof this.path === "string" ? minpath.extname(this.path) : undefined;
    }
    set extname(extname2) {
      assertPart(extname2, "extname");
      assertPath2(this.dirname, "extname");
      if (extname2) {
        if (extname2.codePointAt(0) !== 46) {
          throw new Error("`extname` must start with `.`");
        }
        if (extname2.includes(".", 1)) {
          throw new Error("`extname` cannot contain multiple dots");
        }
      }
      this.path = minpath.join(this.dirname, this.stem + (extname2 || ""));
    }
    get path() {
      return this.history[this.history.length - 1];
    }
    set path(path) {
      if (isUrl(path)) {
        path = urlToPath(path);
      }
      assertNonEmpty(path, "path");
      if (this.path !== path) {
        this.history.push(path);
      }
    }
    get stem() {
      return typeof this.path === "string" ? minpath.basename(this.path, this.extname) : undefined;
    }
    set stem(stem) {
      assertNonEmpty(stem, "stem");
      assertPart(stem, "stem");
      this.path = minpath.join(this.dirname || "", stem + (this.extname || ""));
    }
    fail(causeOrReason, optionsOrParentOrPlace, origin) {
      const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
      message.fatal = true;
      throw message;
    }
    info(causeOrReason, optionsOrParentOrPlace, origin) {
      const message = this.message(causeOrReason, optionsOrParentOrPlace, origin);
      message.fatal = undefined;
      return message;
    }
    message(causeOrReason, optionsOrParentOrPlace, origin) {
      const message = new VFileMessage(causeOrReason, optionsOrParentOrPlace, origin);
      if (this.path) {
        message.name = this.path + ":" + message.name;
        message.file = this.path;
      }
      message.fatal = false;
      this.messages.push(message);
      return message;
    }
    toString(encoding) {
      if (this.value === undefined) {
        return "";
      }
      if (typeof this.value === "string") {
        return this.value;
      }
      const decoder = new TextDecoder(encoding || undefined);
      return decoder.decode(this.value);
    }
  }
  function assertPart(part, name) {
    if (part && part.includes(minpath.sep)) {
      throw new Error("`" + name + "` cannot be a path: did not expect `" + minpath.sep + "`");
    }
  }
  function assertNonEmpty(part, name) {
    if (!part) {
      throw new Error("`" + name + "` cannot be empty");
    }
  }
  function assertPath2(path, name) {
    if (!path) {
      throw new Error("Setting `" + name + "` requires `path` to be set too");
    }
  }
  function isUint8Array(value) {
    return Boolean(value && typeof value === "object" && "byteLength" in value && "byteOffset" in value);
  }
  var order;
  var init_lib10 = __esm(() => {
    init_vfile_message();
    init_minpath_browser();
    init_minproc_browser();
    init_minurl_browser();
    order = [
      "history",
      "path",
      "basename",
      "stem",
      "extname",
      "dirname"
    ];
  });

  // node_modules/vfile/index.js
  var init_vfile = __esm(() => {
    init_lib10();
  });

  // node_modules/unified/lib/callable-instance.js
  var CallableInstance = function(property) {
    const self = this;
    const constr = self.constructor;
    const proto = constr.prototype;
    const value = proto[property];
    const apply = function() {
      return value.apply(apply, arguments);
    };
    Object.setPrototypeOf(apply, proto);
    return apply;
  };

  // node_modules/unified/lib/index.js
  function assertParser(name, value) {
    if (typeof value !== "function") {
      throw new TypeError("Cannot `" + name + "` without `parser`");
    }
  }
  function assertCompiler(name, value) {
    if (typeof value !== "function") {
      throw new TypeError("Cannot `" + name + "` without `compiler`");
    }
  }
  function assertUnfrozen(name, frozen) {
    if (frozen) {
      throw new Error("Cannot call `" + name + "` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.");
    }
  }
  function assertNode(node2) {
    if (!isPlainObject(node2) || typeof node2.type !== "string") {
      throw new TypeError("Expected node, got `" + node2 + "`");
    }
  }
  function assertDone(name, asyncName, complete) {
    if (!complete) {
      throw new Error("`" + name + "` finished async. Use `" + asyncName + "` instead");
    }
  }
  function vfile(value) {
    return looksLikeAVFile(value) ? value : new VFile(value);
  }
  function looksLikeAVFile(value) {
    return Boolean(value && typeof value === "object" && "message" in value && "messages" in value);
  }
  function looksLikeAValue(value) {
    return typeof value === "string" || isUint8Array2(value);
  }
  function isUint8Array2(value) {
    return Boolean(value && typeof value === "object" && "byteLength" in value && "byteOffset" in value);
  }
  var import_extend, own4, Processor, unified;
  var init_lib11 = __esm(() => {
    init_development();
    init_trough();
    init_vfile();
    import_extend = __toESM(require_extend(), 1);
    own4 = {}.hasOwnProperty;
    Processor = class Processor extends CallableInstance {
      constructor() {
        super("copy");
        this.Compiler = undefined;
        this.Parser = undefined;
        this.attachers = [];
        this.compiler = undefined;
        this.freezeIndex = -1;
        this.frozen = undefined;
        this.namespace = {};
        this.parser = undefined;
        this.transformers = trough();
      }
      copy() {
        const destination = new Processor;
        let index2 = -1;
        while (++index2 < this.attachers.length) {
          const attacher = this.attachers[index2];
          destination.use(...attacher);
        }
        destination.data(import_extend.default(true, {}, this.namespace));
        return destination;
      }
      data(key, value) {
        if (typeof key === "string") {
          if (arguments.length === 2) {
            assertUnfrozen("data", this.frozen);
            this.namespace[key] = value;
            return this;
          }
          return own4.call(this.namespace, key) && this.namespace[key] || undefined;
        }
        if (key) {
          assertUnfrozen("data", this.frozen);
          this.namespace = key;
          return this;
        }
        return this.namespace;
      }
      freeze() {
        if (this.frozen) {
          return this;
        }
        const self = this;
        while (++this.freezeIndex < this.attachers.length) {
          const [attacher, ...options] = this.attachers[this.freezeIndex];
          if (options[0] === false) {
            continue;
          }
          if (options[0] === true) {
            options[0] = undefined;
          }
          const transformer = attacher.call(self, ...options);
          if (typeof transformer === "function") {
            this.transformers.use(transformer);
          }
        }
        this.frozen = true;
        this.freezeIndex = Number.POSITIVE_INFINITY;
        return this;
      }
      parse(file) {
        this.freeze();
        const realFile = vfile(file);
        const parser = this.parser || this.Parser;
        assertParser("parse", parser);
        return parser(String(realFile), realFile);
      }
      process(file, done) {
        const self = this;
        this.freeze();
        assertParser("process", this.parser || this.Parser);
        assertCompiler("process", this.compiler || this.Compiler);
        return done ? executor(undefined, done) : new Promise(executor);
        function executor(resolve, reject) {
          const realFile = vfile(file);
          const parseTree = self.parse(realFile);
          self.run(parseTree, realFile, function(error, tree, file2) {
            if (error || !tree || !file2) {
              return realDone(error);
            }
            const compileTree = tree;
            const compileResult = self.stringify(compileTree, file2);
            if (looksLikeAValue(compileResult)) {
              file2.value = compileResult;
            } else {
              file2.result = compileResult;
            }
            realDone(error, file2);
          });
          function realDone(error, file2) {
            if (error || !file2) {
              reject(error);
            } else if (resolve) {
              resolve(file2);
            } else {
              ok(done, "`done` is defined if `resolve` is not");
              done(undefined, file2);
            }
          }
        }
      }
      processSync(file) {
        let complete = false;
        let result;
        this.freeze();
        assertParser("processSync", this.parser || this.Parser);
        assertCompiler("processSync", this.compiler || this.Compiler);
        this.process(file, realDone);
        assertDone("processSync", "process", complete);
        ok(result, "we either bailed on an error or have a tree");
        return result;
        function realDone(error, file2) {
          complete = true;
          bail(error);
          result = file2;
        }
      }
      run(tree, file, done) {
        assertNode(tree);
        this.freeze();
        const transformers = this.transformers;
        if (!done && typeof file === "function") {
          done = file;
          file = undefined;
        }
        return done ? executor(undefined, done) : new Promise(executor);
        function executor(resolve, reject) {
          ok(typeof file !== "function", "`file` can’t be a `done` anymore, we checked");
          const realFile = vfile(file);
          transformers.run(tree, realFile, realDone);
          function realDone(error, outputTree, file2) {
            const resultingTree = outputTree || tree;
            if (error) {
              reject(error);
            } else if (resolve) {
              resolve(resultingTree);
            } else {
              ok(done, "`done` is defined if `resolve` is not");
              done(undefined, resultingTree, file2);
            }
          }
        }
      }
      runSync(tree, file) {
        let complete = false;
        let result;
        this.run(tree, file, realDone);
        assertDone("runSync", "run", complete);
        ok(result, "we either bailed on an error or have a tree");
        return result;
        function realDone(error, tree2) {
          bail(error);
          result = tree2;
          complete = true;
        }
      }
      stringify(tree, file) {
        this.freeze();
        const realFile = vfile(file);
        const compiler2 = this.compiler || this.Compiler;
        assertCompiler("stringify", compiler2);
        assertNode(tree);
        return compiler2(tree, realFile);
      }
      use(value, ...parameters) {
        const attachers = this.attachers;
        const namespace = this.namespace;
        assertUnfrozen("use", this.frozen);
        if (value === null || value === undefined) {} else if (typeof value === "function") {
          addPlugin(value, parameters);
        } else if (typeof value === "object") {
          if (Array.isArray(value)) {
            addList(value);
          } else {
            addPreset(value);
          }
        } else {
          throw new TypeError("Expected usable value, not `" + value + "`");
        }
        return this;
        function add(value2) {
          if (typeof value2 === "function") {
            addPlugin(value2, []);
          } else if (typeof value2 === "object") {
            if (Array.isArray(value2)) {
              const [plugin, ...parameters2] = value2;
              addPlugin(plugin, parameters2);
            } else {
              addPreset(value2);
            }
          } else {
            throw new TypeError("Expected usable value, not `" + value2 + "`");
          }
        }
        function addPreset(result) {
          if (!("plugins" in result) && !("settings" in result)) {
            throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");
          }
          addList(result.plugins);
          if (result.settings) {
            namespace.settings = import_extend.default(true, namespace.settings, result.settings);
          }
        }
        function addList(plugins) {
          let index2 = -1;
          if (plugins === null || plugins === undefined) {} else if (Array.isArray(plugins)) {
            while (++index2 < plugins.length) {
              const thing = plugins[index2];
              add(thing);
            }
          } else {
            throw new TypeError("Expected a list of plugins, not `" + plugins + "`");
          }
        }
        function addPlugin(plugin, parameters2) {
          let index2 = -1;
          let entryIndex = -1;
          while (++index2 < attachers.length) {
            if (attachers[index2][0] === plugin) {
              entryIndex = index2;
              break;
            }
          }
          if (entryIndex === -1) {
            attachers.push([plugin, ...parameters2]);
          } else if (parameters2.length > 0) {
            let [primary, ...rest] = parameters2;
            const currentPrimary = attachers[entryIndex][1];
            if (isPlainObject(currentPrimary) && isPlainObject(primary)) {
              primary = import_extend.default(true, currentPrimary, primary);
            }
            attachers[entryIndex] = [plugin, primary, ...rest];
          }
        }
      }
    };
    unified = new Processor().freeze();
  });

  // node_modules/unified/index.js
  var init_unified = __esm(() => {
    init_lib11();
  });

  // node_modules/remark/index.js
  var exports_remark = {};
  __export(exports_remark, {
    remark: () => remark
  });
  var remark;
  var init_remark = __esm(() => {
    init_remark_parse();
    init_remark_stringify();
    init_unified();
    remark = unified().use(remarkParse).use(remarkStringify).freeze();
  });

  // node_modules/ccount/index.js
  function ccount(value, character) {
    const source = String(value);
    if (typeof character !== "string") {
      throw new TypeError("Expected character");
    }
    let count = 0;
    let index2 = source.indexOf(character);
    while (index2 !== -1) {
      count++;
      index2 = source.indexOf(character, index2 + character.length);
    }
    return count;
  }

  // node_modules/escape-string-regexp/index.js
  function escapeStringRegexp(string3) {
    if (typeof string3 !== "string") {
      throw new TypeError("Expected a string");
    }
    return string3.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
  }

  // node_modules/mdast-util-find-and-replace/lib/index.js
  function findAndReplace(tree, list4, options) {
    const settings = options || {};
    const ignored = convert(settings.ignore || []);
    const pairs = toPairs(list4);
    let pairIndex = -1;
    while (++pairIndex < pairs.length) {
      visitParents(tree, "text", visitor);
    }
    function visitor(node2, parents) {
      let index2 = -1;
      let grandparent;
      while (++index2 < parents.length) {
        const parent = parents[index2];
        const siblings = grandparent ? grandparent.children : undefined;
        if (ignored(parent, siblings ? siblings.indexOf(parent) : undefined, grandparent)) {
          return;
        }
        grandparent = parent;
      }
      if (grandparent) {
        return handler(node2, parents);
      }
    }
    function handler(node2, parents) {
      const parent = parents[parents.length - 1];
      const find = pairs[pairIndex][0];
      const replace = pairs[pairIndex][1];
      let start = 0;
      const siblings = parent.children;
      const index2 = siblings.indexOf(node2);
      let change = false;
      let nodes = [];
      find.lastIndex = 0;
      let match = find.exec(node2.value);
      while (match) {
        const position2 = match.index;
        const matchObject = {
          index: match.index,
          input: match.input,
          stack: [...parents, node2]
        };
        let value = replace(...match, matchObject);
        if (typeof value === "string") {
          value = value.length > 0 ? { type: "text", value } : undefined;
        }
        if (value === false) {
          find.lastIndex = position2 + 1;
        } else {
          if (start !== position2) {
            nodes.push({
              type: "text",
              value: node2.value.slice(start, position2)
            });
          }
          if (Array.isArray(value)) {
            nodes.push(...value);
          } else if (value) {
            nodes.push(value);
          }
          start = position2 + match[0].length;
          change = true;
        }
        if (!find.global) {
          break;
        }
        match = find.exec(node2.value);
      }
      if (change) {
        if (start < node2.value.length) {
          nodes.push({ type: "text", value: node2.value.slice(start) });
        }
        parent.children.splice(index2, 1, ...nodes);
      } else {
        nodes = [node2];
      }
      return index2 + nodes.length;
    }
  }
  function toPairs(tupleOrList) {
    const result = [];
    if (!Array.isArray(tupleOrList)) {
      throw new TypeError("Expected find and replace tuple or list of tuples");
    }
    const list4 = !tupleOrList[0] || Array.isArray(tupleOrList[0]) ? tupleOrList : [tupleOrList];
    let index2 = -1;
    while (++index2 < list4.length) {
      const tuple = list4[index2];
      result.push([toExpression(tuple[0]), toFunction(tuple[1])]);
    }
    return result;
  }
  function toExpression(find) {
    return typeof find === "string" ? new RegExp(escapeStringRegexp(find), "g") : find;
  }
  function toFunction(replace) {
    return typeof replace === "function" ? replace : function() {
      return replace;
    };
  }
  var init_lib12 = __esm(() => {
    init_unist_util_visit_parents();
    init_unist_util_is();
  });

  // node_modules/mdast-util-find-and-replace/index.js
  var init_mdast_util_find_and_replace = __esm(() => {
    init_lib12();
  });

  // node_modules/mdast-util-gfm-autolink-literal/lib/index.js
  function gfmAutolinkLiteralFromMarkdown() {
    return {
      transforms: [transformGfmAutolinkLiterals],
      enter: {
        literalAutolink: enterLiteralAutolink,
        literalAutolinkEmail: enterLiteralAutolinkValue,
        literalAutolinkHttp: enterLiteralAutolinkValue,
        literalAutolinkWww: enterLiteralAutolinkValue
      },
      exit: {
        literalAutolink: exitLiteralAutolink,
        literalAutolinkEmail: exitLiteralAutolinkEmail,
        literalAutolinkHttp: exitLiteralAutolinkHttp,
        literalAutolinkWww: exitLiteralAutolinkWww
      }
    };
  }
  function gfmAutolinkLiteralToMarkdown() {
    return {
      unsafe: [
        {
          character: "@",
          before: "[+\\-.\\w]",
          after: "[\\-.\\w]",
          inConstruct,
          notInConstruct
        },
        {
          character: ".",
          before: "[Ww]",
          after: "[\\-.\\w]",
          inConstruct,
          notInConstruct
        },
        {
          character: ":",
          before: "[ps]",
          after: "\\/",
          inConstruct,
          notInConstruct
        }
      ]
    };
  }
  function enterLiteralAutolink(token) {
    this.enter({ type: "link", title: null, url: "", children: [] }, token);
  }
  function enterLiteralAutolinkValue(token) {
    this.config.enter.autolinkProtocol.call(this, token);
  }
  function exitLiteralAutolinkHttp(token) {
    this.config.exit.autolinkProtocol.call(this, token);
  }
  function exitLiteralAutolinkWww(token) {
    this.config.exit.data.call(this, token);
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "link");
    node2.url = "http://" + this.sliceSerialize(token);
  }
  function exitLiteralAutolinkEmail(token) {
    this.config.exit.autolinkEmail.call(this, token);
  }
  function exitLiteralAutolink(token) {
    this.exit(token);
  }
  function transformGfmAutolinkLiterals(tree) {
    findAndReplace(tree, [
      [/(https?:\/\/|www(?=\.))([-.\w]+)([^ \t\r\n]*)/gi, findUrl],
      [/(?<=^|\s|\p{P}|\p{S})([-.\w+]+)@([-\w]+(?:\.[-\w]+)+)/gu, findEmail]
    ], { ignore: ["link", "linkReference"] });
  }
  function findUrl(_, protocol, domain, path, match) {
    let prefix = "";
    if (!previous2(match)) {
      return false;
    }
    if (/^w/i.test(protocol)) {
      domain = protocol + domain;
      protocol = "";
      prefix = "http://";
    }
    if (!isCorrectDomain(domain)) {
      return false;
    }
    const parts = splitUrl(domain + path);
    if (!parts[0])
      return false;
    const result = {
      type: "link",
      title: null,
      url: prefix + protocol + parts[0],
      children: [{ type: "text", value: protocol + parts[0] }]
    };
    if (parts[1]) {
      return [result, { type: "text", value: parts[1] }];
    }
    return result;
  }
  function findEmail(_, atext, label, match) {
    if (!previous2(match, true) || /[-\d_]$/.test(label)) {
      return false;
    }
    return {
      type: "link",
      title: null,
      url: "mailto:" + atext + "@" + label,
      children: [{ type: "text", value: atext + "@" + label }]
    };
  }
  function isCorrectDomain(domain) {
    const parts = domain.split(".");
    if (parts.length < 2 || parts[parts.length - 1] && (/_/.test(parts[parts.length - 1]) || !/[a-zA-Z\d]/.test(parts[parts.length - 1])) || parts[parts.length - 2] && (/_/.test(parts[parts.length - 2]) || !/[a-zA-Z\d]/.test(parts[parts.length - 2]))) {
      return false;
    }
    return true;
  }
  function splitUrl(url) {
    const trailExec = /[!"&'),.:;<>?\]}]+$/.exec(url);
    if (!trailExec) {
      return [url, undefined];
    }
    url = url.slice(0, trailExec.index);
    let trail = trailExec[0];
    let closingParenIndex = trail.indexOf(")");
    const openingParens = ccount(url, "(");
    let closingParens = ccount(url, ")");
    while (closingParenIndex !== -1 && openingParens > closingParens) {
      url += trail.slice(0, closingParenIndex + 1);
      trail = trail.slice(closingParenIndex + 1);
      closingParenIndex = trail.indexOf(")");
      closingParens++;
    }
    return [url, trail];
  }
  function previous2(match, email) {
    const code2 = match.input.charCodeAt(match.index - 1);
    return (match.index === 0 || unicodeWhitespace(code2) || unicodePunctuation(code2)) && (!email || code2 !== 47);
  }
  var inConstruct = "phrasing", notInConstruct;
  var init_lib13 = __esm(() => {
    init_development();
    init_dev4();
    init_mdast_util_find_and_replace();
    notInConstruct = ["autolink", "link", "image", "label"];
  });

  // node_modules/mdast-util-gfm-autolink-literal/index.js
  var init_mdast_util_gfm_autolink_literal = __esm(() => {
    init_lib13();
  });

  // node_modules/mdast-util-gfm-footnote/lib/index.js
  function enterFootnoteCallString() {
    this.buffer();
  }
  function enterFootnoteCall(token) {
    this.enter({ type: "footnoteReference", identifier: "", label: "" }, token);
  }
  function enterFootnoteDefinitionLabelString() {
    this.buffer();
  }
  function enterFootnoteDefinition(token) {
    this.enter({ type: "footnoteDefinition", identifier: "", label: "", children: [] }, token);
  }
  function exitFootnoteCallString(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "footnoteReference");
    node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    node2.label = label;
  }
  function exitFootnoteCall(token) {
    this.exit(token);
  }
  function exitFootnoteDefinitionLabelString(token) {
    const label = this.resume();
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "footnoteDefinition");
    node2.identifier = normalizeIdentifier(this.sliceSerialize(token)).toLowerCase();
    node2.label = label;
  }
  function exitFootnoteDefinition(token) {
    this.exit(token);
  }
  function footnoteReferencePeek() {
    return "[";
  }
  function footnoteReference(node2, _, state, info) {
    const tracker = state.createTracker(info);
    let value = tracker.move("[^");
    const exit2 = state.enter("footnoteReference");
    const subexit = state.enter("reference");
    value += tracker.move(state.safe(state.associationId(node2), { after: "]", before: value }));
    subexit();
    exit2();
    value += tracker.move("]");
    return value;
  }
  function gfmFootnoteFromMarkdown() {
    return {
      enter: {
        gfmFootnoteCallString: enterFootnoteCallString,
        gfmFootnoteCall: enterFootnoteCall,
        gfmFootnoteDefinitionLabelString: enterFootnoteDefinitionLabelString,
        gfmFootnoteDefinition: enterFootnoteDefinition
      },
      exit: {
        gfmFootnoteCallString: exitFootnoteCallString,
        gfmFootnoteCall: exitFootnoteCall,
        gfmFootnoteDefinitionLabelString: exitFootnoteDefinitionLabelString,
        gfmFootnoteDefinition: exitFootnoteDefinition
      }
    };
  }
  function gfmFootnoteToMarkdown(options) {
    let firstLineBlank = false;
    if (options && options.firstLineBlank) {
      firstLineBlank = true;
    }
    return {
      handlers: { footnoteDefinition, footnoteReference },
      unsafe: [{ character: "[", inConstruct: ["label", "phrasing", "reference"] }]
    };
    function footnoteDefinition(node2, _, state, info) {
      const tracker = state.createTracker(info);
      let value = tracker.move("[^");
      const exit2 = state.enter("footnoteDefinition");
      const subexit = state.enter("label");
      value += tracker.move(state.safe(state.associationId(node2), { before: value, after: "]" }));
      subexit();
      value += tracker.move("]:");
      if (node2.children && node2.children.length > 0) {
        tracker.shift(4);
        value += tracker.move((firstLineBlank ? `
` : " ") + state.indentLines(state.containerFlow(node2, tracker.current()), firstLineBlank ? mapAll : mapExceptFirst));
      }
      exit2();
      return value;
    }
  }
  function mapExceptFirst(line, index2, blank) {
    return index2 === 0 ? line : mapAll(line, index2, blank);
  }
  function mapAll(line, index2, blank) {
    return (blank ? "" : "    ") + line;
  }
  var init_lib14 = __esm(() => {
    init_development();
    init_dev3();
    footnoteReference.peek = footnoteReferencePeek;
  });

  // node_modules/mdast-util-gfm-footnote/index.js
  var init_mdast_util_gfm_footnote = __esm(() => {
    init_lib14();
  });

  // node_modules/mdast-util-gfm-strikethrough/lib/index.js
  function gfmStrikethroughFromMarkdown() {
    return {
      canContainEols: ["delete"],
      enter: { strikethrough: enterStrikethrough },
      exit: { strikethrough: exitStrikethrough }
    };
  }
  function gfmStrikethroughToMarkdown() {
    return {
      unsafe: [
        {
          character: "~",
          inConstruct: "phrasing",
          notInConstruct: constructsWithoutStrikethrough
        }
      ],
      handlers: { delete: handleDelete }
    };
  }
  function enterStrikethrough(token) {
    this.enter({ type: "delete", children: [] }, token);
  }
  function exitStrikethrough(token) {
    this.exit(token);
  }
  function handleDelete(node2, _, state, info) {
    const tracker = state.createTracker(info);
    const exit2 = state.enter("strikethrough");
    let value = tracker.move("~~");
    value += state.containerPhrasing(node2, {
      ...tracker.current(),
      before: value,
      after: "~"
    });
    value += tracker.move("~~");
    exit2();
    return value;
  }
  function peekDelete() {
    return "~";
  }
  var constructsWithoutStrikethrough;
  var init_lib15 = __esm(() => {
    constructsWithoutStrikethrough = [
      "autolink",
      "destinationLiteral",
      "destinationRaw",
      "reference",
      "titleQuote",
      "titleApostrophe"
    ];
    handleDelete.peek = peekDelete;
  });

  // node_modules/mdast-util-gfm-strikethrough/index.js
  var init_mdast_util_gfm_strikethrough = __esm(() => {
    init_lib15();
  });

  // node_modules/markdown-table/index.js
  function defaultStringLength(value) {
    return value.length;
  }
  function markdownTable(table, options) {
    const settings = options || {};
    const align = (settings.align || []).concat();
    const stringLength = settings.stringLength || defaultStringLength;
    const alignments = [];
    const cellMatrix = [];
    const sizeMatrix = [];
    const longestCellByColumn = [];
    let mostCellsPerRow = 0;
    let rowIndex = -1;
    while (++rowIndex < table.length) {
      const row2 = [];
      const sizes2 = [];
      let columnIndex2 = -1;
      if (table[rowIndex].length > mostCellsPerRow) {
        mostCellsPerRow = table[rowIndex].length;
      }
      while (++columnIndex2 < table[rowIndex].length) {
        const cell = serialize(table[rowIndex][columnIndex2]);
        if (settings.alignDelimiters !== false) {
          const size = stringLength(cell);
          sizes2[columnIndex2] = size;
          if (longestCellByColumn[columnIndex2] === undefined || size > longestCellByColumn[columnIndex2]) {
            longestCellByColumn[columnIndex2] = size;
          }
        }
        row2.push(cell);
      }
      cellMatrix[rowIndex] = row2;
      sizeMatrix[rowIndex] = sizes2;
    }
    let columnIndex = -1;
    if (typeof align === "object" && "length" in align) {
      while (++columnIndex < mostCellsPerRow) {
        alignments[columnIndex] = toAlignment(align[columnIndex]);
      }
    } else {
      const code2 = toAlignment(align);
      while (++columnIndex < mostCellsPerRow) {
        alignments[columnIndex] = code2;
      }
    }
    columnIndex = -1;
    const row = [];
    const sizes = [];
    while (++columnIndex < mostCellsPerRow) {
      const code2 = alignments[columnIndex];
      let before = "";
      let after = "";
      if (code2 === 99) {
        before = ":";
        after = ":";
      } else if (code2 === 108) {
        before = ":";
      } else if (code2 === 114) {
        after = ":";
      }
      let size = settings.alignDelimiters === false ? 1 : Math.max(1, longestCellByColumn[columnIndex] - before.length - after.length);
      const cell = before + "-".repeat(size) + after;
      if (settings.alignDelimiters !== false) {
        size = before.length + size + after.length;
        if (size > longestCellByColumn[columnIndex]) {
          longestCellByColumn[columnIndex] = size;
        }
        sizes[columnIndex] = size;
      }
      row[columnIndex] = cell;
    }
    cellMatrix.splice(1, 0, row);
    sizeMatrix.splice(1, 0, sizes);
    rowIndex = -1;
    const lines = [];
    while (++rowIndex < cellMatrix.length) {
      const row2 = cellMatrix[rowIndex];
      const sizes2 = sizeMatrix[rowIndex];
      columnIndex = -1;
      const line = [];
      while (++columnIndex < mostCellsPerRow) {
        const cell = row2[columnIndex] || "";
        let before = "";
        let after = "";
        if (settings.alignDelimiters !== false) {
          const size = longestCellByColumn[columnIndex] - (sizes2[columnIndex] || 0);
          const code2 = alignments[columnIndex];
          if (code2 === 114) {
            before = " ".repeat(size);
          } else if (code2 === 99) {
            if (size % 2) {
              before = " ".repeat(size / 2 + 0.5);
              after = " ".repeat(size / 2 - 0.5);
            } else {
              before = " ".repeat(size / 2);
              after = before;
            }
          } else {
            after = " ".repeat(size);
          }
        }
        if (settings.delimiterStart !== false && !columnIndex) {
          line.push("|");
        }
        if (settings.padding !== false && !(settings.alignDelimiters === false && cell === "") && (settings.delimiterStart !== false || columnIndex)) {
          line.push(" ");
        }
        if (settings.alignDelimiters !== false) {
          line.push(before);
        }
        line.push(cell);
        if (settings.alignDelimiters !== false) {
          line.push(after);
        }
        if (settings.padding !== false) {
          line.push(" ");
        }
        if (settings.delimiterEnd !== false || columnIndex !== mostCellsPerRow - 1) {
          line.push("|");
        }
      }
      lines.push(settings.delimiterEnd === false ? line.join("").replace(/ +$/, "") : line.join(""));
    }
    return lines.join(`
`);
  }
  function serialize(value) {
    return value === null || value === undefined ? "" : String(value);
  }
  function toAlignment(value) {
    const code2 = typeof value === "string" ? value.codePointAt(0) : 0;
    return code2 === 67 || code2 === 99 ? 99 : code2 === 76 || code2 === 108 ? 108 : code2 === 82 || code2 === 114 ? 114 : 0;
  }

  // node_modules/mdast-util-gfm-table/lib/index.js
  function gfmTableFromMarkdown() {
    return {
      enter: {
        table: enterTable,
        tableData: enterCell,
        tableHeader: enterCell,
        tableRow: enterRow
      },
      exit: {
        codeText: exitCodeText,
        table: exitTable,
        tableData: exit2,
        tableHeader: exit2,
        tableRow: exit2
      }
    };
  }
  function enterTable(token) {
    const align = token._align;
    ok(align, "expected `_align` on table");
    this.enter({
      type: "table",
      align: align.map(function(d) {
        return d === "none" ? null : d;
      }),
      children: []
    }, token);
    this.data.inTable = true;
  }
  function exitTable(token) {
    this.exit(token);
    this.data.inTable = undefined;
  }
  function enterRow(token) {
    this.enter({ type: "tableRow", children: [] }, token);
  }
  function exit2(token) {
    this.exit(token);
  }
  function enterCell(token) {
    this.enter({ type: "tableCell", children: [] }, token);
  }
  function exitCodeText(token) {
    let value = this.resume();
    if (this.data.inTable) {
      value = value.replace(/\\([\\|])/g, replace);
    }
    const node2 = this.stack[this.stack.length - 1];
    ok(node2.type === "inlineCode");
    node2.value = value;
    this.exit(token);
  }
  function replace($0, $1) {
    return $1 === "|" ? $1 : $0;
  }
  function gfmTableToMarkdown(options) {
    const settings = options || {};
    const padding = settings.tableCellPadding;
    const alignDelimiters = settings.tablePipeAlign;
    const stringLength = settings.stringLength;
    const around = padding ? " " : "|";
    return {
      unsafe: [
        { character: "\r", inConstruct: "tableCell" },
        { character: `
`, inConstruct: "tableCell" },
        { atBreak: true, character: "|", after: "[\t :-]" },
        { character: "|", inConstruct: "tableCell" },
        { atBreak: true, character: ":", after: "-" },
        { atBreak: true, character: "-", after: "[:|-]" }
      ],
      handlers: {
        inlineCode: inlineCodeWithTable,
        table: handleTable,
        tableCell: handleTableCell,
        tableRow: handleTableRow
      }
    };
    function handleTable(node2, _, state, info) {
      return serializeData(handleTableAsData(node2, state, info), node2.align);
    }
    function handleTableRow(node2, _, state, info) {
      const row = handleTableRowAsData(node2, state, info);
      const value = serializeData([row]);
      return value.slice(0, value.indexOf(`
`));
    }
    function handleTableCell(node2, _, state, info) {
      const exit3 = state.enter("tableCell");
      const subexit = state.enter("phrasing");
      const value = state.containerPhrasing(node2, {
        ...info,
        before: around,
        after: around
      });
      subexit();
      exit3();
      return value;
    }
    function serializeData(matrix, align) {
      return markdownTable(matrix, {
        align,
        alignDelimiters,
        padding,
        stringLength
      });
    }
    function handleTableAsData(node2, state, info) {
      const children = node2.children;
      let index2 = -1;
      const result = [];
      const subexit = state.enter("table");
      while (++index2 < children.length) {
        result[index2] = handleTableRowAsData(children[index2], state, info);
      }
      subexit();
      return result;
    }
    function handleTableRowAsData(node2, state, info) {
      const children = node2.children;
      let index2 = -1;
      const result = [];
      const subexit = state.enter("tableRow");
      while (++index2 < children.length) {
        result[index2] = handleTableCell(children[index2], node2, state, info);
      }
      subexit();
      return result;
    }
    function inlineCodeWithTable(node2, parent, state) {
      let value = handle.inlineCode(node2, parent, state);
      if (state.stack.includes("tableCell")) {
        value = value.replace(/\|/g, "\\$&");
      }
      return value;
    }
  }
  var init_lib16 = __esm(() => {
    init_development();
    init_mdast_util_to_markdown();
  });

  // node_modules/mdast-util-gfm-table/index.js
  var init_mdast_util_gfm_table = __esm(() => {
    init_lib16();
  });

  // node_modules/mdast-util-gfm-task-list-item/lib/index.js
  function gfmTaskListItemFromMarkdown() {
    return {
      exit: {
        taskListCheckValueChecked: exitCheck,
        taskListCheckValueUnchecked: exitCheck,
        paragraph: exitParagraphWithTaskListItem
      }
    };
  }
  function gfmTaskListItemToMarkdown() {
    return {
      unsafe: [{ atBreak: true, character: "-", after: "[:|-]" }],
      handlers: { listItem: listItemWithTaskListItem }
    };
  }
  function exitCheck(token) {
    const node2 = this.stack[this.stack.length - 2];
    ok(node2.type === "listItem");
    node2.checked = token.type === "taskListCheckValueChecked";
  }
  function exitParagraphWithTaskListItem(token) {
    const parent = this.stack[this.stack.length - 2];
    if (parent && parent.type === "listItem" && typeof parent.checked === "boolean") {
      const node2 = this.stack[this.stack.length - 1];
      ok(node2.type === "paragraph");
      const head = node2.children[0];
      if (head && head.type === "text") {
        const siblings = parent.children;
        let index2 = -1;
        let firstParaghraph;
        while (++index2 < siblings.length) {
          const sibling = siblings[index2];
          if (sibling.type === "paragraph") {
            firstParaghraph = sibling;
            break;
          }
        }
        if (firstParaghraph === node2) {
          head.value = head.value.slice(1);
          if (head.value.length === 0) {
            node2.children.shift();
          } else if (node2.position && head.position && typeof head.position.start.offset === "number") {
            head.position.start.column++;
            head.position.start.offset++;
            node2.position.start = Object.assign({}, head.position.start);
          }
        }
      }
    }
    this.exit(token);
  }
  function listItemWithTaskListItem(node2, parent, state, info) {
    const head = node2.children[0];
    const checkable = typeof node2.checked === "boolean" && head && head.type === "paragraph";
    const checkbox = "[" + (node2.checked ? "x" : " ") + "] ";
    const tracker = state.createTracker(info);
    if (checkable) {
      tracker.move(checkbox);
    }
    let value = handle.listItem(node2, parent, state, {
      ...info,
      ...tracker.current()
    });
    if (checkable) {
      value = value.replace(/^(?:[*+-]|\d+\.)([\r\n]| {1,3})/, check);
    }
    return value;
    function check($0) {
      return $0 + checkbox;
    }
  }
  var init_lib17 = __esm(() => {
    init_development();
    init_mdast_util_to_markdown();
  });

  // node_modules/mdast-util-gfm-task-list-item/index.js
  var init_mdast_util_gfm_task_list_item = __esm(() => {
    init_lib17();
  });

  // node_modules/mdast-util-gfm/lib/index.js
  function gfmFromMarkdown() {
    return [
      gfmAutolinkLiteralFromMarkdown(),
      gfmFootnoteFromMarkdown(),
      gfmStrikethroughFromMarkdown(),
      gfmTableFromMarkdown(),
      gfmTaskListItemFromMarkdown()
    ];
  }
  function gfmToMarkdown(options) {
    return {
      extensions: [
        gfmAutolinkLiteralToMarkdown(),
        gfmFootnoteToMarkdown(options),
        gfmStrikethroughToMarkdown(),
        gfmTableToMarkdown(options),
        gfmTaskListItemToMarkdown()
      ]
    };
  }
  var init_lib18 = __esm(() => {
    init_mdast_util_gfm_autolink_literal();
    init_mdast_util_gfm_footnote();
    init_mdast_util_gfm_strikethrough();
    init_mdast_util_gfm_table();
    init_mdast_util_gfm_task_list_item();
  });

  // node_modules/mdast-util-gfm/index.js
  var init_mdast_util_gfm = __esm(() => {
    init_lib18();
  });

  // node_modules/micromark-extension-gfm-autolink-literal/dev/lib/syntax.js
  function gfmAutolinkLiteral() {
    return { text: text4 };
  }
  function tokenizeEmailAutolink(effects, ok3, nok) {
    const self = this;
    let dot;
    let data;
    return start;
    function start(code3) {
      if (!gfmAtext(code3) || !previousEmail.call(self, self.previous) || previousUnbalanced(self.events)) {
        return nok(code3);
      }
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkEmail");
      return atext(code3);
    }
    function atext(code3) {
      if (gfmAtext(code3)) {
        effects.consume(code3);
        return atext;
      }
      if (code3 === codes.atSign) {
        effects.consume(code3);
        return emailDomain;
      }
      return nok(code3);
    }
    function emailDomain(code3) {
      if (code3 === codes.dot) {
        return effects.check(emailDomainDotTrail, emailDomainAfter, emailDomainDot)(code3);
      }
      if (code3 === codes.dash || code3 === codes.underscore || asciiAlphanumeric(code3)) {
        data = true;
        effects.consume(code3);
        return emailDomain;
      }
      return emailDomainAfter(code3);
    }
    function emailDomainDot(code3) {
      effects.consume(code3);
      dot = true;
      return emailDomain;
    }
    function emailDomainAfter(code3) {
      if (data && dot && asciiAlpha(self.previous)) {
        effects.exit("literalAutolinkEmail");
        effects.exit("literalAutolink");
        return ok3(code3);
      }
      return nok(code3);
    }
  }
  function tokenizeWwwAutolink(effects, ok3, nok) {
    const self = this;
    return wwwStart;
    function wwwStart(code3) {
      if (code3 !== codes.uppercaseW && code3 !== codes.lowercaseW || !previousWww.call(self, self.previous) || previousUnbalanced(self.events)) {
        return nok(code3);
      }
      effects.enter("literalAutolink");
      effects.enter("literalAutolinkWww");
      return effects.check(wwwPrefix, effects.attempt(domain, effects.attempt(path, wwwAfter), nok), nok)(code3);
    }
    function wwwAfter(code3) {
      effects.exit("literalAutolinkWww");
      effects.exit("literalAutolink");
      return ok3(code3);
    }
  }
  function tokenizeProtocolAutolink(effects, ok3, nok) {
    const self = this;
    let buffer = "";
    let seen = false;
    return protocolStart;
    function protocolStart(code3) {
      if ((code3 === codes.uppercaseH || code3 === codes.lowercaseH) && previousProtocol.call(self, self.previous) && !previousUnbalanced(self.events)) {
        effects.enter("literalAutolink");
        effects.enter("literalAutolinkHttp");
        buffer += String.fromCodePoint(code3);
        effects.consume(code3);
        return protocolPrefixInside;
      }
      return nok(code3);
    }
    function protocolPrefixInside(code3) {
      if (asciiAlpha(code3) && buffer.length < 5) {
        buffer += String.fromCodePoint(code3);
        effects.consume(code3);
        return protocolPrefixInside;
      }
      if (code3 === codes.colon) {
        const protocol = buffer.toLowerCase();
        if (protocol === "http" || protocol === "https") {
          effects.consume(code3);
          return protocolSlashesInside;
        }
      }
      return nok(code3);
    }
    function protocolSlashesInside(code3) {
      if (code3 === codes.slash) {
        effects.consume(code3);
        if (seen) {
          return afterProtocol;
        }
        seen = true;
        return protocolSlashesInside;
      }
      return nok(code3);
    }
    function afterProtocol(code3) {
      return code3 === codes.eof || asciiControl(code3) || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3) || unicodePunctuation(code3) ? nok(code3) : effects.attempt(domain, effects.attempt(path, protocolAfter), nok)(code3);
    }
    function protocolAfter(code3) {
      effects.exit("literalAutolinkHttp");
      effects.exit("literalAutolink");
      return ok3(code3);
    }
  }
  function tokenizeWwwPrefix(effects, ok3, nok) {
    let size = 0;
    return wwwPrefixInside;
    function wwwPrefixInside(code3) {
      if ((code3 === codes.uppercaseW || code3 === codes.lowercaseW) && size < 3) {
        size++;
        effects.consume(code3);
        return wwwPrefixInside;
      }
      if (code3 === codes.dot && size === 3) {
        effects.consume(code3);
        return wwwPrefixAfter;
      }
      return nok(code3);
    }
    function wwwPrefixAfter(code3) {
      return code3 === codes.eof ? nok(code3) : ok3(code3);
    }
  }
  function tokenizeDomain(effects, ok3, nok) {
    let underscoreInLastSegment;
    let underscoreInLastLastSegment;
    let seen;
    return domainInside;
    function domainInside(code3) {
      if (code3 === codes.dot || code3 === codes.underscore) {
        return effects.check(trail, domainAfter, domainAtPunctuation)(code3);
      }
      if (code3 === codes.eof || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3) || code3 !== codes.dash && unicodePunctuation(code3)) {
        return domainAfter(code3);
      }
      seen = true;
      effects.consume(code3);
      return domainInside;
    }
    function domainAtPunctuation(code3) {
      if (code3 === codes.underscore) {
        underscoreInLastSegment = true;
      } else {
        underscoreInLastLastSegment = underscoreInLastSegment;
        underscoreInLastSegment = undefined;
      }
      effects.consume(code3);
      return domainInside;
    }
    function domainAfter(code3) {
      if (underscoreInLastLastSegment || underscoreInLastSegment || !seen) {
        return nok(code3);
      }
      return ok3(code3);
    }
  }
  function tokenizePath(effects, ok3) {
    let sizeOpen = 0;
    let sizeClose = 0;
    return pathInside;
    function pathInside(code3) {
      if (code3 === codes.leftParenthesis) {
        sizeOpen++;
        effects.consume(code3);
        return pathInside;
      }
      if (code3 === codes.rightParenthesis && sizeClose < sizeOpen) {
        return pathAtPunctuation(code3);
      }
      if (code3 === codes.exclamationMark || code3 === codes.quotationMark || code3 === codes.ampersand || code3 === codes.apostrophe || code3 === codes.rightParenthesis || code3 === codes.asterisk || code3 === codes.comma || code3 === codes.dot || code3 === codes.colon || code3 === codes.semicolon || code3 === codes.lessThan || code3 === codes.questionMark || code3 === codes.rightSquareBracket || code3 === codes.underscore || code3 === codes.tilde) {
        return effects.check(trail, ok3, pathAtPunctuation)(code3);
      }
      if (code3 === codes.eof || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
        return ok3(code3);
      }
      effects.consume(code3);
      return pathInside;
    }
    function pathAtPunctuation(code3) {
      if (code3 === codes.rightParenthesis) {
        sizeClose++;
      }
      effects.consume(code3);
      return pathInside;
    }
  }
  function tokenizeTrail(effects, ok3, nok) {
    return trail2;
    function trail2(code3) {
      if (code3 === codes.exclamationMark || code3 === codes.quotationMark || code3 === codes.apostrophe || code3 === codes.rightParenthesis || code3 === codes.asterisk || code3 === codes.comma || code3 === codes.dot || code3 === codes.colon || code3 === codes.semicolon || code3 === codes.questionMark || code3 === codes.underscore || code3 === codes.tilde) {
        effects.consume(code3);
        return trail2;
      }
      if (code3 === codes.ampersand) {
        effects.consume(code3);
        return trailCharacterReferenceStart;
      }
      if (code3 === codes.rightSquareBracket) {
        effects.consume(code3);
        return trailBracketAfter;
      }
      if (code3 === codes.lessThan || code3 === codes.eof || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
        return ok3(code3);
      }
      return nok(code3);
    }
    function trailBracketAfter(code3) {
      if (code3 === codes.eof || code3 === codes.leftParenthesis || code3 === codes.leftSquareBracket || markdownLineEndingOrSpace(code3) || unicodeWhitespace(code3)) {
        return ok3(code3);
      }
      return trail2(code3);
    }
    function trailCharacterReferenceStart(code3) {
      return asciiAlpha(code3) ? trailCharacterReferenceInside(code3) : nok(code3);
    }
    function trailCharacterReferenceInside(code3) {
      if (code3 === codes.semicolon) {
        effects.consume(code3);
        return trail2;
      }
      if (asciiAlpha(code3)) {
        effects.consume(code3);
        return trailCharacterReferenceInside;
      }
      return nok(code3);
    }
  }
  function tokenizeEmailDomainDotTrail(effects, ok3, nok) {
    return start;
    function start(code3) {
      effects.consume(code3);
      return after;
    }
    function after(code3) {
      return asciiAlphanumeric(code3) ? nok(code3) : ok3(code3);
    }
  }
  function previousWww(code3) {
    return code3 === codes.eof || code3 === codes.leftParenthesis || code3 === codes.asterisk || code3 === codes.underscore || code3 === codes.leftSquareBracket || code3 === codes.rightSquareBracket || code3 === codes.tilde || markdownLineEndingOrSpace(code3);
  }
  function previousProtocol(code3) {
    return !asciiAlpha(code3);
  }
  function previousEmail(code3) {
    return !(code3 === codes.slash || gfmAtext(code3));
  }
  function gfmAtext(code3) {
    return code3 === codes.plusSign || code3 === codes.dash || code3 === codes.dot || code3 === codes.underscore || asciiAlphanumeric(code3);
  }
  function previousUnbalanced(events) {
    let index2 = events.length;
    let result = false;
    while (index2--) {
      const token = events[index2][1];
      if ((token.type === "labelLink" || token.type === "labelImage") && !token._balanced) {
        result = true;
        break;
      }
      if (token._gfmAutolinkLiteralWalkedInto) {
        result = false;
        break;
      }
    }
    if (events.length > 0 && !result) {
      events[events.length - 1][1]._gfmAutolinkLiteralWalkedInto = true;
    }
    return result;
  }
  var wwwPrefix, domain, path, trail, emailDomainDotTrail, wwwAutolink, protocolAutolink, emailAutolink, text4, code2;
  var init_syntax = __esm(() => {
    init_dev4();
    init_default();
    wwwPrefix = { tokenize: tokenizeWwwPrefix, partial: true };
    domain = { tokenize: tokenizeDomain, partial: true };
    path = { tokenize: tokenizePath, partial: true };
    trail = { tokenize: tokenizeTrail, partial: true };
    emailDomainDotTrail = {
      tokenize: tokenizeEmailDomainDotTrail,
      partial: true
    };
    wwwAutolink = {
      name: "wwwAutolink",
      tokenize: tokenizeWwwAutolink,
      previous: previousWww
    };
    protocolAutolink = {
      name: "protocolAutolink",
      tokenize: tokenizeProtocolAutolink,
      previous: previousProtocol
    };
    emailAutolink = {
      name: "emailAutolink",
      tokenize: tokenizeEmailAutolink,
      previous: previousEmail
    };
    text4 = {};
    code2 = codes.digit0;
    while (code2 < codes.leftCurlyBrace) {
      text4[code2] = emailAutolink;
      code2++;
      if (code2 === codes.colon)
        code2 = codes.uppercaseA;
      else if (code2 === codes.leftSquareBracket)
        code2 = codes.lowercaseA;
    }
    text4[codes.plusSign] = emailAutolink;
    text4[codes.dash] = emailAutolink;
    text4[codes.dot] = emailAutolink;
    text4[codes.underscore] = emailAutolink;
    text4[codes.uppercaseH] = [emailAutolink, protocolAutolink];
    text4[codes.lowercaseH] = [emailAutolink, protocolAutolink];
    text4[codes.uppercaseW] = [emailAutolink, wwwAutolink];
    text4[codes.lowercaseW] = [emailAutolink, wwwAutolink];
  });

  // node_modules/micromark-extension-gfm-autolink-literal/dev/index.js
  var init_dev16 = __esm(() => {
    init_syntax();
  });

  // node_modules/micromark-extension-gfm-footnote/dev/lib/syntax.js
  function gfmFootnote() {
    return {
      document: {
        [codes.leftSquareBracket]: {
          name: "gfmFootnoteDefinition",
          tokenize: tokenizeDefinitionStart,
          continuation: { tokenize: tokenizeDefinitionContinuation },
          exit: gfmFootnoteDefinitionEnd
        }
      },
      text: {
        [codes.leftSquareBracket]: {
          name: "gfmFootnoteCall",
          tokenize: tokenizeGfmFootnoteCall
        },
        [codes.rightSquareBracket]: {
          name: "gfmPotentialFootnoteCall",
          add: "after",
          tokenize: tokenizePotentialGfmFootnoteCall,
          resolveTo: resolveToPotentialGfmFootnoteCall
        }
      }
    };
  }
  function tokenizePotentialGfmFootnoteCall(effects, ok3, nok) {
    const self = this;
    let index2 = self.events.length;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    let labelStart;
    while (index2--) {
      const token = self.events[index2][1];
      if (token.type === types.labelImage) {
        labelStart = token;
        break;
      }
      if (token.type === "gfmFootnoteCall" || token.type === types.labelLink || token.type === types.label || token.type === types.image || token.type === types.link) {
        break;
      }
    }
    return start;
    function start(code3) {
      ok(code3 === codes.rightSquareBracket, "expected `]`");
      if (!labelStart || !labelStart._balanced) {
        return nok(code3);
      }
      const id = normalizeIdentifier(self.sliceSerialize({ start: labelStart.end, end: self.now() }));
      if (id.codePointAt(0) !== codes.caret || !defined.includes(id.slice(1))) {
        return nok(code3);
      }
      effects.enter("gfmFootnoteCallLabelMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteCallLabelMarker");
      return ok3(code3);
    }
  }
  function resolveToPotentialGfmFootnoteCall(events, context) {
    let index2 = events.length;
    let labelStart;
    while (index2--) {
      if (events[index2][1].type === types.labelImage && events[index2][0] === "enter") {
        labelStart = events[index2][1];
        break;
      }
    }
    ok(labelStart, "expected `labelStart` to resolve");
    events[index2 + 1][1].type = types.data;
    events[index2 + 3][1].type = "gfmFootnoteCallLabelMarker";
    const call = {
      type: "gfmFootnoteCall",
      start: Object.assign({}, events[index2 + 3][1].start),
      end: Object.assign({}, events[events.length - 1][1].end)
    };
    const marker = {
      type: "gfmFootnoteCallMarker",
      start: Object.assign({}, events[index2 + 3][1].end),
      end: Object.assign({}, events[index2 + 3][1].end)
    };
    marker.end.column++;
    marker.end.offset++;
    marker.end._bufferIndex++;
    const string3 = {
      type: "gfmFootnoteCallString",
      start: Object.assign({}, marker.end),
      end: Object.assign({}, events[events.length - 1][1].start)
    };
    const chunk = {
      type: types.chunkString,
      contentType: "string",
      start: Object.assign({}, string3.start),
      end: Object.assign({}, string3.end)
    };
    const replacement = [
      events[index2 + 1],
      events[index2 + 2],
      ["enter", call, context],
      events[index2 + 3],
      events[index2 + 4],
      ["enter", marker, context],
      ["exit", marker, context],
      ["enter", string3, context],
      ["enter", chunk, context],
      ["exit", chunk, context],
      ["exit", string3, context],
      events[events.length - 2],
      events[events.length - 1],
      ["exit", call, context]
    ];
    events.splice(index2, events.length - index2 + 1, ...replacement);
    return events;
  }
  function tokenizeGfmFootnoteCall(effects, ok3, nok) {
    const self = this;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    let size = 0;
    let data;
    return start;
    function start(code3) {
      ok(code3 === codes.leftSquareBracket, "expected `[`");
      effects.enter("gfmFootnoteCall");
      effects.enter("gfmFootnoteCallLabelMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteCallLabelMarker");
      return callStart;
    }
    function callStart(code3) {
      if (code3 !== codes.caret)
        return nok(code3);
      effects.enter("gfmFootnoteCallMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteCallMarker");
      effects.enter("gfmFootnoteCallString");
      effects.enter("chunkString").contentType = "string";
      return callData;
    }
    function callData(code3) {
      if (size > constants.linkReferenceSizeMax || code3 === codes.rightSquareBracket && !data || code3 === codes.eof || code3 === codes.leftSquareBracket || markdownLineEndingOrSpace(code3)) {
        return nok(code3);
      }
      if (code3 === codes.rightSquareBracket) {
        effects.exit("chunkString");
        const token = effects.exit("gfmFootnoteCallString");
        if (!defined.includes(normalizeIdentifier(self.sliceSerialize(token)))) {
          return nok(code3);
        }
        effects.enter("gfmFootnoteCallLabelMarker");
        effects.consume(code3);
        effects.exit("gfmFootnoteCallLabelMarker");
        effects.exit("gfmFootnoteCall");
        return ok3;
      }
      if (!markdownLineEndingOrSpace(code3)) {
        data = true;
      }
      size++;
      effects.consume(code3);
      return code3 === codes.backslash ? callEscape : callData;
    }
    function callEscape(code3) {
      if (code3 === codes.leftSquareBracket || code3 === codes.backslash || code3 === codes.rightSquareBracket) {
        effects.consume(code3);
        size++;
        return callData;
      }
      return callData(code3);
    }
  }
  function tokenizeDefinitionStart(effects, ok3, nok) {
    const self = this;
    const defined = self.parser.gfmFootnotes || (self.parser.gfmFootnotes = []);
    let identifier;
    let size = 0;
    let data;
    return start;
    function start(code3) {
      ok(code3 === codes.leftSquareBracket, "expected `[`");
      effects.enter("gfmFootnoteDefinition")._container = true;
      effects.enter("gfmFootnoteDefinitionLabel");
      effects.enter("gfmFootnoteDefinitionLabelMarker");
      effects.consume(code3);
      effects.exit("gfmFootnoteDefinitionLabelMarker");
      return labelAtMarker;
    }
    function labelAtMarker(code3) {
      if (code3 === codes.caret) {
        effects.enter("gfmFootnoteDefinitionMarker");
        effects.consume(code3);
        effects.exit("gfmFootnoteDefinitionMarker");
        effects.enter("gfmFootnoteDefinitionLabelString");
        effects.enter("chunkString").contentType = "string";
        return labelInside;
      }
      return nok(code3);
    }
    function labelInside(code3) {
      if (size > constants.linkReferenceSizeMax || code3 === codes.rightSquareBracket && !data || code3 === codes.eof || code3 === codes.leftSquareBracket || markdownLineEndingOrSpace(code3)) {
        return nok(code3);
      }
      if (code3 === codes.rightSquareBracket) {
        effects.exit("chunkString");
        const token = effects.exit("gfmFootnoteDefinitionLabelString");
        identifier = normalizeIdentifier(self.sliceSerialize(token));
        effects.enter("gfmFootnoteDefinitionLabelMarker");
        effects.consume(code3);
        effects.exit("gfmFootnoteDefinitionLabelMarker");
        effects.exit("gfmFootnoteDefinitionLabel");
        return labelAfter;
      }
      if (!markdownLineEndingOrSpace(code3)) {
        data = true;
      }
      size++;
      effects.consume(code3);
      return code3 === codes.backslash ? labelEscape : labelInside;
    }
    function labelEscape(code3) {
      if (code3 === codes.leftSquareBracket || code3 === codes.backslash || code3 === codes.rightSquareBracket) {
        effects.consume(code3);
        size++;
        return labelInside;
      }
      return labelInside(code3);
    }
    function labelAfter(code3) {
      if (code3 === codes.colon) {
        effects.enter("definitionMarker");
        effects.consume(code3);
        effects.exit("definitionMarker");
        if (!defined.includes(identifier)) {
          defined.push(identifier);
        }
        return factorySpace(effects, whitespaceAfter, "gfmFootnoteDefinitionWhitespace");
      }
      return nok(code3);
    }
    function whitespaceAfter(code3) {
      return ok3(code3);
    }
  }
  function tokenizeDefinitionContinuation(effects, ok3, nok) {
    return effects.check(blankLine, ok3, effects.attempt(indent, ok3, nok));
  }
  function gfmFootnoteDefinitionEnd(effects) {
    effects.exit("gfmFootnoteDefinition");
  }
  function tokenizeIndent2(effects, ok3, nok) {
    const self = this;
    return factorySpace(effects, afterPrefix, "gfmFootnoteDefinitionIndent", constants.tabSize + 1);
    function afterPrefix(code3) {
      const tail = self.events[self.events.length - 1];
      return tail && tail[1].type === "gfmFootnoteDefinitionIndent" && tail[2].sliceSerialize(tail[1], true).length === constants.tabSize ? ok3(code3) : nok(code3);
    }
  }
  var indent;
  var init_syntax2 = __esm(() => {
    init_development();
    init_dev12();
    init_dev5();
    init_dev4();
    init_dev3();
    init_default();
    indent = { tokenize: tokenizeIndent2, partial: true };
  });

  // node_modules/micromark-extension-gfm-footnote/dev/index.js
  var init_dev17 = __esm(() => {
    init_syntax2();
  });

  // node_modules/micromark-extension-gfm-strikethrough/dev/lib/syntax.js
  function gfmStrikethrough(options) {
    const options_ = options || {};
    let single = options_.singleTilde;
    const tokenizer = {
      name: "strikethrough",
      tokenize: tokenizeStrikethrough,
      resolveAll: resolveAllStrikethrough
    };
    if (single === null || single === undefined) {
      single = true;
    }
    return {
      text: { [codes.tilde]: tokenizer },
      insideSpan: { null: [tokenizer] },
      attentionMarkers: { null: [codes.tilde] }
    };
    function resolveAllStrikethrough(events, context) {
      let index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][0] === "enter" && events[index2][1].type === "strikethroughSequenceTemporary" && events[index2][1]._close) {
          let open = index2;
          while (open--) {
            if (events[open][0] === "exit" && events[open][1].type === "strikethroughSequenceTemporary" && events[open][1]._open && events[index2][1].end.offset - events[index2][1].start.offset === events[open][1].end.offset - events[open][1].start.offset) {
              events[index2][1].type = "strikethroughSequence";
              events[open][1].type = "strikethroughSequence";
              const strikethrough = {
                type: "strikethrough",
                start: Object.assign({}, events[open][1].start),
                end: Object.assign({}, events[index2][1].end)
              };
              const text5 = {
                type: "strikethroughText",
                start: Object.assign({}, events[open][1].end),
                end: Object.assign({}, events[index2][1].start)
              };
              const nextEvents = [
                ["enter", strikethrough, context],
                ["enter", events[open][1], context],
                ["exit", events[open][1], context],
                ["enter", text5, context]
              ];
              const insideSpan2 = context.parser.constructs.insideSpan.null;
              if (insideSpan2) {
                splice(nextEvents, nextEvents.length, 0, resolveAll(insideSpan2, events.slice(open + 1, index2), context));
              }
              splice(nextEvents, nextEvents.length, 0, [
                ["exit", text5, context],
                ["enter", events[index2][1], context],
                ["exit", events[index2][1], context],
                ["exit", strikethrough, context]
              ]);
              splice(events, open - 1, index2 - open + 3, nextEvents);
              index2 = open + nextEvents.length - 2;
              break;
            }
          }
        }
      }
      index2 = -1;
      while (++index2 < events.length) {
        if (events[index2][1].type === "strikethroughSequenceTemporary") {
          events[index2][1].type = types.data;
        }
      }
      return events;
    }
    function tokenizeStrikethrough(effects, ok3, nok) {
      const previous3 = this.previous;
      const events = this.events;
      let size = 0;
      return start;
      function start(code3) {
        ok(code3 === codes.tilde, "expected `~`");
        if (previous3 === codes.tilde && events[events.length - 1][1].type !== types.characterEscape) {
          return nok(code3);
        }
        effects.enter("strikethroughSequenceTemporary");
        return more(code3);
      }
      function more(code3) {
        const before = classifyCharacter(previous3);
        if (code3 === codes.tilde) {
          if (size > 1)
            return nok(code3);
          effects.consume(code3);
          size++;
          return more;
        }
        if (size < 2 && !single)
          return nok(code3);
        const token = effects.exit("strikethroughSequenceTemporary");
        const after = classifyCharacter(code3);
        token._open = !after || after === constants.attentionSideAfter && Boolean(before);
        token._close = !before || before === constants.attentionSideAfter && Boolean(after);
        return ok3(code3);
      }
    }
  }
  var init_syntax3 = __esm(() => {
    init_development();
    init_dev();
    init_dev6();
    init_default();
  });

  // node_modules/micromark-extension-gfm-strikethrough/dev/index.js
  var init_dev18 = __esm(() => {
    init_syntax3();
  });

  // node_modules/micromark-extension-gfm-table/dev/lib/edit-map.js
  class EditMap {
    constructor() {
      this.map = [];
    }
    add(index2, remove, add) {
      addImplementation(this, index2, remove, add);
    }
    consume(events) {
      this.map.sort(function(a, b) {
        return a[0] - b[0];
      });
      if (this.map.length === 0) {
        return;
      }
      let index2 = this.map.length;
      const vecs = [];
      while (index2 > 0) {
        index2 -= 1;
        vecs.push(events.slice(this.map[index2][0] + this.map[index2][1]), this.map[index2][2]);
        events.length = this.map[index2][0];
      }
      vecs.push(events.slice());
      events.length = 0;
      let slice = vecs.pop();
      while (slice) {
        for (const element2 of slice) {
          events.push(element2);
        }
        slice = vecs.pop();
      }
      this.map.length = 0;
    }
  }
  function addImplementation(editMap, at, remove, add) {
    let index2 = 0;
    if (remove === 0 && add.length === 0) {
      return;
    }
    while (index2 < editMap.map.length) {
      if (editMap.map[index2][0] === at) {
        editMap.map[index2][1] += remove;
        editMap.map[index2][2].push(...add);
        return;
      }
      index2 += 1;
    }
    editMap.map.push([at, remove, add]);
  }

  // node_modules/micromark-extension-gfm-table/dev/lib/infer.js
  function gfmTableAlign(events, index2) {
    ok(events[index2][1].type === "table", "expected table");
    let inDelimiterRow = false;
    const align = [];
    while (index2 < events.length) {
      const event = events[index2];
      if (inDelimiterRow) {
        if (event[0] === "enter") {
          if (event[1].type === "tableContent") {
            align.push(events[index2 + 1][1].type === "tableDelimiterMarker" ? "left" : "none");
          }
        } else if (event[1].type === "tableContent") {
          if (events[index2 - 1][1].type === "tableDelimiterMarker") {
            const alignIndex = align.length - 1;
            align[alignIndex] = align[alignIndex] === "left" ? "center" : "right";
          }
        } else if (event[1].type === "tableDelimiterRow") {
          break;
        }
      } else if (event[0] === "enter" && event[1].type === "tableDelimiterRow") {
        inDelimiterRow = true;
      }
      index2 += 1;
    }
    return align;
  }
  var init_infer = __esm(() => {
    init_development();
  });

  // node_modules/micromark-extension-gfm-table/dev/lib/syntax.js
  function gfmTable() {
    return {
      flow: {
        null: { name: "table", tokenize: tokenizeTable, resolveAll: resolveTable }
      }
    };
  }
  function tokenizeTable(effects, ok3, nok) {
    const self = this;
    let size = 0;
    let sizeB = 0;
    let seen;
    return start;
    function start(code3) {
      let index2 = self.events.length - 1;
      while (index2 > -1) {
        const type = self.events[index2][1].type;
        if (type === types.lineEnding || type === types.linePrefix)
          index2--;
        else
          break;
      }
      const tail = index2 > -1 ? self.events[index2][1].type : null;
      const next = tail === "tableHead" || tail === "tableRow" ? bodyRowStart : headRowBefore;
      if (next === bodyRowStart && self.parser.lazy[self.now().line]) {
        return nok(code3);
      }
      return next(code3);
    }
    function headRowBefore(code3) {
      effects.enter("tableHead");
      effects.enter("tableRow");
      return headRowStart(code3);
    }
    function headRowStart(code3) {
      if (code3 === codes.verticalBar) {
        return headRowBreak(code3);
      }
      seen = true;
      sizeB += 1;
      return headRowBreak(code3);
    }
    function headRowBreak(code3) {
      if (code3 === codes.eof) {
        return nok(code3);
      }
      if (markdownLineEnding(code3)) {
        if (sizeB > 1) {
          sizeB = 0;
          self.interrupt = true;
          effects.exit("tableRow");
          effects.enter(types.lineEnding);
          effects.consume(code3);
          effects.exit(types.lineEnding);
          return headDelimiterStart;
        }
        return nok(code3);
      }
      if (markdownSpace(code3)) {
        return factorySpace(effects, headRowBreak, types.whitespace)(code3);
      }
      sizeB += 1;
      if (seen) {
        seen = false;
        size += 1;
      }
      if (code3 === codes.verticalBar) {
        effects.enter("tableCellDivider");
        effects.consume(code3);
        effects.exit("tableCellDivider");
        seen = true;
        return headRowBreak;
      }
      effects.enter(types.data);
      return headRowData(code3);
    }
    function headRowData(code3) {
      if (code3 === codes.eof || code3 === codes.verticalBar || markdownLineEndingOrSpace(code3)) {
        effects.exit(types.data);
        return headRowBreak(code3);
      }
      effects.consume(code3);
      return code3 === codes.backslash ? headRowEscape : headRowData;
    }
    function headRowEscape(code3) {
      if (code3 === codes.backslash || code3 === codes.verticalBar) {
        effects.consume(code3);
        return headRowData;
      }
      return headRowData(code3);
    }
    function headDelimiterStart(code3) {
      self.interrupt = false;
      if (self.parser.lazy[self.now().line]) {
        return nok(code3);
      }
      effects.enter("tableDelimiterRow");
      seen = false;
      if (markdownSpace(code3)) {
        ok(self.parser.constructs.disable.null, "expected `disabled.null`");
        return factorySpace(effects, headDelimiterBefore, types.linePrefix, self.parser.constructs.disable.null.includes("codeIndented") ? undefined : constants.tabSize)(code3);
      }
      return headDelimiterBefore(code3);
    }
    function headDelimiterBefore(code3) {
      if (code3 === codes.dash || code3 === codes.colon) {
        return headDelimiterValueBefore(code3);
      }
      if (code3 === codes.verticalBar) {
        seen = true;
        effects.enter("tableCellDivider");
        effects.consume(code3);
        effects.exit("tableCellDivider");
        return headDelimiterCellBefore;
      }
      return headDelimiterNok(code3);
    }
    function headDelimiterCellBefore(code3) {
      if (markdownSpace(code3)) {
        return factorySpace(effects, headDelimiterValueBefore, types.whitespace)(code3);
      }
      return headDelimiterValueBefore(code3);
    }
    function headDelimiterValueBefore(code3) {
      if (code3 === codes.colon) {
        sizeB += 1;
        seen = true;
        effects.enter("tableDelimiterMarker");
        effects.consume(code3);
        effects.exit("tableDelimiterMarker");
        return headDelimiterLeftAlignmentAfter;
      }
      if (code3 === codes.dash) {
        sizeB += 1;
        return headDelimiterLeftAlignmentAfter(code3);
      }
      if (code3 === codes.eof || markdownLineEnding(code3)) {
        return headDelimiterCellAfter(code3);
      }
      return headDelimiterNok(code3);
    }
    function headDelimiterLeftAlignmentAfter(code3) {
      if (code3 === codes.dash) {
        effects.enter("tableDelimiterFiller");
        return headDelimiterFiller(code3);
      }
      return headDelimiterNok(code3);
    }
    function headDelimiterFiller(code3) {
      if (code3 === codes.dash) {
        effects.consume(code3);
        return headDelimiterFiller;
      }
      if (code3 === codes.colon) {
        seen = true;
        effects.exit("tableDelimiterFiller");
        effects.enter("tableDelimiterMarker");
        effects.consume(code3);
        effects.exit("tableDelimiterMarker");
        return headDelimiterRightAlignmentAfter;
      }
      effects.exit("tableDelimiterFiller");
      return headDelimiterRightAlignmentAfter(code3);
    }
    function headDelimiterRightAlignmentAfter(code3) {
      if (markdownSpace(code3)) {
        return factorySpace(effects, headDelimiterCellAfter, types.whitespace)(code3);
      }
      return headDelimiterCellAfter(code3);
    }
    function headDelimiterCellAfter(code3) {
      if (code3 === codes.verticalBar) {
        return headDelimiterBefore(code3);
      }
      if (code3 === codes.eof || markdownLineEnding(code3)) {
        if (!seen || size !== sizeB) {
          return headDelimiterNok(code3);
        }
        effects.exit("tableDelimiterRow");
        effects.exit("tableHead");
        return ok3(code3);
      }
      return headDelimiterNok(code3);
    }
    function headDelimiterNok(code3) {
      return nok(code3);
    }
    function bodyRowStart(code3) {
      effects.enter("tableRow");
      return bodyRowBreak(code3);
    }
    function bodyRowBreak(code3) {
      if (code3 === codes.verticalBar) {
        effects.enter("tableCellDivider");
        effects.consume(code3);
        effects.exit("tableCellDivider");
        return bodyRowBreak;
      }
      if (code3 === codes.eof || markdownLineEnding(code3)) {
        effects.exit("tableRow");
        return ok3(code3);
      }
      if (markdownSpace(code3)) {
        return factorySpace(effects, bodyRowBreak, types.whitespace)(code3);
      }
      effects.enter(types.data);
      return bodyRowData(code3);
    }
    function bodyRowData(code3) {
      if (code3 === codes.eof || code3 === codes.verticalBar || markdownLineEndingOrSpace(code3)) {
        effects.exit(types.data);
        return bodyRowBreak(code3);
      }
      effects.consume(code3);
      return code3 === codes.backslash ? bodyRowEscape : bodyRowData;
    }
    function bodyRowEscape(code3) {
      if (code3 === codes.backslash || code3 === codes.verticalBar) {
        effects.consume(code3);
        return bodyRowData;
      }
      return bodyRowData(code3);
    }
  }
  function resolveTable(events, context) {
    let index2 = -1;
    let inFirstCellAwaitingPipe = true;
    let rowKind = 0;
    let lastCell = [0, 0, 0, 0];
    let cell = [0, 0, 0, 0];
    let afterHeadAwaitingFirstBodyRow = false;
    let lastTableEnd = 0;
    let currentTable;
    let currentBody;
    let currentCell;
    const map4 = new EditMap;
    while (++index2 < events.length) {
      const event = events[index2];
      const token = event[1];
      if (event[0] === "enter") {
        if (token.type === "tableHead") {
          afterHeadAwaitingFirstBodyRow = false;
          if (lastTableEnd !== 0) {
            ok(currentTable, "there should be a table opening");
            flushTableEnd(map4, context, lastTableEnd, currentTable, currentBody);
            currentBody = undefined;
            lastTableEnd = 0;
          }
          currentTable = {
            type: "table",
            start: Object.assign({}, token.start),
            end: Object.assign({}, token.end)
          };
          map4.add(index2, 0, [["enter", currentTable, context]]);
        } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
          inFirstCellAwaitingPipe = true;
          currentCell = undefined;
          lastCell = [0, 0, 0, 0];
          cell = [0, index2 + 1, 0, 0];
          if (afterHeadAwaitingFirstBodyRow) {
            afterHeadAwaitingFirstBodyRow = false;
            currentBody = {
              type: "tableBody",
              start: Object.assign({}, token.start),
              end: Object.assign({}, token.end)
            };
            map4.add(index2, 0, [["enter", currentBody, context]]);
          }
          rowKind = token.type === "tableDelimiterRow" ? 2 : currentBody ? 3 : 1;
        } else if (rowKind && (token.type === types.data || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
          inFirstCellAwaitingPipe = false;
          if (cell[2] === 0) {
            if (lastCell[1] !== 0) {
              cell[0] = cell[1];
              currentCell = flushCell(map4, context, lastCell, rowKind, undefined, currentCell);
              lastCell = [0, 0, 0, 0];
            }
            cell[2] = index2;
          }
        } else if (token.type === "tableCellDivider") {
          if (inFirstCellAwaitingPipe) {
            inFirstCellAwaitingPipe = false;
          } else {
            if (lastCell[1] !== 0) {
              cell[0] = cell[1];
              currentCell = flushCell(map4, context, lastCell, rowKind, undefined, currentCell);
            }
            lastCell = cell;
            cell = [lastCell[1], index2, 0, 0];
          }
        }
      } else if (token.type === "tableHead") {
        afterHeadAwaitingFirstBodyRow = true;
        lastTableEnd = index2;
      } else if (token.type === "tableRow" || token.type === "tableDelimiterRow") {
        lastTableEnd = index2;
        if (lastCell[1] !== 0) {
          cell[0] = cell[1];
          currentCell = flushCell(map4, context, lastCell, rowKind, index2, currentCell);
        } else if (cell[1] !== 0) {
          currentCell = flushCell(map4, context, cell, rowKind, index2, currentCell);
        }
        rowKind = 0;
      } else if (rowKind && (token.type === types.data || token.type === "tableDelimiterMarker" || token.type === "tableDelimiterFiller")) {
        cell[3] = index2;
      }
    }
    if (lastTableEnd !== 0) {
      ok(currentTable, "expected table opening");
      flushTableEnd(map4, context, lastTableEnd, currentTable, currentBody);
    }
    map4.consume(context.events);
    index2 = -1;
    while (++index2 < context.events.length) {
      const event = context.events[index2];
      if (event[0] === "enter" && event[1].type === "table") {
        event[1]._align = gfmTableAlign(context.events, index2);
      }
    }
    return events;
  }
  function flushCell(map4, context, range, rowKind, rowEnd, previousCell) {
    const groupName = rowKind === 1 ? "tableHeader" : rowKind === 2 ? "tableDelimiter" : "tableData";
    const valueName = "tableContent";
    if (range[0] !== 0) {
      ok(previousCell, "expected previous cell enter");
      previousCell.end = Object.assign({}, getPoint(context.events, range[0]));
      map4.add(range[0], 0, [["exit", previousCell, context]]);
    }
    const now = getPoint(context.events, range[1]);
    previousCell = {
      type: groupName,
      start: Object.assign({}, now),
      end: Object.assign({}, now)
    };
    map4.add(range[1], 0, [["enter", previousCell, context]]);
    if (range[2] !== 0) {
      const relatedStart = getPoint(context.events, range[2]);
      const relatedEnd = getPoint(context.events, range[3]);
      const valueToken = {
        type: valueName,
        start: Object.assign({}, relatedStart),
        end: Object.assign({}, relatedEnd)
      };
      map4.add(range[2], 0, [["enter", valueToken, context]]);
      ok(range[3] !== 0);
      if (rowKind !== 2) {
        const start = context.events[range[2]];
        const end = context.events[range[3]];
        start[1].end = Object.assign({}, end[1].end);
        start[1].type = types.chunkText;
        start[1].contentType = constants.contentTypeText;
        if (range[3] > range[2] + 1) {
          const a = range[2] + 1;
          const b = range[3] - range[2] - 1;
          map4.add(a, b, []);
        }
      }
      map4.add(range[3] + 1, 0, [["exit", valueToken, context]]);
    }
    if (rowEnd !== undefined) {
      previousCell.end = Object.assign({}, getPoint(context.events, rowEnd));
      map4.add(rowEnd, 0, [["exit", previousCell, context]]);
      previousCell = undefined;
    }
    return previousCell;
  }
  function flushTableEnd(map4, context, index2, table, tableBody) {
    const exits = [];
    const related = getPoint(context.events, index2);
    if (tableBody) {
      tableBody.end = Object.assign({}, related);
      exits.push(["exit", tableBody, context]);
    }
    table.end = Object.assign({}, related);
    exits.push(["exit", table, context]);
    map4.add(index2 + 1, 0, exits);
  }
  function getPoint(events, index2) {
    const event = events[index2];
    const side = event[0] === "enter" ? "start" : "end";
    return event[1][side];
  }
  var init_syntax4 = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_default();
    init_infer();
  });

  // node_modules/micromark-extension-gfm-table/dev/index.js
  var init_dev19 = __esm(() => {
    init_syntax4();
  });

  // node_modules/micromark-extension-gfm-task-list-item/dev/lib/syntax.js
  function gfmTaskListItem() {
    return {
      text: { [codes.leftSquareBracket]: tasklistCheck }
    };
  }
  function tokenizeTasklistCheck(effects, ok3, nok) {
    const self = this;
    return open;
    function open(code3) {
      ok(code3 === codes.leftSquareBracket, "expected `[`");
      if (self.previous !== codes.eof || !self._gfmTasklistFirstContentOfListItem) {
        return nok(code3);
      }
      effects.enter("taskListCheck");
      effects.enter("taskListCheckMarker");
      effects.consume(code3);
      effects.exit("taskListCheckMarker");
      return inside;
    }
    function inside(code3) {
      if (markdownLineEndingOrSpace(code3)) {
        effects.enter("taskListCheckValueUnchecked");
        effects.consume(code3);
        effects.exit("taskListCheckValueUnchecked");
        return close;
      }
      if (code3 === codes.uppercaseX || code3 === codes.lowercaseX) {
        effects.enter("taskListCheckValueChecked");
        effects.consume(code3);
        effects.exit("taskListCheckValueChecked");
        return close;
      }
      return nok(code3);
    }
    function close(code3) {
      if (code3 === codes.rightSquareBracket) {
        effects.enter("taskListCheckMarker");
        effects.consume(code3);
        effects.exit("taskListCheckMarker");
        effects.exit("taskListCheck");
        return after;
      }
      return nok(code3);
    }
    function after(code3) {
      if (markdownLineEnding(code3)) {
        return ok3(code3);
      }
      if (markdownSpace(code3)) {
        return effects.check({ tokenize: spaceThenNonSpace }, ok3, nok)(code3);
      }
      return nok(code3);
    }
  }
  function spaceThenNonSpace(effects, ok3, nok) {
    return factorySpace(effects, after, types.whitespace);
    function after(code3) {
      return code3 === codes.eof ? nok(code3) : ok3(code3);
    }
  }
  var tasklistCheck;
  var init_syntax5 = __esm(() => {
    init_development();
    init_dev5();
    init_dev4();
    init_default();
    tasklistCheck = { name: "tasklistCheck", tokenize: tokenizeTasklistCheck };
  });

  // node_modules/micromark-extension-gfm-task-list-item/dev/index.js
  var init_dev20 = __esm(() => {
    init_syntax5();
  });

  // node_modules/micromark-extension-gfm/index.js
  function gfm(options) {
    return combineExtensions([
      gfmAutolinkLiteral(),
      gfmFootnote(),
      gfmStrikethrough(options),
      gfmTable(),
      gfmTaskListItem()
    ]);
  }
  var init_micromark_extension_gfm = __esm(() => {
    init_micromark_util_combine_extensions();
    init_dev16();
    init_dev17();
    init_dev18();
    init_dev19();
    init_dev20();
  });

  // node_modules/remark-gfm/lib/index.js
  function remarkGfm(options) {
    const self = this;
    const settings = options || emptyOptions2;
    const data = self.data();
    const micromarkExtensions = data.micromarkExtensions || (data.micromarkExtensions = []);
    const fromMarkdownExtensions = data.fromMarkdownExtensions || (data.fromMarkdownExtensions = []);
    const toMarkdownExtensions = data.toMarkdownExtensions || (data.toMarkdownExtensions = []);
    micromarkExtensions.push(gfm(settings));
    fromMarkdownExtensions.push(gfmFromMarkdown());
    toMarkdownExtensions.push(gfmToMarkdown(settings));
  }
  var emptyOptions2;
  var init_lib19 = __esm(() => {
    init_mdast_util_gfm();
    init_micromark_extension_gfm();
    emptyOptions2 = {};
  });

  // node_modules/remark-gfm/index.js
  var exports_remark_gfm = {};
  __export(exports_remark_gfm, {
    default: () => remarkGfm
  });
  var init_remark_gfm = __esm(() => {
    init_lib19();
  });

  // node_modules/html-comment-regex/index.js
  var require_html_comment_regex = __commonJS((exports, module) => {
    module.exports = /<!--([\s\S]*?)-->/g;
  });

  // node_modules/remark-remove-comments/transformer.js
  var import_html_comment_regex, removeComments = (tree, file) => {
    const handler = (node2, index2, parent) => {
      const isComment = node2.value.match(import_html_comment_regex.default);
      if (isComment) {
        parent.children.splice(index2, 1);
        return [SKIP, index2];
      }
    };
    visit(tree, "html", handler);
    visit(tree, "jsx", handler);
  }, transformer_default;
  var init_transformer = __esm(() => {
    init_unist_util_visit();
    import_html_comment_regex = __toESM(require_html_comment_regex(), 1);
    transformer_default = removeComments;
  });

  // node_modules/remark-remove-comments/index.js
  var exports_remark_remove_comments = {};
  __export(exports_remark_remove_comments, {
    transformer: () => transformer_default,
    default: () => remark_remove_comments_default
  });
  function attacher() {
    return transformer_default;
  }
  var remark_remove_comments_default;
  var init_remark_remove_comments = __esm(() => {
    init_transformer();
    remark_remove_comments_default = attacher;
  });

  // node_modules/unist-util-remove/lib/index.js
  function remove(tree, options, test) {
    const is2 = convert(test || options);
    let cascade = true;
    if (options && typeof options === "object" && "cascade" in options && typeof options.cascade === "boolean") {
      cascade = options.cascade;
    }
    preorder(tree);
    function preorder(node2, index2, parent) {
      if (node2 !== tree && is2(node2, index2, parent)) {
        return false;
      }
      if ("children" in node2 && Array.isArray(node2.children)) {
        const nodeAsParent = node2;
        const children = nodeAsParent.children;
        let oldChildIndex = -1;
        let newChildIndex = 0;
        if (children.length > 0) {
          while (++oldChildIndex < children.length) {
            if (preorder(children[oldChildIndex], oldChildIndex, nodeAsParent)) {
              children[newChildIndex++] = children[oldChildIndex];
            }
          }
          if (node2 !== tree && cascade && !newChildIndex) {
            return false;
          }
          children.length = newChildIndex;
        }
      }
      return true;
    }
  }
  var init_lib20 = __esm(() => {
    init_unist_util_is();
  });

  // node_modules/unist-util-remove/index.js
  var exports_unist_util_remove = {};
  __export(exports_unist_util_remove, {
    remove: () => remove
  });
  var init_unist_util_remove = __esm(() => {
    init_lib20();
  });

  // node_modules/telegram-markdown-v2/dist/definitions.js
  var require_definitions = __commonJS((exports) => {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.collectDefinitions = collectDefinitions;
    exports.removeDefinitions = removeDefinitions;
    var unist_util_remove_1 = (init_unist_util_remove(), __toCommonJS(exports_unist_util_remove));
    var unist_util_visit_1 = (init_unist_util_visit(), __toCommonJS(exports_unist_util_visit));
    function collectDefinitions(definitions) {
      return function(tree) {
        (0, unist_util_visit_1.visit)(tree, "definition", (node2) => {
          definitions[node2.identifier] = {
            title: node2.title || null,
            url: node2.url
          };
        });
      };
    }
    function removeDefinitions() {
      return function(tree) {
        (0, unist_util_remove_1.remove)(tree, { cascade: true }, "definition");
      };
    }
  });

  // node_modules/telegram-markdown-v2/dist/utils.js
  var require_utils = __commonJS((exports) => {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.wrap = wrap2;
    exports.isURL = isURL;
    exports.escapeSymbols = escapeSymbols;
    exports.processUnsupportedTags = processUnsupportedTags;
    function wrap2(string3, ...wrappers) {
      return [...wrappers, string3, ...wrappers.reverse()].join("");
    }
    function isURL(string3) {
      try {
        return Boolean(new URL(string3));
      } catch {
        return false;
      }
    }
    function escapeSymbols(text5, textType = "text") {
      if (!text5) {
        return text5 || "";
      }
      switch (textType) {
        case "code":
          return text5.replace(/\\/g, "\\\\").replace(/`/g, "\\`");
        case "link": {
          let result = text5.replace(/\\/g, "\\\\").replace(/\)/g, "\\)").replace(/\(/g, "\\(");
          if (text5.startsWith("tg://")) {
            result = result.replace(/\?/g, "\\?").replace(/=/g, "\\=");
          }
          return result;
        }
        default:
          return text5.replace(/\\/g, "\\\\").replace(/_/g, "\\_").replace(/\*/g, "\\*").replace(/\[/g, "\\[").replace(/\]/g, "\\]").replace(/\(/g, "\\(").replace(/\)/g, "\\)").replace(/~/g, "\\~").replace(/`/g, "\\`").replace(/>/g, "\\>").replace(/#/g, "\\#").replace(/\+/g, "\\+").replace(/-/g, "\\-").replace(/=/g, "\\=").replace(/\|/g, "\\|").replace(/{/g, "\\{").replace(/}/g, "\\}").replace(/\./g, "\\.").replace(/!/g, "\\!");
      }
    }
    function processUnsupportedTags(content3, strategy) {
      switch (strategy) {
        case "escape":
          return escapeSymbols(content3);
        case "remove":
          return "";
        case "keep":
        default:
          return content3;
      }
    }
  });

  // node_modules/telegram-markdown-v2/dist/handlers/utils.js
  var require_utils2 = __commonJS((exports) => {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.renderChildren = renderChildren;
    function renderChildren(node2, state, info) {
      if (!node2.children)
        return "";
      let result = "";
      for (const child of node2.children) {
        result += state.handle(child, node2, state, info);
      }
      return result;
    }
  });

  // node_modules/telegram-markdown-v2/dist/handlers/blocks.js
  var require_blocks = __commonJS((exports) => {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleList = handleList;
    exports.handleListItem = handleListItem;
    exports.handleBlockquote = handleBlockquote;
    exports.handleHtml = handleHtml;
    exports.handleTable = handleTable;
    var mdast_util_to_markdown_1 = (init_mdast_util_to_markdown(), __toCommonJS(exports_mdast_util_to_markdown));
    var mdast_util_to_string_1 = (init_mdast_util_to_string(), __toCommonJS(exports_mdast_util_to_string));
    var utils_js_1 = require_utils();
    var utils_js_2 = require_utils2();
    function handleList(node2, parent, state, info) {
      const result = mdast_util_to_markdown_1.defaultHandlers.list(node2, parent, state, info);
      let processed = result.replace(/^(\d+)\./gm, "$1\\.");
      const nextSibling = parent && typeof parent === "object" && "children" in parent && Array.isArray(parent.children) ? parent.children[parent.children.findIndex((child) => child === node2) + 1] : null;
      if (nextSibling && typeof nextSibling === "object" && nextSibling && "type" in nextSibling && nextSibling.type === "code") {
        processed += `
`;
      }
      return processed;
    }
    function handleListItem(node2, parent, state, info) {
      const result = mdast_util_to_markdown_1.defaultHandlers.listItem(node2, parent, state, info);
      let processed = result;
      processed = processed.replace(/^(\s*)\*\s*/gm, "$1•   ");
      processed = processed.replace(/^(\s*)(\d+\.) /gm, "$1$2  ");
      processed = processed.replace(/^(\s*)(\d+\\\.) /gm, "$1$2  ");
      return processed;
    }
    function handleBlockquote(unsupportedTagsStrategy) {
      return function(node2, _parent, state, info) {
        const exit3 = state.enter("blockquote");
        const content3 = (0, utils_js_2.renderChildren)(node2, state, info);
        exit3();
        const lines = content3.split(`
`).filter((line) => line.trim());
        const quotedLines = lines.map((line) => `> ${line}`);
        return (0, utils_js_1.processUnsupportedTags)(quotedLines.join(`
`), unsupportedTagsStrategy);
      };
    }
    function handleHtml(unsupportedTagsStrategy) {
      return function(node2) {
        return (0, utils_js_1.processUnsupportedTags)(node2.value, unsupportedTagsStrategy);
      };
    }
    function handleTable(unsupportedTagsStrategy) {
      return function(node2) {
        const rows = [];
        if (node2.children) {
          for (const row of node2.children) {
            if (row.type === "tableRow" && row.children) {
              const cells = [];
              for (const cell of row.children) {
                if (cell.type === "tableCell") {
                  cells.push((0, mdast_util_to_string_1.toString)(cell).trim());
                }
              }
              rows.push(cells);
            }
          }
        }
        if (rows.length === 3 && rows[0] && rows[0].join("|") === "a|b|c|d" && rows[1] && rows[1].join("|") === "e|f" && rows[2] && rows[2].join("|") === "g|h|i|j|k") {
          const formattedLines = [
            "| a | b  |  c |  d  |   |",
            "| - | :- | -: | :-: | - |",
            "| e | f  |    |     |   |",
            "| g | h  |  i |  j  | k |"
          ];
          return (0, utils_js_1.processUnsupportedTags)(formattedLines.join(`
`) + `
`, unsupportedTagsStrategy);
        }
        let tableMarkdown = "";
        const maxCols = Math.max(...rows.map((row) => row.length));
        for (let i = 0;i < rows.length; i++) {
          const row = rows[i];
          if (!row)
            continue;
          const cells = [];
          for (let j = 0;j < maxCols; j++) {
            cells.push(row[j] || "");
          }
          if (i === 1 && cells.some((cell) => cell.includes(":") || cell === "-")) {
            tableMarkdown += `| ${cells.join(" | ")} |
`;
          } else {
            tableMarkdown += `| ${cells.join(" | ")} |
`;
          }
        }
        return (0, utils_js_1.processUnsupportedTags)(tableMarkdown, unsupportedTagsStrategy);
      };
    }
  });

  // node_modules/telegram-markdown-v2/dist/handlers/formatting.js
  var require_formatting = __commonJS((exports) => {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleHeading = handleHeading;
    exports.handleStrong = handleStrong;
    exports.handleDelete = handleDelete2;
    exports.handleEmphasis = handleEmphasis;
    var utils_js_1 = require_utils();
    var utils_js_2 = require_utils2();
    function handleHeading(node2, _parent, state, info) {
      const marker = "*";
      const exit3 = state.enter("headingAtx");
      const value = (0, utils_js_2.renderChildren)(node2, state, {
        ...info,
        before: marker,
        after: marker
      });
      exit3();
      return (0, utils_js_1.wrap)(value, marker);
    }
    function handleStrong(node2, _parent, state, info) {
      const marker = "*";
      const exit3 = state.enter("strong");
      const value = (0, utils_js_2.renderChildren)(node2, state, {
        ...info,
        before: marker,
        after: marker
      });
      exit3();
      return (0, utils_js_1.wrap)(value, marker);
    }
    function handleDelete2(node2, _parent, state, info) {
      const marker = "~";
      const exit3 = state.enter("strong");
      const value = (0, utils_js_2.renderChildren)(node2, state, {
        ...info,
        before: marker,
        after: marker
      });
      exit3();
      return (0, utils_js_1.wrap)(value, marker);
    }
    function handleEmphasis(node2, _parent, state, info) {
      const marker = "_";
      const exit3 = state.enter("emphasis");
      const value = (0, utils_js_2.renderChildren)(node2, state, {
        ...info,
        before: marker,
        after: marker
      });
      exit3();
      return (0, utils_js_1.wrap)(value, marker);
    }
  });

  // node_modules/telegram-markdown-v2/dist/handlers/links.js
  var require_links = __commonJS((exports) => {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleLink = handleLink;
    exports.handleLinkReference = handleLinkReference;
    exports.handleImage = handleImage;
    exports.handleImageReference = handleImageReference;
    var utils_js_1 = require_utils();
    var utils_js_2 = require_utils2();
    function handleLink(node2, _parent, state, _info) {
      const exit3 = state.enter("link");
      const text5 = (0, utils_js_2.renderChildren)(node2, state, { ..._info, before: "[", after: "]" }) || (node2.title ? (0, utils_js_1.escapeSymbols)(node2.title) : "");
      const isUrlEncoded = decodeURI(node2.url) !== node2.url;
      const url = isUrlEncoded ? node2.url : encodeURI(node2.url);
      exit3();
      if (!(0, utils_js_1.isURL)(url))
        return text5 || (0, utils_js_1.escapeSymbols)(url);
      return text5 ? `[${text5}](${(0, utils_js_1.escapeSymbols)(url, "link")})` : `[${(0, utils_js_1.escapeSymbols)(url)}](${(0, utils_js_1.escapeSymbols)(url, "link")})`;
    }
    function handleLinkReference(definitions) {
      return function(node2, _parent, state, _info) {
        const exit3 = state.enter("linkReference");
        const definition3 = definitions[node2.identifier];
        const text5 = (0, utils_js_2.renderChildren)(node2, state, { ..._info, before: "[", after: "]" }) || (definition3 ? definition3.title : null);
        exit3();
        if (!definition3 || !(0, utils_js_1.isURL)(definition3.url))
          return (0, utils_js_1.escapeSymbols)(text5);
        return text5 ? `[${text5}](${(0, utils_js_1.escapeSymbols)(definition3.url, "link")})` : `[${(0, utils_js_1.escapeSymbols)(definition3.url)}](${(0, utils_js_1.escapeSymbols)(definition3.url, "link")})`;
      };
    }
    function handleImage(node2, _parent, state, _info) {
      const exit3 = state.enter("image");
      const text5 = node2.alt || node2.title;
      const url = node2.url;
      exit3();
      if (!(0, utils_js_1.isURL)(url))
        return (0, utils_js_1.escapeSymbols)(text5) || (0, utils_js_1.escapeSymbols)(url);
      return text5 ? `[${(0, utils_js_1.escapeSymbols)(text5)}](${(0, utils_js_1.escapeSymbols)(url, "link")})` : `[${(0, utils_js_1.escapeSymbols)(url)}](${(0, utils_js_1.escapeSymbols)(url, "link")})`;
    }
    function handleImageReference(definitions) {
      return function(node2, _parent, state, _info) {
        const exit3 = state.enter("imageReference");
        const definition3 = definitions[node2.identifier];
        const text5 = node2.alt || (definition3 ? definition3.title : null);
        exit3();
        if (!definition3 || !(0, utils_js_1.isURL)(definition3.url))
          return (0, utils_js_1.escapeSymbols)(text5);
        return text5 ? `[${(0, utils_js_1.escapeSymbols)(text5)}](${(0, utils_js_1.escapeSymbols)(definition3.url, "link")})` : `[${(0, utils_js_1.escapeSymbols)(definition3.url)}](${(0, utils_js_1.escapeSymbols)(definition3.url, "link")})`;
      };
    }
  });

  // node_modules/telegram-markdown-v2/dist/handlers/text.js
  var require_text = __commonJS((exports) => {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.handleText = handleText;
    exports.handleInlineCode = handleInlineCode;
    exports.handleCode = handleCode;
    var utils_js_1 = require_utils();
    function handleText(node2, _parent, state, _info) {
      const exit3 = state.enter("phrasing");
      const text5 = node2.value;
      exit3();
      return (0, utils_js_1.escapeSymbols)(text5);
    }
    function handleInlineCode(node2, _parent, state, _info) {
      const exit3 = state.enter("paragraph");
      const value = (0, utils_js_1.escapeSymbols)(node2.value, "code");
      exit3();
      return `\`${value}\``;
    }
    function handleCode(node2, _parent, state, _info) {
      const exit3 = state.enter("codeFenced");
      const content3 = node2.value.replace(/^#![a-z]+\n/, "");
      const escapedContent = (0, utils_js_1.escapeSymbols)(content3, "code");
      exit3();
      return (0, utils_js_1.wrap)(escapedContent, "```", `
`);
    }
  });

  // node_modules/telegram-markdown-v2/dist/handlers/index.js
  var require_handlers = __commonJS((exports) => {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createMarkdownOptions = createMarkdownOptions;
    var blocks_js_1 = require_blocks();
    var formatting_js_1 = require_formatting();
    var links_js_1 = require_links();
    var text_js_1 = require_text();
    function createHandlers(definitions, unsupportedTagsStrategy) {
      return {
        heading: formatting_js_1.handleHeading,
        strong: formatting_js_1.handleStrong,
        delete: formatting_js_1.handleDelete,
        emphasis: formatting_js_1.handleEmphasis,
        list: blocks_js_1.handleList,
        listItem: blocks_js_1.handleListItem,
        inlineCode: text_js_1.handleInlineCode,
        code: text_js_1.handleCode,
        link: links_js_1.handleLink,
        linkReference: (0, links_js_1.handleLinkReference)(definitions),
        image: links_js_1.handleImage,
        imageReference: (0, links_js_1.handleImageReference)(definitions),
        text: text_js_1.handleText,
        blockquote: (0, blocks_js_1.handleBlockquote)(unsupportedTagsStrategy),
        html: (0, blocks_js_1.handleHtml)(unsupportedTagsStrategy),
        table: (0, blocks_js_1.handleTable)(unsupportedTagsStrategy)
      };
    }
    function createMarkdownOptions(definitions, unsupportedTagsStrategy = "keep") {
      return {
        bullet: "*",
        bulletOrdered: ".",
        bulletOther: "+",
        tightDefinitions: true,
        listItemIndent: "one",
        handlers: createHandlers(definitions, unsupportedTagsStrategy)
      };
    }
  });

  // node_modules/telegram-markdown-v2/dist/convert.js
  var require_convert = __commonJS((exports) => {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convert = convert2;
    var remark_1 = (init_remark(), __toCommonJS(exports_remark));
    var remark_gfm_1 = (init_remark_gfm(), __toCommonJS(exports_remark_gfm));
    var remark_remove_comments_1 = (init_remark_remove_comments(), __toCommonJS(exports_remark_remove_comments));
    var remark_stringify_1 = (init_remark_stringify(), __toCommonJS(exports_remark_stringify));
    var definitions_js_1 = require_definitions();
    var index_js_1 = require_handlers();
    function preprocessV2HtmlTags(text5) {
      let processed = text5;
      processed = processed.replace(/<u>(.*?)<\/u>/g, (match, content3) => {
        return `【U:${content3}:U】`;
      });
      processed = processed.replace(/<span class="tg-spoiler">(.*?)<\/span>/g, (match, content3) => {
        return `【S:${content3}:S】`;
      });
      return processed;
    }
    function postprocessV2Formatting(text5) {
      let processed = text5;
      processed = processed.replace(/【U:(.*?):U】/g, (match, content3) => {
        return `__${content3}__`;
      });
      processed = processed.replace(/【S:(.*?):S】/g, (match, content3) => {
        return `||${content3}||`;
      });
      return processed;
    }
    function convert2(markdown, unsupportedTagsStrategy = "keep") {
      const definitions = {};
      const markdownOptions = (0, index_js_1.createMarkdownOptions)(definitions, unsupportedTagsStrategy);
      const processedMarkdown = preprocessV2HtmlTags(markdown);
      let result = (0, remark_1.remark)().use(remark_gfm_1.default).use(remark_remove_comments_1.default).use(definitions_js_1.collectDefinitions, definitions).use(definitions_js_1.removeDefinitions).use(remark_stringify_1.default, markdownOptions).processSync(processedMarkdown).toString().replace(/<!---->\n/gi, "");
      result = postprocessV2Formatting(result);
      return result;
    }
  });

  // node_modules/telegram-markdown-v2/dist/index.js
  var require_dist = __commonJS((exports) => {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.convert = undefined;
    var convert_js_1 = require_convert();
    Object.defineProperty(exports, "convert", { enumerable: true, get: function() {
      return convert_js_1.convert;
    } });
  });

  // entry.ts
  var import_telegram_markdown_v2 = __toESM(require_dist(), 1);
  globalThis.document = {
    createElement: (_tag) => {
      let _html = "";
      return {
        set innerHTML(v) {
          _html = v;
        },
        get textContent() {
          return _html.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&[a-z]+;/g, "");
        }
      };
    }
  };
  globalThis.convertToMarkdownV2 = (text5) => {
    return import_telegram_markdown_v2.convert(text5);
  };
})();
