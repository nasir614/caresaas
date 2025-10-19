"use client";

import React, { useState, useTransition } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  complianceCheckTool,
  type ComplianceCheckToolOutput,
} from "@/ai/flows/compliance-check-tool";
import { Loader2, ShieldCheck, AlertTriangle } from "lucide-react";
import { useToast } from "@/lib/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ComplianceChecker() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const [result, setResult] = useState<ComplianceCheckToolOutput | null>(null);

  const [staffCredentials, setStaffCredentials] = useState(
    `Alice Johnson, RN, License #12345, Expires 2024-12-31
Bob Williams, CNA, Cert #67890, Expires 2025-06-30
Carol Smith, Nurse, License #54321, Missing Expiry`
  );
  const [trainingRecords, setTrainingRecords] = useState(
    `Alice Johnson, CPR Training, Completed 2023-01-15
Bob Williams, CPR Training, Completed 2022-05-20 (Expired)
David Brown, First Aid, Completed 2024-03-10`
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setResult(null);

    startTransition(async () => {
      const res = await complianceCheckTool({
        staffCredentials,
        trainingRecords,
      });

      if (res) {
        setResult(res);
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to perform compliance check.",
        });
      }
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShieldCheck className="mr-2 h-6 w-6 text-primary" />
            AI Compliance Check
          </CardTitle>
          <CardDescription>
            Review staff credentials and training records for potential
            compliance issues.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid w-full gap-1.5">
              <Label htmlFor="staffCredentials">Staff Credentials</Label>
              <Textarea
                id="staffCredentials"
                placeholder="Paste staff credentials here..."
                className="min-h-32"
                value={staffCredentials}
                onChange={(e) => setStaffCredentials(e.target.value)}
              />
            </div>
            <div className="grid w-full gap-1.5">
              <Label htmlFor="trainingRecords">Training Records</Label>
              <Textarea
                id="trainingRecords"
                placeholder="Paste training records here..."
                className="min-h-32"
                value={trainingRecords}
                onChange={(e) => setTrainingRecords(e.target.value)}
              />
            </div>
          </div>
          {result && (
            <div className="space-y-4 pt-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Compliance Issues Identified</AlertTitle>
                <AlertDescription>
                  <pre className="whitespace-pre-wrap font-sans text-sm">
                    {result.complianceIssues}
                  </pre>
                </AlertDescription>
              </Alert>
              <Alert variant="default" className="bg-blue-50 border-blue-200 dark:bg-blue-950 dark:border-blue-800">
                <ShieldCheck className="h-4 w-4" />
                <AlertTitle>Overall Risk Assessment</AlertTitle>
                <AlertDescription>
                    <pre className="whitespace-pre-wrap font-sans text-sm">
                        {result.riskAssessment}
                    </pre>
                </AlertDescription>
              </Alert>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Analyzing..." : "Run Compliance Check"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
