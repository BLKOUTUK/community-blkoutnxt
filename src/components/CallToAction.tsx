
import { Button } from '@/components/ui/button';
import { ArrowRightIcon } from 'lucide-react';

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  bgColor?: string;
  className?: string;
}

export function CallToAction({
  title,
  description,
  buttonText,
  buttonHref,
  bgColor = 'bg-gradient-to-r from-purple-500 to-orange-500',
  className = '',
}: CallToActionProps) {
  return (
    <div className={`rounded-xl py-10 px-6 text-white ${bgColor} ${className} wave-bg`}>
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">{title}</h2>
        <p className="text-white/80 mb-6 mx-auto max-w-xl">{description}</p>
        <Button asChild size="lg" variant="secondary" className="gap-2 group">
          <a href={buttonHref}>
            {buttonText}
            <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Button>
      </div>
    </div>
  );
}
