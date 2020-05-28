import Constants from 'expo-constants'
import { ENV } from './EnvConfig'

export const getReleaseChannel = () => {
    if (Constants.manifest.releaseChannel === null || Constants.manifest.releaseChannel === undefined || 
        Constants.manifest.releaseChannel === "")
        return "no release channel defined"
    else
        return Constants.manifest.releaseChannel
}
  
export const getEnvConfig = (env) => {
    if (env === null || env === undefined || env === "") return ENV.awsmobile_dev;
    if (env.indexOf("dev") !== -1) return ENV.awsmobile_dev;
    if (env.indexOf("prod") !== -1) return ENV.awsmobile_prod;
}