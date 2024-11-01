'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { cn } from "@/components/lib/utils"
import { Badge } from "@/components/ui/badge"

const components = [
  { name: 'Button', component: <Button>Click me</Button> },
  { name: 'Card', component: (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card Description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  ) },
  { name: 'Input', component: <Input placeholder="Type here..." /> },
  { name: 'Select', component: (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select an option" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="option1">Option 1</SelectItem>
        <SelectItem value="option2">Option 2</SelectItem>
        <SelectItem value="option3">Option 3</SelectItem>
      </SelectContent>
    </Select>
  ) },
]

export default function ComponentSection() {
  const [selectedComponent, setSelectedComponent] = useState(components[0])

  return (
    <SidebarProvider>
      <div className="flex min-h-[calc(100vh-3.5rem)]">
        {/* Sidebar - adjusted positioning */}
        <Sidebar className="w-64 border-r fixed top-[3.5rem] bottom-0">
          <SidebarHeader className="p-4">
            <h2 className="text-lg font-semibold">Components</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {components.map((comp) => (
                <SidebarMenuItem
                  key={comp.name}
                  onClick={() => setSelectedComponent(comp)}
                  className={cn(
                    "flex w-full items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                    selectedComponent.name === comp.name ? "bg-accent text-accent-foreground" : "transparent"
                  )}
                >
                  {comp.name}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>

        {/* Main Content */}
        <main className="flex-1">
          <div className="container max-w-4xl py-6 lg:py-10">
            {/* Hero Section */}
            <div className="flex flex-col space-y-4 mb-10">
              <h1 className="text-4xl font-bold tracking-tight">Enhanced UI Components</h1>
              <p className="text-lg text-muted-foreground">
                Explore these custom-crafted components built with shadcn/ui, designed to elevate your application&apos;s user interface.
              </p>
            </div>

            {/* Component Display */}
            <div className="space-y-8">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-semibold tracking-tight">{selectedComponent.name}</h2>
                <Badge variant="secondary">Component</Badge>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 border rounded-md bg-background">
                    {selectedComponent.component}
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col items-start gap-4">
                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      This is a {selectedComponent.name.toLowerCase()} component from the shadcn/ui library.
                      It can be customized and used in various contexts within your application.
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}