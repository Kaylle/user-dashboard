export const themes = [
  {
    name: 'slate',
    light: '222.2 47.4% 11.2%',
    dark: '210 40% 98%'
  },
  {
    name: 'stone',
    light: '24 9.8% 10%',
    dark: '60 9.1% 97.8%'
  },
  {
    name: 'gray',
    light: '220.9 39.3% 11%',
    dark: '210 20% 98%'
  },
  {
    name: 'neutral',
    light: '0 0% 9%',
    dark: '0 0% 98%'
  },
  {
    name: 'zinc',
    light: '240 5.9% 10%',
    dark: '0 0% 98%'
  },
  {
    name: 'red',
    light: '0 72.2% 50.6%',
    dark: '0 72.2% 50.6%'
  },
  {
    name: 'rose',
    light: '346.8 77.2% 49.8%',
    dark: '346.8 77.2% 49.8%'
  },
  {
    name: 'orange',
    light: '24.6 95% 53.1%',
    dark: '20.5 90.2% 48.2%'
  },
  {
    name: 'green',
    light: '142.1 76.2% 36.3%',
    dark: '142.1 70.6% 45.3%'
  },
  {
    name: 'blue',
    light: '221.2 83.2% 53.3%',
    dark: '217.2 91.2% 59.8%'
  },
  {
    name: 'yellow',
    light: '47.9 95.8% 53.1%',
    dark: '47.9 95.8% 53.1%'
  },
  {
    name: 'violet',
    light: '262.1 83.3% 57.8%',
    dark: '263.4 70% 50.4%'
  }
] as Theme[];

interface Theme {
  name: string,
  light: string,
  dark: string,
}
