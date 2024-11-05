"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Importer useRouter
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {loginAction} from "@/lib/action/auth/login";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter(); // Initialiser le router

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const result = await loginAction({ email, password });

    if (result.success) {
      // Redirection vers le tableau de bord après la connexion réussie
      router.push("/dashboard");
    } else {
      setError(result.error || "Une erreur est survenue");
    }
  };

  return (
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Entrer votre email et mot de passe pour vous connecter</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Mots de passe </Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Mots de passe oublié ?
                </Link>
              </div>
              <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
  );
}