import Cookie from "js-cookie";
import dayjs from "dayjs";

export function checkLoginStatus() {
  return !!Cookie.get("user_id");
}

export function setLoginStatus({
  user_id,
  user_name,
  user_role,
  organization,
}) {
  Cookie.set("user_id", user_id);
  Cookie.set("user_name", user_name);
  Cookie.set("user_role", user_role);
  Cookie.set("organization", organization);
}

export function getUserInfo() {
  return {
    user_id: Cookie.get("user_id"),
    user_name: Cookie.get("user_name"),
    user_role: Cookie.get("user_role"),
    organization: Cookie.get("organization"),
  };
}

export function relativeDate(day) {
  return day ? dayjs(day).format("MMM D, YYYY") : "";
}

export function getCapitalName(name) {
  if (!name) {
    return "*";
  }
  let arr = String(name).split(" ");
  arr = arr.length >= 2 ? arr.slice(0, 2) : arr.slice(0, 1);
  arr = arr.map((item) =>
    typeof item[0] === "string" ? item[0].toUpperCase() : ""
  );
  return arr.join("");
}

export function convertCurrency(number) {
  return new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "USD",
  }).format(number);
}
