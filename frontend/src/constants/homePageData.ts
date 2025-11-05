import { BrandName } from "./brandLogos"

export const peopleChartData = [
  { date: "Oct 6", value: 45 },
  { date: "Oct 8", value: 50 },
  { date: "Oct 10", value: 48 },
  { date: "Oct 12", value: 75 },
  { date: "Oct 14", value: 52 },
  { date: "Oct 17", value: 55 },
  { date: "Oct 22", value: 58 },
  { date: "Oct 24", value: 60 },
  { date: "Oct 26", value: 80 },
  { date: "Oct 28", value: 0 },
  { date: "Nov 1", value: 0 },
  { date: "Nov 3", value: 0 },
]

export const companiesChartData = [
  { date: "Oct 6", value: 30 },
  { date: "Oct 8", value: 35 },
  { date: "Oct 10", value: 32 },
  { date: "Oct 12", value: 50 },
  { date: "Oct 14", value: 38 },
  { date: "Oct 17", value: 40 },
  { date: "Oct 22", value: 42 },
  { date: "Oct 24", value: 45 },
  { date: "Oct 26", value: 60 },
  { date: "Oct 28", value: 0 },
  { date: "Nov 1", value: 0 },
  { date: "Nov 3", value: 0 },
]

export const leadGenerationData = {
  people: 14,
  companies: 25,
}

export const mostVisitedContacts = [
  { name: "Intercom", visits: 0, type: "brand" as const, brand: "intercom" as BrandName },
  { name: "Nvidia", visits: 0, type: "brand" as const, brand: "nvidia" as BrandName },
  { name: "Slack", visits: 0, type: "brand" as const, brand: "slack" as BrandName },
  { name: "AMD", visits: 0, type: "brand" as const, brand: "amd" as BrandName },
  { name: "Marie Jones", visits: 0, type: "person" as const },
  { name: "Philip Grant", visits: 0, type: "person" as const },
]

export const leastVisitedContacts = [
  { name: "Intercom", visits: 0, type: "brand" as const, brand: "intercom" as BrandName },
  { name: "Nvidia", visits: 0, type: "brand" as const, brand: "nvidia" as BrandName },
  { name: "Slack", visits: 0, type: "brand" as const, brand: "slack" as BrandName },
  { name: "AMD", visits: 0, type: "brand" as const, brand: "amd" as BrandName },
  { name: "Kathleen Graves", visits: 0, type: "person" as const },
  { name: "Philip Grant", visits: 0, type: "person" as const },
]

export const timeRanges = ["1d", "3d", "7d", "30d", "Custom"] as const

