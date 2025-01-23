"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  departure: z.string().min(2, {
    message: "Departure port must be at least 2 characters.",
  }),
  arrival: z.string().min(2, {
    message: "Arrival port must be at least 2 characters.",
  }),
  departureDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Departure date must be in the format YYYY-MM-DD.",
  }),
  arrivalDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Arrival date must be in the format YYYY-MM-DD.",
  }),
});

export function AddVoyageLogForm({ shipId }: { shipId: string }) {
  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      departure: "",
      arrival: "",
      departureDate: "",
      arrivalDate: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(values);
    toast({
      title: "Voyage log added",
      description: `Voyage from ${values.departure} to ${values.arrival} has been logged.`,
    });
    form.reset();
    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="departure"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Port</FormLabel>
              <FormControl>
                <Input placeholder="Singapore" {...field} />
              </FormControl>
              <FormDescription>
                The port from which the ship departed.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arrival"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arrival Port</FormLabel>
              <FormControl>
                <Input placeholder="Hong Kong" {...field} />
              </FormControl>
              <FormDescription>
                The port at which the ship arrived.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departureDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Departure Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>The date the ship departed.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="arrivalDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Arrival Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>The date the ship arrived.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Voyage Log"}
        </Button>
      </form>
    </Form>
  );
}
