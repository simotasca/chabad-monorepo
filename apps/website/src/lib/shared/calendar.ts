import cities from "@/assets/cities.json";
import { HDate, HebrewCalendar, Location, Sedra } from "@hebcal/core";

Object.entries(cities).forEach(([key, { lat, lng }]) => {
  Location.addLocation(
    key,
    new Location(lat, lng, false, "Europe/Amsterdam", key, "IT")
  );
});

const oneDay = 1000 * 60 * 60 * 24;

export function getParshat(date: Date = new Date()) {
  let day = new HDate(date);
  const sedra = new Sedra(day.getFullYear(), false);
  // increment by one day until find a valid parshat
  let i = 0;
  while (!sedra.isParsha(day)) {
    i++;
    day = new HDate(new Date(date.getTime() + i * oneDay));
  }
  const parshat = sedra.get(day);
  return parshat;
}

const holidayCalendar = Array.from(
  HebrewCalendar.calendar({
    candlelighting: false,
    sedrot: false,
    noMinorFast: true,
    noRoshChodesh: true,
    noSpecialShabbat: true,
    noModern: true,
  })
);

export function upcomingEvent(date: Date = new Date()) {
  const today = new HDate(date);
  const upcoming = holidayCalendar.filter(
    (f) => f.getDate().greg().getTime() >= today.greg().getTime()
  )[0];

  return {
    date: upcoming.getDate().greg(),
    description: upcoming.desc,
    name: upcoming.basename(),
  };
}

export function hebDateFormat(date: Date = new Date()) {
  const hdate = new HDate(date);
  return `${hdate.getDate()} ${hdate.getMonthName()} ${hdate.getFullYear()}`;
}

export function getShabbesTimes(location: string, date: Date = new Date()) {
  const hdate = new HDate(date);
  const cal = Array.from(
    HebrewCalendar.calendar({
      year: new Date().getFullYear(),
      location: Location.lookup(location),
      candlelighting: true,
      sedrot: false,
      noHolidays: true,
      noMinorFast: true,
      noRoshChodesh: true,
      noSpecialShabbat: true,
      noModern: true,
    })
  );

  const candles = cal.filter(
    (e) =>
      e.getDesc() == "Candle lighting" && // only candle lighting
      e.getDate().greg().getTime() >= hdate.greg().getTime() && // after date
      e.getDate().getDay() == 5 // only fridays
  );

  const havdalas = cal.filter(
    (e) =>
      e.getDesc() == "Havdalah" && // only candle lighting
      e.getDate().greg().getTime() >= hdate.greg().getTime() && // after date
      e.getDate().getDay() == 6 // only saturdays
  );

  const nextShabbesStart = candles[0];
  /** @ts-ignore */
  const nextShabbesStartDate = nextShabbesStart.eventTime;

  const nextShabbesEnd = havdalas[0];
  /** @ts-ignore */
  const nextShabbesEndDate = nextShabbesEnd.eventTime;

  return {
    start: nextShabbesStartDate,
    end: nextShabbesEndDate,
  };
}

export function formatDate(date: string | number | Date) {
  return new Date(date).toLocaleDateString("it", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
}
