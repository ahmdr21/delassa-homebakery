import { useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link2,
  Heading1,
  Heading2,
  Undo,
  Redo,
  Type
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync value from prop to DOM (only if it differs from innerHTML to avoid cursor jumps)
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const executeCommand = (command: string, arg = "") => {
    document.execCommand(command, false, arg);
    handleInput(); // Trigger change
  };

  const addLink = () => {
    const url = prompt("Masukkan URL link:");
    if (url) {
      // Pastikan ada skema http/https
      const formattedUrl = url.match(/^https?:\/\//) ? url : `https://${url}`;
      executeCommand("createLink", formattedUrl);
    }
  };

  return (
    <div className="border border-[#ead8c7] rounded-2xl overflow-hidden bg-white focus-within:border-[#c38358] transition-all duration-200">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-1 p-2 bg-[#fdf9f6] border-b border-[#ead8c7]/50 select-none">
        <button
          type="button"
          onClick={() => executeCommand("bold")}
          className="p-1.5 rounded-lg hover:bg-[#fff5ef] text-[#2f221d] transition-all cursor-pointer"
          title="Tebal (Bold)"
        >
          <Bold size={15} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("italic")}
          className="p-1.5 rounded-lg hover:bg-[#fff5ef] text-[#2f221d] transition-all cursor-pointer"
          title="Miring (Italic)"
        >
          <Italic size={15} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("underline")}
          className="p-1.5 rounded-lg hover:bg-[#fff5ef] text-[#2f221d] transition-all cursor-pointer"
          title="Garis Bawah (Underline)"
        >
          <Underline size={15} />
        </button>
        
        <div className="w-[1px] bg-[#ead8c7]/50 mx-1 my-1"></div>

        <button
          type="button"
          onClick={() => executeCommand("formatBlock", "<h1>")}
          className="p-1.5 rounded-lg hover:bg-[#fff5ef] text-[#2f221d] transition-all cursor-pointer"
          title="Heading 1"
        >
          <Heading1 size={15} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("formatBlock", "<h2>")}
          className="p-1.5 rounded-lg hover:bg-[#fff5ef] text-[#2f221d] transition-all cursor-pointer"
          title="Heading 2"
        >
          <Heading2 size={15} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("formatBlock", "<p>")}
          className="p-1.5 rounded-lg hover:bg-[#fff5ef] text-[#2f221d] transition-all cursor-pointer"
          title="Paragraf Biasa"
        >
          <Type size={15} />
        </button>

        <div className="w-[1px] bg-[#ead8c7]/50 mx-1 my-1"></div>

        <button
          type="button"
          onClick={() => executeCommand("insertUnorderedList")}
          className="p-1.5 rounded-lg hover:bg-[#fff5ef] text-[#2f221d] transition-all cursor-pointer"
          title="Daftar Bullet (Unordered List)"
        >
          <List size={15} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("insertOrderedList")}
          className="p-1.5 rounded-lg hover:bg-[#fff5ef] text-[#2f221d] transition-all cursor-pointer"
          title="Daftar Angka (Ordered List)"
        >
          <ListOrdered size={15} />
        </button>

        <div className="w-[1px] bg-[#ead8c7]/50 mx-1 my-1"></div>

        <button
          type="button"
          onClick={addLink}
          className="p-1.5 rounded-lg hover:bg-[#fff5ef] text-[#2f221d] transition-all cursor-pointer"
          title="Tambah Link"
        >
          <Link2 size={15} />
        </button>

        <div className="w-[1px] bg-[#ead8c7]/50 mx-1 my-1"></div>

        <button
          type="button"
          onClick={() => executeCommand("undo")}
          className="p-1.5 rounded-lg hover:bg-[#fff5ef] text-[#2f221d] transition-all cursor-pointer"
          title="Undo"
        >
          <Undo size={15} />
        </button>
        <button
          type="button"
          onClick={() => executeCommand("redo")}
          className="p-1.5 rounded-lg hover:bg-[#fff5ef] text-[#2f221d] transition-all cursor-pointer"
          title="Redo"
        >
          <Redo size={15} />
        </button>
      </div>

      {/* Editable Content Area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        className="p-4 min-h-[300px] outline-none text-xs font-semibold text-[#3b2b26] bg-[#fdf7f2]/20 focus:bg-white transition-all max-w-none prose"
        style={{
          fontFamily: "inherit",
        }}
        data-placeholder={placeholder}
      />

      {/* CSS untuk placeholder contentEditable */}
      <style>{`
        [contenteditable]:empty:before {
          content: attr(data-placeholder);
          color: #9b8d86;
          font-weight: 500;
          cursor: text;
        }
      `}</style>
    </div>
  );
}
