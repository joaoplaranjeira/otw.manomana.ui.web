import Link from "next/link";

export function Logo() {
  return <Link href="/" className="logo" aria-label="mano mana — início">mano mana<span className="logo__tail" aria-hidden="true" /></Link>;
}
