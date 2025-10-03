'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from 'next/navigation';
import { createUser } from "@/lib/actions";

export default function UserForm() {
  const [email, setEmail] = useState('');
  const [username, setUserName] = useState('John Doe');
  const [password, setPassword] = useState('');
  const [img, setImg] = useState('https://github.com/shadcn.png');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const handleCreateUser = async () => {
    if (!email) {
      toast.error("Email is required");
      return;
    }
    
    setLoading(true);
    try {
      await createUser({ email, username, password, isAdmin: false, img });
      console.log(img)
      // Reset form
      setEmail('');
      setUserName('');
      setPassword('');
      setImg('');
      
      toast.success("User created successfully");
      
      // Refresh the page data to show the new user
      router.refresh();
      
    } catch (error) {
      console.error('Error creating user:', error);
      toast.error((error as Error).message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Card className="w-full max-w-3xl shadow-sm  overflow-hidden border-0 pt-0 ">
      <CardHeader className=" border-b px-6 py-5 rounded-none">
        <CardTitle className="text-xl ">Add New User</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="email" className="text-sm font-medium  mb-1.5 block">
              Email <span className="">*</span>
            </Label>
            <Input 
              id="email"
              placeholder="user@example.com" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              type="email"
              required
              className="h-11 "
            />
          </div>

          <div>
            <Label htmlFor="username" className="text-sm font-medium  mb-1.5 block">
              User Name
            </Label>
            <Input 
              id="username"
              placeholder="John Doe (optional)" 
              value={username} 
              onChange={(e) => setUserName(e.target.value)} 
              className="h-11"
            />
          </div>
          <div>
            <Label htmlFor="password" className="text-sm font-medium mb-1.5 block">
             Password
            </Label>
            <Input 
              id="password"
              type="password"
              placeholder="DefaultPassword123" 
              value={password} 
              required
              onChange={(e) => setPassword(e.target.value)} 
              className="h-11 "
            />
          </div>
          <div>
            <Label htmlFor="img" className="text-sm font-medium  mb-1.5 block">
              Image URL
            </Label>
            <Input 
              id="img"
              type="text"
              placeholder="https://example.com/avatar.jpg (optional)" 
              value={img} 
              onChange={(e) => setImg(e.target.value)} 
              className="h-11 "
            />
          </div>
          
          <Button 
            onClick={handleCreateUser} 
            disabled={loading}
            className="w-full h-11 mt-2 text-xl "
          >
            {loading ? 'Creating...' : 'Create User'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}