// tailwind.config.cjs
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}", // nếu còn dùng pages/
  ],
  theme: {
    extend: {
      // dùng trực tiếp CSS vars bạn đã khai trong globals.css
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        card: "var(--color-card)",
        "card-foreground": "var(--color-card-foreground)",
        popover: "var(--color-popover)",
        "popover-foreground": "var(--color-popover-foreground)",
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-primary-foreground)",
        secondary: "var(--color-secondary)",
        muted: "var(--color-muted)",
        accent: "var(--color-accent)",
        destructive: "var(--color-destructive)",
        border: "var(--color-border)",
        input: "var(--color-input)",
        ring: "var(--color-ring)",
        // sidebar + chart
        sidebar: "var(--color-sidebar)",
        "sidebar-foreground": "var(--color-sidebar-foreground)",
        "sidebar-primary": "var(--color-sidebar-primary)",
        // custom colors cho landing page
        surface: "hsl(var(--surface))",
        "surface-accent": "hsl(var(--surface-accent))",
        // add more mappings if needed...
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular"],
        // nếu bạn vẫn muốn alias display riêng
        display: ["var(--font-geist-sans)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 8s cubic-bezier(0.4,0,0.6,1) infinite",
        "fade-in-up": "fadeInUp 0.5s ease-out forwards",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      // radius, ring width, etc. nếu cần map từ css vars
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [
    // Nếu bạn có plugin tailwind chính thức thì add ở đây.
    // Bạn import tw-animate-css trực tiếp trong globals.css nên ko bắt buộc plugin.
  ],
};
