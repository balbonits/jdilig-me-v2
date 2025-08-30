/**
 * Type definitions for Revealing Module Pattern examples
 * This file demonstrates proper TypeScript practices for pattern implementations
 */

// API Client Types
export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message: string;
  success: boolean;
}

export interface ApiHeaders {
  [key: string]: string;
}

export interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: ApiHeaders;
  timeout?: number;
}

export interface RequestConfig {
  baseUrl: string;
  apiKey: string;
  timeout: number;
  defaultHeaders: ApiHeaders;
}

// Typed Event System - simplified for build compatibility
export type EventMap = Record<string, JsonValue>;

// Event Emitter Types
export interface EventCallback<T = JsonValue> {
  (data: T): void;
}

export interface EventListener<T = JsonValue> {
  callback: EventCallback<T>;
  once?: boolean;
  id?: string;
}

export interface EventEmitterConfig {
  maxListeners: number;
  debugging: boolean;
}

// Calculator Types
export interface CalculationHistory {
  operation: string;
  result: number;
  timestamp?: Date;
}

export interface CalculatorConfig {
  precision: number;
  maxHistorySize: number;
}

// API Request Types
export interface ApiRequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers: Record<string, string>;
  body?: string;
  timeout?: number;
}

// JSON-serializable types for API payloads
export type JsonPrimitive = string | number | boolean | null;
export type JsonObject = { [key: string]: JsonValue };
export type JsonArray = JsonValue[];
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

// API request body can be any JSON-serializable value
export type ApiRequestBody = JsonValue;

// Event data is typically JSON-serializable
export type EventData = JsonValue;

// Error Types
export interface ValidationError extends Error {
  code: 'INVALID_NUMBER' | 'INVALID_EVENT_NAME' | 'INVALID_CALLBACK';
  details?: JsonObject;
}