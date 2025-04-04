
// Parameters that affect food expiry
type ExpiryFactors = {
  temperature: number;
  humidity: number;
  packagingType: string;
  foodCategory: string;
};

// Base shelf life for different food categories (in days)
const baseShelfLife: Record<string, number> = {
  dairy: 7,
  meat: 4,
  produce: 10,
  grains: 14,
  canned: 730, // 2 years
  frozen: 180, // 6 months
  beverages: 14,
  snacks: 60,
  other: 14,
};

// Temperature impact factors (lower is better for most foods)
const temperatureImpact = (temperature: number, category: string): number => {
  // Each category has an ideal temperature range
  const idealTemps: Record<string, [number, number]> = {
    dairy: [2, 5],
    meat: [0, 4],
    produce: [4, 10],
    grains: [15, 20],
    canned: [10, 25],
    frozen: [-18, -12],
    beverages: [2, 10],
    snacks: [15, 25],
    other: [10, 20],
  };
  
  const [min, max] = idealTemps[category] || [10, 20];
  
  if (temperature < min) {
    // Too cold - minor reduction unless it's frozen category
    return category === 'frozen' ? 1 : 0.9;
  } else if (temperature > max) {
    // Too warm - significant reduction
    const excessTemp = temperature - max;
    return Math.max(0.5, 1 - (excessTemp * 0.05));
  } else {
    // Ideal range
    return 1;
  }
};

// Humidity impact factors
const humidityImpact = (humidity: number, category: string): number => {
  // Each category has an ideal humidity range
  const idealHumidity: Record<string, [number, number]> = {
    dairy: [40, 60],
    meat: [70, 85],
    produce: [85, 95],
    grains: [40, 60],
    canned: [30, 60],
    frozen: [30, 50],
    beverages: [40, 60],
    snacks: [30, 50],
    other: [40, 60],
  };
  
  const [min, max] = idealHumidity[category] || [40, 60];
  
  if (humidity < min) {
    // Too dry
    const drynessFactor = (min - humidity) / 100;
    return Math.max(0.7, 1 - drynessFactor);
  } else if (humidity > max) {
    // Too humid - promotes bacteria growth
    const excessHumidity = (humidity - max) / 100;
    return Math.max(0.6, 1 - (excessHumidity * 1.5));
  } else {
    // Ideal range
    return 1;
  }
};

// Packaging type impact
const packagingImpact = (packagingType: string, category: string): number => {
  // Effectiveness of different packaging types for each food category
  const packagingEffectiveness: Record<string, Record<string, number>> = {
    dairy: { plastic: 0.9, paper: 0.7, glass: 1, metal: 0.95, vacuum: 1.1, none: 0.5 },
    meat: { plastic: 0.85, paper: 0.6, glass: 0.7, metal: 0.8, vacuum: 1.2, none: 0.3 },
    produce: { plastic: 0.8, paper: 0.9, glass: 0.7, metal: 0.7, vacuum: 0.6, none: 0.9 },
    grains: { plastic: 0.95, paper: 0.9, glass: 1, metal: 1, vacuum: 1.1, none: 0.7 },
    canned: { plastic: 0.8, paper: 0.5, glass: 0.9, metal: 1, vacuum: 1, none: 0.3 },
    frozen: { plastic: 0.9, paper: 0.6, glass: 0.8, metal: 0.85, vacuum: 1, none: 0.4 },
    beverages: { plastic: 0.9, paper: 0.7, glass: 1, metal: 0.95, vacuum: 0.8, none: 0.5 },
    snacks: { plastic: 1, paper: 0.8, glass: 1, metal: 1, vacuum: 1.1, none: 0.6 },
    other: { plastic: 0.9, paper: 0.8, glass: 0.9, metal: 0.9, vacuum: 1, none: 0.7 },
  };
  
  return packagingEffectiveness[category]?.[packagingType] || 0.8;
};

// Predict expiry date based on the factors
export const predictExpiryDate = (factors: ExpiryFactors): Date => {
  const { temperature, humidity, packagingType, foodCategory } = factors;
  
  // Get base shelf life for the food category
  const baseDays = baseShelfLife[foodCategory] || 7;
  
  // Calculate impact factors
  const tempFactor = temperatureImpact(temperature, foodCategory);
  const humidityFactor = humidityImpact(humidity, foodCategory);
  const packageFactor = packagingImpact(packagingType, foodCategory);
  
  // Calculate adjusted shelf life with more significant impact from factors
  let adjustedDays = Math.round(baseDays * tempFactor * humidityFactor * packageFactor);
  
  // Add more randomization to make predictions more realistic and varied
  // Small random variation (±10% of the adjusted days)
  const randomVariation = Math.floor((Math.random() * 0.2 - 0.1) * adjustedDays);
  adjustedDays += randomVariation;
  
  // Ensure minimum shelf life is at least 1 day
  adjustedDays = Math.max(1, adjustedDays);
  
  // Create expiry date
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + adjustedDays);
  
  return expiryDate;
};

// Function to get days remaining until expiry
export const getDaysUntilExpiry = (expiryDate: Date): number => {
  const now = new Date();
  const timeDiff = expiryDate.getTime() - now.getTime();
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
};

// Generate advice based on food item data
export const generateStorageAdvice = (
  foodCategory: string,
  temperature: number,
  humidity: number,
  packagingType: string
): string => {
  let advice = "";
  
  // Temperature advice
  if (foodCategory === "dairy" || foodCategory === "meat") {
    if (temperature > 5) {
      advice += "Store in refrigerator at 2-5°C. ";
    }
  } else if (foodCategory === "produce") {
    if (temperature > 10) {
      advice += "Keep refrigerated at 4-10°C for longer freshness. ";
    }
  } else if (foodCategory === "frozen") {
    if (temperature > -12) {
      advice += "Keep frozen at -18°C or below. ";
    }
  }
  
  // Humidity advice
  if (foodCategory === "produce" && humidity < 85) {
    advice += "Maintain high humidity (85-95%) for fresh produce. ";
  } else if ((foodCategory === "grains" || foodCategory === "snacks") && humidity > 60) {
    advice += "Store in a dry location with low humidity. ";
  }
  
  // Packaging advice
  if (foodCategory === "meat" && packagingType !== "vacuum") {
    advice += "Vacuum-sealed packaging extends shelf life. ";
  } else if (foodCategory === "dairy" && packagingType === "none") {
    advice += "Keep in original sealed container. ";
  } else if (foodCategory === "produce" && packagingType === "plastic") {
    advice += "Consider perforated packaging for better air circulation. ";
  }
  
  if (advice === "") {
    advice = "Current storage conditions are appropriate for this food item.";
  }
  
  return advice;
};
