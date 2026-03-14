import { Routes, Route } from "react-router-dom";
import Navigation from "../components/common/navigation";
import Overview from "../features/overview/overview";
import List from "../features/list/list";
import Board from "@/features/boards/board";
import { Timeline } from "@/features/timeline/timeline";

function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <div className="sticky bg-slate-500 border-gray-800  px-8 py-4">
        <Navigation />
      </div>

      <div className="max-w-7xl px-8 py-8 space-y-6">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/board" element={<Board />} />
          <Route path="/list" element={<List />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
