'use client';

import { useState } from 'react';
import { TableOfContents } from './toc';
import { Button } from './ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet';
import { Menu } from 'lucide-react';

export function MobileToc() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="sm" className="mb-4">
            <Menu className="h-4 w-4 mr-2" />
            Table of Contents
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-72">
          <SheetHeader>
            <SheetTitle>Table of Contents</SheetTitle>
          </SheetHeader>
          <div className="mt-4">
            <TableOfContents />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
} 