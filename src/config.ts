export const config = {
  recipientName: 'Mi persona favorita',
  senderName: 'Luis',
  mainMessage: 'Estas flores son para ti 💛',
  letterMessage: `Hoy quería regalarte algo diferente.

Tal vez estas flores no puedas ponerlas en un florero,
pero fueron hechas especialmente para ti.

Espero que cada flor te recuerde lo especial que eres
y que nunca te falten razones para sonreír.

Feliz día de las flores amarillas. 🌻💛`,
  specialMessage: 'Pero sigue sin ser tan especial como tú.',
  musicUrl: `${import.meta.env.BASE_URL}music/romantic-garden.mp3`,
} as const

export type FlowerKind = 'sunflower' | 'tulip' | 'daisy' | 'wildflower'

export interface FlowerData {
  id: number
  kind: FlowerKind
  x: number
  scale: number
  delay: number
  height: number
  depth: number
  special?: boolean
}
