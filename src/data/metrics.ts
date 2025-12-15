// Data from UK Co-Benefits Dataset - Level 3 (Level_3.xlsx)
// All values in millions GBP unless otherwise specified

export const summaryStats = {
  totalSmallAreas: 46426,
  totalPopulation: 67620212,
  totalHouseholds: 28135927,
  yearsSpan: "2025-2050",
  totalYears: 26
}

// Co-benefit types with total sum (2025-2050)
export const benefitsData = [
  { name: "Physical Activity", value: 129879.19, icon: "🚴", color: "#10b981", description: "Health benefits from increased walking and cycling" },
  { name: "Air Quality", value: 48259.41, icon: "🌬️", color: "#3b82f6", description: "Reduced mortality and health costs from cleaner air" },
  { name: "Noise Reduction", value: 34207.75, icon: "🔇", color: "#8b5cf6", description: "Amenity and sleep benefits from quieter environments" },
  { name: "Excess Cold", value: 8801.60, icon: "🏠", color: "#f59e0b", description: "Reduced cold-related mortality from better insulation" },
  { name: "Diet Change", value: 5054.87, icon: "🥗", color: "#ec4899", description: "Health benefits from improved diet" },
  { name: "Dampness", value: 641.80, icon: "💧", color: "#6366f1", description: "Health benefits from reduced damp housing" },
  { name: "Excess Heat", value: 0.11, icon: "🌡️", color: "#ef4444", description: "Reduced heat-related mortality" }
]

// Negative impacts (costs)
export const costsData = [
  { name: "Hassle Costs", value: -70842.52, color: "#ef4444" },
  { name: "Congestion", value: -7623.78, color: "#f97316" },
  { name: "Road Safety", value: -2429.88, color: "#eab308" },
  { name: "Road Repairs", value: -327.17, color: "#84cc16" }
]

// Total benefits (positive only)
export const totalPositiveBenefits = 226844.73 // millions GBP

// By damage type
export const damageTypeData = [
  { type: "Health", value: 198338.59, color: "#10b981" },
  { type: "Non-Health", value: -52717.22, color: "#ef4444" }
]

// By damage pathway
export const damagePathwayData = [
  { pathway: "Reduced Mortality", value: 181077.24, color: "#10b981" },
  { pathway: "Amenity", value: 20067.44, color: "#3b82f6" },
  { pathway: "Sleep Disturbance", value: 14140.31, color: "#8b5cf6" },
  { pathway: "Society", value: 5119.78, color: "#f59e0b" },
  { pathway: "QALY", value: 3121.05, color: "#ec4899" },
  { pathway: "NHS", value: 561.85, color: "#14b8a6" }
]

// By nation
export const regionalData = [
  { region: "England/Wales", value: 129777.51, color: "#10b981" },
  { region: "Scotland", value: 12655.16, color: "#3b82f6" },
  { region: "Northern Ireland", value: 3188.71, color: "#8b5cf6" }
]

// Top 10 Local Authorities
export const topLocalAuthorities = [
  { name: "Birmingham", value: 2313.55 },
  { name: "Leeds", value: 1777.29 },
  { name: "Cornwall", value: 1685.84 },
  { name: "Wiltshire", value: 1280.88 },
  { name: "Sheffield", value: 1243.23 },
  { name: "Cheshire East", value: 1200.72 },
  { name: "Bromley", value: 1169.02 },
  { name: "Bradford", value: 1153.36 },
  { name: "City of Edinburgh", value: 1111.33 },
  { name: "Barnet", value: 1084.19 }
]

