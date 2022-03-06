import { stringify } from 'qs'
import React, { useCallback, useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import useParsedQueryString from '../../hooks/useParsedQueryString'
import useToggledVersion, { Version } from '../../hooks/useToggledVersion'
import { MouseoverTooltip } from '../Tooltip'

import { useTranslation } from 'react-i18next'

const VersionLabel = styled.span<{ enabled: boolean }>`
  padding: 0.35rem 0.6rem;
  border-radius: 12px;
  background: ${({ theme, enabled }) => (enabled ? theme.primary1 : 'none')};
  color: ${({ theme, enabled }) => (enabled ? theme.white : theme.text1)};
  font-size: 1rem;
  font-weight: ${({ enabled }) => (enabled ? '500' : '400')};
  :hover {
    user-select: ${({ enabled }) => (enabled ? 'none' : 'initial')};
    background: ${({ theme, enabled }) => (enabled ? theme.primary1 : 'none')};
    color: ${({ theme, enabled }) => (enabled ? theme.white : theme.text1)};
  }
`

enum I18 {
  opt1 = 'en',
  opt2 = 'zh-TW'
}

interface VersionToggleProps extends React.ComponentProps<typeof Link> {
  enabled: boolean
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const VersionToggle = styled(({ enabled, ...rest }: VersionToggleProps) => <Link {...rest} />)<VersionToggleProps>`
  border-radius: 12px;
  opacity: ${({ enabled }) => (enabled ? 1 : 0.5)};
  cursor: ${({ enabled }) => (enabled ? 'pointer' : 'default')};
  background: ${({ theme }) => theme.bg3};
  color: ${({ theme }) => theme.primary1};
  display: flex;
  width: fit-content;
  margin-left: 0.5rem;
  text-decoration: none;
  :hover {
    text-decoration: none;
  }
`

export default function VersionSwitch() {
  // const version = useToggledVersion()
  const location = useLocation()
  const query = useParsedQueryString()
  
  const versionSwitchAvailable = true;// location.pathname === '/swap' || location.pathname === '/send'

  const version = localStorage.getItem('i18nextLng')

  const toggleDest = useMemo(() => {
    return versionSwitchAvailable
      ? {
          ...location,
          search: `?${stringify({ ...query, use: version === Version.v1 ? undefined : Version.v1 })}`
        }
      : location
  }, [location, query, version, versionSwitchAvailable])

  const handleClick = useCallback(
    e => {
      if (!versionSwitchAvailable) e.preventDefault()
    },
    [versionSwitchAvailable]
  )

  const switchLang = () => {
    let i18 = localStorage.getItem('i18nextLng');
    if(i18 == 'en') localStorage.setItem('i18nextLng', 'zh-TW')
    else localStorage.setItem('i18nextLng', 'en')
    window.location.reload()
  }

  const toggle = (
    <VersionToggle enabled={versionSwitchAvailable} to={toggleDest} onClick={switchLang}>
      <VersionLabel enabled={version === I18.opt1 || !versionSwitchAvailable}>En</VersionLabel>
      <VersionLabel enabled={version === I18.opt2 && versionSwitchAvailable}>繁</VersionLabel>
    </VersionToggle>
  )
  return versionSwitchAvailable ? (
    toggle
  ) : (
    toggle
    // <MouseoverTooltip text="Change Chinese">{toggle}</MouseoverTooltip>
  )
}
