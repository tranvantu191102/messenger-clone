import { FC } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

interface EmojiPickerFCProps {
  onSelect: (emojiData: EmojiClickData, event: MouseEvent) => void;
}

const EmojiPickerFC: FC<EmojiPickerFCProps> = ({ onSelect }) => {
  return (
    <div className="absolute top-0 left-0">
      <EmojiPicker onEmojiClick={onSelect} />
    </div>
  );
};

export default EmojiPickerFC;
