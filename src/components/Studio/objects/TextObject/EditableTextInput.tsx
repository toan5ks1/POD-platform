import { CSSProperties, KeyboardEvent } from 'react';
import { Html } from 'react-konva-utils';
import TextareaAutosize from 'react-textarea-autosize';
import useStageObject from '~/hooks/use-stage-object';
import { StageTextData, StageTextObjectData } from '~/types/stage-object';

type TEditableTextInput = {
  shapeProps: StageTextObjectData;
  handleEscapeKeys: (e: KeyboardEvent<HTMLTextAreaElement>) => void;
};

function getStyle(shapeProps: StageTextData) {
  const baseStyle: CSSProperties = {
    width: `${shapeProps.width}px`,
    border: 'none',
    padding: '0px',
    margin: '0px',
    background: 'none',
    outline: 'none',
    overflow: 'hidden',
    resize: 'none',
    fontSize: `${shapeProps.fontSize}px`,
    color: shapeProps.fill,
    lineHeight: shapeProps.lineHeight,
    fontFamily: shapeProps.fontFamily,
    fontWeight: shapeProps.fontStyle.includes('bold') ? 'bold' : 'normal',
    fontStyle: shapeProps.fontStyle.includes('italic') ? 'italic' : 'normal',
    textDecoration: shapeProps.textDecoration,
    textAlign: shapeProps.align,
    letterSpacing: shapeProps.letterSpacing,
    transformOrigin: 'left center',
    rotate: `${shapeProps.rotation}deg`,
  };

  return baseStyle;
}

const EditableTextInput = ({ shapeProps, handleEscapeKeys }: TEditableTextInput) => {
  const { updateOne } = useStageObject();
  const { id, data } = shapeProps;
  const { x, y, text } = data;
  const style = getStyle(data);

  const onKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    handleEscapeKeys(e);
  };

  return (
    <Html groupProps={{ x, y }} divProps={{ style: { opacity: 1 } }}>
      <TextareaAutosize
        cacheMeasurements
        value={text}
        onKeyDown={onKeyDown}
        onChange={(e) => updateOne({ id, data: { text: e.target.value } })}
        style={style as any}
        autoFocus
      />
    </Html>
  );
};

export default EditableTextInput;
