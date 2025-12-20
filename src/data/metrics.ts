// Data from UK Co-Benefits Dataset - Level 3 (Level_3.xlsx)
// All values in millions GBP unless otherwise specified

export const summaryStats = {
  totalSmallAreas: 46426,
  totalPopulation: 67620212,
  totalHouseholds: 28135927,
  yearsSpan: "2025-2050",
  totalYears: 26,
};

// Co-benefit types with total sum (2025-2050) - Top 3 Benefits Only
export const benefitsData = [
  {
    name: "Physical Activity",
    value: 129879.19,
    icon: "🚴",
    color: "#10b981",
    description: "Health benefits from increased walking and cycling",
    detailedInfo:
      "Promotes cardiovascular health, reduces obesity, and improves mental wellbeing through active transportation",
  },
  {
    name: "Air Quality",
    value: 48259.41,
    icon: "🌬️",
    color: "#3b82f6",
    description: "Reduced mortality and health costs from cleaner air",
    detailedInfo:
      "Decreases respiratory diseases, reduces PM2.5 and NO2 levels, and improves overall environmental quality",
  },
  {
    name: "Noise Reduction",
    value: 34207.75,
    icon: "🔇",
    color: "#8b5cf6",
    description: "Amenity and sleep benefits from quieter environments",
    detailedInfo:
      "Improves sleep quality, reduces stress levels, and enhances quality of life in urban areas",
  },
];

// Negative impacts (costs)
export const costsData = [
  { name: "Hassle Costs", value: -70842.52, color: "#ef4444" },
  { name: "Congestion", value: -7623.78, color: "#f97316" },
  { name: "Road Safety", value: -2429.88, color: "#eab308" },
  { name: "Road Repairs", value: -327.17, color: "#84cc16" },
];

// Total benefits (positive only) - Top 3 Benefits
export const totalPositiveBenefits = 212346.35; // millions GBP (Physical Activity + Air Quality + Noise Reduction)

// By damage type
export const damageTypeData = [
  { type: "Health", value: 198338.59, color: "#10b981" },
  { type: "Non-Health", value: -52717.22, color: "#ef4444" },
];

// By damage pathway
export const damagePathwayData = [
  { pathway: "Air Quality Improvement", value: 181077.24, color: "#10b981" },
  { pathway: "Noise Pollution Reduction", value: 14140.31, color: "#8b5cf6" },
  { pathway: "Active Transport", value: 3121.05, color: "#3b82f6" },
];

// By nation - with OpenStreetMap coordinates
export const regionalData = [
  {
    region: "England",
    value: 119568.25,
    color: "#10b981",
    lat: 52.3555,
    lng: -1.1743,
    population: 56490048,
    description: "Largest contributor with comprehensive green space programs",
  },
  {
    region: "Wales",
    value: 10209.26,
    color: "#f59e0b",
    lat: 52.1307,
    lng: -3.7837,
    population: 3152879,
    description: "Strong focus on active transport and nature conservation",
  },
  {
    region: "Scotland",
    value: 12655.16,
    color: "#3b82f6",
    lat: 56.4907,
    lng: -4.2026,
    population: 5463300,
    description: "Leading in air quality improvements and green infrastructure",
  },
  {
    region: "Northern Ireland",
    value: 3188.71,
    color: "#8b5cf6",
    lat: 54.5973,
    lng: -5.9301,
    population: 1893667,
    description: "Growing investment in sustainable transport networks",
  },
];

// Top 10 Local Authorities - with OpenStreetMap coordinates
export const topLocalAuthorities = [
  {
    name: "Birmingham",
    value: 2313.55,
    lat: 52.4862,
    lng: -1.8904,
    population: 1141816,
  },
  {
    name: "Leeds",
    value: 1777.29,
    lat: 53.8008,
    lng: -1.5491,
    population: 793139,
  },
  {
    name: "Cornwall",
    value: 1685.84,
    lat: 50.266,
    lng: -5.0527,
    population: 568210,
  },
  {
    name: "Wiltshire",
    value: 1280.88,
    lat: 51.349,
    lng: -1.9927,
    population: 498064,
  },
  {
    name: "Sheffield",
    value: 1243.23,
    lat: 53.3811,
    lng: -1.4701,
    population: 584028,
  },
  {
    name: "Cheshire East",
    value: 1200.72,
    lat: 53.1608,
    lng: -2.2186,
    population: 384152,
  },
  {
    name: "Bromley",
    value: 1169.02,
    lat: 51.406,
    lng: 0.014,
    population: 331096,
  },
  {
    name: "Bradford",
    value: 1153.36,
    lat: 53.796,
    lng: -1.7594,
    population: 539776,
  },
  {
    name: "City of Edinburgh",
    value: 1111.33,
    lat: 55.9533,
    lng: -3.1883,
    population: 524930,
  },
  {
    name: "Barnet",
    value: 1084.19,
    lat: 51.6252,
    lng: -0.1517,
    population: 392140,
  },
];

