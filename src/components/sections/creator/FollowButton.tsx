"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

export function FollowButton() {
  const [following, setFollowing] = useState(false);

  return (
    <Button onClick={() => setFollowing((value) => !value)} size="lg">
      {following && <Check aria-hidden className="size-4" />}
      {following ? "Following" : "Follow"}
    </Button>
  );
}
