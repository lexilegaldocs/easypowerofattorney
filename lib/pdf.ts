import fs from "fs";
import path from "path";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import { LPAForm } from "./validation";
import { LP1F_COORDS, LP1H_COORDS, Coord } from "./coords";

/**
 * Try to load a template PDF from /public/templates. If not found,
 * fall back to the summary-pack generator.
 */
async function loadTemplateBytes(type: "LP1F"|"LP1H"): Promise<Uint8Array | null> {
  const file = type === "LP1F" ? "LP1F.pdf" : "LP1H.pdf";
  const p = path.join(process.cwd(), "public", "templates", file);
  try {
    const b = fs.readFileSync(p);
    return new Uint8Array(b);
  } catch {
    return null;
  }
}

function textAt(page: any, font: any, txt: string, x: number, y: number, size=11) {
  page.drawText(txt, { x, y, size, font, color: rgb(0,0,0) });
}

function wrapText(page: any, font: any, txt: string, x: number, y: number, maxWidth: number, size=11, lineHeight=14) {
  if (!txt) return;
  const words = txt.split(/\s+/);
  let line = "";
  let yy = y;
  for (const w of words) {
    const t = line ? line + " " + w : w;
    const wpx = font.widthOfTextAtSize(t, size);
    if (wpx > maxWidth) {
      page.drawText(line, { x, y: yy, size, font });
      yy -= lineHeight;
      line = w;
    } else {
      line = t;
    }
  }
  if (line) page.drawText(line, { x, y: yy, size, font });
}

/**
 * Render onto the official template. Coordinates are starter values — tweak as needed.
 */
export async function generateLpaOfficial(form: LPAForm): Promise<Uint8Array> {
  const bytes = await loadTemplateBytes(form.type);
  if (!bytes) throw new Error("Template PDF not found. Please place the official PDF in /public/templates.");

  const pdf = await PDFDocument.load(bytes);
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pages = pdf.getPages();

  const C = form.type === "LP1F" ? LP1F_COORDS : LP1H_COORDS;

  // Helpers to get values
  const donorName = `${form.donor.firstName} ${form.donor.lastName}`.trim();
  const donorDob = form.donor.dob || "";
  const donorAddress = form.donor.address || "";
  const att0 = form.attorneys[0];
  const attName = att0 ? `${att0.firstName} ${att0.lastName}`.trim() : "";
  const attDob = att0?.dob || "";
  const attAddress = att0?.address || "";

  function place(key: string, value: string) {
    const c: Coord | undefined = (C as any)[key];
    if (!c) return;
    const page = pages[c.page];
    if (!page) return;
    if (key === "preferences" || key === "instructions") {
      wrapText(page, font, value, c.x, c.y, 445, c.size || 11);
    } else {
      textAt(page, font, value, c.x, c.y, c.size || 11);
    }
  }

  // Donor
  place("donor.fullName", donorName);
  place("donor.dob", donorDob);
  place("donor.address", donorAddress);

  // Attorney[0]
  place("attorney[0].fullName", attName);
  place("attorney[0].dob", attDob);
  place("attorney[0].address", attAddress);

  // Acting method / Life-sustaining treatment
  if (form.type === "LP1F") {
    if (form.decisions.howAttorneysAct === "joint") place("howAttorneysAct.joint", "☑");
    else place("howAttorneysAct.jointAndSeveral", "☑");
  } else {
    if (form.decisions.lifeSustainingTreatment === "attorneys") place("lifeSustainingTreatment.attorneys", "☑");
    else place("lifeSustainingTreatment.donor", "☑");
  }

  // Preferences / Instructions
  place("preferences", form.decisions.preferences || "");
  place("instructions", form.decisions.instructions || "");

  // Certificate provider & correspondent
  place("certificateProvider.name", form.certificateProvider?.name || "");
  place("certificateProvider.address", form.certificateProvider?.address || "");
  place("correspondent.name", form.correspondent?.name || "");
  place("correspondent.address", form.correspondent?.address || "");

  // Optional watermark note (can remove)
  const p0 = pages[0];
  p0.drawText("Prepared by easypowerofattorney.co.uk", { x: 360, y: 20, size: 8, font, color: rgb(0.3,0.3,0.3)});

  return await pdf.save();
}

/**
 * Fallback: summary pack (previous behavior)
 */
export async function generateLpaPack(form: LPAForm): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([595.28, 841.89]);
  const { width } = page.getSize();
  const margin = 48;
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const bold = await pdf.embedFont(StandardFonts.HelveticaBold);

  let y = 800;
  function heading(t: string) {
    y -= 24;
    page.drawText(t, { x: margin, y, size: 18, font: bold, color: rgb(0.06,0.65,0.91)});
    y -= 12;
  }
  function text(t: string) {
    const maxWidth = width - margin*2;
    const words = t.split(/\s+/);
    let line = "";
    for (const w of words) {
      const tmp = line ? line + " " + w : w;
      const tw = font.widthOfTextAtSize(tmp, 12);
      if (tw > maxWidth) {
        y -= 16;
        page.drawText(line, { x: margin, y, size: 12, font });
        line = w;
      } else {
        line = tmp;
      }
    }
    if (line) {
      y -= 16;
      page.drawText(line, { x: margin, y, size: 12, font });
    }
    y -= 6;
  }
  function kv(label: string, value: string) {
    y -= 16;
    page.drawText(label + ": ", { x: margin, y, size: 12, font: bold });
    page.drawText(value || "-", { x: margin + 120, y, size: 12, font });
  }

  heading(`${form.type} Lasting Power of Attorney – Summary Pack`);
  text("This pack organises your information under the Office of the Public Guardian (OPG) section headings. You must still print, sign and have witnesses/certificate provider sign in the correct order. See the signing checklist at the end of this pack.");

  const donorName = `${form.donor.firstName} ${form.donor.lastName}`.trim();
  heading("Donor"); kv("Name", donorName); kv("Date of birth", form.donor.dob); kv("Address", form.donor.address);

  heading("Attorneys");
  form.attorneys.forEach((a, i) => { kv(`Attorney ${i+1}`, `${a.firstName} ${a.lastName}`); kv("DOB", a.dob); kv("Address", a.address); });

  heading("How attorneys act");
  kv("Acting method", form.decisions.howAttorneysAct === "joint" ? "Joint" : "Jointly and severally");

  if (form.type === "LP1H") {
    heading("Life-sustaining treatment");
    kv("Decision-maker", form.decisions.lifeSustainingTreatment === "attorneys" ? "Attorneys" : "Donor");
  }

  heading("Preferences"); text(form.decisions.preferences || "None provided");
  heading("Instructions"); text(form.decisions.instructions || "None provided");

  if (form.certificateProvider) {
    heading("Certificate provider");
    kv("Name", form.certificateProvider.name); kv("Address", form.certificateProvider.address);
  }

  heading("Correspondent"); kv("Name", form.correspondent?.name || ""); kv("Address", form.correspondent?.address || "");

  const bytes = await pdf.save();
  return bytes;
}
