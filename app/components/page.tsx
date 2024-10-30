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
  SidebarMenuButton,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"

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
      <div className="flex h-screen">
        <Sidebar className="w-64">
          <SidebarHeader>
            <h2 className="text-xl font-bold p-4">Components</h2>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {components.map((comp) => (
                <SidebarMenuItem key={comp.name}>
                  <SidebarMenuButton
                    onClick={() => setSelectedComponent(comp)}
                    isActive={selectedComponent.name === comp.name}
                  >
                    {comp.name}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarRail />
        </Sidebar>
        <main className="flex-1 p-6 bg-gray-100 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">{selectedComponent.name}</h1>
            <Card className="p-6">
              <div className="mb-4">
                <Label>Preview:</Label>
                <div className="mt-2 p-4 border rounded-md bg-white dark:bg-gray-800">
                  {selectedComponent.component}
                </div>
              </div>
              <div>
                <Label>Description:</Label>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  This is a {selectedComponent.name.toLowerCase()} component from the shadcn/ui library.
                  It can be customized and used in various contexts within your application.
                </p>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  )
}