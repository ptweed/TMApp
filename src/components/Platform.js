import { Dimensions } from 'react-native'

const msp = (dim, limit) => {
    return (dim.scale * dim.width) >= limit || (dim.scale * dim.height) >= limit
}

export const isTablet = () => {
  const dim = Dimensions.get('screen')
  return ((dim.scale < 2 && msp(dim, 1000)) || (dim.scale >= 2 && msp(dim, 1900)))
}
