declare module '*.svg?url' {
  import { StaticImageData } from 'next/image';
  const staticImageData: StaticImageData
  export default staticImageData;
}