import ButtonList from '@/components/common/buttonList';

interface buttonListProps {
  text: string;
  href?: string;
  info?: string;
}

export default function buttonLists({ buttonLists }: { buttonLists: buttonListProps[] }) {
  return (
    <div>
      {buttonLists.map((button) => (
        <ButtonList key={button.text} text={button.text} href={button.href} info={button.info} />
      ))}
    </div>
  );
}
