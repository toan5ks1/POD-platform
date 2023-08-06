import { Button, Tooltip } from '@chakra-ui/react';
import useStageObject from '~/hooks/use-stage-object';
import { StageTextData } from '~/types/stage-object';

type Props = {
  id: string;
  fontVariants: StageTextData['fontVariants'];
  webFont: StageTextData['webFont'];
  fontStyle: StageTextData['fontStyle'];
};

const FontStyleSettings = ({ id, fontVariants, webFont, fontStyle }: Props) => {
  const { updateOne } = useStageObject();

  const isBoldAvailable = !fontVariants.includes('700') && webFont;
  const isItalicAvailable = !fontVariants.includes('italic') && webFont;

  const isBoldActive = fontStyle.includes('bold');
  const isItalicActive = fontStyle.includes('italic');

  const handleBoldClick = () => {
    updateOne({ id, data: { fontStyle: toggleBold(fontStyle) } });
  };

  const handleItalicClick = () => {
    updateOne({ id, data: { fontStyle: toggleItalic(fontStyle) } });
  };

  const toggleBold = (fontStyle: StageTextData['fontStyle']) => {
    switch (fontStyle) {
      case 'normal':
        return 'bold';
      case 'italic':
        return 'italic bold';
      case 'bold':
        return 'normal';
      case 'italic bold':
        return 'italic';
      default:
        break;
    }
  };

  const toggleItalic = (fontStyle: StageTextData['fontStyle']) => {
    switch (fontStyle) {
      case 'normal':
        return 'italic';
      case 'italic':
        return 'normal';
      case 'bold':
        return 'italic bold';
      case 'italic bold':
        return 'bold';
      default:
        break;
    }
  };

  // !! set icon for bold and italic instead of B and I

  return (
    <>
      <Tooltip hasArrow label="Bold" placement="bottom" openDelay={500}>
        <Button
          isActive={isBoldActive}
          fontWeight="bold"
          fontSize="xl"
          onClick={handleBoldClick}
          isDisabled={isBoldAvailable}
        >
          B
        </Button>
      </Tooltip>
      <Tooltip hasArrow label="Italics" placement="bottom" openDelay={500}>
        <Button
          isActive={isItalicActive}
          fontStyle="italic"
          fontSize="xl"
          fontFamily="Aria"
          onClick={handleItalicClick}
          isDisabled={isItalicAvailable}
        >
          I
        </Button>
      </Tooltip>
    </>
  );
};

export default FontStyleSettings;
