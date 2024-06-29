import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { FaDesktop, FaUser } from "react-icons/fa6";
import { FcGallery } from "react-icons/fc";
import { GiSkills } from "react-icons/gi";
import Gallery from "./Gallery";
import Overview from "./Overview";
import Skills from "./Skills";
import ToolsTechnologies from "./ToolsTechnologies";

export default function About() {
  return (
    <div className="w-full m-4">
      <Tabs defaultValue="account" className="min-w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="account">
            <Button variant="outline" className="flex gap-2">
              Account <FaUser />
            </Button>
          </TabsTrigger>
          <TabsTrigger value="skills">
            <Button variant="outline" className="flex gap-2">
              Skills <GiSkills />
            </Button>
          </TabsTrigger>
          <TabsTrigger value="gallery">
            <Button variant="outline" className="flex gap-2">
              Gallery <FcGallery />
            </Button>
          </TabsTrigger>
          <TabsTrigger value="tools">
            <Button variant="outline" className="flex gap-2">
              Tools & Technologies <FaDesktop />
            </Button>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="w-full">
            <Overview />
          </Card>
        </TabsContent>
        <TabsContent value="skills">
          <Card className="w-full">
            <Overview />
            <Skills />
            <Gallery />
            <ToolsTechnologies />
          </Card>
        </TabsContent>
        <TabsContent value="gallery">
          <Card className="w-full">
            <Gallery />
          </Card>
        </TabsContent>
        <TabsContent value="tools">
          <Card className="w-full">
            <ToolsTechnologies />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
