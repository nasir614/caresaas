import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Client } from "@/types";
import { PlusCircle, Search } from "lucide-react";

const mockClients: Client[] = [
  { id: "client-001", firstName: "Eleanor", lastName: "Vance", dateOfBirth: "1945-03-15", status: "Active", organizationId: "org-1", tenantId: "tenant-1" },
  { id: "client-002", firstName: "Arthur", lastName: "Pendleton", dateOfBirth: "1952-07-21", status: "Active", organizationId: "org-1", tenantId: "tenant-1" },
  { id: "client-003", firstName: "Beatrice", lastName: "Miller", dateOfBirth: "1948-11-02", status: "Inactive", organizationId: "org-1", tenantId: "tenant-1" },
  { id: "client-004", firstName: "Charles", lastName: "Davis", dateOfBirth: "1955-01-30", status: "Active", organizationId: "org-1", tenantId: "tenant-1" },
];

const clientImage = PlaceHolderImages.find(p => p.id === "client-profile");

export default function ClientsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight">Clients</h1>
          <p className="text-muted-foreground">View and manage all clients in your organization.</p>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Client
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search clients..." className="pl-8" />
            </div>
            {/* Add filter dropdowns here */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Date of Birth</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="hidden h-9 w-9 sm:flex">
                          <AvatarImage src={clientImage?.imageUrl} alt="Avatar" data-ai-hint={clientImage?.imageHint} />
                          <AvatarFallback>{client.firstName.charAt(0)}{client.lastName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-0.5">
                          <p className="font-medium">{client.firstName} {client.lastName}</p>
                          <p className="text-xs text-muted-foreground hidden sm:block">ID: {client.id}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {new Date(client.dateOfBirth).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Badge variant={client.status === "Active" ? "default" : "secondary"} className={client.status === "Active" ? "bg-green-500/20 text-green-700 border-green-500/20" : ""}>
                        {client.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                       <Button asChild variant="outline" size="sm">
                          <Link href={`/clients/${client.id}`}>View Details</Link>
                       </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-end space-x-2">
        <Button variant="outline" size="sm">Previous</Button>
        <Button variant="outline" size="sm">Next</Button>
      </div>
    </div>
  );
}
