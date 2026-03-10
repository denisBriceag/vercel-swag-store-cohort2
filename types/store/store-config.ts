import { Seo } from "@/types/store/seo"
import { SocialLinks } from "@/types/store/social-links"
import { StoreFeatures } from "@/types/store/store-features"

export type StoreConfig = {
  storeName: string
  currency: "USD"
  features: StoreFeatures
  socialLinks: SocialLinks
  seo: Seo
}
