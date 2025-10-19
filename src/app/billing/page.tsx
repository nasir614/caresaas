import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const invoices = [
  { invoice: "INV-2024-005", date: "May 1, 2024", amount: "$49.00", status: "Paid" },
  { invoice: "INV-2024-004", date: "April 1, 2024", amount: "$49.00", status: "Paid" },
  { invoice: "INV-2024-003", date: "March 1, 2024", amount: "$49.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold font-headline tracking-tight">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription and view payment history.</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Current Plan</CardTitle>
            <CardDescription>You are currently on the Monthly Plan.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-baseline space-x-2">
                <span className="text-4xl font-bold">$49</span>
                <span className="text-muted-foreground">/month</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Your subscription will automatically renew on June 1, 2024.
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Upgrade Plan</Button>
            <Button variant="destructive">Cancel Subscription</Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>The card that will be charged.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center space-x-4">
            <div className="p-2 bg-secondary rounded-md">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
            </div>
            <div>
              <p className="font-medium">Visa ending in 1234</p>
              <p className="text-sm text-muted-foreground">Expires 08/2026</p>
            </div>
          </CardContent>
           <CardFooter>
            <Button variant="outline">Update Payment Method</Button>
          </CardFooter>
        </Card>
      </div>

      <Separator />

      <div>
        <h2 className="text-xl font-bold font-headline tracking-tight">Payment History</h2>
        <p className="text-muted-foreground">A record of your past payments.</p>
      </div>

      <Card>
        <CardContent className="pt-6">
            <Table>
                <TableHeader>
                    <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoices.map((invoice) => (
                    <TableRow key={invoice.invoice}>
                        <TableCell className="font-medium">{invoice.invoice}</TableCell>
                        <TableCell>{invoice.date}</TableCell>
                        <TableCell>{invoice.amount}</TableCell>
                        <TableCell><Badge variant="secondary">{invoice.status}</Badge></TableCell>
                        <TableCell className="text-right">
                        <Button variant="outline" size="sm">Download</Button>
                        </TableCell>
                    </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
