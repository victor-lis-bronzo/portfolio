"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Field } from "@/components/ui/field";

import { validateAdminCode } from "../_actions/validate-admin-code";

const formSchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 characters."),
});

interface AuthFormProps {
  onSuccess?: () => void;
}

export function AuthForm({ onSuccess }: AuthFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    const result = await validateAdminCode(data.code);

    if (result.success) {
      toast.success("Authenticated successfully!");
      onSuccess?.();
    } else {
      toast.error(result.error || "Invalid code.");
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader>
        <CardTitle>Admin Access</CardTitle>
        <CardDescription>
          Please enter the 6-digit administrative code.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="form-auth"
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center gap-4"
        >
          <Controller
            control={form.control}
            name="code"
            render={({ field }) => (
              <InputOTP
                maxLength={6}
                value={field.value}
                onChange={field.onChange}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            )}
          />
        </form>
      </CardContent>
      <CardFooter>
        <Field orientation="horizontal" className="w-full">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => form.reset()}
          >
            Reset
          </Button>
          <Button type="submit" form="form-auth" className="flex-1">
            Verify
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
