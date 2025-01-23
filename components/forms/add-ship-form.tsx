"use client";

import { Ship } from "@/types/ship";
import { addShip } from "@/services/api";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Ship name must be at least 2 characters.",
  }),
  type: z.string().min(1, {
    message: "Please select a ship type.",
  }),
  capacity: z.number().min(1, {
    message: "Capacity must be at least 1.",
  }),
  portOfOrigin: z.string().min(2, {
    message: "Port of origin must be at least 2 characters.",
  }),
  status: z.enum(["Available", "Maintenance", "Docked", "In Transit"], {
    required_error: "Please select a status.",
  }),
});

export function AddShipForm() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "",
      capacity: 0,
      portOfOrigin: "",
      status: "Available",
    },
  });

  function onSubmit(values: Omit<Ship, "id">) {
    setIsLoading(true);
    addShip(values)
      .then(() => {
        toast({
          title: "Ship added successfully",
          description: `${values.name} has been added to the fleet.`,
        });
        form.reset();
      })
      .catch((error) => {
        toast({
          title: "Failed to add ship",
          description: error.message,
          variant: "destructive",
        });
      })
      .finally(() => setIsLoading(false));
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ship Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter ship name" {...field} />
              </FormControl>
              <FormDescription>The unique name of the ship.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ship Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a ship type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Cargo">Cargo</SelectItem>
                  <SelectItem value="Passenger">Passenger</SelectItem>
                  <SelectItem value="Tanker">Tanker</SelectItem>
                  <SelectItem value="Container">Container</SelectItem>
                  <SelectItem value="Research">Research</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>The type of ship.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="capacity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Capacity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormDescription>
                The capacity of the ship (in tons for cargo, number of
                passengers for passenger ships).
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="portOfOrigin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Port of Origin</FormLabel>
              <FormControl>
                <Input placeholder="Enter port of origin" {...field} />
              </FormControl>
              <FormDescription>The home port of the ship.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ship status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Available">Available</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                  <SelectItem value="Docked">Docked</SelectItem>
                  <SelectItem value="In Transit">In Transit</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>The current status of the ship.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Ship"}
        </Button>
      </form>
    </Form>
  );
}
