import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"

function Wizard() {
  return (
    <div className="wizard">
      Here's the wizard
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent value="account">Make changes to your account here.</TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>
    </div>
  );
}

export default Wizard;
