import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Board from "./Board";

export default function Navigation() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="board">Board</TabsTrigger>
        <TabsTrigger value="list">List</TabsTrigger>
        <TabsTrigger value="table">Table</TabsTrigger>
        <TabsTrigger value="timeline">Timeline</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="board">
        <Board />
      </TabsContent>
      <TabsContent value="list">Make changes to your account here.</TabsContent>
      <TabsContent value="table">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="timeline">
        Make changes to your account here.
      </TabsContent>

      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  );
}
