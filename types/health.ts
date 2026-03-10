export type AppHealth = {
  status: string
  timestamp: string
  services: {
    redis: "connected" | "error"
  }
}
