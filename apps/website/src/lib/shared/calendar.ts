import cities from "@/assets/province.json";
import { HDate, HebrewCalendar, Location, Sedra } from "@hebcal/core";

Object.entries(cities).forEach(([key, { lat, lng }]) => {
  Location.addLocation(
    key,
    new Location(Number(lat), Number(lng), false, "Europe/Amsterdam", key, "IT")
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

export function getParshatImage(parshat: string[]) {
  switch (parshat[0]) {
    case "Bereshit":
      return "/images/parshat/bereshit.jpg";
    case "Ha'azinu":
      return "/images/parshat/ha'azinu.jpg";
    case "Nitzavim":
    case "Vayeilech":
      return "/images/parshat/nitzavim.jpg";
    case "Ki Tavo":
      return "/images/parshat/ki-tavo.jpg";
    case "Ki Teitzei":
      return "/images/parshat/ki-teitzei.jpg";
    case "Shoftim":
      return "/images/parshat/shoftim.webp";
    case "Re'eh":
      return "/images/parshat/reeh.webp";
    case "Eikev":
      return "/images/parshat/eikev.jpg";
    case "Vaetchanan":
      return "/images/parshat/vaetchanan.jpg";
    case "Devarim":
      return "/images/parshat/devarim.jpg";
    case "Matot":
    case "Masei":
      return "/images/parshat/matot.jpg";
    case "Pinchas":
      return "/images/parshat/pinchas.jpg";
    case "Chukat":
    case "Balak":
      return "/images/parshat/chukat-balak.jpg";
    case "Korach":
      return "/images/parshat/korach.webp";
    case "Sh'lach":
      return "/images/parshat/shlach.jpg";
    case "Beha'alotcha":
      return "/images/parshat/behaalotcha.jpg";
    case "Nasso":
      return "/images/parshat/nasso.webp";
    case "Bamidbar":
      return "/images/parshat/bamidbar.jpg";
    case "Behar":
    case "Bechukotai":
      return "/images/parshat/bechukotai.jpg";
    case "Emor":
      return "/images/parshat/emor.jpg";
    case "Achrei Mot":
    case "Kedoshim":
      return "/images/parshat/acharei-kedoshim.jpeg";
    case "Tazria":
    case "Metzora":
      return "/images/parshat/metzorah.jpg";
    case "Shmini":
      return "/images/parshat/shmini.jpg";
    case "Tzav":
      return "/images/parshat/tzav.jpg";
    case "Vayikra":
      return "/images/parshat/vayikra.jpg";
    case "Vayakhel":
    case "Pekudei":
      return "/images/parshat/pekudei.jpg";
    case "Ki Tisa":
      return "/images/parshat/ki-tisa.jpg";
    case "Tetzaveh":
      return "/images/parshat/tetzaveh.jpg";
    case "Terumah":
      return "/images/parshat/terumah.jpg";
    case "Mishpatim":
      return "/images/parshat/mishpatim.jpg";
    case "Yitro":
      return "/images/parshat/yitro.jpg";
    case "Beshalach":
      return "/images/parshat/beshalach.webp";
    case "Bo":
      return "/images/parshat/bo.jpg";
    case "Vaera":
      return "/images/parshat/vaera.jpg";
    case "Shemot":
      return "/images/parshat/shemot.jpg";
    case "Vayechi":
      return "/images/parshat/vayechi.jpg";
    case "Vayigash":
      return "/images/parshat/vayigash.jpg";
    case "Miketz":
      return "/images/parshat/miketz.jpg";
    case "Vayeshev":
      return "/images/parshat/vayeshev.jpg";
    case "Vayishlach":
      return "/images/parshat/vayishlach.jpg";
    case "Vayetzei":
      return "/images/parshat/vayetzei.jpg";
    case "Toldot":
      return "/images/parshat/toldot.jpg";
    case "Chayei Sara":
      return "/images/parshat/chayei-sarah.jpg";
    case "Vayera":
      return "/images/parshat/vayera.jpg";
    case "Lech-Lecha":
      return "/images/parshat/lech-lecha.jpg";
    case "Noach":
      return "/images/parshat/noach.jpg";

    default:
      break;
  }
}

const holidayCalendar = Array.from(
  HebrewCalendar.calendar({
    start: new Date(),
    end: new Date(Date.now() + 365 * 1000 * 60 * 60 * 24),
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
