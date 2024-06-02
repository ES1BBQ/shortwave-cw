/** Turn locator to nato fonetic */
export const ch2nato = function (ch) {
    switch (ch.toLowerCase()) {
        case "a":
            return "ALPHA";
        case "b":
            return "BRAVO";
        case "c":
            return "CHARLIE";
        case "d":
            return "DELTA";
        case "e":
            return "ECHO";
        case "f":
            return "FOXTROT";
        case "g":
            return "GOLF";
        case "h":
            return "HOTEL";
        case "i":
            return "INDIA";
        case "j":
            return "JULIET";
        case "k":
            return "KILO";
        case "l":
            return "LIMA";
        case "m":
            return "MIKE";
        case "n":
            return "NOVEMBER";
        case "o":
            return "OSCAR";
        case "p":
            return "PAPA";
        case "q":
            return "QUEBEC";
        case "r":
            return "ROMEO";
        case "s":
            return "SIERRA";
        case "t":
            return "TANGO";
        case "u":
            return "UNIFORM";
        case "v":
            return "VICTOR";
        case "w":
            return "WHISKEY";
        case "x":
            return "RAY";
        case "y":
            return "YANKEE";
        case "z":
            return "ZULU";
    }
    return ch;
}

/** Turn locator to finnish fonetic */
export const ch2faff = function (ch) {
    switch (ch.toLowerCase()) {
        case "a":
            return "AARNE";
        case "b":
            return "BERTTA";
        case "c":
            return "CELSIUS";
        case "d":
            return "DAAVID";
        case "e":
            return "EEMELI";
        case "f":
            return "FAARAO";
        case "g":
            return "GIDEON";
        case "h":
            return "HEIKKI";
        case "i":
            return "IIVARI";
        case "j":
            return "JUSSI";
        case "k":
            return "KALLE";
        case "l":
            return "LAURI";
        case "m":
            return "MATTI";
        case "n":
            return "NIILO";
        case "o":
            return "OTTO";
        case "p":
            return "PAAVO";
        case "q":
            return "QUINTUS";
        case "r":
            return "RISTO";
        case "s":
            return "SAKARI";
        case "t":
            return "TAUNO";
        case "u":
            return "URHO";
        case "v":
            return "VILLE";
        case "w":
            return "TUPLAVILLE";
        case "x":
            return "ÄKSÄ";
        case "y":
            return "YRJO";
        case "z":
            return "TSETA";
    }
    return ch;
}