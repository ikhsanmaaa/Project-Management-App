import { Routes, Route } from "react-router-dom";
import Navigation from "./components/common/navigation";
import Overview from "./components/common/overview";
import Board from "./components/common/board";
import Timeline from "./components/common/timeline";
import Table from "./components/common/table";
import List from "./components/common/list";

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
          <Route path="/table" element={<Table />} />
          <Route path="/timeline" element={<Timeline />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
