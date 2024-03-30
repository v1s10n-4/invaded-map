import { toBase64 } from "@/utils";

export const HitPlaceholder = (w: number, h: number) =>
  ("data:image/svg+xml;base64," +
    toBase64(`
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26" fill="none">
    <path fill="#bebebe" d="M18.5 7.5h.5V7h-.5v.5Zm0 11v.5h.5v-.5h-.5Zm-11 0H7v.5h.5v-.5Zm0-11V7H7v.5h.5ZM1 1V.5H.5V1H1Zm24 24v.5h.5V25H25Zm0-24h.5V.5H25V1ZM1 25H.5v.5H1V25ZM18 7.5v11h1v-11h-1Zm.5 10.5h-11v1h11v-1ZM8 18.5v-11H7v11h1Zm4.6-17.1 12 12 .8-.8-12-12-.8.8Zm12 11.2-12 12 .8.8 12-12-.8-.8Zm-11.2 12-12-12-.8.8 12 12 .8-.8Zm-12-11.2 12-12-.8-.8-12 12 .8.8Zm-.8-12 12 12 .8-.8-12-12-.8.8Zm12 12 12 12 .8-.8-12-12-.8.8Zm-11.2 12 12-12-.8-.8-12 12 .8.8Zm12-12 12-12-.8-.8-12 12 .8.8ZM7.5 8h11V7h-11v1Zm18 17V13h-1v12h1Zm0-12V1h-1v12h1ZM25 .5H13v1h12v-1Zm-12 0H1v1h12v-1ZM1.5 25V13h-1v12h1Zm0-12V1h-1v12h1ZM1 25.5h12v-1H1v1Zm12 0h12v-1H13v1Z"/>
</svg>
`)) as `data:image/${string}`;
