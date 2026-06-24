import path from "path";

export const LOGO_CID = "dcm-logo@drycleanmasters";

export function logoAttachment(): { filename: string; path: string; cid: string } {
  return {
    filename: "DryCleanLogo.png",
    path: path.join(process.cwd(), "public/img/Logo/DryCleanLogo-email.png"),
    cid: LOGO_CID,
  };
}

export function logoImgTag(height = 44): string {
  return `<img src="cid:${LOGO_CID}" alt="DryClean Masters" height="${height}" style="display:block;max-height:${height}px;width:auto;" />`;
}
