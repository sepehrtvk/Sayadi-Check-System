export function toFarsiNumber(n: any) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];

  return n.toString().replace(/\d/g, (x: any) => farsiDigits[x]);
}
export function toEnglishNumber(s: any) {
  return s.replace(/[۰-۹]/g, (d: any) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));
}