// Yearly data by co-benefit type
export const yearlyBenefitsData = {
  physical_activity: [
    { year: 2025, value: 1609.18 },
    { year: 2030, value: 4085.08 },
    { year: 2035, value: 4940.14 },
    { year: 2040, value: 5649.21 },
    { year: 2045, value: 6203.15 },
    { year: 2050, value: 6605.74 },
  ],
  air_quality: [
    { year: 2025, value: 172.41 },
    { year: 2030, value: 577.17 },
    { year: 2035, value: 1521.34 },
    { year: 2040, value: 2494.13 },
    { year: 2045, value: 3090.07 },
    { year: 2050, value: 3082.33 },
  ],
  noise: [
    { year: 2025, value: 117.01 },
    { year: 2030, value: 551.42 },
    { year: 2035, value: 1492.89 },
    { year: 2040, value: 1803.98 },
    { year: 2045, value: 1823.19 },
    { year: 2050, value: 1708.98 },
  ],
  excess_cold: [
    { year: 2025, value: 0.18 },
    { year: 2030, value: 103.85 },
    { year: 2035, value: 162.3 },
    { year: 2040, value: 469.65 },
    { year: 2045, value: 656.32 },
    { year: 2050, value: 682.69 },
  ],
  diet_change: [
    { year: 2025, value: 0 },
    { year: 2030, value: 235.12 },
    { year: 2035, value: 220.42 },
    { year: 2040, value: 206.05 },
    { year: 2045, value: 192.64 },
    { year: 2050, value: 179.72 },
  ],
  dampness: [
    { year: 2025, value: 0 },
    { year: 2030, value: 13.47 },
    { year: 2035, value: 18.74 },
    { year: 2040, value: 31.77 },
    { year: 2045, value: 39.82 },
    { year: 2050, value: 43.88 },
  ],
};

// Combined timeline data - Top 3 Benefits Only (every 5 years)
export const timelineData = [
  {
    year: 2025,
    physicalActivity: 1610,
    airQuality: 170,
    noise: 120,
    total: 1900,
    description:
      "Program Launch: Initial green space development and cycle lane construction begins",
  },
  {
    year: 2030,
    physicalActivity: 4090,
    airQuality: 580,
    noise: 551,
    total: 5221,
    description:
      "Early Growth: Significant increase as infrastructure becomes established",
  },
  {
    year: 2035,
    physicalActivity: 4940,
    airQuality: 1520,
    noise: 1490,
    total: 7950,
    description:
      "Maturation Phase: Full utilization of green spaces and active transport",
  },
  {
    year: 2040,
    physicalActivity: 5650,
    airQuality: 2490,
    noise: 1810,
    total: 9950,
    description:
      "Peak Benefits: Maximum health and environmental impacts realized",
  },
  {
    year: 2045,
    physicalActivity: 6200,
    airQuality: 3090,
    noise: 1830,
    total: 11120,
    description:
      "Sustained Impact: Long-term health benefits firmly established",
  },
  {
    year: 2050,
    physicalActivity: 6610,
    airQuality: 3080,
    noise: 1710,
    total: 11400,
    description:
      "Program Culmination: Comprehensive transformation of urban environments complete",
  },
];

// Growth values for each category (2025 to 2050) in millions GBP
export const growthData = [
  {
    category: "Physical Activity",
    growth: 5000,
    color: "#3b82f6",
    icon: "🚴",
  },
  {
    category: "Air Quality",
    growth: 2910,
    color: "#8b5cf6",
    icon: "🌬️",
  },
  {
    category: "Noise",
    growth: 1590,
    color: "#f59e0b",
    icon: "🔇",
  },
];

// Cumulative totals by year
export const cumulativeData = [
  { year: 2025, cumulative: 1898.79 },
  { year: 2030, cumulative: 7464.89 },
  { year: 2035, cumulative: 15820.73 },
  { year: 2040, cumulative: 26475.54 },
  { year: 2045, cumulative: 38480.73 },
  { year: 2050, cumulative: 50784.08 },
];

// Health outcomes - Based on Top 3 Benefits
export const healthOutcomes = [
  {
    name: "Reduced Mortality",
    value: 181077.24,
    description:
      "Cardiovascular improvements, reduced obesity, and enhanced fitness from increased walking and cycling",
    icon: "❤️",
    color: "#10b981",
  },
  {
    name: "Sleep Quality",
    value: 14140.31,
    description:
      "From fewer motor vehicles and low-emission & quieter transport",
    icon: "😴",
    color: "#8b5cf6",
  },
  {
    name: "Quality of Life",
    value: 3121.05,
    description:
      "From cleaner air, increased physical activity, and improved mental & physical health",
    icon: "✨",
    color: "#3b82f6",
  },
];

// Economic breakdown - Top 3 Benefits Only
export const economicData = [
  {
    name: "Amenity",
    value: 20100,
    description: "Environmental comfort & property value",
    color: "#8b5cf6",
    source: "Noise Pollution Reduction",
    sourceValue: 14140.31,
    detail:
      "Increased property values and quality of life from quieter, more pleasant neighborhoods due to reduced traffic noise and emissions",
  },
  {
    name: "Society",
    value: 600,
    description: "Broader societal economic gains",
    color: "#3b82f6",
    source: "Air Quality Improvement",
    sourceValue: 181077.24,
    detail: "Reduced healthcare costs, improved worker productivity, decreased sick days, and enhanced community wellbeing from cleaner air and healthier populations",
  },
];

// Format functions
export function formatMillions(value: number): string {
  if (Math.abs(value) >= 1000) {
    return `£${(value / 1000).toFixed(1)}B`;
  }
  return `£${value.toFixed(1)}M`;
}

export function formatNumber(value: number): string {
  return value.toLocaleString("en-GB");
}