// Yearly data by co-benefit type
export const yearlyBenefitsData = {
  physical_activity: [
    { year: 2025, value: 1609.18 },
    { year: 2030, value: 4085.08 },
    { year: 2035, value: 4940.14 },
    { year: 2040, value: 5649.21 },
    { year: 2045, value: 6203.15 },
    { year: 2050, value: 6605.74 }
  ],
  air_quality: [
    { year: 2025, value: 172.41 },
    { year: 2030, value: 577.17 },
    { year: 2035, value: 1521.34 },
    { year: 2040, value: 2494.13 },
    { year: 2045, value: 3090.07 },
    { year: 2050, value: 3082.33 }
  ],
  noise: [
    { year: 2025, value: 117.01 },
    { year: 2030, value: 551.42 },
    { year: 2035, value: 1492.89 },
    { year: 2040, value: 1803.98 },
    { year: 2045, value: 1823.19 },
    { year: 2050, value: 1708.98 }
  ],
  excess_cold: [
    { year: 2025, value: 0.18 },
    { year: 2030, value: 103.85 },
    { year: 2035, value: 162.30 },
    { year: 2040, value: 469.65 },
    { year: 2045, value: 656.32 },
    { year: 2050, value: 682.69 }
  ],
  diet_change: [
    { year: 2025, value: 0 },
    { year: 2030, value: 235.12 },
    { year: 2035, value: 220.42 },
    { year: 2040, value: 206.05 },
    { year: 2045, value: 192.64 },
    { year: 2050, value: 179.72 }
  ],
  dampness: [
    { year: 2025, value: 0 },
    { year: 2030, value: 13.47 },
    { year: 2035, value: 18.74 },
    { year: 2040, value: 31.77 },
    { year: 2045, value: 39.82 },
    { year: 2050, value: 43.88 }
  ]
}

// Combined timeline data
export const timelineData = [
  { year: 2025, physicalActivity: 1609.18, airQuality: 172.41, noise: 117.01, excessCold: 0.18, total: 1898.79 },
  { year: 2030, physicalActivity: 4085.08, airQuality: 577.17, noise: 551.42, excessCold: 103.85, total: 5566.10 },
  { year: 2035, physicalActivity: 4940.14, airQuality: 1521.34, noise: 1492.89, excessCold: 162.30, total: 8355.84 },
  { year: 2040, physicalActivity: 5649.21, airQuality: 2494.13, noise: 1803.98, excessCold: 469.65, total: 10654.81 },
  { year: 2045, physicalActivity: 6203.15, airQuality: 3090.07, noise: 1823.19, excessCold: 656.32, total: 12005.19 },
  { year: 2050, physicalActivity: 6605.74, airQuality: 3082.33, noise: 1708.98, excessCold: 682.69, total: 12303.35 }
]

// Cumulative totals by year
export const cumulativeData = [
  { year: 2025, cumulative: 1898.79 },
  { year: 2030, cumulative: 7464.89 },
  { year: 2035, cumulative: 15820.73 },
  { year: 2040, cumulative: 26475.54 },
  { year: 2045, cumulative: 38480.73 },
  { year: 2050, cumulative: 50784.08 }
]

// Health outcomes
export const healthOutcomes = [
  { 
    name: "Reduced Mortality",
    value: 181077.24,
    description: "Lives saved through cleaner air and healthier lifestyles",
    icon: "❤️",
    color: "#10b981"
  },
  {
    name: "Sleep Quality",
    value: 14140.31,
    description: "Benefits from reduced noise pollution",
    icon: "😴",
    color: "#8b5cf6"
  },
  {
    name: "Quality of Life",
    value: 3121.05,
    description: "Quality-adjusted life years gained",
    icon: "✨",
    color: "#3b82f6"
  },
  {
    name: "NHS Savings",
    value: 561.85,
    description: "Reduced healthcare costs",
    icon: "🏥",
    color: "#f59e0b"
  }
]

// Economic breakdown
export const economicData = [
  { name: "Health Benefits", value: 198338.59, description: "Total health-related co-benefits", color: "#10b981" },
  { name: "Amenity Value", value: 20067.44, description: "Environmental quality improvements", color: "#3b82f6" },
  { name: "Society Benefits", value: 5119.78, description: "Broader societal benefits", color: "#8b5cf6" },
  { name: "NHS Savings", value: 561.85, description: "Direct healthcare cost savings", color: "#f59e0b" }
]

// Format functions
export function formatMillions(value: number): string {
  if (Math.abs(value) >= 1000) {
    return `£${(value / 1000).toFixed(1)}B`
  }
  return `£${value.toFixed(1)}M`
}

export function formatNumber(value: number): string {
  return value.toLocaleString('en-GB')
}
