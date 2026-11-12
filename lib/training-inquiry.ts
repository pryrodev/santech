import { useMutation } from "@tanstack/react-query";

export type TrainingInquiryInput = Record<string, string>;
export type TrainingInquiryResult = { ok: true; setupRequired: boolean; message: string };

async function submitTrainingInquiry(input: TrainingInquiryInput): Promise<TrainingInquiryResult> {
  const platformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL?.replace(/\/$/, "");
  if (!platformUrl) throw new Error("The learning platform is not configured.");
  let response: Response;
  try {
    response = await fetch(`${platformUrl}/api/public/training-inquiries`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(input) });
  } catch {
    throw new Error("We could not reach the training platform. Please check your internet connection and try again.");
  }
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(body.error || "Something went wrong while sending your request. Please try again in a few minutes.");
  return body as TrainingInquiryResult;
}

export function useSubmitTrainingInquiry() {
  return useMutation({ mutationFn: submitTrainingInquiry });
}
