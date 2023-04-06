// color design tokens export
const colorTokens = {
    grey: {
        0: "#FFFFFF",
        10: "#F6F6F6",
        50: "#F0F0F0",
        100: "#E0E0E0",
        200: "#C2C2C2",
        300: "#A3A3A3",
        400: "#858585",
        500: "#666666",
        600: "#4D4D4D",
        700: "#333333",
        800: "#1A1A1A",
        900: "#1D2021",
        1000: "#000000",
    },
    primary: {
        50: "#E6FBFF",
        100: "#CCF7FE",
        200: "#99EEFD",
        300: "#66E6FC",
        400: "#33DDFB",
        500: "#00D5FA",
        600: "#6581aa",
        700: "#006B7D",
        800: "#00353F",
        900: "#001519",
    },
};

// mui theme settings
export const themeSettings = (mode) => {
    return {
        palette: {
            mode: mode,
            ...(mode === "dark"
                ? {
                    // palette values for dark mode
                    primary: {
                        dark: colorTokens.primary[200],
                        main: colorTokens.primary[500],
                        light: colorTokens.primary[800],
                    },
                    neutral: {
                        darker: colorTokens.grey[0],
                        dark: colorTokens.grey[100],
                        main: colorTokens.grey[200],
                        mediumMain: colorTokens.grey[300],
                        medium: colorTokens.grey[400],
                        light: colorTokens.grey[700],
                        lighter: colorTokens.grey[900]
                    },
                    background: {
                        default: colorTokens.grey[900],
                        alt: colorTokens.grey[800],
                    },
                }
                : {
                    // palette values for light mode
                    primary: {
                        dark: colorTokens.primary[700],
                        main: colorTokens.primary[600],
                        light: colorTokens.primary[50],
                    },
                    neutral: {
                        darker: colorTokens.grey[1000],
                        dark: colorTokens.grey[700],
                        main: colorTokens.grey[500],
                        mediumMain: colorTokens.grey[400],
                        medium: colorTokens.grey[300],
                        light: colorTokens.grey[50],
                        lighter: colorTokens.grey[10]
                    },
                    background: {
                        default: colorTokens.grey[10],
                        alt: colorTokens.grey[0],
                    },
                }),
            action: {
                disabledBackground: colorTokens.primary[100],
                disabled: colorTokens.grey[200]
            }
        },
        typography: {
            fontFamily: 'Rubik,sans-serif',
            fontSize: 12,
            h1: {
                fontFamily: 'Rubik,sans-serif',
                fontSize: 40,
            },
            h2: {
                fontFamily: 'Rubik,sans-serif',
                fontSize: 32,
            },
            h3: {
                fontFamily: 'Rubik,sans-serif',
                fontSize: 24,
            },
            h4: {
                fontFamily: 'Rubik,sans-serif',
                fontSize: 20,
            },
            h5: {
                fontFamily: 'Rubik,sans-serif',
                fontSize: 16,
            },
            h6: {
                fontFamily: 'Rubik,sans-serif',
                fontSize: 14,
            },
        },
        components: {
            MuiCssBaseline: {
                styleOverrides: {
                    '::-webkit-scrollbar': {
                        width: '8px'
                    },
                    '::-webkit-scrollbar-track': {
                        background: 'none'
                    },
                    '::-webkit-scrollbar-thumb': {
                        background: colorTokens.primary[mode==='light'?600:500],
                        borderRadius: '10px'
                    },
                    '::-webkit-scrollbar-thumb:hover': {
                        background: '#555'
                    }
                },
            },
        },
    };
};