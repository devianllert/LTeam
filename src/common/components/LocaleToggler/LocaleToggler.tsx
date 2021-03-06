import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { RiTranslate2 } from 'react-icons/ri';

import { SUPPORTED_LANGUAGES } from '@/modules/core/i18n/i18n';

import * as DropdownMenu from '@/common/components/system/DropdownMenu';
import { IconButton } from '@/common/components/system/IconButton';

export const LocaleToggler = (): JSX.Element => {
  const { i18n } = useTranslation();
  const router = useRouter();

  const changeLocale = async (locale: string) => {
    await router.replace(router.pathname, undefined, { locale });
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <IconButton>
          <RiTranslate2 />
        </IconButton>
      </DropdownMenu.Trigger>

      <DropdownMenu.Content>
        <DropdownMenu.RadioGroup value={i18n.language} onValueChange={changeLocale}>
          {SUPPORTED_LANGUAGES.map((key) => (
            <DropdownMenu.RadioItem key={key} value={key}>
              {key.toUpperCase()}
            </DropdownMenu.RadioItem>
          ))}
        </DropdownMenu.RadioGroup>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
