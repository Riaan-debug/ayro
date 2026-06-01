type FormspreeResult = { ok: true } | { ok: false; error: string }

export async function submitToFormspree(
  formId: string | undefined,
  data: Record<string, string>,
): Promise<FormspreeResult> {
  if (!formId) {
    if (import.meta.env.DEV) {
      console.info('[forms] No Formspree ID configured — demo submit only.', data)
    }
    return { ok: true }
  }

  const res = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { error?: string } | null
    return { ok: false, error: body?.error ?? 'Something went wrong. Please try again.' }
  }

  return { ok: true }
}

export const forms = {
  contact: import.meta.env.VITE_FORMSPREE_CONTACT_ID as string | undefined,
  customOrder: import.meta.env.VITE_FORMSPREE_CUSTOM_ORDER_ID as string | undefined,
}
