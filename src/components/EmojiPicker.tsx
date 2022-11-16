import { FC } from "react";
import data from "@emoji-mart/data";
// import Picker from '@emoji-mart/react'

interface EmojiPickerProps {
  onSelect: (value: string) => void;
}

const EmojiPicker: FC<EmojiPickerProps> = ({ onSelect }) => {
  return <div></div>;
};

export default EmojiPicker;
