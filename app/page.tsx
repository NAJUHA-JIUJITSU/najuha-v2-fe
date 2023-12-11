'use client';
import styles from './main.module.scss';
import Header from '@/components/common/header/Header';
import IconNavigateBeforeSmall from '@/public/svgs/navigateBeforeSmall.svg';
import IconMapSmall from '@/public/svgs/mapSmall.svg';
import { LinkIconSearch, LinkIconAlarm, LinkIconLogo } from '@/components/common/icon/iconLink';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import ButtonLink from '@/components/common/button/buttonLink';

export default function Home() {
  return (
    <>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={'타이틀'}
        rightIcon1={<LinkIconAlarm />}
        rightIcon2={<LinkIconSearch />}
      />

      <ButtonLink
        text="Outlined Blue"
        iconRight={<IconNavigateBeforeSmall />}
        size="small"
        type="outlined"
        color="blue"
        href="/gi"
      />
      <ButtonLink
        text="Outlined Black"
        iconRight={<IconNavigateBeforeSmall />}
        size="large"
        type="outlined"
        color="black"
        href="/gi"
      />
      <ButtonLink
        text="Outlined Gray"
        iconRight={<IconNavigateBeforeSmall />}
        size="small"
        type="outlined"
        color="gray"
        href="/gi"
      />
      <ButtonLink
        text="Outlined Disabled"
        size="small"
        type="outlined"
        color="disabled"
        href="/gi"
      />
      <ButtonOnClick
        iconLeft={<IconMapSmall />}
        text="small"
        iconRight={<IconNavigateBeforeSmall />}
        size="large"
        type="filled"
        color="blue"
      />
      <ButtonOnClick
        iconLeft={<IconMapSmall />}
        text="아도겐"
        iconRight={<IconNavigateBeforeSmall />}
        size="small"
        type="outlined"
        color="blue"
      />
      <ButtonOnClick
        iconLeft={<IconMapSmall />}
        text="medium"
        iconRight={<IconNavigateBeforeSmall />}
        size="medium"
        type="text"
        color="lightblue"
      />
      <ButtonOnClick
        iconLeft={<IconMapSmall />}
        text="large"
        iconRight={<IconNavigateBeforeSmall />}
        size="large"
        type="underlined"
        color="black"
      />
      <ButtonOnClick
        iconLeft={<IconMapSmall />}
        text="xLarge"
        iconRight={<IconNavigateBeforeSmall />}
        size="xLarge"
        type="caption"
        color="disabled"
      />

      {/* Filled Type Buttons */}
      <ButtonOnClick
        iconLeft={<IconMapSmall />}
        text="Filled Blue"
        iconRight={<IconNavigateBeforeSmall />}
        size="small"
        type="filled"
        color="blue"
      />
      <ButtonOnClick text="Filled Light Blue" size="small" type="filled" color="lightblue" />
      <ButtonOnClick text="Filled Black" size="small" type="filled" color="black" />
      <ButtonOnClick text="Filled Gray" size="small" type="filled" color="gray" />
      <ButtonOnClick text="Filled Disabled" size="small" type="filled" color="disabled" />

      {/* Outlined Type Buttons */}
      <ButtonOnClick text="Outlined Blue" size="small" type="outlined" color="blue" />
      <ButtonOnClick text="Outlined Black" size="small" type="outlined" color="black" />
      <ButtonOnClick text="Outlined Gray" size="small" type="outlined" color="gray" />
      <ButtonOnClick text="Outlined Disabled" size="small" type="outlined" color="disabled" />

      {/* Text Type Buttons */}
      <ButtonOnClick text="Text Blue" size="small" type="text" color="blue" />
      <ButtonOnClick text="Text Black" size="small" type="text" color="black" />
      <ButtonOnClick text="Text Gray" size="small" type="text" color="gray" />
      <ButtonOnClick text="Text Disabled" size="small" type="text" color="disabled" />

      {/* Underline Type Buttons */}
      <ButtonOnClick text="Underline Blue" size="small" type="underlined" color="blue" />
      <ButtonOnClick text="Underline Black" size="small" type="underlined" color="black" />
      <ButtonOnClick text="Underline Gray" size="small" type="underlined" color="gray" />
      <ButtonOnClick text="Underline Disabled" size="small" type="underlined" color="disabled" />

      {/* Caption Type Buttons */}
      <ButtonOnClick text="Caption Blue" size="small" type="caption" color="blue" />
      <ButtonOnClick text="Caption Black" size="small" type="caption" color="black" />
      <ButtonOnClick text="Caption Gray" size="small" type="caption" color="gray" />
      <ButtonOnClick text="Caption Disabled" size="small" type="caption" color="disabled" />
    </>
  );
}
