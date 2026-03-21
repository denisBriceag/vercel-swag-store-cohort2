import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search } from "lucide-react"

export default function SearchInput() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput placeholder="Search..." />

      <InputGroupAddon>
        <Search />
      </InputGroupAddon>

      <InputGroupAddon align="inline-end">12 results</InputGroupAddon>
    </InputGroup>
  )
}
