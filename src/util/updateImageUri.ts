type Params = {
  url: string;
  height: number | string;
  width: number | string;
  croppingPoint?: string;
};

export const updateImageUri = ({
  url,
  height,
  width,
  croppingPoint = '',
}: Params): string =>
  url
    .replace('{height}', height.toString())
    .replace('{width}', width.toString())
    .replace('{croppingPoint}', croppingPoint)
    .concat('&type=webp');
