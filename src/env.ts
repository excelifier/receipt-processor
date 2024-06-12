import dotenv from "dotenv";

dotenv.config();

// Extend the type to include OCR and OCR_LANG variables
type EnvConfig = {
  dirIn: string;
  bearerToken: string;
  orgId: string;
  apiHost: string;
  createdFrom: string;
  createdTo: string;
};

// Function to safely access environment variables and throw an error if required ones are missing
const getEnv = (key: string, required: boolean = true): string | undefined => {
  const value = process.env[key];
  if (required && value === undefined) {
    throw new Error(`Environment variable ${key} is missing`);
  }
  return value;
};

// Convert string to boolean, default to false if not defined
const getEnvBoolean = (key: string, defaultValue: boolean = false): boolean => {
  const value = getEnv(key, false);
  return value ? value.toLowerCase() === "true" : defaultValue;
};

// Helper function to get the default start date
const getDefaultStartDate = (): string => {
  // Return the ISO string for the first day of this month
  return new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString();
};

// Helper function to get the default end date
const getDefaultEndDate = (): string => {
  // Return the ISO string for the last day of the current month
  return new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString();
};

// Initialize the configuration object, check OCR condition for OCR_LANG
const config: EnvConfig = {
  dirIn: getEnv("DIR_IN")!,
  bearerToken: getEnv("BEARER_TOKEN")!,
  orgId: getEnv("ORG_ID")!,
  apiHost: getEnv("API_HOST", false) || "https://api.excelifier.com",
  createdFrom: getEnv("CREATED_FROM", false) || getDefaultStartDate(),
  createdTo: getEnv("CREATED_TO", false) || getDefaultEndDate()
};

export default config;
