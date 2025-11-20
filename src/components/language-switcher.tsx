'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleChange = (value: string) => {
    router.replace(pathname, { locale: value as any });
  };

  return (
    <Select defaultValue={locale} onValueChange={handleChange}>
      <SelectTrigger className="w-[140px]">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="pt">Português</SelectItem>
        <SelectItem value="es">Español</SelectItem>
      </SelectContent>
    </Select>
  );
}
