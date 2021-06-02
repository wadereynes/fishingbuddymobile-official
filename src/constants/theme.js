import { Dimensions } from 'react-native';

const colors = {
    accent: "#3dd5fc",
    accent2: "#ffd400",
    primary: "#005da0",
    secondary: "#2b1dae",
    tertiary: "#4376ff",
    pastel: '#c9edff',
    black: "#323643",
    white: "#FFFFFF",
    gray: "#9DA3B4",
    gray2: "#C5CCD6",
    gray3: "#585a61",
    gray4: "#f4f7fd",
    google: "#eb4a42",
    facebook: "#5471b5",
};

const dimensions ={
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
}

const sizes = {
    // global sizes
    base: 16,
    font: 14,
    radius: 6,
    padding: 25,

    // font sizes
    h1: 26,
    h2: 20,
    h3: 18,
    title: 18,
    header: 16,
    body: 14,
    caption: 12,
    subcaption: 10,

    //component specific sizes
    category: 8
};

const fonts = {
    h1: {
        fontSize: sizes.h1
    },
    h2: {
        fontSize: sizes.h2
    },
    h3: {
        fontSize: sizes.h3
    },
    header: {
        fontSize: sizes.header
    },
    title: {
        fontSize: sizes.title
    },
    body: {
        fontSize: sizes.body
    },
    caption: {
        fontSize: sizes.caption
    }
};

export { colors, dimensions, sizes, fonts };
