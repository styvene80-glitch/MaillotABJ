import Hero from "@/components/Hero";
import TrustBar from "@/components/TrustBar";
import OrderForm from "@/components/OrderForm";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:py-20">
        <OrderForm />
        <p className="mt-6 text-center text-sm text-muted">
          Indique le club ou la sélection de ton choix, le type de maillot et
          ta taille — on s&apos;occupe du reste.
        </p>
      </div>
    </>
  );
}
