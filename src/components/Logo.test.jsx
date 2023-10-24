import { describe, expect, it, vi } from "vitest"
import { render, screen, within } from "@testing-library/react"
import { Logo } from "./Logo.jsx"

vi.mock("/test-tube.png", () => ({
  default: "mockSrc",
}))

describe("Logo", () => {
  it("renders properly", () => {
    render(<Logo />)

    const link = screen.getByRole("link")
    const img = within(link).getByAltText("Vite logo")

    expect(link).toBeInTheDocument()
    expect(img).toBeInTheDocument()
    expect(img.src).toBe("http://localhost:3000/mockSrc")
  })
})
