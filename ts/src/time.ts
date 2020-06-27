// Copyright: Ankitects Pty Ltd and contributors
// License: GNU AGPL, version 3 or later; http://www.gnu.org/licenses/agpl.html

import { I18n } from "./i18n";
import { FluentNumber } from "@fluent/bundle";

const SECOND = 1.0;
const MINUTE = 60.0 * SECOND;
const HOUR = 60.0 * MINUTE;
const DAY = 24.0 * HOUR;
const MONTH = 30.0 * DAY;
const YEAR = 12.0 * MONTH;

enum TimespanUnit {
    Seconds,
    Minutes,
    Hours,
    Days,
    Months,
    Years,
}

function unitName(unit: TimespanUnit): string {
    switch (unit) {
        case TimespanUnit.Seconds:
            return "seconds";
        case TimespanUnit.Minutes:
            return "minutes";
        case TimespanUnit.Hours:
            return "hours";
        case TimespanUnit.Days:
            return "days";
        case TimespanUnit.Months:
            return "months";
        case TimespanUnit.Years:
            return "years";
    }
}

function naturalUnit(secs: number): TimespanUnit {
    secs = Math.abs(secs);
    if (secs < MINUTE) {
        return TimespanUnit.Seconds;
    } else if (secs < HOUR) {
        return TimespanUnit.Minutes;
    } else if (secs < DAY) {
        return TimespanUnit.Hours;
    } else if (secs < MONTH) {
        return TimespanUnit.Days;
    } else if (secs < YEAR) {
        return TimespanUnit.Months;
    } else {
        return TimespanUnit.Years;
    }
}

function unitAmount(unit: TimespanUnit, secs: number): number {
    switch (unit) {
        case TimespanUnit.Seconds:
            return secs;
        case TimespanUnit.Minutes:
            return secs / MINUTE;
        case TimespanUnit.Hours:
            return secs / HOUR;
        case TimespanUnit.Days:
            return secs / DAY;
        case TimespanUnit.Months:
            return secs / MONTH;
        case TimespanUnit.Years:
            return secs / YEAR;
    }
}

export function studiedToday(i18n: I18n, cards: number, secs: number): string {
    const unit = naturalUnit(secs);
    const amount = unitAmount(unit, secs);
    const name = unitName(unit);

    let secsPer = 0;
    if (cards > 0) {
        secsPer = secs / cards;
    }
    return i18n.tr(i18n.TR.STATISTICS_STUDIED_TODAY, {
        cards,
        amount,
        unit: name,
        "secs-per-card": secsPer,
    });
}