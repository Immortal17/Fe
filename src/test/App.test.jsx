import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
//This is changed by me
// Mock Hero component to bypass Three.js rendering
vi.mock('../components/Hero', () => {
  return {
    AuroraHero: function MockHero() {
      return (
        <div>
          <span>Now Live!</span>
          <h1>Decrease your SaaS churn by over 90%</h1>
          <button>Start free trial</button>
        </div>
      );
    },
  };
});

describe('App Component', () => {
  it('should display hero content correctly', () => {
    render(<App />);

    // Assertions for all important elements
    const heading = screen.getByRole('heading', {
      name: /Decrease your SaaS churn by over 90%/i,
    });
    const ctaButton = screen.getByRole('button', { name: /Start free trial/i });
    const badge = screen.getByText(/Now Live!/i);

    expect(heading).toBeInTheDocument();
    expect(ctaButton).toBeInTheDocument();
    expect(badge).toBeInTheDocument();
  });
});
