import useParsedQueryString from './useParsedQueryString'

export enum I18 {
  opt1 = 'en',
  opt2 = 'zh-CN'
}

export const default_Lang: I18 = I18.opt1

export default function useLang(): I18 {
  const { i18 } = useParsedQueryString()
  if (!i18 || typeof i18 !== 'string') return I18.opt1
  if (i18.toLowerCase() === 'zh-CN') return I18.opt2
  return default_Lang
}
