import Link from "next/link";
import { MapPin, Briefcase, DollarSign, Clock } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Database } from "@/integrations/supabase/types";

type Job = Database["public"]["Tables"]["jobs"]["Row"];

interface JobCardProps {
  job: Job;
}

export function JobCard({ job }: JobCardProps) {
  const formatSalary = (min?: number, max?: number) => {
    if (!min && !max) return "À négocier";
    if (min && max) return `${min.toLocaleString()} - ${max.toLocaleString()} USD`;
    if (min) return `À partir de ${min.toLocaleString()} USD`;
    return "À négocier";
  };

  const getContractTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      "CDI": "CDI",
      "CDD": "CDD",
      "Stage": "Stage",
      "Freelance": "Freelance",
      "Temps partiel": "Temps partiel"
    };
    return labels[type] || type;
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{job.title}</CardTitle>
          <Badge variant="default" className="bg-accent text-accent-foreground">
            {getContractTypeLabel(job.contract_type)}
          </Badge>
        </div>
        <p className="text-muted-foreground font-medium">{job.company_name}</p>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin size={16} />
          <span>{job.location}</span>
        </div>
        
        {job.sector && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase size={16} />
            <span>{job.sector}</span>
          </div>
        )}
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <DollarSign size={16} />
          <span>{formatSalary(job.salary_min, job.salary_max)}</span>
        </div>
        
        {job.experience_required && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock size={16} />
            <span>{job.experience_required}</span>
          </div>
        )}
        
        {job.description && (
          <p className="text-sm text-foreground/80 line-clamp-2 mt-4">
            {job.description}
          </p>
        )}
      </CardContent>
      
      <CardFooter>
        <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={`/jobs/${job.id}`}>Voir les détails</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}