import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export function BlogCTA() {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary to-primary-light p-6 text-white">
      <h3 className="text-lg font-bold">
        Yapay zeka ile işini büyütmeye hazır mısın?
      </h3>
      <p className="mt-2 text-white/80 text-sm leading-relaxed">
        GROWT Method ile 5 seviyede dönüşüm. Kendi hızında, sektörüne özel.
      </p>
      <div className="mt-5 flex flex-col gap-2">
        <Button
          href="/test"
          variant="accent"
          size="sm"
          className="w-full"
        >
          Kişisel Planını Oluştur <ArrowRight size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
}
