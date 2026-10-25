import { Cog, Wrench } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'

import packageJson from '../../../package.json'

import { Button } from '../../components/ui/button'
import {
  PageHeader,
  PageTabs,
  PageTabPanel,
  EmptyState,
} from '../../components/page'

import { AccountCustomization } from './-account-customization/-index'
import { AppSettings } from './-app-settings/-index'
import { CustomizableMenu } from './-customizable-menu/-index'
import { OverlaySettingsForm } from './-overlay-settings'

import { useGetAccounts } from '../../hooks/accounts'

import { useTweaksWarningStore } from '../../state/settings/tweaks-warning'

import { Route } from './route'

export function RouteComponent() {
  const { t } = useTranslation(['general'])

  return (
    <>
      <PageHeader icon={Cog} title={t('settings')} />
      <Content />
      <TweaksFooter />
    </>
  )
}

/**
 * Foot of Settings: the app version, the way into Tweaks, and — once the
 * user has chosen "do not show again" — a way to bring the warning back.
 */
function TweaksFooter() {
  const skipWarning = useTweaksWarningStore((state) => state.skipWarning)
  const setSkipWarning = useTweaksWarningStore((state) => state.setSkipWarning)

  return (
    <div className="flex max-w-4xl flex-wrap items-center gap-x-4 gap-y-2 pb-6 pt-4">
      <span className="micro-label select-none text-muted-foreground/70">
        Command v{packageJson.version}
      </span>
      <Button asChild size="sm" variant="outline">
        <Link to="/settings/tweaks">
          <Wrench className="size-3.5" />
          Tweaks
        </Link>
      </Button>
      {skipWarning && (
        <Button
          onClick={() => setSkipWarning(false)}
          size="sm"
          type="button"
          variant="ghost"
        >
          Show the Tweaks warning again
        </Button>
      )}
    </div>
  )
}

function Content() {
  const { t } = useTranslation(['settings', 'general'])
  const { accountsArray } = useGetAccounts()
  const { tab } = Route.useSearch()
  const navigate = Route.useNavigate()
  return (
    <PageTabs
      label={t('general:settings')}
      value={tab}
      tabs={[
        { value: 'app', label: t('app-settings.title') },
        { value: 'overlay', label: t('overlay.title') },
        { value: 'menu', label: t('custom-menu.title') },
        { value: 'accounts', label: t('account-customization.title') },
      ]}
      onValueChange={(value) => {
        void navigate({
          search: (previous) => ({ ...previous, tab: value }),
          resetScroll: false,
        })
      }}
    >
      <PageTabPanel value="app" activeValue={tab}>
        <div className="max-w-4xl">
          <AppSettings />
        </div>
      </PageTabPanel>
      <PageTabPanel value="overlay" activeValue={tab}>
        <div className="max-w-4xl">
          <OverlaySettingsForm />
        </div>
      </PageTabPanel>
      <PageTabPanel value="menu" activeValue={tab}>
        <div className="max-w-4xl">
          <CustomizableMenu />
        </div>
      </PageTabPanel>
      <PageTabPanel value="accounts" activeValue={tab}>
        {accountsArray.length > 0 ? (
          <div className="max-w-4xl">
            <AccountCustomization />
          </div>
        ) : (
          <EmptyState
            action={
              <Button asChild variant="outline">
                <Link params={{ type: 'quick-login' }} to="/accounts/add/$type">
                  {t('general:home.add-account')}
                </Link>
              </Button>
            }
            icon={Cog}
            title={t('general:form.accounts.no-registered-accounts')}
          />
        )}
      </PageTabPanel>
    </PageTabs>
  )
}
