import { z } from "zod";

export const registrationSchema = z.object({
  nome: z.string().min(2, "Informe seu nome completo").max(120),
  email: z.email("Informe um e-mail válido").max(200),
  empresa: z.string().min(1, "Informe sua empresa").max(120),
  cargo: z.string().min(1, "Informe seu cargo").max(120),
  // Honeypot: humans never see this field. It must PASS validation even when
  // filled so the handler can return a silent fake success instead of a 400
  // that would tell the bot its submission was detected.
  website: z.string().max(200).optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;
