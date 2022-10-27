import * as fs from 'fs';

const locales = loadLocales();
const availableLocales = locales.map(l => l.name);

type Locale = {
    name: string; // The name of the locale
    error: object;
}

/*
Functions
*/
export function showError(errorType: 'no_permissions', locale: string) {

}

/*
Loading script
*/
function loadLocale(locale: string): Locale {
    return {
        name: locale,
        error: require(`./${locale}/error`)
    }
}

function loadLocales() {
    const locales = [];

    const localeFiles = fs.readdirSync('../locales').filter(file => !file.includes('.'));

    for (const folder of localeFiles) {
        console.log(folder);
        const locale = loadLocale(folder);
        locales.push(locale);
    }

    return locales;
}

const translated = {
    "failed": false,
    "string": ""
}

interface localeUnavailable {
    failed: true;
    reason: string;
    locale: "missing" | "found" | "partial";
    localeName: string;
}

interface translated {
    failed: false;
    str: string;
    locale: "missing" | "found" | "partial";
    localeName: string;
}