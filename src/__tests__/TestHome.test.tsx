import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import TestHome from '@/components/TestHome'
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<TestHome/>)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})