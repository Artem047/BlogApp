import Input from "../../../components/input/Input";

interface IProps {
  title: string;
  text: string;
}

const InfoUserItem = ({ title, text }: IProps) => {
  return (
    <div className="flex flex-col gap-2">
      <label>{title}</label>
      <Input
        type="text"
        className="bg-[#F7F7F7] flex items-center border border-[#E1E1E1] h-12 rounded-xl outline-none text-sm px-6 w-[400px] placeholder:text-black"
        placeholder={text}
        readonly
      />
    </div>
  );
};

export default InfoUserItem;
