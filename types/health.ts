export type AppHealth = {
  status: string
  timestamp: string
  services: {
    [K: string]: "connected" | "error"
  }
}
