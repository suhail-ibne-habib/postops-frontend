"use client";

import { useUser } from "@clerk/nextjs";
import { ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

function UserCard({ user }) {
  const initials = user.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() ?? "U";

  return (
    <Card>
      <CardContent className="flex flex-col sm:flex-row items-center gap-5 p-5">
        <Avatar className="h-14 w-14 rounded-xl border border-border">
          <AvatarImage src={user.imageUrl} alt={user.fullName ?? "User"} />
          <AvatarFallback className="rounded-xl text-sm font-bold">{initials}</AvatarFallback>
        </Avatar>

        <div className="flex-1 text-center sm:text-left space-y-1">
          <p className="font-semibold">{user.fullName ?? "User"}</p>
          <p className="text-sm text-muted-foreground">
            {user.primaryEmailAddress?.emailAddress}
          </p>
          <Badge variant="secondary" className="text-[10px]">
            Clerk session active
          </Badge>
        </div>

        <Button variant="outline" size="sm" asChild>
          <a href="https://dashboard.clerk.com" target="_blank" rel="noreferrer">
            Manage profile
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}

function DangerZone() {
  return (
    <div className="space-y-3">
      <div>
        <p className="text-sm font-semibold text-destructive">Danger Zone</p>
        <p className="text-xs text-muted-foreground">Irreversible actions for this account.</p>
      </div>
      <Card className="border-destructive/20">
        <CardContent className="flex items-center justify-between p-4">
          <div>
            <p className="text-sm font-medium text-destructive">Delete Account</p>
            <p className="text-xs text-muted-foreground">Permanently erase all your content and data.</p>
          </div>
          <Button variant="destructive" size="sm">Delete</Button>
        </CardContent>
      </Card>
    </div>
  );
}

export function ProfileTab() {
  const { user } = useUser();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-base font-semibold">User Profile</h3>
        <p className="text-xs text-muted-foreground mt-0.5">
          Your authenticated account linked via Clerk.
        </p>
      </div>

      {user ? <UserCard user={user} /> : (
        <Card>
          <CardContent className="p-4 text-center text-sm text-muted-foreground">
            Loading profile…
          </CardContent>
        </Card>
      )}

      <Separator />
      <DangerZone />
    </div>
  );
}
