/**
 * Centralized lead submission utility.
 *
 * All website forms should import and use this function rather than implementing
 * their own fetch calls to /api/leads.  It ensures a consistent payload shape
 * and keeps submission logic in one place.
 *
 * Server-side validation (NestJS DTO) is still enforced independently of this
 * function.  This utility does no validation of its own.
 */
export interface SubmitLeadDto {
  name: string;
  phone: string;
  email?: string | null;
  city: string;
  leadType: string;
  source: string;
  message?: string | null;
  electricityInfo?: string | null;
  _gotcha?: string | null;
  // Calculator-specific fields (only populated when source = 'solar-calculator')
  monthlyConsumptionKwh?: number | null;
  recommendedSystemKwp?: number | null;
  estimatedAnnualSavingsInr?: number | null;
  potentialSubsidyInr?: number | null;
  scheme?: string | null;
}

/**
 * Submits a lead to the NestJS API.
 *
 * @param data      Lead data conforming to the validated DTO schema.
 * @param onResult  Optional callback receiving { success: boolean; leadId?: string; error?: string }.
 * @returns A promise that resolves to the API response shape.
 */
export async function submitLead(
  data: SubmitLeadDto,
  onResult?: (result: {
    success: boolean;
    leadId?: string;
    error?: string;
  }) => void,
): Promise<{ success: boolean; leadId?: string; error?: string }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

  // Build the request body, converting empty strings to undefined so they
  // become JSON nulls that the server treats as "not provided".
  const body: Record<string, unknown> = {
    name: data.name,
    phone: data.phone,
    email: data.email ?? undefined,
    city: data.city || undefined,
    leadType: data.leadType,
    source: data.source,
    message: data.message ?? undefined,
    electricityInfo: data.electricityInfo ?? undefined,
    _gotcha: data._gotcha ?? undefined,
  };

  // Only include calculator fields when relevant; the server DTO has them as optional.
  if (data.monthlyConsumptionKwh !== undefined) {
    ;(body as Record<string, unknown>).monthlyConsumptionKwh = data.monthlyConsumptionKwh;
  }
  if (data.recommendedSystemKwp !== undefined) {
    ;(body as Record<string, unknown>).recommendedSystemKwp = data.recommendedSystemKwp;
  }
  if (data.estimatedAnnualSavingsInr !== undefined) {
    ;(body as Record<string, unknown>).estimatedAnnualSavingsInr = data.estimatedAnnualSavingsInr;
  }
  if (data.potentialSubsidyInr !== undefined) {
    ;(body as Record<string, unknown>).potentialSubsidyInr = data.potentialSubsidyInr;
  }
  if (data.scheme !== undefined) {
    ;(body as Record<string, unknown>).scheme = data.scheme;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15_000);

  try {
    const res = await fetch(`${apiUrl}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!res.ok) {
      const errorBody = await res.json().catch(() => ({}));
      const message =
        (errorBody as { message?: string }).message ?? `Error ${res.status}`;

      if (res.status === 429) {
        onResult?.({ success: false, error: "Too many requests. Please wait a moment and try again." });
        return { success: false, error: "rate-limited" };
      }

      onResult?.({ success: false, error: message });
      return { success: false, error: message };
    }

    const json = await res.json();
    onResult?.({ success: true, leadId: json.leadId });
    return { success: true, leadId: json.leadId };
  } catch (err) {
    clearTimeout(timeoutId);
    const message = err instanceof Error ? err.message : "Unable to submit. Please try again or call us directly.";
    onResult?.({ success: false, error: message });
    return { success: false, error: message };
  }
}