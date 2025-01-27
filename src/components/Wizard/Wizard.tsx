import React, { SyntheticEvent } from 'react';
import { useState } from "react";
import { Tabs, TabsContent, TabsList } from "../ui/tabs"
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Checkbox } from '../ui/checkbox';

type FormData = {
  name: string;
  email: string;
  role: string;
  companyName: string;
  companySize: string;
  features: Feature[]
};
type Feature = {
  key: string;
  description: string;
  selected: boolean;
};
function Wizard() {
  const [currentStep, setCurrentStep] = useState("basic");
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    role: '',
    companyName: '',
    companySize: '',
    features: []
  });

  const handleChange = (e: SyntheticEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCompanySizeChange = (size: string) => {
    const features: Feature[] = [{
      key: "costOptimization",
      description: "Cost Optimization: Tools to reduce software spend.",
      selected: false
    },
    {
      key: "vendorManagement",
      description: "Vendor Management: Tools to manage vendor relationships and contracts.",
      selected: false
    }];
    if (["medium","large"].includes(size)) {
      features.push({
        key: "spendReporting",
        description: "Spend Reporting: Insights into software spend by category and department.",
        selected: false
      });
      features.push({
        key: "renewalAlerts",
        description: "Contract Renewal Alerts: Notifications and workflows for upcoming contract renewals.",
        selected: false
      });
    };
    setFormData((prevState) => ({
      ...prevState,
      companySize: size,
      features: features
    }));
  };

  const toggleFeature = (key: string) => {
    const features = formData.features.map(feature => {
      if (feature.key === key) {
        return { ...feature, selected: !feature.selected };
      }
      return feature;
    });
    setFormData((prevState) => ({
      ...prevState,
      features
    }));
  }

  const handleStep1Submit = (e: SyntheticEvent) => {
    e.preventDefault();
    const isFormValid = 
      formData.name &&
      formData.role &&
      formData.email &&
      /(.+)@(.+){2,}\.(.+){2,}/.test(formData.email);
    
    if (!isFormValid) {
      alert("All fields are required");
      return;
    }
    setCurrentStep("company");
  }

  const handleStep2Submit = (e: SyntheticEvent) => {
    e.preventDefault();
    const isFormValid = 
      formData.companyName &&
      formData.companySize;
    
    if (!isFormValid) {
      alert("All fields are required");
      return;
    }
    setCurrentStep("features");
  }

  const handleStep3Submit = (e: SyntheticEvent) => {
    e.preventDefault();
    const isFormValid = 
      formData.companyName &&
      formData.companySize;
    
    if (!isFormValid) return;
    setCurrentStep("complete");
  }

  return (
    <div className="flex flex-col items-center p-[20px]">
      <Card className="w-full sm:w-[500px] mt-[100px]">
        <Tabs value={currentStep} className="w-large">
          <TabsContent value="basic">
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
              <CardDescription>First, let's get to know you.</CardDescription>
            </CardHeader>
            <form onSubmit={handleStep1Submit}>
              <CardContent>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        placeholder="Chester Tester"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="chester.tester@gmail.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="role">Role</Label>
                      <Input
                        id="role"
                        name="role"
                        placeholder="Product Owner"
                        value={formData.role}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button>Next</Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="company">
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>Where do you work?</CardDescription>
            </CardHeader>
            <form onSubmit={handleStep2Submit}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input 
                      id="companyName"
                      name="companyName"
                      placeholder="ACME Corp"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="companySize">Company Size</Label>
                    <Select
                      name="companySize"
                      value={formData.companySize}
                      onValueChange={handleCompanySizeChange}
                      required>
                      <SelectTrigger id="companySize">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent position="popper">
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep("basic")}>Back</Button>
                  <Button type="submit">Next</Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="features">
            <CardHeader>
              <CardTitle>Features and Tools</CardTitle>
              <CardDescription>Which of these interest you?</CardDescription>
            </CardHeader>
            <form onSubmit={handleStep3Submit}>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  {formData.features.map((feature) => (
                    <div 
                      key={feature.key}
                      className="flex flex-row items-start space-x-3 space-y-0">
                      <Checkbox
                        id={feature.key}
                        name={feature.key}
                        checked={feature.selected}
                        onCheckedChange={() => toggleFeature(feature.key)}
                          />
                      <Label htmlFor={feature.key}>{feature.description}</Label>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setCurrentStep("company")}>Back</Button>
                  <Button type="submit">Submit</Button>
              </CardFooter>
            </form>
          </TabsContent>
          <TabsContent value="complete">
            <CardHeader>
              <CardTitle>We got it!</CardTitle>
              <CardDescription>We'll be in touch soon. Here's what you submitted:</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <table>
                  <tbody>
                  {
                    Object.entries(formData)
                    .filter(([key]) => key !== 'features')
                    .map(([key, value]) => (
                      <tr key={key}><td>{key}</td><td>{String(value)}</td></tr>
                    ))
                  }
                  <tr><td>features</td><td>
                  {
                    formData.features
                    .filter(feature => feature.selected)
                    .map((feature) => (
                      <p key={feature.key}>{feature.key}</p>
                    ))
                  }
                  </td></tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}

export default Wizard;
