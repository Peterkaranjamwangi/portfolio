/**
 * The services layer: the only code in the app that knows API paths.
 *
 * Components and hooks import from here; nothing below this line is reached by
 * a component directly, and nothing above it calls `fetch`.
 */

export { estimateService } from "@/services/estimate.service";
export type {
  PriceRequest,
  PricedEstimate,
  SubmitEstimateRequest,
} from "@/services/estimate.service";

export {
  postsService,
  projectsService,
  servicesService,
  skillsService,
  technologiesService,
} from "@/services/portfolio.service";

export { contactService } from "@/services/contact.service";

export { storageService } from "@/services/storage.service";
export type { UploadedImage, UploadFolder } from "@/services/storage.service";

export type * from "@/services/types";
