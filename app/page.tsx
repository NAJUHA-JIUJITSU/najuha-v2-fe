'use client';
import styles from './main.module.scss';
import Header from '@/components/common/header/Header';
import IconNavigateBeforeSmall from '@/public/svgs/navigateBeforeSmall.svg';
import IconMapSmall from '@/public/svgs/mapSmall.svg';
import { IconLinkSearch, IconLinkAlarm, IconLinkLogo } from '@/components/common/icon/iconLink';
import { ButtonIconNavigateBefore } from '@/components/common/icon/iconOnClick';
import ButtonOnClick from '@/components/common/button/buttonOnClick';
import ButtonLink from '@/components/common/button/buttonLink';

export default function Home() {
  return (
    <>
      <Header
        leftIcon={<ButtonIconNavigateBefore />}
        title={'타이틀'}
        rightIcon1={<IconLinkAlarm />}
        rightIcon2={<IconLinkSearch />}
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
        width="normal"
        iconRight={<IconNavigateBeforeSmall />}
        size="large"
        type="filled"
        color="blue"
        onClick={() => {}}
      />
      <ButtonOnClick
        iconLeft={<IconMapSmall />}
        text="아도겐"
        width="normal"
        iconRight={<IconNavigateBeforeSmall />}
        size="small"
        type="outlined"
        color="blue"
        onClick={() => {}}
      />
      <ButtonOnClick
        iconLeft={<IconMapSmall />}
        text="medium"
        width="normal"
        iconRight={<IconNavigateBeforeSmall />}
        size="medium"
        type="text"
        color="lightblue"
        onClick={() => {}}
      />
      <ButtonOnClick
        iconLeft={<IconMapSmall />}
        text="large"
        width="normal"
        iconRight={<IconNavigateBeforeSmall />}
        size="large"
        type="underlined"
        color="black"
        onClick={() => {}}
      />
      <ButtonOnClick
        iconLeft={<IconMapSmall />}
        text="xLarge"
        width="normal"
        iconRight={<IconNavigateBeforeSmall />}
        size="xLarge"
        type="caption"
        color="disabled"
        onClick={() => {}}
      />

      {/* Filled Type Buttons */}
      <ButtonOnClick
        iconLeft={<IconMapSmall />}
        text="Filled Blue"
        width="normal"
        iconRight={<IconNavigateBeforeSmall />}
        size="large"
        type="filled"
        color="blue"
        onClick={() => {}}
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Filled Light Blue"
        width="normal"
        size="small"
        type="filled"
        color="lightblue"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Filled Black"
        width="normal"
        size="small"
        type="filled"
        color="black"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Filled Gray"
        width="normal"
        size="small"
        type="filled"
        color="gray"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Filled Disabled"
        width="normal"
        size="small"
        type="filled"
        color="disabled"
      />

      {/* Outlined Type Buttons */}
      <ButtonOnClick
        onClick={() => {}}
        text="Outlined Blue"
        width="normal"
        size="small"
        type="outlined"
        color="blue"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Outlined Black"
        size="small"
        width="normal"
        type="outlined"
        color="black"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Outlined Gray"
        width="normal"
        size="small"
        type="outlined"
        color="gray"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Outlined Disabled"
        width="normal"
        size="small"
        type="outlined"
        color="disabled"
      />

      {/* Text Type Buttons */}
      <ButtonOnClick
        onClick={() => {}}
        width="normal"
        text="Text Blue"
        size="small"
        type="text"
        color="blue"
      />
      <ButtonOnClick
        onClick={() => {}}
        width="normal"
        text="Text Black"
        size="small"
        type="text"
        color="black"
      />
      <ButtonOnClick
        onClick={() => {}}
        width="normal"
        text="Text Gray"
        size="small"
        type="text"
        color="gray"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Text Disabled"
        width="normal"
        size="small"
        type="text"
        color="disabled"
      />

      {/* Underline Type Buttons */}
      <ButtonOnClick
        onClick={() => {}}
        text="Underline Blue"
        width="normal"
        size="small"
        type="underlined"
        color="blue"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Underline Black"
        width="normal"
        size="small"
        type="underlined"
        color="black"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Underline Gray"
        width="normal"
        size="small"
        type="underlined"
        color="gray"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Underline Disabled"
        width="normal"
        size="small"
        type="underlined"
        color="disabled"
      />

      {/* Caption Type Buttons */}
      <ButtonOnClick
        onClick={() => {}}
        text="Caption Blue"
        width="normal"
        size="small"
        type="caption"
        color="blue"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Caption Black"
        width="normal"
        size="small"
        type="caption"
        color="black"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Caption Gray"
        width="normal"
        size="small"
        type="caption"
        color="gray"
      />
      <ButtonOnClick
        onClick={() => {}}
        text="Caption Disabled"
        width="normal"
        size="small"
        type="caption"
        color="disabled"
      />
    </>
  );
}
