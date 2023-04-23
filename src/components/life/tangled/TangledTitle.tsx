import { ReactNode } from 'react';

interface Props {
  title: string;
  desc?: string | ReactNode;
}

const TangledTitle = ({ title, desc }: Props) => {
  return (
    <section className="tangled-title">
      <h2>{title}</h2>
      {desc && typeof desc === 'string' ? <p>{desc}</p> : desc}
    </section>
  );
};

export default TangledTitle;
