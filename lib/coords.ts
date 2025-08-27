export type Coord = { page: number; x: number; y: number; size?: number; };
export type FieldMap = Record<string, Coord>;

/**
 * IMPORTANT: These coordinates are STARTER VALUES that you should tweak after
 * you drop the official GOV.UK PDFs into /public/templates.
 * Units are PDF points (1/72 inch). Origin (0,0) is bottom-left.
 */
export const LP1F_COORDS: FieldMap = {
  "donor.fullName": { page: 0, x: 90, y: 705, size: 11 },
  "donor.dob":      { page: 0, x: 420, y: 705, size: 11 },
  "donor.address":  { page: 0, x: 90, y: 682, size: 11 },

  "attorney[0].fullName": { page: 0, x: 90, y: 620, size: 11 },
  "attorney[0].dob":      { page: 0, x: 420, y: 620, size: 11 },
  "attorney[0].address":  { page: 0, x: 90, y: 597, size: 11 },

  "howAttorneysAct.joint":           { page: 0, x: 90, y: 535, size: 12 },
  "howAttorneysAct.jointAndSeveral": { page: 0, x: 180, y: 535, size: 12 },

  "preferences": { page: 1, x: 72, y: 680, size: 11 },
  "instructions": { page: 1, x: 72, y: 610, size: 11 },

  "certificateProvider.name":    { page: 2, x: 90, y: 690, size: 11 },
  "certificateProvider.address": { page: 2, x: 90, y: 667, size: 11 },
  "correspondent.name":          { page: 2, x: 330, y: 690, size: 11 },
  "correspondent.address":       { page: 2, x: 330, y: 667, size: 11 },
};

export const LP1H_COORDS: FieldMap = {
  "donor.fullName": { page: 0, x: 90, y: 705, size: 11 },
  "donor.dob":      { page: 0, x: 420, y: 705, size: 11 },
  "donor.address":  { page: 0, x: 90, y: 682, size: 11 },

  "attorney[0].fullName": { page: 0, x: 90, y: 620, size: 11 },
  "attorney[0].dob":      { page: 0, x: 420, y: 620, size: 11 },
  "attorney[0].address":  { page: 0, x: 90, y: 597, size: 11 },

  "lifeSustainingTreatment.donor":    { page: 0, x: 90, y: 535, size: 12 },
  "lifeSustainingTreatment.attorneys":{ page: 0, x: 180, y: 535, size: 12 },

  "preferences": { page: 1, x: 72, y: 680, size: 11 },
  "instructions": { page: 1, x: 72, y: 610, size: 11 },

  "certificateProvider.name":    { page: 2, x: 90, y: 690, size: 11 },
  "certificateProvider.address": { page: 2, x: 90, y: 667, size: 11 },
  "correspondent.name":          { page: 2, x: 330, y: 690, size: 11 },
  "correspondent.address":       { page: 2, x: 330, y: 667, size: 11 },
};
