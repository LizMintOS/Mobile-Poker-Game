const Title = ({ title, style }: { title: string, style?: string }) => {
  return <h2 className={`${style} text-3xl font-bold text-center`}>{title}</h2>;
};
export default Title;
