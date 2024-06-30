

export const Metadata = ({
    title,
    description,
    href
  }: {
    title: string;
    description: string;
    href: string;
  }) => {
  return (
    <head>
      <title>{title}</title>
      <meta name='description' content={description} />
      <link rel='icon' href={href} />
    </head>
  );
};