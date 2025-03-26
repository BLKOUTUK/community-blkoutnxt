import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface CallToActionProps {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  variant?: 'default' | 'gradient' | 'subtle';
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center';
  imageSrc?: string;
}

export function CallToAction({
  title,
  description,
  buttonText,
  buttonHref,
  secondaryButtonText,
  secondaryButtonHref,
  variant = 'default',
  size = 'md',
  align = 'center',
  imageSrc,
}: CallToActionProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case 'gradient':
        return 'bg-gradient-to-r from-purple-600 to-orange-500 text-white';
      case 'subtle':
        return 'bg-muted/50 border border-border';
      default:
        return 'bg-card border border-border';
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'py-6 px-4';
      case 'lg':
        return 'py-12 px-6 md:py-16 md:px-8';
      default:
        return 'py-8 px-6';
    }
  };

  const getTextStyles = () => {
    return variant === 'gradient' ? 'text-white' : '';
  };

  const getDescriptionStyles = () => {
    return variant === 'gradient' ? 'text-white/80' : 'text-muted-foreground';
  };

  const getButtonVariant = () => {
    return variant === 'gradient' ? 'secondary' : 'default';
  };

  const getSecondaryButtonVariant = () => {
    return variant === 'gradient' ? 'outline' : 'outline';
  };

  return (
    <Card className={`overflow-hidden ${getVariantStyles()}`}>
      <CardContent className={`${getSizeStyles()} p-0`}>
        <div className={`flex flex-col ${imageSrc ? 'md:flex-row' : ''} gap-8 items-center`}>
          <div className={`space-y-4 ${align === 'center' ? 'text-center' : 'text-left'} ${imageSrc ? 'md:w-1/2' : 'w-full'}`}>
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${getTextStyles()}`}>
              {title}
            </h2>
            <p className={`max-w-[600px] ${align === 'center' ? 'mx-auto' : ''} ${getDescriptionStyles()}`}>
              {description}
            </p>
            <div className={`flex flex-wrap gap-3 ${align === 'center' ? 'justify-center' : 'justify-start'} pt-2`}>
              <Button asChild size="lg" variant={getButtonVariant()}>
                <Link to={buttonHref}>{buttonText}</Link>
              </Button>
              {secondaryButtonText && secondaryButtonHref && (
                <Button 
                  asChild 
                  size="lg" 
                  variant={getSecondaryButtonVariant()}
                  className={variant === 'gradient' ? 'border-white/20 hover:bg-white/10' : ''}
                >
                  <Link to={secondaryButtonHref}>{secondaryButtonText}</Link>
                </Button>
              )}
            </div>
          </div>
          
          {imageSrc && (
            <div className="md:w-1/2">
              <img 
                src={imageSrc} 
                alt={title} 
                className="w-full h-auto rounded-lg object-cover shadow-lg"
              />
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}