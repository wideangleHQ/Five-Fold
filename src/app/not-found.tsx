import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 bg-white text-[#111615] font-sans">
      <Container className="text-center space-y-6">
        <span className="font-sans text-xs font-bold uppercase tracking-wider text-[#1F7A45]">
          404 Error
        </span>
        <h1 className="font-heading text-4xl sm:text-6xl font-extrabold text-[#111615] tracking-tight">
          Page Not Found
        </h1>
        <p className="font-sans text-slate-600 text-base max-w-md mx-auto">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="pt-4">
          <Button href="/" variant="primary" className="bg-[#1F7A45] hover:bg-[#165c33]">
            Back to Home
          </Button>
        </div>
      </Container>
    </div>
  );
}
