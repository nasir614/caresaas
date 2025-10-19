import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Client } from "@/types";
import { ArrowUpRight, File, HeartPulse, Home, Map, ShieldCheck, User, Users } from "lucide-react";

// Mock data for a single client
const client: Client = {
  id: "client-001",
  firstName: "Eleanor",
  lastName: "Vance",
  dateOfBirth: "1945-03-15",
  status: "Active",
  organizationId: "org-1",
  tenantId: "tenant-1",
  assignedCaregivers: ["user-2"],
  assignedNurses: ["user-3"],
};

const clientImage = PlaceHolderImages.find(p => p.id === "client-profile");

export default function ClientProfilePage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch client data based on params.id
  // and check user permissions to view this client.

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row items-start justify-between gap-4">
            <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 border-2 border-primary">
                    <AvatarImage src={clientImage?.imageUrl} alt={`${client.firstName} ${client.lastName}`} data-ai-hint={clientImage?.imageHint} />
                    <AvatarFallback>{client.firstName.charAt(0)}{client.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-3xl font-bold font-headline tracking-tight">{client.firstName} {client.lastName}</h1>
                    <p className="text-muted-foreground">Client ID: {client.id}</p>
                </div>
            </div>
            <Button variant="outline">
                Edit Profile
                <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
        
        <Tabs defaultValue="info" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="info"><User className="mr-2"/>Basic Info</TabsTrigger>
                <TabsTrigger value="attendance"><Users className="mr-2"/>Attendance</TabsTrigger>
                <TabsTrigger value="care_plans"><HeartPulse className="mr-2"/>Care Plans</TabsTrigger>
                <TabsTrigger value="authorizations"><ShieldCheck className="mr-2"/>Authorizations</TabsTrigger>
                <TabsTrigger value="transportation"><Map className="mr-2"/>Transportation</TabsTrigger>
                <TabsTrigger value="documents"><File className="mr-2"/>Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="info">
                <Card>
                <CardHeader>
                    <CardTitle>Basic Information</CardTitle>
                    <CardDescription>Personal details and emergency contacts.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                            <p>{client.firstName} {client.lastName}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">Date of Birth</p>
                            <p>{new Date(client.dateOfBirth).toLocaleDateString()}</p>
                        </div>
                         <div>
                            <p className="text-sm font-medium text-muted-foreground">Status</p>
                            <p>{client.status}</p>
                        </div>
                    </div>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="attendance">
                <Card>
                <CardHeader>
                    <CardTitle>Attendance Records</CardTitle>
                     <CardDescription>History of check-ins and check-outs.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-48">
                    <p className="text-muted-foreground">Attendance records will be displayed here.</p>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="care_plans">
                <Card>
                <CardHeader>
                    <CardTitle>Care Plans</CardTitle>
                     <CardDescription>Individualized care goals and schedules.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-48">
                    <p className="text-muted-foreground">Care plans will be displayed here.</p>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="authorizations">
                <Card>
                <CardHeader>
                    <CardTitle>Service Authorizations</CardTitle>
                     <CardDescription>Authorizations for services and care.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-48">
                    <p className="text-muted-foreground">Service authorizations will be displayed here.</p>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="transportation">
                <Card>
                <CardHeader>
                    <CardTitle>Transportation</CardTitle>
                     <CardDescription>Transportation arrangements and schedules.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-48">
                    <p className="text-muted-foreground">Transportation details will be displayed here.</p>
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="documents">
                <Card>
                <CardHeader>
                    <CardTitle>Documents</CardTitle>
                     <CardDescription>Uploaded documents and files.</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-48">
                    <p className="text-muted-foreground">Document management will be available here.</p>
                </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
  )
}
